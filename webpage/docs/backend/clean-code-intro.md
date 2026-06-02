---
sidebar_position: 1
title: Introdução aos Conceitos de Clean Code
slug: /backend/intro
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Clean Code — Conceitos, Camadas e Comunicação

---

## 1. O que é Clean Code?

**Clean Code** é um conjunto de práticas e princípios para escrever código que seja fácil de ler, entender, modificar e testar, não apenas por quem o escreveu, mas por qualquer desenvolvedor que precise trabalhar nele no futuro.

O termo foi popularizado por Robert C. Martin (Uncle Bob) no livro *Clean Code: A Handbook of Agile Software Craftsmanship* (2008), mas os princípios que o sustentam vêm de décadas de prática coletiva da engenharia de software.

A definição mais direta é a de Grady Booch, um dos criadores da UML:

> *"Clean code is simple and direct. Clean code reads like well-written prose."*

Código limpo não é código que funciona. Todo código eventualmente funciona, pelo menos no dia em que foi escrito. Código limpo é código que **comunica intenção**, que **resiste à mudança** sem cascata de efeitos colaterais, e que **convida à colaboração** em vez de afastar quem tenta entendê-lo.

---

### 1.1 Os três eixos do Clean Code

Clean Code não é uma regra única. É um equilíbrio entre três eixos:

```
        Legibilidade
             │
             │
             │
             ●──────────── Testabilidade
            ╱
           ╱
    Manutenibilidade
```

**Legibilidade** — o código é compreensível sem necessidade de comentários explicativos. Nomes de variáveis, funções e tipos comunicam exatamente o que representam.

**Testabilidade** — cada parte do sistema pode ser verificada isoladamente, sem precisar subir o sistema inteiro. Se você não consegue escrever um teste sem inicializar o banco de dados e o servidor HTTP, o código não está limpo.

**Manutenibilidade** — uma mudança de requisito ou correção de bug afeta o menor número possível de arquivos e funções. Mudanças cirúrgicas, não cascatas.

Os três estão conectados: código legível é mais fácil de testar; código testável força separação de responsabilidades; separação de responsabilidades torna a manutenção previsível.

---

### 1.2 Princípios fundamentais

Estes são os pilares que guiam as decisões de design em um sistema com Clean Code:

---

#### Nomes que comunicam intenção

Um nome bom elimina a necessidade de um comentário explicativo. Ele responde três perguntas ao mesmo tempo: **o que é**, **para que serve** e **como se usa**.

```
❌  d, n, pr, qt
✅  database, productName, price, quantity

❌  func calc(x int) int
✅  func calculateFinalPrice(basePrice int) int

❌  if p.s == 1
✅  if product.Status == StatusActive
```

A regra prática: se você precisa de um comentário para explicar o nome de uma variável ou função, o nome está errado.

---

#### Uma função, uma responsabilidade

Uma função deve fazer **exatamente uma coisa** e fazê-la bem. O teste simples: você consegue descrever o que a função faz sem usar a palavra "e"?

```
❌  validateAndSaveAndNotifyUser()   ← três responsabilidades
✅  validateUser()
✅  saveUser()
✅  notifyUser()
```

Funções pequenas têm nomes precisos, são fáceis de testar, e podem ser reaproveitadas. Uma função grande com múltiplas responsabilidades raramente consegue qualquer uma dessas três coisas.

---

#### Separação de responsabilidades (SRP)

Cada módulo, classe ou arquivo deve ter **uma única razão para mudar**. Se um arquivo precisa ser editado tanto quando a lógica de negócio muda quanto quando o banco de dados muda, ele tem responsabilidades demais.

Isso é o coração da arquitetura em camadas, que exploraremos na seção 2.

---

#### Não se repita (DRY — Don't Repeat Yourself)

Toda duplicação de código é uma dívida futura: quando a lógica mudar, você precisará lembrar de cada lugar onde ela foi copiada. Se esquecer um, o sistema fica inconsistente.

```
❌  Mesma validação de preço em três handlers diferentes
✅  Uma função validatePrice() chamada pelos três
```

---

#### Falhe rápido e de forma explícita

Erros silenciosos são os mais perigosos. Um sistema que ignora erros continua rodando com estado corrompido e quando o problema aparece, está longe da causa real.

```
❌  db, _ = gorm.Open(...)     ← erro descartado com _
✅  db, err = gorm.Open(...)
    if err != nil { log.Fatal(err) }
```

