---
sidebar_position: 2
title: Primeira Aplicação
slug: /backend/exemplo1
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# A Jornada do Clean Code — Do Caos à Clareza

> **Domínio:** API de gerenciamento de produtos de uma loja  
> **Stack:** Go + Gin + GORM + SQLite  
> **Formato:** Três versões do mesmo sistema. Mesma funcionalidade. Qualidade crescente.

A pergunta que guia este documento não é *"o código funciona?"* — qualquer dos três funciona.  
A pergunta é **"o código sobrevive ao tempo?"**

---

## O Sistema

Uma loja precisa de uma API simples para gerenciar seu estoque:

- Cadastrar produto (nome, preço, quantidade)
- Listar produtos
- Atualizar preço ou quantidade
- Remover produto

Quatro operações. Um domínio trivial. Perfeito para focar na **qualidade do código**, não na complexidade do negócio.

---

## Versão 1 — "Funciona na minha máquina"

> Código escrito com pressa. Sem estrutura. Sem intenção. Funciona hoje, machuca amanhã.

Tudo em um único arquivo: `main.go`.

```go
package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type P struct {
	ID  uint    `json:"id" gorm:"primaryKey"`
	N   string  `json:"n"`
	Pr  float64 `json:"pr"`
	Qt  int     `json:"qt"`
}

var d *gorm.DB

func main() {
	d, _ = gorm.Open(sqlite.Open("loja.db"), &gorm.Config{})
	d.AutoMigrate(&P{})

	r := gin.Default()
	r.POST("/p", func(c *gin.Context) {
		var p P
		c.BindJSON(&p)
		d.Create(&p)
		c.JSON(200, p)
	})
	r.GET("/p", func(c *gin.Context) {
		var ps []P
		d.Find(&ps)
		c.JSON(200, ps)
	})
	r.PUT("/p/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var p P
		d.First(&p, id)
		c.BindJSON(&p)
		d.Save(&p)
		c.JSON(200, p)
	})
	r.DELETE("/p/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		d.Delete(&P{}, id)
		c.JSON(200, gin.H{"ok": true})
	})
	r.Run(":8080")
}
```

### O que está errado aqui?

Vamos contar os problemas, um por um.

---

#### Problema 1 — Nomes que escondem intenção

```go
// ❌ O que é "P"? O que é "N"? O que é "Pr"? O que é "Qt"?
type P struct {
    ID  uint    `json:"id"`
    N   string  `json:"n"`
    Pr  float64 `json:"pr"`
    Qt  int     `json:"qt"`
}
```

Abreviações economizam 3 segundos de digitação e custam minutos de leitura para cada pessoa que ver esse código depois. O compilador não se importa com o nome. O humano, sim.

**Regra:** um nome deve responder "o que isso representa?" sem precisar de contexto extra.

---

#### Problema 2 — Erros ignorados

```go
// ❌ E se o banco não abrir? E se o JSON for inválido?
d, _ = gorm.Open(sqlite.Open("loja.db"), &gorm.Config{})
c.BindJSON(&p)  // retorna erro, mas ninguém olha
```

O `_` em Go descarta o erro silenciosamente. Em produção, isso gera comportamentos imprevisíveis — a aplicação continua rodando como se nada tivesse acontecido, mas com estado corrompido.

---

#### Problema 3 — Variável global mutável

```go
// ❌ Variável global acessada por qualquer função, em qualquer ordem
var d *gorm.DB
```

Variáveis globais criam dependências invisíveis. Qualquer parte do código pode mudar `d` a qualquer momento. Isso torna o comportamento do sistema difícil de prever e impossível de testar isoladamente.

---

#### Problema 4 — Funções anônimas gigantes sem nome

```go
r.PUT("/p/:id", func(c *gin.Context) {
    // busca, valida, atualiza, salva — tudo aqui dentro
    // nenhum nome, nenhuma separação, nenhum reaproveitamento
})
```

Uma função sem nome não pode ser testada, não pode ser reaproveitada, e não comunica sua intenção. Se ela quebrar, o stack trace aponta para uma linha anônima.

---

#### Problema 5 — Zero tratamento de casos de erro

```go
r.DELETE("/p/:id", func(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))  // e se "id" for "abc"?
    d.Delete(&P{}, id)                     // e se o produto não existir?
    c.JSON(200, gin.H{"ok": true})         // sempre 200, mesmo em falha
})
```

O cliente recebe `200 OK` independente do que aconteceu. A API mente.

