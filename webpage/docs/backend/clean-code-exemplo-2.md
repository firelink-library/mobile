---
sidebar_position: 3
title: Segunda Aplicação
slug: /backend/exemplo2
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Clean Code na Prática: Backend To-Do List em Go

> **Módulo:** Desenvolvimento Mobile — Backend com boas práticas  
> **Objetivo:** Construir um backend RESTful para uma aplicação to-do list aplicando os princípios de Clean Code, com documentação Swagger e arquitetura orientada à manutenibilidade.

---

## 1. Por que Clean Code?

Código funciona. Código limpo **dura**.

Robert C. Martin (Uncle Bob) define Clean Code como código que qualquer desenvolvedor consegue ler, entender e modificar sem medo. No contexto mobile, o backend precisa ser:

- **Legível**: outro dev (ou você em 6 meses) entende sem perguntar
- **Testável**: cada parte pode ser verificada isoladamente
- **Extensível**: novas features não quebram o que já existe
- **Documentado**: contratos claros para quem consome a API

Os três princípios centrais que usaremos ao longo deste guia:

| Princípio | O que significa |
|-----------|----------------|
| **Nomes significativos** | Variáveis, funções e tipos comunicam intenção |
| **Funções pequenas** | Cada função faz uma coisa só |
| **Separação de responsabilidades** | Camadas bem definidas (handler → service → repository) |

---

## 2. Requisitos da Aplicação

### 2.1 Requisitos Funcionais (RF)

| ID | Requisito |
|----|-----------|
| RF01 | Criar uma tarefa com título, descrição e status |
| RF02 | Listar todas as tarefas do usuário |
| RF03 | Buscar uma tarefa por ID |
| RF04 | Atualizar título, descrição ou status de uma tarefa |
| RF05 | Deletar uma tarefa |
| RF06 | Filtrar tarefas por status (`pending`, `done`) |

### 2.2 Requisitos Não Funcionais (RNF)

| ID | Requisito |
|----|-----------|
| RNF01 | API RESTful com contratos documentados via Swagger (OpenAPI 3.0) |
| RNF02 | Respostas em JSON com códigos HTTP semânticos |
| RNF03 | Arquitetura em camadas (Handler / Service / Repository) |
| RNF04 | Código organizado seguindo princípios de Clean Code |
| RNF05 | Banco SQLite para facilitar execução local em sala de aula |
| RNF06 | Variáveis de ambiente para configuração (porta, DB path) |

---

## 3. Arquitetura do Projeto

Vamos usar uma arquitetura em **3 camadas**, inspirada no padrão Repository. Cada camada tem uma responsabilidade única:

```
┌─────────────────────────────────────────┐
│              HTTP Request               │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│   Handler (routes/)                     │  ← recebe, valida, responde
│   Converte HTTP → domínio               │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│   Service (service/)                    │  ← regras de negócio
│   Orquestra operações                   │
└─────────────────┬───────────────────────┘
                  ▼
┌─────────────────────────────────────────┐
│   Repository (repository/)              │  ← acesso ao banco
│   Isola persistência                    │
└─────────────────────────────────────────┘
```

### Estrutura de pastas

```
todo-api/
├── main.go
├── .env
├── config/
│   └── config.go          # carrega variáveis de ambiente
├── domain/
│   └── task.go            # entidade central + DTOs
├── repository/
│   └── task_repository.go # acesso ao banco (GORM)
├── service/
│   └── task_service.go    # regras de negócio
├── handler/
│   └── task_handler.go    # controllers HTTP (Gin)
├── router/
│   └── router.go          # registro de rotas + Swagger
└── docs/                  # gerado pelo swag
```

---

## 4. Setup do Ambiente Go

### 4.1 Instalar Go

Baixe em https://go.dev/dl/ e verifique:

```bash
go version
# go version go1.22.x ...
```

### 4.2 Criar o projeto

