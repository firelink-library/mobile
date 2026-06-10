---
sidebar_position: 5
title: Exercícios Rede com SwiftUI
sidebar_label: Exercícios Rede com SwiftUI
slug: /swift/swiftui-03
---

## Exercícios com Rede 


### Exercício 11: API HTTP com SwiftUI — Envio de Dados com POST

**Tópico:** Comunicação HTTP, `URLSession`, JSON e `async/await`

---

## Objetivo do exercício

Criar uma tela em SwiftUI capaz de enviar dados para uma API utilizando uma requisição HTTP do tipo `POST`.

Ao final da atividade, você deverá compreender:

- como criar um modelo Swift para envio de dados;
- como transformar um objeto Swift em JSON;
- como configurar uma requisição HTTP;
- como enviar dados usando `URLSession`;
- como tratar erros de rede;
- como decodificar a resposta da API;
- como atualizar a interface com o resultado da operação.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `URLSession`
- `URLRequest`
- `POST`
- `Encodable`
- `Decodable`
- `Codable`
- `JSONEncoder`
- `JSONDecoder`
- `async/await`
- `Task`
- Tratamento de erros

:::

---

## O que é uma requisição POST?

Uma requisição `POST` é utilizada quando o aplicativo precisa enviar dados para um servidor.

Exemplos comuns:

- cadastrar um usuário;
- criar uma postagem;
- enviar um formulário;
- registrar uma compra;
- salvar uma avaliação;
- enviar dados para uma API.

Diferente de uma requisição `GET`, que normalmente apenas busca dados, o `POST` envia informações no corpo da requisição.

---

## Fluxo da comunicação

O fluxo de envio de dados pode ser entendido assim:

```text
Objeto Swift
   ↓
JSONEncoder
   ↓
JSON em formato Data
   ↓
URLRequest com método POST
   ↓
URLSession envia para a API
   ↓
Servidor responde
   ↓
JSONDecoder transforma a resposta em objeto Swift
```

---

## Modelos de dados

Primeiro, criamos o modelo que será enviado para a API.

```swift
struct NewPost: Encodable {
    let title: String
    let body: String
    let userId: Int
}
```

Como esse modelo será transformado em JSON, ele precisa conformar com `Encodable`.

Também criamos o modelo da resposta esperada.

```swift
struct CreatedPost: Decodable {
    let id: Int
    let title: String
    let body: String
    let userId: Int
}
```

Como esse modelo será criado a partir de um JSON recebido da API, ele precisa conformar com `Decodable`.

---

## Código-base aprimorado

