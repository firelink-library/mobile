---
sidebar_position: 2
title: Base de Swift
sidebar_label: Base de Swift
slug: /swift/lang
---

## Introdução a Linguagem Swift

Pessoal vamos dar uma olhada agora na nossa introdução ao Swift!

> `Mas Murilão, a introdução não tinha que vir antes?`

Excelente colocação! Eu esqueci! Então ela está vindo depois!


---

## 1. Tipos de Dados e Variáveis

Swift é uma linguagem de **tipagem forte**. Isso significa que você precisa declarar o tipo de dado, e o compilador garante que você não misture tipos incompatíveis (ex: não pode somar um texto com um número).

### `let` (Constantes)

Usado para valores fixos que não devem mudar. É a melhor prática inicial.

```swift
let PI = 3.14159
```

O valor de `PI` nunca poderá ser alterado.

### `var` (Variáveis Mutáveis)

Usado para dados que precisam ser alterados durante a execução do programa.

```swift
var counter = 0
counter = counter + 1
```

---

## 2. Tipos Primitivos Comuns

Os tipos básicos definem o que o dado representa:

- **Int:** Números inteiros (ex: 10, -5)
- **Double:** Números de ponto flutuante (ex: 3.14)
- **String:** Sequências de caracteres (texto)
- **Bool:** Estados lógicos: `true` ou `false`

---

## 3. Optionals: O Conceito Mais Importante do Swift

Um **Optional** (`?`) é um tipo de dado que pode conter um valor ou pode ser `nil`.

Isso resolve o problema de dados ausentes de forma segura, evitando que o programa tente acessar algo inexistente.

```swift
var optionalName: String?
```

O `?` indica que a variável pode conter um valor `String` ou `nil`.

### Desembrulhando um Optional

```swift
if let name = optionalName {
    print("Nome encontrado: \(name)")
} else {
    print("O nome é nil (não existe).")
}
```

:::info Por que usar Optionals?

Em vez de retornar um erro ou travar o aplicativo, você informa ao Swift que aquele valor pode não existir.

Isso força o desenvolvedor a tratar explicitamente o caso em que o valor é `nil`.

:::

:::tip Desembrulhando (Unwrapping)

Os mecanismos mais comuns para acessar o valor real de um Optional são:

### 1. `if let`

Usado quando você quer executar um bloco de código apenas se o valor existir.

```swift
var nome: String? = "João"

if let nomeSeguro = nome {
    print("Nome encontrado: \(nomeSeguro)")
} else {
    print("Nome não encontrado")
}
```

Saída:

```text
Nome encontrado: João
```

---

### 2. `guard let`

Muito utilizado dentro de funções para validar um valor logo no início e interromper a execução caso ele seja `nil`.

```swift
func exibirNome(_ nome: String?) {

    guard let nomeSeguro = nome else {
        print("Nome inválido")
        return
    }

    print("Olá, \(nomeSeguro)")
}

exibirNome("Maria")
```

Saída:

```text
Olá, Maria
```

---

### 3. Optional Chaining (`?.`)

Permite acessar propriedades ou métodos de um Optional sem precisar desembrulhá-lo explicitamente.

```swift
var nome: String? = "Carlos"

let quantidadeCaracteres = nome?.count

print(quantidadeCaracteres)
```

Saída:

```text
Optional(6)
```

Se `nome` for `nil`, o resultado será `nil` em vez de causar erro.

```swift
var nome: String? = nil

let quantidadeCaracteres = nome?.count

print(quantidadeCaracteres)
```

Saída:

```text
nil
```

---

### 4. Nil Coalescing (`??`)

Define um valor padrão caso o Optional seja `nil`.

```swift
var nome: String? = nil

let nomeExibicao = nome ?? "Usuário Anônimo"

print(nomeExibicao)
```

Saída:

```text
Usuário Anônimo
```

Outro exemplo:

```swift
let idade: Int? = nil

let idadeFinal = idade ?? 18

print(idadeFinal)
```

Saída:

```text
18
```