```bash
mkdir todo-api && cd todo-api
go mod init github.com/seu-usuario/todo-api
```

### 4.3 Instalar dependências

```bash
# Framework HTTP
go get github.com/gin-gonic/gin

# ORM
go get gorm.io/gorm
go get gorm.io/driver/sqlite

# Variáveis de ambiente
go get github.com/joho/godotenv

# Swagger
go install github.com/swaggo/swag/cmd/swag@latest
go get github.com/swaggo/gin-swagger
go get github.com/swaggo/files
```

---

## 5. Implementação Passo a Passo

### 5.1 Domínio — `domain/task.go`

O domínio define **o que é uma tarefa** para o sistema. É o coração da aplicação e não depende de nenhuma outra camada.

```go
package domain

import "time"

// TaskStatus restringe os valores válidos para o status de uma tarefa.
// Usar um tipo nomeado em vez de string pura comunica intenção e previne erros.
type TaskStatus string

const (
    StatusPending TaskStatus = "pending"
    StatusDone    TaskStatus = "done"
)

// Task é a entidade central da aplicação.
// As tags `gorm` mapeiam para o banco; as tags `json` controlam a serialização.
type Task struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    Title       string     `gorm:"not null"   json:"title"`
    Description string     `                  json:"description"`
    Status      TaskStatus `gorm:"default:pending" json:"status"`
    CreatedAt   time.Time  `                  json:"created_at"`
    UpdatedAt   time.Time  `                  json:"updated_at"`
}

// CreateTaskRequest é o DTO de entrada para criação.
// Separar DTO da entidade evita que detalhes do banco vazem para a API.
type CreateTaskRequest struct {
    Title       string `json:"title"       binding:"required,min=3"`
    Description string `json:"description"`
}

// UpdateTaskRequest é o DTO de entrada para atualização parcial.
// Ponteiros permitem distinguir "campo não enviado" de "campo vazio".
type UpdateTaskRequest struct {
    Title       *string     `json:"title"`
    Description *string     `json:"description"`
    Status      *TaskStatus `json:"status"`
}
```

> **Clean Code em ação:** `TaskStatus` como tipo nomeado impede que alguém passe `"feito"` ou `"concluido"` acidentalmente. O compilador vira seu aliado.

---

### 5.2 Config — `config/config.go`

```go
package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    Port   string
    DBPath string
}

// Load lê variáveis de ambiente e retorna a configuração da aplicação.
// Valores padrão garantem que o servidor sobe mesmo sem .env.
func Load() Config {
    if err := godotenv.Load(); err != nil {
        log.Println("Arquivo .env não encontrado, usando variáveis do sistema")
    }

    return Config{
        Port:   getEnvOrDefault("PORT", "8080"),
        DBPath: getEnvOrDefault("DB_PATH", "./todo.db"),
    }
}

func getEnvOrDefault(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}
```

Arquivo `.env`:

```env
PORT=8080
DB_PATH=./todo.db
```

---

### 5.3 Repository — `repository/task_repository.go`

A camada de repositório isola completamente o acesso ao banco. Se amanhã trocarmos SQLite por PostgreSQL, apenas esta camada muda.

> **Antes (código sujo):** lógica de banco misturada ao handler

```go
// ❌ NÃO FAÇA: handler conhece o banco diretamente
func GetTask(c *gin.Context) {
    id := c.Param("id")
    var task Task
    db.Where("id = ?", id).First(&task)  // acoplamento direto!
    c.JSON(200, task)
}
```

> **Depois (Clean Code):** handler não sabe que banco existe