```swift
import SwiftUI

struct NewPost: Encodable {
    let title: String
    let body: String
    let userId: Int
}

struct CreatedPost: Decodable {
    let id: Int
    let title: String
    let body: String
    let userId: Int
}

struct PostSenderView: View {

    @State private var isSending = false
    @State private var serverResponse = "Aguardando envio."

    let apiURL = "https://jsonplaceholder.typicode.com/posts"

    var body: some View {

        VStack(spacing: 20) {

            Text("Envio de Dados")
                .font(.title)
                .fontWeight(.bold)

            Text(serverResponse)
                .font(.headline)
                .multilineTextAlignment(.center)
                .padding()
                .background(Color.yellow.opacity(0.2))
                .cornerRadius(8)

            Button {
                Task {
                    await sendData()
                }
            } label: {
                if isSending {
                    ProgressView()
                } else {
                    Text("Enviar Post para a API")
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(isSending)
        }
        .padding()
    }

    func sendData() async {

        isSending = true
        serverResponse = "Enviando dados..."

        let newPost = NewPost(
            title: "Título criado pelo app",
            body: "Este post foi criado via SwiftUI e URLSession.",
            userId: 1
        )

        guard let url = URL(string: apiURL) else {
            serverResponse = "URL inválida."
            isSending = false
            return
        }

        do {
            let jsonData = try JSONEncoder().encode(newPost)

            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue(
                "application/json",
                forHTTPHeaderField: "Content-Type"
            )
            request.httpBody = jsonData

            let (data, response) = try await URLSession.shared.data(
                for: request
            )

            guard let httpResponse = response as? HTTPURLResponse else {
                serverResponse = "Resposta inválida do servidor."
                isSending = false
                return
            }

            guard (200...299).contains(httpResponse.statusCode) else {
                serverResponse = "Erro HTTP: \(httpResponse.statusCode)"
                isSending = false
                return
            }

            let createdPost = try JSONDecoder().decode(
                CreatedPost.self,
                from: data
            )

            serverResponse = "Sucesso! Post criado com ID: \(createdPost.id)"

        } catch {
            serverResponse = "Erro: \(error.localizedDescription)"
        }

        isSending = false
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

A função `sendData()` executa o fluxo completo da requisição.

Ela:

1. cria um objeto Swift;
2. transforma esse objeto em JSON;
3. configura uma requisição `POST`;
4. define o cabeçalho `Content-Type`;
5. envia o JSON no corpo da requisição;
6. recebe a resposta da API;
7. verifica o código HTTP;
8. decodifica o JSON de resposta;
9. atualiza a interface.

:::

---

## Entendendo o JSONEncoder

O `JSONEncoder` transforma um objeto Swift em JSON.

```swift
let jsonData = try JSONEncoder().encode(newPost)
```

Objeto Swift:

```swift
NewPost(
    title: "Título",
    body: "Texto do post",
    userId: 1
)
```

JSON gerado:

```json
{
  "title": "Título",
  "body": "Texto do post",
  "userId": 1
}
```

---

## Entendendo o URLRequest

O `URLRequest` representa a requisição enviada ao servidor.

```swift
var request = URLRequest(url: url)
request.httpMethod = "POST"
```

Também informamos que o corpo da requisição será JSON.

```swift
request.setValue(
    "application/json",
    forHTTPHeaderField: "Content-Type"
)
```

E adicionamos o conteúdo no corpo da requisição.

```swift
request.httpBody = jsonData
```

---

## Entendendo o status HTTP

Nem toda resposta da API significa sucesso.

Por isso, verificamos o código HTTP:

```swift
guard (200...299).contains(httpResponse.statusCode) else {
    serverResponse = "Erro HTTP: \(httpResponse.statusCode)"
    return
}
```

Códigos comuns:

| Código | Significado |
|---|---|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Erro na requisição |
| 401 | Não autorizado |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Desafio

Modifique o exercício para permitir que o usuário digite os dados do post.

A tela deve conter:

1. Um `TextField` para o título;
2. Um `TextEditor` para o corpo do texto;
3. Um botão para enviar;
4. Validação para impedir envio vazio;
5. Exibição do ID retornado pela API.

---

## Solução do desafio

```swift
import SwiftUI

struct PostFormView: View {

    @State private var title = ""
    @State private var bodyText = ""
    @State private var status = "Preencha os dados do post."
    @State private var isSending = false

    let apiURL = "https://jsonplaceholder.typicode.com/posts"