:::

Uma forma simples de explicar a diferença é:

| Recurso     | Quando usar                                          |
| ----------- | ---------------------------------------------------- |
| `if let`    | Executar código apenas se houver valor               |
| `guard let` | Validar um valor no início de uma função             |
| `?.`        | Acessar propriedades ou métodos de forma segura      |
| `??`        | Fornecer um valor padrão quando o Optional for `nil` |


---

## 4. Structs vs Classes

Em Swift, `structs` e `classes` são formas de criar tipos próprios. Ambas podem ter propriedades, métodos, inicializadores e conformar protocolos. A diferença principal está em **como os dados são armazenados e compartilhados na memória**.

Essa escolha influencia diretamente a arquitetura, a segurança e a previsibilidade do código.

---

### Structs: tipos de valor

Uma `struct` é um **tipo de valor**. Isso significa que, quando uma instância é atribuída a outra variável ou passada para uma função, o Swift trabalha como se estivesse criando uma cópia independente daquele valor.

```swift
struct Point {
    var x: Int
    var y: Int
}

var p1 = Point(x: 10, y: 20)
var p2 = p1

p2.x = 50

print(p1.x) // 10
print(p2.x) // 50
```

Nesse exemplo, alterar `p2` não altera `p1`, porque cada variável possui sua própria cópia dos dados.

:::tip Quando utilizar Structs

Utilize `structs` quando estiver representando dados simples, estados da interface ou modelos de domínio que não precisam ser compartilhados por referência.

:::

Exemplos comuns:

```swift
struct User {
    var name: String
    var email: String
}

struct Product {
    var title: String
    var price: Double
}

struct Coordinate {
    var latitude: Double
    var longitude: Double
}
```

Em Swift, muitos tipos importantes da biblioteca padrão são implementados como `structs`:

```swift
String
Int
Double
Bool
Array
Dictionary
Set
```

Isso demonstra que `structs` são amplamente utilizadas e fazem parte da filosofia da linguagem.

---

### Classes: tipos de referência

Uma `class` é um **tipo de referência**. Isso significa que, quando uma instância é atribuída a outra variável, as duas variáveis passam a apontar para o mesmo objeto na memória.

```swift
class Dog {
    var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("\(name) faz um som.")
    }
}

let dog1 = Dog(name: "Rex")
let dog2 = dog1

dog2.name = "Bolt"

print(dog1.name) // Bolt
print(dog2.name) // Bolt
```

Nesse caso, `dog1` e `dog2` referenciam o mesmo objeto. Qualquer alteração realizada por uma variável será percebida pela outra.

:::tip Quando utilizar Classes

Utilize `classes` quando precisar compartilhar um mesmo objeto entre diferentes partes da aplicação ou quando precisar de recursos como herança e gerenciamento de ciclo de vida.

:::

---

### Comparação direta

| Característica | Struct | Class |
|----------------|---------|---------|
| Tipo | Valor | Referência |
| Cópia | Cria uma nova instância | Compartilha a mesma instância |
| Herança | Não possui | Possui |
| Mutabilidade | Controlada com `var` e `mutating` | Objetos podem ser alterados por referência |
| Uso comum | Dados, modelos e estados | Serviços, controladores e objetos compartilhados |
| Inicializador automático | Sim (na maioria dos casos) | Não |

---

### Métodos que alteram Structs

Como `structs` são tipos de valor, métodos que alteram suas propriedades precisam ser marcados com a palavra-chave `mutating`.

```swift
struct Counter {
    var value: Int = 0

    mutating func increment() {
        value += 1
    }
}

var counter = Counter()
counter.increment()

print(counter.value) // 1
```

Sem o modificador `mutating`, o Swift impediria a alteração das propriedades da estrutura dentro do método.

:::info Importante

Métodos de leitura não precisam utilizar `mutating`. Esse modificador é necessário apenas quando houver alteração do estado interno da `struct`.

:::

---

### Herança em Classes