```go
package repository

import (
    "github.com/seu-usuario/todo-api/domain"
    "gorm.io/gorm"
)

// TaskRepository define o contrato de acesso a dados.
// Usar uma interface aqui permite substituir a implementação em testes.
type TaskRepository interface {
    Create(task *domain.Task) error
    FindAll(status string) ([]domain.Task, error)
    FindByID(id uint) (*domain.Task, error)
    Update(task *domain.Task) error
    Delete(id uint) error
}

// taskRepositoryImpl é a implementação concreta com GORM.
// O prefixo minúsculo indica que não deve ser instanciado fora do pacote.
type taskRepositoryImpl struct {
    db *gorm.DB
}

// NewTaskRepository é o construtor — única forma de obter uma instância.
func NewTaskRepository(db *gorm.DB) TaskRepository {
    return &taskRepositoryImpl{db: db}
}

func (r *taskRepositoryImpl) Create(task *domain.Task) error {
    return r.db.Create(task).Error
}

func (r *taskRepositoryImpl) FindAll(status string) ([]domain.Task, error) {
    var tasks []domain.Task
    query := r.db.Model(&domain.Task{})

    if status != "" {
        query = query.Where("status = ?", status)
    }

    err := query.Order("created_at desc").Find(&tasks).Error
    return tasks, err
}

func (r *taskRepositoryImpl) FindByID(id uint) (*domain.Task, error) {
    var task domain.Task
    err := r.db.First(&task, id).Error
    if err != nil {
        return nil, err
    }
    return &task, nil
}

func (r *taskRepositoryImpl) Update(task *domain.Task) error {
    return r.db.Save(task).Error
}

func (r *taskRepositoryImpl) Delete(id uint) error {
    return r.db.Delete(&domain.Task{}, id).Error
}
```

---

### 5.4 Service — `service/task_service.go`

O service contém as **regras de negócio**. Ele não sabe nada de HTTP nem de banco de dados — só de tarefas.

```go
package service

import (
    "errors"

    "github.com/seu-usuario/todo-api/domain"
    "github.com/seu-usuario/todo-api/repository"
    "gorm.io/gorm"
)

var (
    ErrTaskNotFound    = errors.New("tarefa não encontrada")
    ErrInvalidStatus   = errors.New("status inválido: use 'pending' ou 'done'")
)

// TaskService define o contrato de negócio.
type TaskService interface {
    CreateTask(req domain.CreateTaskRequest) (*domain.Task, error)
    ListTasks(status string) ([]domain.Task, error)
    GetTask(id uint) (*domain.Task, error)
    UpdateTask(id uint, req domain.UpdateTaskRequest) (*domain.Task, error)
    DeleteTask(id uint) error
}

type taskServiceImpl struct {
    repo repository.TaskRepository
}

func NewTaskService(repo repository.TaskRepository) TaskService {
    return &taskServiceImpl{repo: repo}
}

func (s *taskServiceImpl) CreateTask(req domain.CreateTaskRequest) (*domain.Task, error) {
    task := &domain.Task{
        Title:       req.Title,
        Description: req.Description,
        Status:      domain.StatusPending,
    }
    if err := s.repo.Create(task); err != nil {
        return nil, err
    }
    return task, nil
}

func (s *taskServiceImpl) ListTasks(status string) ([]domain.Task, error) {
    if status != "" && !isValidStatus(status) {
        return nil, ErrInvalidStatus
    }
    return s.repo.FindAll(status)
}

func (s *taskServiceImpl) GetTask(id uint) (*domain.Task, error) {
    task, err := s.repo.FindByID(id)
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, ErrTaskNotFound
    }
    return task, err
}

func (s *taskServiceImpl) UpdateTask(id uint, req domain.UpdateTaskRequest) (*domain.Task, error) {
    task, err := s.GetTask(id)
    if err != nil {
        return nil, err
    }

    // Atualiza apenas os campos enviados (PATCH semântico)
    if req.Title != nil {
        task.Title = *req.Title
    }
    if req.Description != nil {
        task.Description = *req.Description
    }
    if req.Status != nil {
        if !isValidStatus(string(*req.Status)) {
            return nil, ErrInvalidStatus
        }
        task.Status = *req.Status
    }

    if err := s.repo.Update(task); err != nil {
        return nil, err
    }
    return task, nil
}

func (s *taskServiceImpl) DeleteTask(id uint) error {
    if _, err := s.GetTask(id); err != nil {
        return err
    }
    return s.repo.Delete(id)
}

// isValidStatus é uma função auxiliar privada — pequena, com nome que diz o que faz.
func isValidStatus(status string) bool {
    return status == string(domain.StatusPending) || status == string(domain.StatusDone)
}
```