    var body: some View {

        VStack(spacing: 20) {

            Text("Novo Post")
                .font(.title)
                .fontWeight(.bold)

            TextField("Título", text: $title)
                .textFieldStyle(.roundedBorder)

            TextEditor(text: $bodyText)
                .frame(height: 150)
                .border(Color.gray.opacity(0.4))

            Button("Enviar") {
                Task {
                    await sendPost()
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(isSending)

            Text(status)
                .font(.caption)
                .multilineTextAlignment(.center)
        }
        .padding()
    }

    func sendPost() async {

        guard !title.trimmingCharacters(in: .whitespaces).isEmpty else {
            status = "Informe um título."
            return
        }

        guard !bodyText.trimmingCharacters(in: .whitespaces).isEmpty else {
            status = "Informe o conteúdo."
            return
        }

        isSending = true
        status = "Enviando..."

        guard let url = URL(string: apiURL) else {
            status = "URL inválida."
            isSending = false
            return
        }

        let newPost = NewPost(
            title: title,
            body: bodyText,
            userId: 1
        )

        do {
            let data = try JSONEncoder().encode(newPost)

            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue(
                "application/json",
                forHTTPHeaderField: "Content-Type"
            )
            request.httpBody = data

            let (responseData, response) = try await URLSession.shared.data(
                for: request
            )

            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                status = "Erro na resposta do servidor."
                isSending = false
                return
            }

            let createdPost = try JSONDecoder().decode(
                CreatedPost.self,
                from: responseData
            )

            status = "Post criado com ID: \(createdPost.id)"

        } catch {
            status = "Erro: \(error.localizedDescription)"
        }

        isSending = false
    }
}
```

---

## Resultado esperado

Ao final do exercício, a aplicação deve:

- criar uma requisição HTTP `POST`;
- enviar um objeto Swift em formato JSON;
- receber a resposta da API;
- decodificar o JSON retornado;
- exibir uma mensagem de sucesso ou erro;
- bloquear o botão durante o envio.

---

## Relação com aplicações reais

Esse padrão aparece em praticamente qualquer aplicativo que se comunica com APIs.

Exemplos:

- login;
- cadastro;
- envio de formulário;
- criação de pedidos;
- registro de comentários;
- envio de avaliações;
- sincronização de dados.

:::warning Atenção

Neste exercício foi utilizada a API pública `jsonplaceholder.typicode.com`.

Ela simula a criação de dados, mas não salva as informações permanentemente.

Em uma API real, a resposta pode exigir autenticação, token, cabeçalhos adicionais e tratamento mais detalhado de erros.

:::

---

### Exercício 12: API HTTP com SwiftUI — Consulta de Dados com GET

**Tópico:** Consumo de APIs REST com `URLSession`

---

## Objetivo do exercício

Criar uma tela em SwiftUI capaz de consultar dados de uma API utilizando uma requisição HTTP do tipo `GET`.

Ao final da atividade, você deverá compreender:

- como consumir APIs REST;
- como realizar requisições HTTP `GET`;
- como utilizar `URLSession`;
- como transformar JSON em objetos Swift;
- como exibir dados recebidos da internet;
- como lidar com estados de carregamento;
- como tratar erros de rede.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `URLSession`
- `GET`
- `Codable`
- `Decodable`
- `JSONDecoder`
- `async/await`
- `Task`
- `List`
- Consumo de APIs REST

:::

---

## O que é uma requisição GET?

Uma requisição `GET` é utilizada para solicitar dados de um servidor.

Diferentemente do `POST`, que envia informações, o `GET` normalmente apenas consulta informações existentes.

Exemplos comuns:

- listar produtos;
- buscar usuários;
- consultar pedidos;
- carregar notícias;
- obter informações climáticas;
- recuperar dados de um banco de dados.

---

## Fluxo da comunicação

O fluxo de uma requisição GET pode ser representado assim:

```text
Aplicativo
    ↓
URL da API
    ↓
URLSession
    ↓
Servidor
    ↓
JSON
    ↓
JSONDecoder
    ↓
Objeto Swift
    ↓
Interface
```

---

## API utilizada

Neste exercício utilizaremos a API pública:

```text
https://jsonplaceholder.typicode.com/posts
```

Ela retorna uma lista de posts fictícios para testes.

Exemplo de resposta:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere",
    "body": "quia et suscipit..."
  }
]
```

---

## Modelo de dados

Primeiro criamos uma estrutura compatível com o JSON recebido.

```swift
struct Post: Codable, Identifiable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}
```

Como o JSON possui exatamente esses campos, o Swift consegue fazer o mapeamento automaticamente.

---

## Código-base

```swift
import SwiftUI

struct Post: Codable, Identifiable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}

struct GetPostsView: View {

    @State private var posts: [Post] = []
    @State private var isLoading = false
    @State private var errorMessage = ""

    var body: some View {

        NavigationStack {

            VStack {

                if isLoading {

                    ProgressView("Carregando...")
                        .padding()

                } else if !errorMessage.isEmpty {

                    Text(errorMessage)
                        .foregroundColor(.red)

                } else {

                    List(posts) { post in

                        VStack(alignment: .leading) {

                            Text(post.title)
                                .font(.headline)

                            Text(post.body)
                                .font(.caption)
                                .foregroundColor(.secondary)
                                .lineLimit(2)
                        }
                    }
                }

                Button("Carregar Posts") {

                    Task {
                        await fetchPosts()
                    }
                }
                .buttonStyle(.borderedProminent)
                .padding()
            }
            .navigationTitle("Posts")
        }
    }

    func fetchPosts() async {

        isLoading = true
        errorMessage = ""

        guard let url = URL(
            string: "https://jsonplaceholder.typicode.com/posts"
        ) else {

            errorMessage = "URL inválida."
            isLoading = false
            return
        }

        do {

            let (data, response) =
                try await URLSession.shared.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode)
            else {

                errorMessage = "Erro HTTP."
                isLoading = false
                return
            }

            posts = try JSONDecoder().decode(
                [Post].self,
                from: data
            )

        } catch {

            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O método principal é:

```swift
URLSession.shared.data(from: url)
```

Ele:

1. envia uma requisição GET;
2. aguarda a resposta;
3. retorna os dados recebidos;
4. retorna informações sobre a resposta HTTP.

Depois disso usamos:

```swift
JSONDecoder()
```

para transformar o JSON em objetos Swift.

:::

---

## Entendendo o JSONDecoder

Recebemos algo parecido com:

```json
{
  "id": 1,
  "title": "Meu Post"
}
```

E convertemos para:

```swift
let post = try JSONDecoder().decode(
    Post.self,
    from: data
)
```

O Swift preenche automaticamente as propriedades da estrutura.

---

## Trabalhando com Arrays

Observe que a API retorna uma lista.

Por isso utilizamos:

```swift
[Post].self
```

e não:

```swift
Post.self
```

Isso informa ao decoder que esperamos um array de posts.

---

## Exibindo os dados

SwiftUI facilita a exibição de coleções através de:

```swift
List(posts) { post in

}
```

Cada elemento do array gera automaticamente uma linha da lista.

---

## Desafio

Modifique o exercício para:

1. Buscar apenas um post;
2. Exibir o título em destaque;
3. Exibir o corpo completo;
4. Adicionar um botão para atualizar os dados;
5. Exibir o ID do post carregado.

---

## Solução do desafio

Utilize a rota:

```text
https://jsonplaceholder.typicode.com/posts/1
```

Modelo:

```swift
struct Post: Codable {
    let userId: Int
    let id: Int
    let title: String
    let body: String
}
```

Carregamento:

```swift
let (data, _) =
    try await URLSession.shared.data(from: url)

let post =
    try JSONDecoder().decode(Post.self, from: data)
```

Observe que agora utilizamos:

```swift
Post.self
```

porque a API retorna apenas um objeto.

---

## GET vs POST

| GET | POST |
|-------|--------|
| Busca dados | Envia dados |
| Não possui corpo normalmente | Possui corpo da requisição |
| Utilizado para leitura | Utilizado para criação |
| Mais comum para consultas | Mais comum para cadastros |

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

- como consumir APIs REST;
- como realizar requisições GET;
- como transformar JSON em objetos Swift;
- como exibir dados recebidos da internet;
- como trabalhar com listas de dados em SwiftUI.

---

## Relação com aplicações reais

Requisições GET aparecem praticamente em todas as aplicações modernas.

Exemplos:

- feed de redes sociais;
- lista de produtos;
- notícias;
- previsão do tempo;
- catálogo de filmes;
- agenda de compromissos;
- dashboards corporativos.

:::tip Próximo passo

Depois de dominar GET e POST, os próximos tópicos normalmente são:

- PUT
- PATCH
- DELETE
- Autenticação JWT
- Headers HTTP
- Upload de arquivos
- Consumo de APIs protegidas


:::

---

### Exercício 13: SwiftData — Salvando Dados Localmente

**Tópico:** Persistência local com `SwiftData`

---

## Objetivo do exercício

Criar uma tela SwiftUI capaz de salvar anotações localmente utilizando `SwiftData`.

Ao final da atividade, você deverá compreender:

- como criar um modelo persistente;
- como usar `@Model`;
- como inserir dados no banco local;
- como usar `modelContext`;
- como preparar uma aplicação SwiftUI para usar SwiftData.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `SwiftData`
- `@Model`
- `@Environment(\.modelContext)`
- `modelContext.insert`
- Persistência local
- Formulários simples

:::

---

## O que é SwiftData?

`SwiftData` é um framework usado para armazenar dados localmente no dispositivo.

Ele pode ser usado para salvar informações como:

- anotações;
- tarefas;
- favoritos;
- configurações mais complexas;
- registros criados pelo usuário;
- histórico de uso do app.

Diferente do `UserDefaults`, que é indicado para preferências simples, o `SwiftData` é mais adequado para dados estruturados.

---

## Criando o modelo

```swift
import SwiftData

@Model
class Note {
    var title: String
    var content: String