Classes permitem herança. Uma classe pode reutilizar comportamentos definidos em outra classe e especializá-los conforme necessário.

```swift
class Animal {
    var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("\(name) faz um som.")
    }
}

class Dog: Animal {
    override func makeSound() {
        print("\(name) late!")
    }
}

let dog = Dog(name: "Rex")
dog.makeSound()
```

Saída:

```text
Rex late!
```

A palavra-chave `override` indica que a implementação da classe filha substituirá a implementação herdada da classe pai.

:::warning Herança

Embora a herança seja uma funcionalidade poderosa, a comunidade Swift costuma preferir composição e protocolos sempre que possível. Isso reduz acoplamento e facilita testes e manutenção.

:::

---

### Identidade vs Igualdade

Outro conceito importante é a diferença entre identidade e igualdade.

Para `structs`, normalmente verificamos se os valores são iguais:

```swift
struct User {
    var name: String
}

let u1 = User(name: "Ana")
let u2 = User(name: "Ana")
```

Os dois objetos possuem os mesmos dados.

Já para `classes`, também podemos verificar se duas variáveis apontam para o mesmo objeto usando o operador `===`.

```swift
class User {
    var name: String

    init(name: String) {
        self.name = name
    }
}

let u1 = User(name: "Ana")
let u2 = u1

print(u1 === u2) // true
```

O operador `===` verifica identidade de referência, enquanto `==` verifica igualdade de valores.

---

### Regra prática

Em Swift, recomenda-se utilizar `struct` por padrão.

Migre para `class` apenas quando houver necessidade real de:

1. Herança;
2. Compartilhamento de estado;
3. Identidade única;
4. Controle de ciclo de vida do objeto.

Exemplo:

```swift
struct UserProfile {
    var name: String
    var age: Int
}

class SessionManager {
    var currentUser: UserProfile?

    func login(user: UserProfile) {
        currentUser = user
    }

    func logout() {
        currentUser = nil
    }
}
```

Nesse cenário:

- `UserProfile` representa apenas dados.
- `SessionManager` representa um serviço compartilhado por toda a aplicação.

---

### Resumo

:::tip Resumo rápido

- Prefira `struct` para representar dados e estados.
- Utilize `class` quando precisar compartilhar objetos ou utilizar herança.
- `structs` são copiadas por valor.
- `classes` são compartilhadas por referência.
- A escolha correta impacta diretamente a previsibilidade e manutenção do código.

:::

A distinção entre `structs` e `classes` é um dos conceitos mais importantes da linguagem Swift e influencia diretamente a forma como aplicações iOS são projetadas.

---

Acho que vale aprofundar bastante esses três tópicos porque eles são a base de praticamente tudo que o aluno fará depois em SwiftUI. Principalmente:

* Funções → usadas em toda a lógica da aplicação.
* Estruturas de decisão → usadas para renderização condicional em SwiftUI.
* Coleções → usadas em `List`, `ForEach` e manipulação de dados.

Uma estrutura nesse mesmo padrão do capítulo anterior poderia ficar assim:

---

## 5. Funções e Métodos

Funções são blocos reutilizáveis de código que executam uma tarefa específica.

Elas ajudam a evitar repetição de código, melhoram a organização da aplicação e tornam a manutenção mais simples.

Métodos são funções que pertencem a uma `struct`, `class` ou `enum`.

---

### Por que utilizar funções?

Imagine uma aplicação que precise calcular a média de notas de diversos alunos.

Sem funções:

```swift
let media1 = (8 + 7 + 9) / 3
let media2 = (10 + 8 + 7) / 3
let media3 = (6 + 5 + 9) / 3
```

Com funções:

```swift
func calcularMedia(n1: Int, n2: Int, n3: Int) -> Int {
    return (n1 + n2 + n3) / 3
}

let media1 = calcularMedia(n1: 8, n2: 7, n3: 9)
let media2 = calcularMedia(n1: 10, n2: 8, n3: 7)
let media3 = calcularMedia(n1: 6, n2: 5, n3: 9)
```

A lógica fica centralizada em um único local.