> **Clean Code em ação:** `ErrTaskNotFound` e `ErrInvalidStatus` são erros nomeados. O handler não precisa comparar strings — usa `errors.Is()` e toma a decisão HTTP correta.

---

### 5.5 Handler — `handler/task_handler.go`

O handler é o tradutor entre HTTP e domínio. Valida entrada, chama o service, mapeia erros para status HTTP.

```go
package handler

import (
    "errors"
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "github.com/seu-usuario/todo-api/domain"
    "github.com/seu-usuario/todo-api/service"
)

// TaskHandler agrupa os handlers relacionados a tarefas.
type TaskHandler struct {
    svc service.TaskService
}

func NewTaskHandler(svc service.TaskService) *TaskHandler {
    return &TaskHandler{svc: svc}
}

// errorResponse é um helper que evita repetição de c.JSON + map[string]string.
func errorResponse(c *gin.Context, status int, message string) {
    c.JSON(status, gin.H{"error": message})
}

// @Summary      Criar tarefa
// @Description  Cria uma nova tarefa com título e descrição
// @Tags         tasks
// @Accept       json
// @Produce      json
// @Param        body  body      domain.CreateTaskRequest  true  "Dados da tarefa"
// @Success      201   {object}  domain.Task
// @Failure      400   {object}  map[string]string
// @Router       /tasks [post]
func (h *TaskHandler) Create(c *gin.Context) {
    var req domain.CreateTaskRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        errorResponse(c, http.StatusBadRequest, err.Error())
        return
    }

    task, err := h.svc.CreateTask(req)
    if err != nil {
        errorResponse(c, http.StatusInternalServerError, err.Error())
        return
    }

    c.JSON(http.StatusCreated, task)
}

// @Summary      Listar tarefas
// @Description  Retorna todas as tarefas; filtra por status se fornecido
// @Tags         tasks
// @Produce      json
// @Param        status  query     string  false  "Filtrar por status (pending|done)"
// @Success      200     {array}   domain.Task
// @Failure      400     {object}  map[string]string
// @Router       /tasks [get]
func (h *TaskHandler) List(c *gin.Context) {
    status := c.Query("status")

    tasks, err := h.svc.ListTasks(status)
    if err != nil {
        if errors.Is(err, service.ErrInvalidStatus) {
            errorResponse(c, http.StatusBadRequest, err.Error())
            return
        }
        errorResponse(c, http.StatusInternalServerError, err.Error())
        return
    }

    c.JSON(http.StatusOK, tasks)
}

// @Summary      Buscar tarefa
// @Description  Retorna uma tarefa pelo ID
// @Tags         tasks
// @Produce      json
// @Param        id   path      int  true  "ID da tarefa"
// @Success      200  {object}  domain.Task
// @Failure      404  {object}  map[string]string
// @Router       /tasks/{id} [get]
func (h *TaskHandler) GetByID(c *gin.Context) {
    id, err := parseID(c)
    if err != nil {
        errorResponse(c, http.StatusBadRequest, "ID inválido")
        return
    }

    task, err := h.svc.GetTask(id)
    if err != nil {
        if errors.Is(err, service.ErrTaskNotFound) {
            errorResponse(c, http.StatusNotFound, err.Error())
            return
        }
        errorResponse(c, http.StatusInternalServerError, err.Error())
        return
    }

    c.JSON(http.StatusOK, task)
}

// @Summary      Atualizar tarefa
// @Description  Atualiza parcialmente uma tarefa (PATCH)
// @Tags         tasks
// @Accept       json
// @Produce      json
// @Param        id    path      int                       true  "ID da tarefa"
// @Param        body  body      domain.UpdateTaskRequest  true  "Campos a atualizar"
// @Success      200   {object}  domain.Task
// @Failure      400   {object}  map[string]string
// @Failure      404   {object}  map[string]string
// @Router       /tasks/{id} [patch]
func (h *TaskHandler) Update(c *gin.Context) {
    id, err := parseID(c)
    if err != nil {
        errorResponse(c, http.StatusBadRequest, "ID inválido")
        return
    }

    var req domain.UpdateTaskRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        errorResponse(c, http.StatusBadRequest, err.Error())
        return
    }

    task, err := h.svc.UpdateTask(id, req)
    if err != nil {
        status := http.StatusInternalServerError
        if errors.Is(err, service.ErrTaskNotFound) {
            status = http.StatusNotFound
        } else if errors.Is(err, service.ErrInvalidStatus) {
            status = http.StatusBadRequest
        }
        errorResponse(c, status, err.Error())
        return
    }

    c.JSON(http.StatusOK, task)
}

// @Summary      Deletar tarefa
// @Description  Remove uma tarefa pelo ID
// @Tags         tasks
// @Produce      json
// @Param        id   path  int  true  "ID da tarefa"
// @Success      204
// @Failure      404  {object}  map[string]string
// @Router       /tasks/{id} [delete]
func (h *TaskHandler) Delete(c *gin.Context) {
    id, err := parseID(c)
    if err != nil {
        errorResponse(c, http.StatusBadRequest, "ID inválido")
        return
    }

    if err := h.svc.DeleteTask(id); err != nil {
        if errors.Is(err, service.ErrTaskNotFound) {
            errorResponse(c, http.StatusNotFound, err.Error())
            return
        }
        errorResponse(c, http.StatusInternalServerError, err.Error())
        return
    }

    c.Status(http.StatusNoContent)
}

// parseID é um helper privado que extrai e converte o parâmetro :id da URL.
// Isolar conversões de tipo em helpers reduz duplicação e centraliza erros.
func parseID(c *gin.Context) (uint, error) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 64)
    return uint(id), err
}
```