---

### Diagnóstico da Versão 1

| Critério | Status |
|----------|--------|
| Funciona? | ✅ Sim |
| Outro dev entende em 5 minutos? | ❌ Não |
| É testável? | ❌ Não (variável global, funções anônimas) |
| Trata erros corretamente? | ❌ Não |
| Sobrevive a uma feature nova? | ❌ Provavelmente quebra algo |

---

## Versão 2 — "Melhorei um pouco"

> Nomes corrigidos. Funções nomeadas. Erros tratados. Mas ainda tudo misturado.

```go
package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Melhoramos os nomes — agora a struct comunica o domínio
type Product struct {
	ID       uint    `json:"id"       gorm:"primaryKey"`
	Name     string  `json:"name"     gorm:"not null"`
	Price    float64 `json:"price"`
	Quantity int     `json:"quantity"`
}

// O banco ainda é global, mas pelo menos tem um nome descritivo
var db *gorm.DB

func main() {
	var err error
	// Agora tratamos o erro de conexão
	db, err = gorm.Open(sqlite.Open("loja.db"), &gorm.Config{})
	if err != nil {
		panic("falha ao conectar ao banco: " + err.Error())
	}
	db.AutoMigrate(&Product{})

	r := gin.Default()
	r.POST("/products", createProduct)
	r.GET("/products", listProducts)
	r.PUT("/products/:id", updateProduct)
	r.DELETE("/products/:id", deleteProduct)
	r.Run(":8080")
}

// As funções agora têm nomes — aparecem em stack traces, podem ser testadas
func createProduct(c *gin.Context) {
	var product Product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&product)
	c.JSON(http.StatusCreated, product)
}

func listProducts(c *gin.Context) {
	var products []Product
	db.Find(&products)
	c.JSON(http.StatusOK, products)
}

func updateProduct(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var product Product
	if result := db.First(&product, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "produto não encontrado"})
		return
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Save(&product)
	c.JSON(http.StatusOK, product)
}

func deleteProduct(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	if result := db.First(&Product{}, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "produto não encontrado"})
		return
	}

	db.Delete(&Product{}, id)
	c.JSON(http.StatusNoContent, nil)
}
```

### O que melhorou?

- ✅ Nomes significativos (`Product`, `Name`, `Price`, `Quantity`)
- ✅ Erros de conexão tratados com mensagem útil
- ✅ Funções nomeadas (aparecem no stack trace)
- ✅ Códigos HTTP corretos (`201`, `404`, `400`)
- ✅ `ShouldBindJSON` em vez de `BindJSON` (não faz panic em erro)

### O que ainda está errado?

---

#### Problema remanescente 1 — Variável global de banco

```go
var db *gorm.DB  // ❌ ainda global
```

Impossível trocar o banco em testes. Impossível ter dois contextos diferentes. O banco é um detalhe de infraestrutura — não deveria ser visível globalmente.

---

#### Problema remanescente 2 — Regra de negócio dentro do handler

```go
func updateProduct(c *gin.Context) {
    // aqui tem: parse de ID, busca no banco, validação, atualização...
    // tudo junto no mesmo lugar
}
```

Imagine que amanhã uma regra nova chega: *"produto com quantidade zero não pode ter preço alterado"*. Onde você coloca isso? Dentro do handler, misturado com HTTP? E quando precisar reutilizar essa regra em outro endpoint?

---

#### Problema remanescente 3 — Impossível de testar unitariamente

Para testar `updateProduct`, você precisa de um servidor Gin rodando e um banco SQLite real. Não há como isolar a lógica. Um teste pequeno vira um teste de integração completo.

---

### Diagnóstico da Versão 2

| Critério | Status |
|----------|--------|
| Funciona? | ✅ Sim |
| Outro dev entende em 5 minutos? | ✅ Sim |
| É testável unitariamente? | ❌ Não (banco global) |
| Trata erros corretamente? | ✅ Sim |
| Sobrevive a regras de negócio novas? | ⚠️ Com dificuldade |

A Versão 2 é **boa o suficiente para protótipos**. Mas em sistemas que crescem, as limitações aparecem rapidamente.

---

## Versão 3 — Clean Code

> Separação clara de responsabilidades. Sem variáveis globais. Testável. Extensível.

A única forma de chegar aqui com naturalidade é entender **por que** cada mudança existe — não decorar a estrutura.

### Estrutura de arquivos