---

### Sintaxe básica

Uma função é composta por:

* Palavra-chave `func`
* Nome da função
* Lista de parâmetros
* Tipo de retorno (opcional)
* Corpo da função

```swift
func somar(a: Int, b: Int) -> Int {
    return a + b
}
```

Uso:

```swift
let resultado = somar(a: 5, b: 3)

print(resultado)
```

Saída:

```text
8
```

---

### Funções sem retorno

Nem toda função precisa retornar um valor.

```swift
func exibirMensagem() {
    print("Bem-vindo ao Swift!")
}

exibirMensagem()
```

Saída:

```text
Bem-vindo ao Swift!
```

Quando não existe retorno, o tipo `Void` é assumido automaticamente.

---

### Múltiplos parâmetros

Funções podem receber diversos parâmetros.

```swift
func apresentar(nome: String, idade: Int) {
    print("Nome: \(nome)")
    print("Idade: \(idade)")
}

apresentar(nome: "Maria", idade: 25)
```

---

### Retornando valores

Funções podem produzir resultados para serem utilizados em outras partes do programa.

```swift
func quadrado(numero: Int) -> Int {
    return numero * numero
}

let resultado = quadrado(numero: 5)

print(resultado)
```

Saída:

```text
25
```

---

### Métodos

Métodos são funções definidas dentro de tipos.

```swift
struct Calculadora {

    func somar(a: Int, b: Int) -> Int {
        return a + b
    }
}
```

Uso:

```swift
let calc = Calculadora()

print(calc.somar(a: 10, b: 20))
```

Saída:

```text
30
```

---

### Métodos que modificam Structs

Quando um método altera propriedades internas de uma `struct`, ele deve utilizar a palavra-chave `mutating`.

```swift
struct Contador {

    var valor = 0

    mutating func incrementar() {
        valor += 1
    }
}
```

Uso:

```swift
var contador = Contador()

contador.incrementar()
contador.incrementar()

print(contador.valor)
```

Saída:

```text
2
```

:::warning Importante

Métodos de `structs` só podem alterar propriedades quando forem marcados com `mutating`.

---

### Métodos em Classes

Classes não precisam utilizar `mutating`.

```swift
class ContaBancaria {

    var saldo = 0.0

    func depositar(valor: Double) {
        saldo += valor
    }
}
```

Uso:

```swift
let conta = ContaBancaria()

conta.depositar(valor: 100)

print(conta.saldo)
```

Saída:

```text
100.0
```

---

### Resumo

:::tip Resumo rápido

* Funções encapsulam comportamentos reutilizáveis.
* Métodos são funções pertencentes a um tipo.
* Funções podem ou não retornar valores.
* Structs utilizam `mutating` para alterar propriedades.
* Classes não necessitam de `mutating`.

:::

---

## 6. Estruturas de Decisão e Repetição

As estruturas de controle determinam quais instruções serão executadas e quantas vezes elas serão executadas.

---

### If

O `if` executa um bloco apenas quando uma condição é verdadeira.

```swift
let idade = 18

if idade >= 18 {
    print("Maior de idade")
}
```

Saída:

```text
Maior de idade
```

---

### If / Else

Permite definir caminhos alternativos.

```swift
let nota = 75

if nota >= 70 {
    print("Aprovado")
} else {
    print("Reprovado")
}
```

---

### If / Else If

Permite múltiplas condições.

```swift
let nota = 85

if nota >= 90 {
    print("Excelente")
}
else if nota >= 70 {
    print("Aprovado")
}
else {
    print("Reprovado")
}
```

---

### Switch

O `switch` é muito utilizado em Swift para múltiplas opções.

```swift
let dia = 3

switch dia {
case 1:
    print("Domingo")

case 2:
    print("Segunda")

case 3:
    print("Terça")

default:
    print("Outro dia")
}
```

Saída:

```text
Terça
```

---

### For-In

O loop mais comum em Swift.

```swift
let frutas = ["Maçã", "Banana", "Laranja"]

for fruta in frutas {
    print(fruta)
}
```