---

### 5.6 Router — `router/router.go`

```go
package router

import (
    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
    "github.com/seu-usuario/todo-api/handler"

    _ "github.com/seu-usuario/todo-api/docs" // importa docs gerados pelo swag
)

// Setup registra todas as rotas e retorna o engine configurado.
func Setup(taskHandler *handler.TaskHandler) *gin.Engine {
    r := gin.Default()

    // Documentação Swagger acessível em /swagger/index.html
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    v1 := r.Group("/api/v1")
    {
        tasks := v1.Group("/tasks")
        {
            tasks.POST("", taskHandler.Create)
            tasks.GET("", taskHandler.List)
            tasks.GET("/:id", taskHandler.GetByID)
            tasks.PATCH("/:id", taskHandler.Update)
            tasks.DELETE("/:id", taskHandler.Delete)
        }
    }

    return r
}
```

---

### 5.7 Main — `main.go`

O `main.go` é o **ponto de composição**: monta todas as peças sem conter lógica de negócio.

```go
// @title           To-Do API
// @version         1.0
// @description     Backend RESTful para aplicação to-do list — exemplo de Clean Code em Go
// @host            localhost:8080
// @BasePath        /api/v1
package main

import (
    "log"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"

    "github.com/seu-usuario/todo-api/config"
    "github.com/seu-usuario/todo-api/domain"
    "github.com/seu-usuario/todo-api/handler"
    "github.com/seu-usuario/todo-api/repository"
    "github.com/seu-usuario/todo-api/router"
    "github.com/seu-usuario/todo-api/service"
)

func main() {
    // 1. Configuração
    cfg := config.Load()

    // 2. Banco de dados
    db := connectDatabase(cfg.DBPath)

    // 3. Injeção de dependências (manual, sem framework)
    taskRepo    := repository.NewTaskRepository(db)
    taskSvc     := service.NewTaskService(taskRepo)
    taskHandler := handler.NewTaskHandler(taskSvc)

    // 4. Rotas
    r := router.Setup(taskHandler)

    // 5. Start
    log.Printf("Servidor rodando em http://localhost:%s", cfg.Port)
    log.Printf("Swagger em     http://localhost:%s/swagger/index.html", cfg.Port)

    if err := r.Run(":" + cfg.Port); err != nil {
        log.Fatal("Erro ao iniciar servidor:", err)
    }
}

func connectDatabase(path string) *gorm.DB {
    db, err := gorm.Open(sqlite.Open(path), &gorm.Config{})
    if err != nil {
        log.Fatal("Falha ao conectar ao banco:", err)
    }

    // AutoMigrate cria/atualiza a tabela automaticamente
    if err := db.AutoMigrate(&domain.Task{}); err != nil {
        log.Fatal("Falha na migração:", err)
    }

    return db
}
```

