---
sidebar_position: 3
title: Exercício
slug: /backend/exercicio
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Exercício — Registro de Gastos com Clean Code

> **Domínio:** API de controle de gastos pessoais  
> **Stack:** Go + Gin + GORM + SQLite  
> **Objetivo:** Refatorar um código funcional mas bagunçado para a arquitetura em três camadas, aplicando os princípios de Clean Code estudados.

---

## Contexto

Você recebeu o código abaixo de um colega que precisava entregar rápido. Ele funciona — mas qualquer mudança nele é um pesadelo. Sua tarefa é reescrevê-lo com a arquitetura em camadas, separando claramente Handler, Service, Repository e Domain.

---

## O Código que Você Recebeu

```go
package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Gasto struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Desc      string    `json:"desc"`
	Val       float64   `json:"val"`
	Cat       string    `json:"cat"`
	Dt        time.Time `json:"dt"`
}

var banco *gorm.DB

func main() {
	banco, _ = gorm.Open(sqlite.Open("gastos.db"), &gorm.Config{})
	banco.AutoMigrate(&Gasto{})

	r := gin.Default()
	r.POST("/g", func(c *gin.Context) {
		var g Gasto
		c.BindJSON(&g)
		if g.Val <= 0 {
			c.JSON(400, gin.H{"e": "valor invalido"})
			return
		}
		cats := []string{"alimentacao", "transporte", "saude", "educacao", "outro"}
		ok := false
		for _, ct := range cats {
			if g.Cat == ct {
				ok = true
			}
		}
		if !ok {
			c.JSON(400, gin.H{"e": "categoria invalida"})
			return
		}
		g.Dt = time.Now()
		banco.Create(&g)
		c.JSON(201, g)
	})
	r.GET("/g", func(c *gin.Context) {
		var gs []Gasto
		cat := c.Query("cat")
		if cat != "" {
			banco.Where("cat = ?", cat).Find(&gs)
		} else {
			banco.Find(&gs)
		}
		c.JSON(200, gs)
	})
	r.GET("/g/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var g Gasto
		if banco.First(&g, id).Error != nil {
			c.JSON(404, gin.H{"e": "nao encontrado"})
			return
		}
		c.JSON(200, g)
	})
	r.PUT("/g/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		var g Gasto
		if banco.First(&g, id).Error != nil {
			c.JSON(404, gin.H{"e": "nao encontrado"})
			return
		}
		var body Gasto
		c.BindJSON(&body)
		if body.Val != 0 {
			if body.Val <= 0 {
				c.JSON(400, gin.H{"e": "valor invalido"})
				return
			}
			g.Val = body.Val
		}
		if body.Desc != "" {
			g.Desc = body.Desc
		}
		banco.Save(&g)
		c.JSON(200, g)
	})
	r.DELETE("/g/:id", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Param("id"))
		banco.Delete(&Gasto{}, id)
		c.JSON(200, gin.H{"ok": true})
	})
	r.Run(":8080")
}
```

---

## Problemas para Identificar Antes de Começar

Antes de escrever qualquer código, responda por escrito (pode ser comentário no arquivo ou anotação separada):

1. Quantas responsabilidades diferentes a função `POST /g` acumula? Liste cada uma.
2. O que acontece se o banco falhar ao abrir? O sistema continua rodando?
3. Como você testaria a regra *"valor deve ser maior que zero"* sem subir o servidor?
4. Se a lista de categorias válidas mudar, quantos lugares do código precisam ser alterados?
5. O `DELETE /g/:id` retorna `200` mesmo se o ID não existir. Por quê isso é um problema?

---

## O que Você Vai Construir

A mesma API, com os mesmos endpoints — mas organizada assim:

```
gastos-api/
├── main.go
├── domain/
│   └── expense.go          ← entidade + DTOs + constantes de categoria
├── repository/
│   └── expense_repo.go     ← interface + implementação com GORM
├── service/
│   └── expense_service.go  ← regras de negócio + erros nomeados
└── handler/
    └── expense_handler.go  ← tradução HTTP ↔ domínio
```

---

## Tarefas

### Tarefa 1 — Domain (`domain/expense.go`)

Defina o vocabulário da aplicação. Esta camada não importa nenhum framework.

**O que criar:**

```
Expense (entidade)
  ID          uint
  Description string
  Amount      float64
  Category    ExpenseCategory   ← tipo nomeado, não string pura
  Date        time.Time
  CreatedAt   time.Time

ExpenseCategory (tipo)
  Constantes: CategoryFood, CategoryTransport, CategoryHealth,
              CategoryEducation, CategoryOther

CreateExpenseRequest (DTO de entrada)
  Description  string    → obrigatório, mínimo 3 caracteres
  Amount       float64   → obrigatório, maior que zero
  Category     string    → obrigatório

UpdateExpenseRequest (DTO de atualização parcial)
  Description  *string
  Amount       *float64
  → use ponteiros para distinguir "não enviado" de "enviado com zero"
```

**Pergunta de reflexão:** Por que `ExpenseCategory` deve ser um tipo nomeado em vez de uma `string` simples? O que o compilador passa a garantir?

---

### Tarefa 2 — Repository (`repository/expense_repo.go`)

Defina a **interface** antes de implementar. A interface é o contrato; a implementação é o detalhe.

**Interface a definir:**