---

## 2. As Camadas do Clean Code

A arquitetura em camadas é a expressão estrutural do princípio de separação de responsabilidades. Em vez de colocar tudo em um lugar, dividimos o sistema em zonas com responsabilidades distintas e regras claras sobre o que cada zona pode fazer.



```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   CAMADA DE APRESENTAÇÃO  (Handler / Controller)        │
│   Responsabilidade: receber, validar e responder HTTP   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   CAMADA DE NEGÓCIO  (Service)                          │
│   Responsabilidade: orquestrar regras de negócio        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   CAMADA DE DADOS  (Repository)                         │
│   Responsabilidade: persistir e recuperar entidades     │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │
         ▼
   [ Banco de Dados / Armazenamento ]
```

Cada camada **conhece apenas a camada imediatamente abaixo dela**. O Handler conhece o Service. O Service conhece o Repository. O Repository conhece o banco. Ninguém pula camadas.

---

### 2.1 Camada de Apresentação — Handler

**O que é:** a interface entre o mundo externo (HTTP, WebSocket, CLI) e o sistema interno.

**Responsabilidades:**
- Receber a requisição e extrair dados (parâmetros de URL, corpo JSON, headers)
- Validar o formato da entrada (campo obrigatório, tipo correto, tamanho mínimo)
- Chamar o service correspondente
- Traduzir o resultado (ou erro) em uma resposta HTTP com o status correto
- Serializar a resposta em JSON

**O que o Handler NÃO faz:**
- Não contém regras de negócio ("produto não pode ter preço negativo" não é responsabilidade do handler)
- Não acessa o banco de dados diretamente
- Não conhece SQL, GORM, ou qualquer detalhe de persistência

**Metáfora:** o handler é o atendente de uma loja. Ele recebe o pedido do cliente, confere se o pedido está bem formado ("o senhor informou o tamanho?"), repassa para a equipe interna, e entrega a resposta de volta ao cliente. Ele não fabrica o produto.

---

### 2.2 Camada de Negócio — Service

**O que é:** o núcleo inteligente do sistema. É onde vive a lógica que diferencia seu software dos demais.

**Responsabilidades:**
- Implementar as regras de negócio da aplicação
- Coordenar operações que envolvem múltiplas entidades
- Garantir consistência antes de persistir dados
- Traduzir erros de infraestrutura em erros de domínio compreensíveis

**O que o Service NÃO faz:**
- Não sabe nada sobre HTTP (não conhece `gin.Context`, `http.StatusOK`, nem JSON)
- Não escreve SQL diretamente
- Não decide como serializar a resposta

**Metáfora:** o service é o gerente da fábrica. Ele conhece as regras de produção, decide o que pode e o que não pode ser feito, e coordena as diferentes partes do processo. Ele não atende clientes e não opera as máquinas diretamente.

---

### 2.3 Camada de Dados — Repository

**O que é:** a camada que isola completamente o acesso ao banco de dados do resto do sistema.

**Responsabilidades:**
- Executar operações de leitura e escrita no banco
- Traduzir erros do banco (ex: `gorm.ErrRecordNotFound`) em erros neutros
- Mapear entre entidades do domínio e estruturas do banco

**O que o Repository NÃO faz:**
- Não contém regras de negócio
- Não decide o que fazer com os dados, só persiste e recupera o que o service pediu
- Não conhece HTTP

**Metáfora:** o repository é o almoxarifado. Ele guarda e entrega itens. Não decide o que vai ser feito com eles.

---

### 2.4 O Domínio — a camada transversal

O **domínio** não é exatamente uma camada — é o vocabulário compartilhado do sistema. Ele define:

- **Entidades:** os objetos centrais do negócio (`Product`, `Task`, `User`)
- **DTOs:** os contratos de entrada e saída da API (`CreateProductRequest`, `UpdateProductRequest`)
- **Erros de negócio:** constantes que representam situações de erro com significado (`ErrProductNotFound`)

O domínio é a única parte do sistema que todas as camadas conhecem. Mas ele não conhece ninguém — não importa HTTP, não importa banco de dados.

```
          Domain
        (vocabulário)
       ╱      │      ╲
Handler   Service   Repository
```

---

## 3. Como as Camadas se Comunicam

Definidas as responsabilidades de cada camada, a questão central é: **como elas trocam informações sem criar dependências problemáticas?**