Saída:

```text
Maçã
Banana
Laranja
```

---

### For com Intervalos

```swift
for numero in 1...5 {
    print(numero)
}
```

Saída:

```text
1
2
3
4
5
```

---

### While

Executa enquanto a condição for verdadeira.

```swift
var contador = 0

while contador < 3 {
    print(contador)
    contador += 1
}
```

Saída:

```text
0
1
2
```

---

### Repeat-While

Executa pelo menos uma vez.

```swift
var numero = 0

repeat {
    print(numero)
    numero += 1
}
while numero < 3
```

---

### Resumo

:::tip Resumo rápido

* `if` executa uma condição.
* `else` define alternativas.
* `switch` trata múltiplos cenários.
* `for-in` percorre coleções.
* `while` repete enquanto uma condição for verdadeira.
* `repeat-while` executa pelo menos uma vez.

:::

---

## 7. Coleções: Arrays e Dictionaries

Coleções permitem armazenar vários valores em uma única estrutura.

---

### Arrays

Arrays armazenam elementos ordenados.

```swift
let numeros = [10, 20, 30, 40]
```

Visualmente:

```text
Índice:   0   1   2   3
Valor:   10  20  30  40
```

---

### Acessando elementos

```swift
let numeros = [10, 20, 30, 40]

print(numeros[1])
```

Saída:

```text
20
```

---

### Adicionando elementos

```swift
var frutas = ["Maçã"]

frutas.append("Banana")
frutas.append("Laranja")

print(frutas)
```

---

### Removendo elementos

```swift
var frutas = ["Maçã", "Banana", "Laranja"]

frutas.remove(at: 1)

print(frutas)
```

Saída:

```text
["Maçã", "Laranja"]
```

---

### Percorrendo Arrays

```swift
let frutas = ["Maçã", "Banana", "Laranja"]

for fruta in frutas {
    print(fruta)
}
```

---

### Dictionaries

Dictionaries armazenam pares chave-valor.

```swift
let aluno = [
    "nome": "Ana",
    "curso": "Computação"
]
```

Visualmente:

```text
nome  -> Ana
curso -> Computação
```

---

### Acessando valores

```swift
let aluno = [
    "nome": "Ana",
    "curso": "Computação"
]

print(aluno["nome"])
```

Resultado:

```text
Optional("Ana")
```

---

### Trabalhando com Optional

Como uma chave pode não existir, o retorno é opcional.

```swift
if let nome = aluno["nome"] {
    print(nome)
}
```

Saída:

```text
Ana
```

---

### Inserindo valores

```swift
var estoque = [
    "Notebook": 5
]

estoque["Mouse"] = 10
```

---

### Atualizando valores

```swift
estoque["Notebook"] = 8
```

---

### Removendo valores

```swift
estoque.removeValue(forKey: "Mouse")
```

---

### Arrays vs Dictionaries

| Array              | Dictionary                   |
| ------------------ | ---------------------------- |
| Usa índices        | Usa chaves                   |
| Mantém ordem       | Ordem não garantida          |
| Ideal para listas  | Ideal para consultas rápidas |
| Acesso por posição | Acesso por identificador     |

:::info Regra prática

Pergunte-se:

* Quero acessar pela posição? → Use Array.
* Quero acessar por uma chave única? → Use Dictionary.

:::

---

## 8. Conclusão

Você agora domina os principais elementos da sintaxe fundamental do Swift:

* Variáveis e constantes
* Tipos primitivos
* Structs e Classes
* Funções e Métodos
* Estruturas de decisão
* Estruturas de repetição
* Arrays
* Dictionaries

Esses conceitos formam a base necessária para avançar para o desenvolvimento de interfaces com SwiftUI.

Nos próximos capítulos serão introduzidos recursos como:

* `@State`
* `@Binding`
* `@Observable`
* `NavigationStack`
* `List`
* `ForEach`

que utilizam diretamente os conceitos apresentados até aqui.
:::