```
loja-api/
├── main.go               ← composição: monta as peças
├── domain/
│   └── product.go        ← o que é um produto (entidade + DTOs)
├── repository/
│   └── product_repo.go   ← como persistir um produto
├── service/
│   └── product_service.go ← regras de negócio sobre produtos
└── handler/
    └── product_handler.go ← como responder requisições HTTP
```

Cada pasta responde a uma pergunta diferente. Nenhuma pasta precisa conhecer os detalhes interna das outras.

---

### `domain/product.go` — O coração

```go
package domain

// Product é a entidade central. Define o que existe no negócio.
// Não sabe nada de HTTP, banco, ou framework.
type Product struct {
	ID       uint    `gorm:"primaryKey" json:"id"`
	Name     string  `gorm:"not null"   json:"name"`
	Price    float64 `                  json:"price"`
	Quantity int     `                  json:"quantity"`
}

// CreateProductRequest é o que a API aceita na criação.
// Separado de Product para que a validação da entrada não polua a entidade.
type CreateProductRequest struct {
	Name     string  `json:"name"     binding:"required,min=2"`
	Price    float64 `json:"price"    binding:"required,gt=0"`
	Quantity int     `json:"quantity" binding:"min=0"`
}

// UpdateProductRequest usa ponteiros para distinguir
// "campo não enviado" de "campo enviado com valor zero".
type UpdateProductRequest struct {
	Price    *float64 `json:"price"`
	Quantity *int     `json:"quantity"`
}
```

**Por que DTOs separados da entidade?**

Se você usar `Product` diretamente como entrada da API, o cliente pode enviar um `id` arbitrário e sobrescrever registros. O DTO é uma barreira intencional — define exatamente o que o cliente tem permissão de informar.

---

### `repository/product_repo.go` — O guardião do banco

```go
package repository

import (
	"github.com/seu-usuario/loja-api/domain"
	"gorm.io/gorm"
)

// ProductRepository define o contrato de persistência como uma interface.
//
// Por que interface?
// Em testes, você implementa um FakeProductRepository que guarda dados em memória.
// O service não sabe a diferença — ele programa para o contrato, não para a implementação.
type ProductRepository interface {
	Create(product *domain.Product) error
	FindAll() ([]domain.Product, error)
	FindByID(id uint) (*domain.Product, error)
	Update(product *domain.Product) error
	Delete(id uint) error
}

type productRepositoryImpl struct {
	db *gorm.DB
}

// NewProductRepository é o único ponto de criação.
// Recebe o banco como parâmetro — não o busca globalmente.
func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepositoryImpl{db: db}
}

func (r *productRepositoryImpl) Create(product *domain.Product) error {
	return r.db.Create(product).Error
}

func (r *productRepositoryImpl) FindAll() ([]domain.Product, error) {
	var products []domain.Product
	err := r.db.Find(&products).Error
	return products, err
}

func (r *productRepositoryImpl) FindByID(id uint) (*domain.Product, error) {
	var product domain.Product
	err := r.db.First(&product, id).Error
	if err != nil {
		return nil, err
	}
	return &product, nil
}

func (r *productRepositoryImpl) Update(product *domain.Product) error {
	return r.db.Save(product).Error
}

func (r *productRepositoryImpl) Delete(id uint) error {
	return r.db.Delete(&domain.Product{}, id).Error
}
```

---

### `service/product_service.go` — As regras de negócio