A resposta está em dois mecanismos combinados: **interfaces** e **injeção de dependência**.

---

### 3.1 Interfaces como contratos

Uma **interface** define o que uma camada pode fazer, sem especificar como ela faz. É um contrato entre quem usa (a camada acima) e quem fornece (a camada abaixo).

```
Interface ProductRepository
├── Create(product) → error
├── FindAll()       → []Product, error
├── FindByID(id)    → Product, error
├── Update(product) → error
└── Delete(id)      → error
```

O Service programa para essa interface não para a implementação concreta. Isso significa que o Service não sabe se os dados estão em SQLite, PostgreSQL, MongoDB ou numa lista em memória. Ele só sabe que pode pedir `FindByID` e receberá um `Product` ou um `error`.

**Por que isso importa?**

1. **Em testes:** você cria uma implementação falsa da interface que guarda dados em memória. O Service é testado sem banco de dados real.
2. **Na manutenção:** se você trocar SQLite por PostgreSQL, o Service não muda. Só a implementação do Repository muda.
3. **Na leitura:** ao ver `repo.FindByID(id)`, você entende o que acontece sem precisar ir até a implementação.

---

### 3.2 Injeção de Dependência

**Injeção de dependência** significa que uma camada não cria as suas próprias dependências — ela as recebe de fora.

Compare as duas abordagens:

```
❌  Dependência criada internamente (acoplamento rígido)

func NewProductService() ProductService {
    db, _ := gorm.Open(...)        // o service abre o banco sozinho
    repo := productRepositoryImpl{db: db}
    return &productServiceImpl{repo: repo}
}
```

```
✅  Dependência injetada externamente (acoplamento fraco)

func NewProductService(repo ProductRepository) ProductService {
    return &productServiceImpl{repo: repo}
}
```

Na segunda versão, o Service recebe um `ProductRepository` — qualquer objeto que satisfaça a interface. Não importa se é a implementação real com SQLite ou uma implementação falsa para testes.

O ponto central: **quem decide qual implementação usar é o `main.go`**, não as camadas.

---

### 3.3 O fluxo completo de uma requisição

Vamos acompanhar uma requisição de `PATCH /products/7` com corpo `{"price": 150.00}` percorrendo todas as camadas:

```
Cliente HTTP
    │
    │  PATCH /products/7  {"price": 150.00}
    ▼
┌──────────────────────────────────────────────┐
│  HANDLER                                     │
│                                              │
│  1. Extrai id=7 da URL                       │
│  2. Faz parse do JSON → UpdateProductRequest │
│  3. Valida: campos obrigatórios, tipos       │
│  4. Chama: svc.UpdateProduct(7, request)     │
└───────────────────┬──────────────────────────┘
                    │  UpdateProduct(7, {price: 150.00})
                    ▼
┌──────────────────────────────────────────────┐
│  SERVICE                                     │
│                                              │
│  1. Busca o produto: repo.FindByID(7)        │
│  2. Verifica regra: price > 0? ✅            │
│  3. Atualiza o campo: product.Price = 150.00 │
│  4. Persiste: repo.Update(product)           │
│  5. Retorna: product, nil                    │
└───────────────────┬──────────────────────────┘
                    │  FindByID(7) / Update(product)
                    ▼
┌──────────────────────────────────────────────┐
│  REPOSITORY                                  │
│                                              │
│  FindByID(7):                                │
│    SELECT * FROM products WHERE id = 7       │
│    Retorna: &product, nil                    │
│                                              │
│  Update(product):                            │
│    UPDATE products SET price=150 WHERE id=7  │
│    Retorna: nil (sucesso)                    │
└───────────────────┬──────────────────────────┘
                    │
                    ▼
              [ SQLite / Banco ]
```

O caminho de volta:

```
              [ SQLite / Banco ]
                    │
                    ▼
         Repository retorna product
                    │
                    ▼
         Service retorna product, nil
                    │
                    ▼
    Handler recebe product, sem erro
    Handler chama: c.JSON(200, product)
                    │
                    ▼
              Cliente recebe:
              HTTP 200 + JSON do produto atualizado
```

---

### 3.4 O caminho do erro

Agora o mesmo cenário, mas o cliente envia `{"price": -10.00}`:

```
Cliente HTTP
    │
    │  PATCH /products/7  {"price": -10.00}
    ▼
HANDLER
    │  Passa para o service (validação de negócio não é responsabilidade do handler)
    ▼
SERVICE
    │  Verifica: price > 0? ❌
    │  Retorna: nil, ErrPriceCannotBeZero
    ▼
HANDLER
    │  Recebe o erro
    │  errors.Is(err, ErrPriceCannotBeZero) → true
    │  Responde: c.JSON(400, {"error": "preço não pode ser zero ou negativo"})
    ▼
Cliente recebe:
HTTP 400 + mensagem de erro
```

Observe: o Repository **nunca foi chamado**. A regra de negócio barrou a operação antes de qualquer acesso ao banco. Isso é eficiência e correção ao mesmo tempo.

---

### 3.5 O que atravessa cada fronteira

As camadas não trocam qualquer tipo de dado entre si — existem convenções sobre **o que pode cruzar cada fronteira**.

```
                                          O que cruza a fronteira
                                         ┌──────────────────────┐
  Cliente HTTP ──────────────────────►   │ JSON bruto (string)  │
                                         └──────────────────────┘
                                                    │
                                                    ▼
                                         ┌──────────────────────┐
  Handler ──────────────────────────►    │ DTO (struct Go)      │
                                         │ CreateProductRequest │
                                         └──────────────────────┘
                                                    │
                                                    ▼
                                         ┌──────────────────────┐
  Service ──────────────────────────►    │ Entidade de domínio  │
                                         │ Product              │
                                         └──────────────────────┘
                                                    │
                                                    ▼
                                         ┌──────────────────────┐
  Repository ───────────────────────►    │ Entidade de domínio  │
                                         │ + instruções SQL     │
                                         └──────────────────────┘
                                                    │
                                                    ▼
                                              [ Banco ]
```

**Regra:** JSON nunca entra no Service. SQL nunca sai do Repository. HTTP nunca aparece no domínio.

Cada fronteira é uma barreira de tradução intencional. Ao cruzá-la, os dados mudam de forma para refletir o que a camada seguinte precisa saber, nem mais, nem menos.

---

## 4. Por que esse design resiste ao tempo

### Cenário 1: Trocar SQLite por PostgreSQL

Somente `repository/product_repo.go` muda — a linha `sqlite.Open(...)` vira `postgres.Open(...)`. O Service não sabe que o banco mudou. O Handler não sabe que o banco mudou.

### Cenário 2: Adicionar uma nova regra de negócio

"Produtos com quantidade zero não podem ter o preço atualizado."

Somente `service/product_service.go` muda — uma linha de validação em `UpdateProduct`. Handler e Repository não são tocados.

### Cenário 3: Expor a mesma lógica via CLI além da API HTTP

Você cria um novo handler para CLI que lê argumentos da linha de comando em vez de JSON. Ele chama o mesmo `ProductService`. A lógica de negócio e a camada de dados não mudam nada.

### Cenário 4: Escrever testes automatizados

Você substitui o `ProductRepository` real por uma implementação em memória. O Service é testado com velocidade máxima, sem banco, sem servidor. Cada regra de negócio pode ter seu próprio teste isolado.

---

## 5. Síntese

| Camada | Pergunta que responde | Conhece | Não conhece |
|--------|-----------------------|---------|-------------|
| Handler | Como responder esta requisição? | HTTP, JSON, DTOs, Service | Banco, SQL, regras de negócio |
| Service | O que pode e o que não pode ser feito? | Domínio, Repository (via interface) | HTTP, JSON, SQL |
| Repository | Como persistir e recuperar dados? | Banco, GORM/SQL, Entidades | HTTP, regras de negócio |
| Domain | O que existe neste sistema? | Apenas tipos Go puros | HTTP, banco, frameworks |

A comunicação entre camadas segue uma direção única: **de cima para baixo**. O Handler chama o Service; o Service chama o Repository. Nenhuma camada chama a camada acima dela. Essa direcionalidade é o que torna o sistema previsível.

A troca de informações entre camadas usa **DTOs na entrada** (para proteger o domínio de dados externos) e **entidades do domínio internamente** (para carregar o estado real do negócio). Os erros sobem na direção contrária, do Repository para o Service, do Service para o Handler, cada camada traduzindo o erro para o vocabulário da camada seguinte.

Clean Code não é uma técnica. É um compromisso com as pessoas que vão trabalhar no código depois de você, incluindo você mesmo.