---

## 6. Gerando a Documentação Swagger

Com os comentários `// @...` nos handlers, o `swag` gera a documentação automaticamente:

```bash
# Gerar os arquivos em docs/
swag init

# Rodar o servidor
go run main.go
```

Acesse `http://localhost:8080/swagger/index.html` para ver a documentação interativa.

### Exemplo de contrato documentado

O Swagger expõe automaticamente os endpoints com seus schemas:

```
POST   /api/v1/tasks         → cria tarefa
GET    /api/v1/tasks         → lista tarefas (query: ?status=pending)
GET    /api/v1/tasks/{id}    → busca por ID
PATCH  /api/v1/tasks/{id}    → atualização parcial
DELETE /api/v1/tasks/{id}    → remove tarefa
```

O front mobile deve respeitar estes contratos. Qualquer mudança no backend deve ser refletida no Swagger antes de ser implementada — documentação como acordo de equipe.

---

## 7. Testando a API

```bash
# Criar tarefa
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Clean Code", "description": "Ler Uncle Bob"}'

# Listar todas
curl http://localhost:8080/api/v1/tasks

# Filtrar por status
curl "http://localhost:8080/api/v1/tasks?status=pending"

# Atualizar status
curl -X PATCH http://localhost:8080/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'

# Deletar
curl -X DELETE http://localhost:8080/api/v1/tasks/1
```

---

## 8. Resumo dos Princípios Aplicados

| Princípio | Onde aplicamos |
|-----------|---------------|
| Nomes que comunicam intenção | `TaskStatus`, `ErrTaskNotFound`, `isValidStatus()`, `parseID()` |
| Funções pequenas e focadas | Cada função do service/repository faz exatamente uma coisa |
| Separação de responsabilidades | Handler ↔ Service ↔ Repository: nenhuma camada ultrapassa sua fronteira |
| DTOs separados da entidade | `CreateTaskRequest` / `UpdateTaskRequest` isolam a API do banco |
| Erros nomeados e tipados | `errors.Is()` no handler sem comparar strings |
| Injeção de dependência | Interfaces + construtores: fácil de testar e trocar implementações |
| Configuração externalizada | `.env` + valores padrão no `config.Load()` |

---

## 9. Próximos Passos (Extensões para a turma)

- **Autenticação:** adicionar middleware JWT sem mudar handlers ou services
- **Testes unitários:** mockar `TaskRepository` e testar o service isoladamente
- **Paginação:** adicionar `page` e `limit` na listagem sem quebrar o contrato
- **Soft delete:** campo `deleted_at` com GORM — nenhuma camada superior precisa saber
- **Docker:** `Dockerfile` + `docker-compose` para ambiente reproduzível

Cada extensão demonstra que uma arquitetura limpa absorve mudanças sem cascata de efeitos colaterais — esse é o verdadeiro valor do Clean Code.