```go
package service

import (
	"errors"

	"github.com/seu-usuario/loja-api/domain"
	"github.com/seu-usuario/loja-api/repository"
	"gorm.io/gorm"
)

// Erros de negócio nomeados.
//
// Por que não retornar strings de erro?
// O handler usa errors.Is() para mapear cada erro para o status HTTP correto.
// Se você mudar o texto do erro, o handler continua funcionando — ele compara
// a identidade do erro, não o texto.
var (
	ErrProductNotFound   = errors.New("produto não encontrado")
	ErrPriceCannotBeZero = errors.New("preço não pode ser zero ou negativo")
)

type ProductService interface {
	CreateProduct(req domain.CreateProductRequest) (*domain.Product, error)
	ListProducts() ([]domain.Product, error)
	GetProduct(id uint) (*domain.Product, error)
	UpdateProduct(id uint, req domain.UpdateProductRequest) (*domain.Product, error)
	DeleteProduct(id uint) error
}

type productServiceImpl struct {
	repo repository.ProductRepository
}

func NewProductService(repo repository.ProductRepository) ProductService {
	return &productServiceImpl{repo: repo}
}

func (s *productServiceImpl) CreateProduct(req domain.CreateProductRequest) (*domain.Product, error) {
	product := &domain.Product{
		Name:     req.Name,
		Price:    req.Price,
		Quantity: req.Quantity,
	}
	if err := s.repo.Create(product); err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productServiceImpl) ListProducts() ([]domain.Product, error) {
	return s.repo.FindAll()
}

func (s *productServiceImpl) GetProduct(id uint) (*domain.Product, error) {
	product, err := s.repo.FindByID(id)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrProductNotFound
	}
	return product, err
}

func (s *productServiceImpl) UpdateProduct(id uint, req domain.UpdateProductRequest) (*domain.Product, error) {
	product, err := s.GetProduct(id)
	if err != nil {
		return nil, err
	}

	// Regra de negócio: preço não pode ser zero ou negativo.
	// Esta regra vive aqui — não no handler, não no banco.
	// Se a regra mudar, muda em um lugar só.
	if req.Price != nil {
		if *req.Price <= 0 {
			return nil, ErrPriceCannotBeZero
		}
		product.Price = *req.Price
	}

	if req.Quantity != nil {
		product.Quantity = *req.Quantity
	}

	if err := s.repo.Update(product); err != nil {
		return nil, err
	}
	return product, nil
}

func (s *productServiceImpl) DeleteProduct(id uint) error {
	if _, err := s.GetProduct(id); err != nil {
		return err
	}
	return s.repo.Delete(id)
}
```

**Observe a diferença em relação à V2:**

Na V2, se você quisesse adicionar a regra *"preço não pode ser zero"*, precisaria colocá-la dentro do handler `updateProduct` — misturada com parse de URL, binding de JSON e resposta HTTP. Na V3, ela vai exatamente para onde pertence: o service.

---

### `handler/product_handler.go` — O tradutor HTTP

```go
package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/seu-usuario/loja-api/domain"
	"github.com/seu-usuario/loja-api/service"
)

// ProductHandler agrupa os handlers. Recebe o service por injeção.
// Não sabe que existe um banco. Não sabe que existe SQLite.
type ProductHandler struct {
	svc service.ProductService
}

func NewProductHandler(svc service.ProductService) *ProductHandler {
	return &ProductHandler{svc: svc}
}

// respond centraliza a lógica de mapeamento erro → status HTTP.
// Em vez de repetir o mesmo bloco if/else em cada handler,
// temos um único lugar que traduz erros de negócio em respostas HTTP.
func (h *ProductHandler) respond(c *gin.Context, data interface{}, err error) {
	if err == nil {
		status := http.StatusOK
		if c.Request.Method == http.MethodPost {
			status = http.StatusCreated
		}
		c.JSON(status, data)
		return
	}

	switch {
	case errors.Is(err, service.ErrProductNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	case errors.Is(err, service.ErrPriceCannotBeZero):
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	default:
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro interno"})
	}
}

func (h *ProductHandler) Create(c *gin.Context) {
	var req domain.CreateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	product, err := h.svc.CreateProduct(req)
	h.respond(c, product, err)
}

func (h *ProductHandler) List(c *gin.Context) {
	products, err := h.svc.ListProducts()
	h.respond(c, products, err)
}

func (h *ProductHandler) GetByID(c *gin.Context) {
	id, err := parseID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	product, err := h.svc.GetProduct(id)
	h.respond(c, product, err)
}

func (h *ProductHandler) Update(c *gin.Context) {
	id, err := parseID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	var req domain.UpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	product, err := h.svc.UpdateProduct(id, req)
	h.respond(c, product, err)
}

func (h *ProductHandler) Delete(c *gin.Context) {
	id, err := parseID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	err = h.svc.DeleteProduct(id)
	h.respond(c, nil, err)
}

func parseID(c *gin.Context) (uint, error) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	return uint(id), err
}
```

**Compare com a V2:**

Na V2, cada handler tinha seu próprio bloco de tratamento de erro. Se uma nova camada de erro surgisse, você editava 4 funções. Na V3, o método `respond` é o único lugar que faz essa tradução.

---

### `main.go` — O ponto de composição