    init(title: String, content: String) {
        self.title = title
        self.content = content
    }
}
```

---

## Configurando o App

No arquivo principal do app, adicione o `modelContainer`.

```swift
import SwiftUI
import SwiftData

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            CreateNoteView()
        }
        .modelContainer(for: Note.self)
    }
}
```

---

## Código do exercício

```swift
import SwiftUI
import SwiftData

struct CreateNoteView: View {

    @Environment(\.modelContext) private var modelContext

    @State private var title: String = ""
    @State private var content: String = ""
    @State private var status: String = "Nenhuma anotação salva."

    var body: some View {

        VStack(spacing: 20) {

            Text("Nova Anotação")
                .font(.title)
                .fontWeight(.bold)

            TextField("Título", text: $title)
                .textFieldStyle(.roundedBorder)

            TextField("Conteúdo", text: $content)
                .textFieldStyle(.roundedBorder)

            Button("Salvar Anotação") {
                saveNote()
            }
            .buttonStyle(.borderedProminent)

            Text(status)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
    }

    func saveNote() {

        guard !title.isEmpty else {
            status = "Informe um título."
            return
        }

        guard !content.isEmpty else {
            status = "Informe um conteúdo."
            return
        }

        let newNote = Note(
            title: title,
            content: content
        )

        modelContext.insert(newNote)

        title = ""
        content = ""
        status = "Anotação salva com sucesso."
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `@Model` transforma a classe `Note` em um modelo persistente.

```swift
@Model
class Note
```

O `modelContext` representa o contexto usado para manipular os dados.

```swift
@Environment(\.modelContext) private var modelContext
```

Para salvar um novo objeto, usamos:

```swift
modelContext.insert(newNote)
```

Depois disso, o SwiftData se encarrega de persistir o dado localmente.

:::

---

## Resultado esperado

Ao final do exercício, o usuário deverá conseguir:

- digitar um título;
- digitar um conteúdo;
- salvar uma anotação;
- manter os dados armazenados localmente no app.

---

### Exercício 14: SwiftData — Listando e Removendo Dados

**Tópico:** Consulta e remoção de dados com `SwiftData`

---

## Objetivo do exercício

Criar uma tela que lista as anotações salvas com `SwiftData` e permite remover registros.

Ao final da atividade, você deverá compreender:

- como consultar dados salvos;
- como usar `@Query`;
- como exibir dados em uma `List`;
- como remover objetos persistidos;
- como criar uma tela simples de gerenciamento de dados.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `@Query`
- `List`
- `ForEach`
- `modelContext.delete`
- `NavigationStack`
- Remoção de dados
- Persistência local com SwiftData

:::

---

## Código do exercício

```swift
import SwiftUI
import SwiftData

struct NotesListView: View {

    @Environment(\.modelContext) private var modelContext

    @Query private var notes: [Note]

    var body: some View {

        NavigationStack {

            List {

                ForEach(notes) { note in

                    VStack(alignment: .leading, spacing: 8) {

                        Text(note.title)
                            .font(.headline)

                        Text(note.content)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .padding(.vertical, 4)
                }
                .onDelete(perform: deleteNotes)
            }
            .navigationTitle("Anotações")
        }
    }

    func deleteNotes(at offsets: IndexSet) {

        for index in offsets {
            let note = notes[index]
            modelContext.delete(note)
        }
    }
}
```

---

## Entendendo o @Query

O `@Query` busca automaticamente os dados salvos pelo SwiftData.

```swift
@Query private var notes: [Note]
```

Sempre que um novo item é inserido ou removido, a interface é atualizada automaticamente.

---

## Entendendo a remoção

A remoção é feita com:

```swift
modelContext.delete(note)
```

No exemplo, o método `deleteNotes` recebe os índices dos itens removidos pela `List`.

```swift
func deleteNotes(at offsets: IndexSet)
```

Isso permite usar o gesto padrão de deslizar para apagar no iOS.

---

## Versão com criação e listagem na mesma tela

```swift
import SwiftUI
import SwiftData

struct NotesAppView: View {

    @Environment(\.modelContext) private var modelContext

    @Query private var notes: [Note]

    @State private var title: String = ""
    @State private var content: String = ""

    var body: some View {

        NavigationStack {

            VStack(spacing: 16) {

                TextField("Título", text: $title)
                    .textFieldStyle(.roundedBorder)

                TextField("Conteúdo", text: $content)
                    .textFieldStyle(.roundedBorder)

                Button("Adicionar") {
                    addNote()
                }
                .buttonStyle(.borderedProminent)

                List {
                    ForEach(notes) { note in
                        VStack(alignment: .leading) {
                            Text(note.title)
                                .font(.headline)

                            Text(note.content)
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .onDelete(perform: deleteNotes)
                }
            }
            .padding()
            .navigationTitle("Minhas Notas")
        }
    }

    func addNote() {

        guard !title.isEmpty, !content.isEmpty else {
            return
        }

        let note = Note(
            title: title,
            content: content
        )

        modelContext.insert(note)

        title = ""
        content = ""
    }

    func deleteNotes(at offsets: IndexSet) {

        for index in offsets {
            modelContext.delete(notes[index])
        }
    }
}
```

---

## Resultado esperado

Ao final do exercício, a aplicação deverá permitir:

- criar anotações;
- salvar dados localmente;
- listar registros salvos;
- remover registros;
- atualizar a interface automaticamente.

---

## SwiftData vs UserDefaults

| Recurso | Melhor uso |
|---|---|
| `UserDefaults` | Preferências simples |
| `SwiftData` | Dados estruturados |
| `FileManager` | Arquivos, imagens, PDFs e textos |
| `Keychain` | Dados sensíveis |

:::tip Regra prática

Use `SwiftData` quando precisar armazenar objetos com estrutura própria.

Exemplos:

- tarefas;
- contatos;
- produtos;
- pedidos;
- anotações;
- favoritos.

:::