```
ExpenseRepository
  Create(expense *domain.Expense) error
  FindAll(category string) ([]domain.Expense, error)
  FindByID(id uint) (*domain.Expense, error)
  Update(expense *domain.Expense) error
  Delete(id uint) error
```

**Regras:**
- O construtor `NewExpenseRepository` recebe `*gorm.DB` por parâmetro — não acessa variável global
- `FindByID` retorna `nil, gorm.ErrRecordNotFound` quando não achar — o service traduz esse erro depois
- `FindAll` filtra por categoria quando o parâmetro não for vazio

**Pergunta de reflexão:** Por que definimos a interface no pacote `repository` e não no pacote `service`, que é quem a usa?

---

### Tarefa 3 — Service (`service/expense_service.go`)

Aqui vivem as regras de negócio. O service não conhece `gin.Context`, `http.Status*`, nem SQL.

**Erros nomeados a declarar:**

```go
var (
    ErrExpenseNotFound    = errors.New("gasto não encontrado")
    ErrInvalidAmount      = errors.New("valor deve ser maior que zero")
    ErrInvalidCategory    = errors.New("categoria inválida")
)
```

**Regras de negócio a implementar:**

| Operação | Regra |
|----------|-------|
| `CreateExpense` | Amount > 0 e Category válida; Date preenchida automaticamente com `time.Now()` |
| `ListExpenses` | Se category for fornecida, validar antes de passar ao repository |
| `GetExpense` | Traduzir `gorm.ErrRecordNotFound` → `ErrExpenseNotFound` |
| `UpdateExpense` | Buscar o gasto primeiro; se Amount for enviado, validar > 0; nunca permitir alterar Date |
| `DeleteExpense` | Verificar existência antes de deletar; retornar `ErrExpenseNotFound` se não existir |

**Pergunta de reflexão:** No código original, a validação de categoria usa um `for` inline dentro do handler. No service, onde e como você vai centralizar essa validação para não repeti-la em `Create` e `List`?

---

### Tarefa 4 — Handler (`handler/expense_handler.go`)

O handler é o tradutor. Seu único trabalho é converter HTTP → domínio → HTTP.

**Estrutura:**

```go
type ExpenseHandler struct {
    svc service.ExpenseService
}

func NewExpenseHandler(svc service.ExpenseService) *ExpenseHandler
```

**Mapeamento de erros → status HTTP:**

| Erro | Status HTTP |
|------|-------------|
| `ErrExpenseNotFound` | `404 Not Found` |
| `ErrInvalidAmount` | `400 Bad Request` |
| `ErrInvalidCategory` | `400 Bad Request` |
| Qualquer outro erro | `500 Internal Server Error` |

**Requisito:** centralize o mapeamento em um único método `respond(c, data, err)` — não repita o bloco `if/else` em cada handler.

**Pergunta de reflexão:** O `DELETE` original sempre retorna `200`. Com sua implementação, o que ele retorna quando o ID não existe? Por que isso importa para quem consome a API?

---

### Tarefa 5 — Composição (`main.go`)

O `main.go` só monta as peças. Sem lógica de negócio.

```go
func main() {
    db := connectDatabase()

    repo    := repository.NewExpenseRepository(db)
    svc     := service.NewExpenseService(repo)
    handler := handler.NewExpenseHandler(svc)

    r := setupRouter(handler)
    r.Run(":8080")
}
```

**Endpoints finais:**

```
POST   /expenses          → cria gasto
GET    /expenses          → lista (query: ?category=alimentacao)
GET    /expenses/:id      → busca por ID
PATCH  /expenses/:id      → atualização parcial
DELETE /expenses/:id      → remove
```

---

## Critérios de Avaliação

| Critério | O que será verificado |
|----------|-----------------------|
| **Domain sem dependências externas** | `domain/expense.go` não importa `gin`, `gorm`, nem `net/http` |
| **Interface antes de implementação** | `ExpenseRepository` é uma interface, não uma struct concreta |
| **Injeção de dependência** | Nenhuma camada cria sua própria dependência internamente |
| **Erros nomeados** | Handler usa `errors.Is()`, não compara strings |
| **Sem variável global** | `*gorm.DB` é passada por parâmetro, nunca declarada no escopo do pacote |
| **Regras só no service** | Handler não valida Amount nem Category; Repository não conhece regras |
| **Status HTTP corretos** | `201` na criação, `404` quando não encontrado, `204` no delete bem-sucedido |
| **Resposta coerente no DELETE** | Retorna `404` se o ID não existe, não `200` |

---

## Desafio Extra (opcional)

Implemente um **repositório fake** em memória e escreva dois testes unitários para o service:

```go
// Teste 1: criar um gasto com valor negativo deve retornar ErrInvalidAmount
// Teste 2: buscar um ID inexistente deve retornar ErrExpenseNotFound
```

O objetivo é demonstrar que, com a arquitetura em camadas correta, você consegue testar toda a lógica de negócio **sem banco de dados e sem servidor HTTP**.

```go
type fakeExpenseRepository struct {
    expenses []domain.Expense
    nextID   uint
}

// Implemente os métodos da interface aqui...
// Depois passe essa struct para NewExpenseService e rode os testes.
```

---

## Referência Rápida

Consulte os documentos do projeto enquanto trabalha:

- **Conceitos e camadas** 
- **Exemplo completo de produto** 
- **Exemplo completo de tarefa**

A estrutura que você vai construir é análoga à da API de produtos e da API de tarefas — o domínio muda, os princípios são os mesmos.