```go
package main

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/seu-usuario/loja-api/domain"
	"github.com/seu-usuario/loja-api/handler"
	"github.com/seu-usuario/loja-api/repository"
	"github.com/seu-usuario/loja-api/service"
	"github.com/gin-gonic/gin"
)

func main() {
	db := connectDatabase()

	// Injeção de dependências: cada camada recebe o que precisa
	productRepo    := repository.NewProductRepository(db)
	productSvc     := service.NewProductService(productRepo)
	productHandler := handler.NewProductHandler(productSvc)

	r := setupRouter(productHandler)

	log.Println("Servidor rodando em http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}

func connectDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("loja.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Falha ao conectar ao banco:", err)
	}
	if err := db.AutoMigrate(&domain.Product{}); err != nil {
		log.Fatal("Falha na migração:", err)
	}
	return db
}

func setupRouter(productHandler *handler.ProductHandler) *gin.Engine {
	r := gin.Default()
	products := r.Group("/products")
	{
		products.POST("", productHandler.Create)
		products.GET("", productHandler.List)
		products.GET("/:id", productHandler.GetByID)
		products.PUT("/:id", productHandler.Update)
		products.DELETE("/:id", productHandler.Delete)
	}
	return r
}
```

`main.go` não tem lógica de negócio. Ele apenas **monta o sistema** e o **inicia**. Se você ler só o `main.go`, entende a arquitetura completa da aplicação em 30 segundos.

---

## Comparativo Final

### Tamanho e distribuição do código

| Versão | Linhas | Arquivos | Responsabilidade por arquivo |
|--------|--------|----------|------------------------------|
| V1 | ~50 | 1 | Tudo misturado |
| V2 | ~90 | 1 | Tudo misturado, mas legível |
| V3 | ~200 | 6 | Cada um faz uma coisa |

A V3 tem mais código. Isso é um investimento — não um desperdício.

---

### E quando uma mudança chega?

**Cenário:** o cliente pede que produtos com `quantity = 0` sejam marcados automaticamente como `"out_of_stock"` e não apareçam na listagem padrão.

| Versão | O que você toca |
|--------|----------------|
| V1 | Acha a função anônima certa, torce para não quebrar outra |
| V2 | Edita `createProduct`, `updateProduct` e `listProducts` separadamente |
| V3 | Adiciona a regra em `service/product_service.go`. Nada mais muda. |

---

### Testabilidade

```go
// Na V3, testar o service é trivial.
// Você cria um repositório fake que não precisa de banco:

type fakeProductRepository struct {
	products []domain.Product
}

func (f *fakeProductRepository) Create(p *domain.Product) error {
	p.ID = uint(len(f.products) + 1)
	f.products = append(f.products, *p)
	return nil
}

// ... implementa os outros métodos com lógica em memória ...

func TestUpdateProduct_PriceCannotBeZero(t *testing.T) {
	repo := &fakeProductRepository{}
	svc  := service.NewProductService(repo)

	// Cria um produto para testar
	svc.CreateProduct(domain.CreateProductRequest{Name: "Notebook", Price: 3000, Quantity: 5})

	// Tenta atualizar com preço zero
	price := 0.0
	_, err := svc.UpdateProduct(1, domain.UpdateProductRequest{Price: &price})

	if !errors.Is(err, service.ErrPriceCannotBeZero) {
		t.Errorf("esperava ErrPriceCannotBeZero, recebeu: %v", err)
	}
}
```

Na V1 ou V2, esse teste exigiria um banco SQLite real e um servidor Gin rodando. Na V3, é só Go puro — roda em milissegundos.

---

## O que Clean Code não é

Antes de finalizar, três mitos comuns:

**"Clean Code é sobre comentários."**  
Comentários que explicam *o quê* o código faz são sinal de que o código não é claro o suficiente. Clean Code é sobre fazer o próprio código comunicar a intenção. Comentários bons explicam *por quê* uma decisão foi tomada — não o que está acontecendo.

**"Clean Code é sobre performance."**  
Não diretamente. Código limpo é otimizável. Código confuso é intocável. A performance vem depois da clareza.

**"Clean Code deixa o código maior, logo é pior."**  
A V3 tem mais linhas que a V1. Mas ela é modificável, testável e compreensível. Uma linha de código incompreensível tem custo infinito.

---

## Resumo da Jornada

```
Versão 1 ──────────────────────────────────────────► Funciona
                                                       Mas não sobrevive

Versão 2 ──────────────────────────────────────────► Legível
                                                       Mas não é testável

Versão 3 ──────────────────────────────────────────► Legível + Testável + Extensível
                                                       Clean Code
```

A diferença entre V1 e V3 não é talento. É **intenção**: a decisão consciente de escrever código para o próximo desenvolvedor — que frequentemente é você mesmo, seis meses depois.
