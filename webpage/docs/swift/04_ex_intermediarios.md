---
sidebar_position: 4
title: Exercícios Intermediários de SwiftUI
sidebar_label: Exercícios Intermediários de SwiftUI
slug: /swift/swiftui-02
---

## Exercícios Intermediários


### Exercício 6: Custom Views (Reutilização)

**Tópico:** Reutilização de componentes em SwiftUI

---

## Objetivo do exercício

O objetivo deste exercício é compreender como criar componentes reutilizáveis em SwiftUI.

Ao final da atividade, você deverá ser capaz de:

* criar suas próprias Views;
* encapsular layout e estilo;
* reutilizar componentes em diferentes partes da aplicação;
* reduzir duplicação de código;
* aplicar o princípio DRY (*Don't Repeat Yourself*).

Esses conceitos são fundamentais para projetos SwiftUI maiores, onde dezenas ou centenas de telas compartilham componentes visuais semelhantes.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

* `struct`
* `View`
* Propriedades
* Reutilização de componentes
* Composição de Views
* Passagem de parâmetros
* Custom Views

---

## Código-base

```swift
import SwiftUI

struct CustomCardView: View {

    let title: String
    let bodyText: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {

            Text(title)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)

            Text(bodyText)
                .font(.subheadline)
                .foregroundColor(.white.opacity(0.9))
        }
        .padding()
        .frame(width: 300, height: 150)
        .background(color)
        .cornerRadius(20)
        .shadow(radius: 5)
    }
}

struct ReusableViewExample: View {
    var body: some View {

        VStack(spacing: 20) {

            Text("Usando Componente Reutilizável")
                .font(.largeTitle)

            CustomCardView(
                title: "Item Principal",
                bodyText: "Este card foi criado com um componente customizado.",
                color: .blue
            )

            CustomCardView(
                title: "Item Secundário",
                bodyText: "Componentes customizados economizam tempo de desenvolvimento.",
                color: .green
            )
        }
        .padding()
    }
}
```

---

## Entendendo a interface

O resultado visual será semelhante a:

```text
+--------------------------------+
| Usando Componente Reutilizável |
+--------------------------------+

+------------------------------+
| Item Principal               |
|                              |
| Este card foi criado com     |
| um componente customizado.   |
+------------------------------+

+------------------------------+
| Item Secundário              |
|                              |
| Componentes customizados     |
| economizam tempo de          |
| desenvolvimento.             |
+------------------------------+
```

Observe que os dois cartões possuem exatamente o mesmo layout.

A única diferença são os dados fornecidos.

---

## Por que criar Custom Views?

Imagine que você precise criar dez cartões iguais.

Sem reutilização:

```swift
VStack {
    Text("Título")
    Text("Descrição")
}
.background(.blue)

VStack {
    Text("Outro título")
    Text("Outra descrição")
}
.background(.green)
```

Conforme a aplicação cresce, esse código se torna difícil de manter.

Com uma Custom View:

```swift
CustomCardView(...)
CustomCardView(...)
CustomCardView(...)
```

O layout fica centralizado em um único local.

---

## Entendendo a passagem de dados

A View recebe informações através de propriedades.

```swift
let title: String
let bodyText: String
let color: Color
```

Esses valores são fornecidos quando o componente é utilizado.

```swift
CustomCardView(
    title: "Meu Card",
    bodyText: "Descrição",
    color: .blue
)
```

Isso torna o componente flexível e reutilizável.

---

## Desafio

Modifique o componente para:

1. Exibir um ícone;
2. Permitir definir a cor do texto;
3. Alterar a altura do cartão;
4. Adicionar um botão na parte inferior;
5. Utilizar o componente três vezes na mesma tela.

---

## Solução sugerida

```swift
import SwiftUI

struct CustomCardView: View {

    let title: String
    let bodyText: String
    let color: Color
    let icon: String

    var body: some View {

        VStack(alignment: .leading, spacing: 12) {

            Image(systemName: icon)
                .font(.title)

            Text(title)
                .font(.title3)
                .fontWeight(.bold)

            Text(bodyText)

            Button("Saiba Mais") {

            }
            .buttonStyle(.borderedProminent)
        }
        .foregroundColor(.white)
        .padding()
        .frame(width: 300, height: 200)
        .background(color)
        .cornerRadius(20)
    }
}
```

Uso:

```swift
CustomCardView(
    title: "SwiftUI",
    bodyText: "Aprenda interfaces modernas.",
    color: .blue,
    icon: "swift"
)
```

---

## Solução comentada

:::tip Entendendo a solução

A ideia principal é separar:

* os dados;
* a aparência;
* o local onde o componente será utilizado.

O componente define apenas como exibir as informações.

Já a tela principal decide quais informações serão mostradas.

Essa separação facilita manutenção e reutilização.

:::

---

## Composição de Views

SwiftUI incentiva fortemente a composição.

Uma tela pode ser construída a partir de componentes menores.

Exemplo:

```swift
TelaPrincipal
│
├── HeaderView
├── UserCardView
├── ProductCardView
└── FooterView
```

Cada componente possui responsabilidade própria.

Isso torna o código mais organizado.

---

## Benefícios da reutilização

### Menos código duplicado

Em vez de copiar e colar o mesmo layout:

```swift
CustomCardView(...)
CustomCardView(...)
CustomCardView(...)
```

---

### Mais facilidade de manutenção

Se você decidir alterar a aparência do cartão:

```swift
.cornerRadius(30)
```

A mudança será aplicada automaticamente em todos os locais onde o componente é utilizado.

---

### Melhor organização

Projetos SwiftUI costumam possuir uma pasta específica para componentes:

```text
Views
│
├── CustomCardView.swift
├── HeaderView.swift
├── ProfileView.swift
└── ProductCardView.swift
```

---

## Desafio extra

Crie um catálogo de cursos utilizando o componente criado.

Resultado esperado:

```text
+----------------------+
| Curso SwiftUI        |
| Introdução ao Swift  |
+----------------------+

+----------------------+
| Curso iOS            |
| Desenvolvimento App |
+----------------------+

+----------------------+
| Curso Backend        |
| APIs com Swift       |
+----------------------+
```

Requisitos:

* utilizar pelo menos três cartões;
* cada cartão deve possuir cor diferente;
* cada cartão deve possuir ícone diferente;
* reutilizar a mesma `CustomCardView`.

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

* como criar componentes reutilizáveis;
* como passar dados através de propriedades;
* como reduzir duplicação de código;
* como estruturar projetos SwiftUI de forma organizada.

:::tip Relação com SwiftUI real

Praticamente todas as aplicações SwiftUI utilizam Custom Views.

Você encontrará esse padrão em:

* cartões de produtos;
* células de listas;
* menus;
* formulários;
* dashboards;
* componentes compartilhados.

:::


### Exercício 7: Navegação com NavigationLink

**Tópico:** Navegação declarativa em SwiftUI

---

## Objetivo do exercício

O objetivo deste exercício é compreender como funciona a navegação entre telas em SwiftUI utilizando o componente `NavigationLink`.

Ao final da atividade, você deverá ser capaz de:

- criar múltiplas telas;
- configurar um fluxo de navegação;
- utilizar `NavigationStack`;
- utilizar `NavigationLink`;
- compreender a diferença entre navegação declarativa e programática.

A navegação é um dos conceitos fundamentais para qualquer aplicação iOS.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `NavigationStack`
- `NavigationLink`
- `View`
- Passagem de dados entre telas
- Navegação declarativa
- `navigationTitle`

:::

---

## Entendendo a navegação em SwiftUI

SwiftUI oferece duas abordagens principais para navegação:

### Navegação Declarativa

A navegação acontece diretamente através de um componente visual.

Exemplo:

```swift
NavigationLink(
    destination: DetailView()
) {
    Text("Abrir Detalhes")
}
```

Quando o usuário toca no componente, o SwiftUI automaticamente exibe a tela de destino.

---

### Navegação Programática

A navegação acontece através de uma condição ou estado da aplicação.

Exemplo:

```swift
@State private var mostrarDetalhes = false
```

Quando a variável muda de valor, o SwiftUI apresenta a nova tela.

Essa abordagem é comum em:

- login;
- logout;
- validações;
- formulários;
- fluxos condicionais.

Neste exercício utilizaremos a navegação declarativa.

---

## Código-base

```swift
import SwiftUI

struct DetailView: View {

    let title: String

    var body: some View {

        VStack {
            Text("Detalhes de \(title)")
                .font(.largeTitle)
        }
        .navigationTitle("Detalhes")
    }
}

struct NavigationLinkExample: View {

    var body: some View {

        NavigationStack {

            VStack {

                Text("Tela Principal")
                    .font(.largeTitle)

                NavigationLink(
                    destination: DetailView(
                        title: "Perfil do Usuário"
                    )
                ) {

                    Text("Ver Perfil")
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            }
            .padding()
        }
    }
}
```

---

## Entendendo a interface

Tela inicial:

```text
+-----------------------+
|                       |
|   Tela Principal      |
|                       |
|    [ Ver Perfil ]     |
|                       |
+-----------------------+
```

Após tocar no botão:

```text
+-----------------------+
| ← Detalhes            |
|                       |
| Detalhes de Perfil    |
| do Usuário            |
|                       |
+-----------------------+
```

Observe que o SwiftUI cria automaticamente o botão de retorno.

---

## Entendendo o NavigationStack

O `NavigationStack` é o contêiner responsável por gerenciar o histórico de navegação.

```swift
NavigationStack {

}
```

Visualmente:

```text
NavigationStack
│
├── Tela Principal
│
└── Tela de Detalhes
```

Toda navegação moderna em SwiftUI deve estar dentro de um `NavigationStack`.

---

## Entendendo o NavigationLink

O `NavigationLink` conecta uma tela a outra.

```swift
NavigationLink(
    destination: DetailView()
) {
    Text("Abrir")
}
```

Ele possui duas partes:

| Parte | Função |
|---------|---------|
| destination | Define a tela de destino |
| closure | Define o elemento visual clicável |

---

## Passando dados para outra tela

Uma das maiores vantagens do SwiftUI é a simplicidade na passagem de dados.

Na tela principal:

```swift
NavigationLink(
    destination: DetailView(
        title: "Perfil do Usuário"
    )
) {
    Text("Ver Perfil")
}
```

Na tela de destino:

```swift
struct DetailView: View {

    let title: String

    var body: some View {
        Text(title)
    }
}
```

O valor é recebido diretamente através do inicializador da View.

---

## Desafio

Modifique o exercício para:

1. Criar uma tela chamada "Configurações";
2. Adicionar um segundo `NavigationLink`;
3. Navegar para a nova tela;
4. Exibir um título diferente em cada tela;
5. Utilizar cores diferentes para cada botão.

---

## Solução sugerida

```swift
import SwiftUI

struct SettingsView: View {

    var body: some View {

        Text("Tela de Configurações")
            .font(.largeTitle)
            .navigationTitle("Configurações")
    }
}

struct NavigationLinkExample: View {

    var body: some View {

        NavigationStack {

            VStack(spacing: 20) {

                NavigationLink(
                    destination: DetailView(
                        title: "Perfil do Usuário"
                    )
                ) {

                    Text("Ver Perfil")
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }

                NavigationLink(
                    destination: SettingsView()
                ) {

                    Text("Configurações")
                        .padding()
                        .background(Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            }
        }
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

Cada `NavigationLink` pode apontar para uma View diferente.

```swift
NavigationLink(destination: TelaA())
```

```swift
NavigationLink(destination: TelaB())
```

O SwiftUI gerencia automaticamente:

- empilhamento das telas;
- botão de voltar;
- animações de transição;
- histórico de navegação.

:::

---

## Desafio extra

Crie uma aplicação com três telas:

```text
Tela Principal
│
├── Perfil
│
├── Configurações
│
└── Sobre
```

Cada opção deve navegar para sua respectiva tela.

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

- como navegar entre telas;
- como utilizar `NavigationStack`;
- como utilizar `NavigationLink`;
- como passar dados entre Views;
- como estruturar aplicações com múltiplas telas.

:::tip Relação com SwiftUI real

O padrão `NavigationStack + NavigationLink` é utilizado em praticamente todos os aplicativos iOS.

Você o encontrará em:

- aplicativos bancários;
- redes sociais;
- aplicativos de e-commerce;
- aplicativos corporativos;
- sistemas de gerenciamento.

Antes de aprender navegação programática, é importante dominar completamente a navegação declarativa, pois ela resolve a maior parte dos fluxos de navegação encontrados no dia a dia.

:::

---


### Exercício 8: UserDefaults

**Tópico:** Persistência simples de dados no dispositivo

---

## Objetivo do exercício

Criar uma tela que salva e carrega uma preferência simples do usuário utilizando `UserDefaults`.

Neste exercício, a preferência salva será o nome de uma cor favorita.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `UserDefaults`
- `@State`
- Persistência local simples
- Leitura de dados salvos
- Escrita de dados no dispositivo
- Atualização da interface após uma ação

:::

---

## O que é UserDefaults?

O `UserDefaults` é um recurso do iOS utilizado para armazenar pequenas preferências do usuário no dispositivo.

Ele é indicado para salvar dados simples, como:

- nome do usuário;
- tema claro ou escuro;
- idioma selecionado;
- última opção escolhida;
- preferência de cor;
- configurações simples do aplicativo.

:::warning Atenção

O `UserDefaults` não deve ser usado para armazenar dados sensíveis, como senhas, tokens de autenticação ou informações privadas importantes.

Para dados sensíveis, o mais adequado é utilizar recursos como o Keychain.

:::

---

## Código-base

```swift
import SwiftUI

struct UserDefaultsExample: View {

    @State private var savedColorName: String = "Nenhuma cor salva."

    let colorKey = "userFavoriteColor"

    var body: some View {

        VStack(spacing: 20) {

            Text("Configurações de Cor")
                .font(.title2)
                .fontWeight(.bold)

            Text("Cor salva: \(savedColorName)")
                .font(.headline)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)

            Button("Salvar Cor") {

                let newColor = "Azul Profundo"

                UserDefaults.standard.set(
                    newColor,
                    forKey: colorKey
                )

                savedColorName = newColor
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

---

## Melhorando o exercício: carregar o valor salvo

No código anterior, a cor é salva, mas ainda falta carregar automaticamente o valor quando a tela aparece.

Para isso, podemos usar `.onAppear`.

---

## Solução sugerida

```swift
import SwiftUI

struct UserDefaultsExample: View {

    @State private var savedColorName: String = "Nenhuma cor salva."

    let colorKey = "userFavoriteColor"

    var body: some View {

        VStack(spacing: 20) {

            Text("Configurações de Cor")
                .font(.title2)
                .fontWeight(.bold)

            Text("Cor salva: \(savedColorName)")
                .font(.headline)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)

            Button("Salvar Azul Profundo") {

                let newColor = "Azul Profundo"

                UserDefaults.standard.set(
                    newColor,
                    forKey: colorKey
                )

                savedColorName = newColor
            }
            .buttonStyle(.borderedProminent)

            Button("Carregar Cor Salva") {

                savedColorName = UserDefaults.standard.string(
                    forKey: colorKey
                ) ?? "Nenhuma cor salva."
            }
            .buttonStyle(.bordered)
        }
        .padding()
        .onAppear {
            savedColorName = UserDefaults.standard.string(
                forKey: colorKey
            ) ?? "Nenhuma cor salva."
        }
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O método `set(_:forKey:)` salva um valor no `UserDefaults`.

```swift
UserDefaults.standard.set("Azul Profundo", forKey: "userFavoriteColor")
```

O método `string(forKey:)` recupera um valor salvo como `String`.

```swift
UserDefaults.standard.string(forKey: "userFavoriteColor")
```

Como a chave pode não existir, o retorno é opcional. Por isso usamos `??` para definir um valor padrão.

```swift
UserDefaults.standard.string(forKey: colorKey) ?? "Nenhuma cor salva."
```

:::

---

## Desafio

Modifique o exercício para permitir que o usuário escolha entre três cores:

- Azul;
- Verde;
- Vermelho.

Cada botão deve salvar uma cor diferente no `UserDefaults`.

---

## Solução do desafio

```swift
import SwiftUI

struct UserDefaultsExample: View {

    @State private var savedColorName: String = "Nenhuma cor salva."

    let colorKey = "userFavoriteColor"

    var body: some View {

        VStack(spacing: 20) {

            Text("Escolha sua cor favorita")
                .font(.title2)
                .fontWeight(.bold)

            Text("Cor salva: \(savedColorName)")
                .font(.headline)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)

            Button("Salvar Azul") {
                saveColor("Azul")
            }
            .buttonStyle(.borderedProminent)

            Button("Salvar Verde") {
                saveColor("Verde")
            }
            .buttonStyle(.bordered)

            Button("Salvar Vermelho") {
                saveColor("Vermelho")
            }
            .buttonStyle(.bordered)

            Button("Limpar Preferência") {
                UserDefaults.standard.removeObject(forKey: colorKey)
                savedColorName = "Nenhuma cor salva."
            }
            .foregroundColor(.red)
        }
        .padding()
        .onAppear {
            loadColor()
        }
    }

    func saveColor(_ colorName: String) {
        UserDefaults.standard.set(colorName, forKey: colorKey)
        savedColorName = colorName
    }

    func loadColor() {
        savedColorName = UserDefaults.standard.string(
            forKey: colorKey
        ) ?? "Nenhuma cor salva."
    }
}
```

---

## Resultado esperado

Ao executar a aplicação:

1. O usuário escolhe uma cor;
2. A cor é salva no `UserDefaults`;
3. A interface é atualizada imediatamente;
4. Ao reabrir a tela, a cor salva é carregada novamente;
5. O usuário pode limpar a preferência salva.

---

## Relação com SwiftUI real

O `UserDefaults` é muito utilizado para preferências simples de aplicativos.

Exemplos comuns:

```swift
UserDefaults.standard.set(true, forKey: "isDarkModeEnabled")

UserDefaults.standard.set("pt-BR", forKey: "selectedLanguage")

UserDefaults.standard.set("Murilo", forKey: "userName")
```

:::tip Regra prática

Use `UserDefaults` para configurações simples.

Não use `UserDefaults` para:

- grandes volumes de dados;
- senhas;
- dados sensíveis;
- listas complexas;
- informações críticas do usuário.

:::

---

### Exercício 9: Picker e Toggle com Binding

**Tópico:** Componentes de entrada e sincronização de estado

---

## Objetivo do exercício

Criar uma tela de configurações utilizando `Toggle` e `Picker`.

Neste exercício, o usuário poderá:

- ativar ou desativar o modo escuro;
- escolher um tema visual;
- visualizar o estado atual da configuração;
- entender como o `Binding` conecta componentes visuais ao estado da tela.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `@State`
- `Binding`
- `$`
- `Toggle`
- `Picker`
- `UserDefaults`
- Renderização condicional
- Persistência simples

:::

---

## O que é Binding?

Em SwiftUI, `Binding` é uma ligação entre um componente visual e uma fonte de dados.

Quando usamos:

```swift
Toggle("Ativar Modo Escuro", isOn: $isDarkModeEnabled)
```

o símbolo `$` cria uma ligação bidirecional entre o `Toggle` e a variável `@State`.

Isso significa que:

- quando o usuário altera o `Toggle`, o valor de `isDarkModeEnabled` muda;
- quando `isDarkModeEnabled` muda, a interface é atualizada automaticamente.

---

## Código-base

```swift
import SwiftUI

struct TogglePickerExample: View {

    @State private var isDarkModeEnabled: Bool = false

    let darkModeKey = "userDarkModeSetting"

    var body: some View {

        VStack(spacing: 20) {

            Text("Seletor de Tema")
                .font(.title)

            Toggle("Ativar Modo Escuro", isOn: $isDarkModeEnabled)
                .padding(.horizontal)

            Text(
                "Status: \(isDarkModeEnabled ? "Modo Escuro Ativo" : "Modo Claro")"
            )
            .font(.subheadline)

            if isDarkModeEnabled {
                Text("Tema escuro ativado com sucesso!")
                    .foregroundColor(.orange)
            }
        }
        .padding()
        .background(
            isDarkModeEnabled ? Color.black : Color.white
        )
        .foregroundColor(
            isDarkModeEnabled ? .white : .black
        )
        .cornerRadius(15)
    }
}
```

---

## Entendendo a interface

Quando o `Toggle` está desligado:

```text
+----------------------------+
| Seletor de Tema            |
|                            |
| Ativar Modo Escuro   OFF   |
|                            |
| Status: Modo Claro         |
+----------------------------+
```

Quando o `Toggle` está ligado:

```text
+----------------------------+
| Seletor de Tema            |
|                            |
| Ativar Modo Escuro   ON    |
|                            |
| Status: Modo Escuro Ativo  |
| Tema escuro ativado!       |
+----------------------------+
```

---

## Adicionando persistência com UserDefaults

Para manter a configuração salva mesmo depois que o aplicativo for fechado, podemos usar `UserDefaults`.

---

## Solução sugerida

```swift
import SwiftUI

struct TogglePickerExample: View {

    @State private var isDarkModeEnabled: Bool = false

    let darkModeKey = "userDarkModeSetting"

    var body: some View {

        VStack(spacing: 20) {

            Text("Seletor de Tema")
                .font(.title)
                .fontWeight(.bold)

            Toggle("Ativar Modo Escuro", isOn: $isDarkModeEnabled)
                .padding(.horizontal)
                .onChange(of: isDarkModeEnabled) {
                    UserDefaults.standard.set(
                        isDarkModeEnabled,
                        forKey: darkModeKey
                    )
                }

            Text(
                "Status: \(isDarkModeEnabled ? "Modo Escuro Ativo" : "Modo Claro")"
            )
            .font(.subheadline)

            if isDarkModeEnabled {
                Text("Tema escuro ativado com sucesso!")
                    .foregroundColor(.orange)
            }
        }
        .padding()
        .background(
            isDarkModeEnabled ? Color.black : Color.white
        )
        .foregroundColor(
            isDarkModeEnabled ? .white : .black
        )
        .cornerRadius(15)
        .onAppear {
            isDarkModeEnabled = UserDefaults.standard.bool(
                forKey: darkModeKey
            )
        }
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `Toggle` recebe um `Binding`:

```swift
Toggle("Ativar Modo Escuro", isOn: $isDarkModeEnabled)
```

O `$isDarkModeEnabled` permite que o componente leia e altere o valor do estado.

O modificador `.onChange` observa mudanças no valor:

```swift
.onChange(of: isDarkModeEnabled) {
    UserDefaults.standard.set(
        isDarkModeEnabled,
        forKey: darkModeKey
    )
}
```

Assim, sempre que o usuário altera o `Toggle`, a preferência é salva.

O `.onAppear` carrega o valor salvo quando a tela aparece.

:::

---

## Adicionando Picker

Além do `Toggle`, podemos utilizar um `Picker` para permitir que o usuário escolha uma opção entre várias.

Exemplo:

```swift
@State private var selectedTheme: String = "Sistema"
```

```swift
Picker("Tema", selection: $selectedTheme) {
    Text("Sistema").tag("Sistema")
    Text("Claro").tag("Claro")
    Text("Escuro").tag("Escuro")
}
.pickerStyle(.segmented)
```

---

## Solução com Toggle e Picker

```swift
import SwiftUI

struct TogglePickerExample: View {

    @State private var isDarkModeEnabled: Bool = false
    @State private var selectedTheme: String = "Sistema"

    let darkModeKey = "userDarkModeSetting"
    let themeKey = "userSelectedTheme"

    var body: some View {

        VStack(spacing: 20) {

            Text("Preferências")
                .font(.title)
                .fontWeight(.bold)

            Toggle("Ativar Modo Escuro", isOn: $isDarkModeEnabled)
                .padding(.horizontal)
                .onChange(of: isDarkModeEnabled) {
                    UserDefaults.standard.set(
                        isDarkModeEnabled,
                        forKey: darkModeKey
                    )
                }

            Picker("Tema", selection: $selectedTheme) {
                Text("Sistema").tag("Sistema")
                Text("Claro").tag("Claro")
                Text("Escuro").tag("Escuro")
            }
            .pickerStyle(.segmented)
            .onChange(of: selectedTheme) {
                UserDefaults.standard.set(
                    selectedTheme,
                    forKey: themeKey
                )
            }

            Text("Tema selecionado: \(selectedTheme)")

            Text(
                "Modo escuro: \(isDarkModeEnabled ? "Ativado" : "Desativado")"
            )
        }
        .padding()
        .background(
            isDarkModeEnabled ? Color.black : Color.white
        )
        .foregroundColor(
            isDarkModeEnabled ? .white : .black
        )
        .cornerRadius(15)
        .onAppear {
            isDarkModeEnabled = UserDefaults.standard.bool(
                forKey: darkModeKey
            )

            selectedTheme = UserDefaults.standard.string(
                forKey: themeKey
            ) ?? "Sistema"
        }
    }
}
```

---

## Desafio

Modifique o exercício para criar uma tela de preferências com:

1. Um `Toggle` para ativar notificações;
2. Um `Toggle` para ativar modo escuro;
3. Um `Picker` para escolher o tamanho da fonte;
4. Um texto que mostre todas as preferências selecionadas;
5. Persistência das configurações com `UserDefaults`.

---

## Exemplo esperado

```text
+--------------------------------+
| Preferências                   |
|                                |
| Notificações        ON         |
| Modo Escuro         OFF        |
|                                |
| Fonte: Pequena Média Grande    |
|                                |
| Notificações: Ativadas         |
| Tema: Claro                    |
| Fonte: Média                   |
+--------------------------------+
```

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

- como utilizar `Toggle`;
- como utilizar `Picker`;
- como usar `$` para criar um `Binding`;
- como sincronizar componentes visuais com `@State`;
- como salvar preferências simples no `UserDefaults`.

:::tip Relação com SwiftUI real

`Toggle` e `Picker` são muito comuns em telas de configuração.

Eles aparecem em:

- preferências de usuário;
- filtros de busca;
- formulários;
- telas de cadastro;
- configurações de tema;
- controles de notificação.

:::

---


### Exercício 10: Manipulação de Arquivos — Escrita

**Tópico:** Escrita de arquivos no armazenamento local do app

---

## Objetivo do exercício

Criar uma tela em SwiftUI que simula a criação e o salvamento de um arquivo de texto no diretório de documentos do aplicativo.

Ao final da atividade, você deverá compreender:

- como criar conteúdo em formato de texto;
- como converter uma `String` para `Data`;
- como acessar o diretório de documentos do app;
- como criar um caminho de arquivo;
- como escrever dados no armazenamento local;
- como tratar erros usando `do`, `try` e `catch`.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `FileManager`
- `Data`
- `write(to:)`
- `URL`
- `UUID`
- `Date`
- `do / try / catch`
- Diretório de documentos do aplicativo

:::

---

## O que é FileManager?

O `FileManager` é a API utilizada para interagir com o sistema de arquivos do dispositivo.

Com ele, é possível:

- localizar diretórios;
- criar arquivos;
- remover arquivos;
- verificar se um arquivo existe;
- listar arquivos salvos;
- criar pastas;
- mover ou copiar arquivos.

Neste exercício, usaremos o `FileManager` para encontrar o diretório de documentos do aplicativo.

---

## O que é o diretório de documentos?

Cada aplicativo iOS possui uma área própria de armazenamento, chamada de *sandbox*.

Isso significa que o aplicativo não pode acessar livremente todos os arquivos do dispositivo. Ele trabalha dentro do seu próprio espaço isolado.

Um dos diretórios mais usados é o diretório de documentos:

```swift
.documentDirectory
```

Ele é indicado para salvar arquivos criados pelo usuário ou pelo aplicativo, como:

- relatórios;
- textos;
- arquivos exportados;
- PDFs;
- imagens processadas;
- documentos gerados.

---

## Código-base

```swift
import SwiftUI

struct FileWriteExample: View {

    @State private var fileStatus: String = "Pronto para escrever."

    var body: some View {

        VStack(spacing: 20) {

            Text("Escrita de Arquivos")
                .font(.title)
                .fontWeight(.bold)

            Text("Status: \(fileStatus)")
                .font(.headline)
                .multilineTextAlignment(.center)

            Button("Criar e Salvar Arquivo") {
                saveFile()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }

    func saveFile() {

        let fileName = "documento_gerado_\(UUID().uuidString).txt"

        let contentToWrite = """
        Este é um documento gerado pelo aplicativo SwiftUI.

        Data de criação:
        \(Date())
        """

        guard let dataToWrite = contentToWrite.data(using: .utf8) else {
            fileStatus = "Erro ao codificar o texto."
            return
        }

        let fileManager = FileManager.default

        guard let documentsDirectory = fileManager.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first else {
            fileStatus = "Erro ao localizar o diretório de documentos."
            return
        }

        let fileURL = documentsDirectory.appendingPathComponent(fileName)

        do {
            try dataToWrite.write(to: fileURL)

            fileStatus = "Arquivo salvo com sucesso: \(fileURL.lastPathComponent)"
        } catch {
            fileStatus = "Erro ao salvar o arquivo: \(error.localizedDescription)"
        }
    }
}
```

---

## Entendendo o fluxo

O processo de escrita segue quatro etapas principais:

```text
Texto
  ↓
Conversão para Data
  ↓
Criação do caminho do arquivo
  ↓
Escrita no armazenamento local
```

Em Swift:

```swift
let contentToWrite = "Meu conteúdo"
```

```swift
let dataToWrite = contentToWrite.data(using: .utf8)
```

```swift
let fileURL = documentsDirectory.appendingPathComponent(fileName)
```

```swift
try dataToWrite.write(to: fileURL)
```

---

## Por que converter String para Data?

O sistema de arquivos trabalha com bytes.

Por isso, antes de salvar uma `String`, precisamos convertê-la para `Data`.

```swift
let texto = "Olá, arquivo!"

let data = texto.data(using: .utf8)
```

O `.utf8` define a codificação usada para transformar o texto em bytes.

:::tip

Pense em `Data` como a representação binária de um conteúdo.

Textos, imagens, PDFs e áudios podem ser representados como `Data`.

:::

---

## Criando o nome do arquivo

Neste exercício, usamos `UUID` para evitar nomes repetidos.

```swift
let fileName = "documento_gerado_\(UUID().uuidString).txt"
```

Exemplo de nome gerado:

```text
documento_gerado_6A1F9E8B-44BC-4E82-AF75-918F922A33D1.txt
```

Isso evita sobrescrever arquivos anteriores.

---

## Localizando o diretório de documentos

O diretório de documentos é obtido com:

```swift
let fileManager = FileManager.default

let documentsDirectory = fileManager.urls(
    for: .documentDirectory,
    in: .userDomainMask
).first
```

Esse código pede ao sistema operacional o caminho correto para salvar arquivos do usuário.

---

## Criando a URL do arquivo

Depois de localizar o diretório, adicionamos o nome do arquivo ao caminho.

```swift
let fileURL = documentsDirectory.appendingPathComponent(fileName)
```

Visualmente:

```text
Documents/
└── documento_gerado_123.txt
```

---

## Escrevendo o arquivo

A escrita é feita com:

```swift
try dataToWrite.write(to: fileURL)
```

Como a escrita pode falhar, o código precisa estar dentro de um bloco `do / catch`.

```swift
do {
    try dataToWrite.write(to: fileURL)
} catch {
    print(error.localizedDescription)
}
```

---

## Por que usar do, try e catch?

Operações de arquivo podem falhar por diversos motivos:

- caminho inválido;
- falta de permissão;
- erro de codificação;
- armazenamento indisponível;
- falha interna do sistema.

Por isso, Swift exige tratamento de erro em operações desse tipo.

```swift
do {
    try algumaOperacaoQuePodeFalhar()
} catch {
    print("Erro: \(error.localizedDescription)")
}
```

---

## Solução comentada

:::tip Entendendo a solução

A função `saveFile()` concentra toda a lógica de escrita.

Ela realiza as seguintes ações:

1. Cria um nome único para o arquivo;
2. Define o conteúdo textual;
3. Converte o conteúdo para `Data`;
4. Localiza o diretório de documentos;
5. Monta a URL completa do arquivo;
6. Tenta salvar os dados no disco;
7. Atualiza a interface com uma mensagem de sucesso ou erro.

:::

---

## Versão aprimorada: salvar e mostrar o caminho

```swift
import SwiftUI

struct FileWriteExample: View {

    @State private var fileStatus: String = "Pronto para escrever."
    @State private var lastFileName: String = ""

    var body: some View {

        VStack(spacing: 20) {

            Text("Escrita de Arquivos")
                .font(.title)
                .fontWeight(.bold)

            Text(fileStatus)
                .font(.headline)
                .multilineTextAlignment(.center)

            if !lastFileName.isEmpty {
                Text("Último arquivo: \(lastFileName)")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Button("Criar e Salvar Arquivo") {
                saveFile()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }

    func saveFile() {

        let fileName = "documento_gerado_\(UUID().uuidString).txt"

        let contentToWrite = """
        Documento gerado pelo aplicativo.

        Criado em:
        \(Date())

        Este arquivo foi salvo no diretório de documentos do app.
        """

        guard let dataToWrite = contentToWrite.data(using: .utf8) else {
            fileStatus = "Erro ao converter o texto para Data."
            return
        }

        guard let documentsDirectory = FileManager.default.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first else {
            fileStatus = "Erro ao acessar o diretório de documentos."
            return
        }

        let fileURL = documentsDirectory.appendingPathComponent(fileName)

        do {
            try dataToWrite.write(to: fileURL)

            lastFileName = fileURL.lastPathComponent
            fileStatus = "Arquivo salvo com sucesso."
        } catch {
            fileStatus = "Erro ao salvar: \(error.localizedDescription)"
        }
    }
}
```

---

## Desafio

Modifique o exercício para permitir que o usuário digite o conteúdo do arquivo antes de salvá-lo.

A tela deverá conter:

1. Um `TextField` para o nome do arquivo;
2. Um `TextEditor` para o conteúdo;
3. Um botão para salvar;
4. Uma mensagem de status;
5. Validação para impedir nome vazio ou conteúdo vazio.

---

## Solução do desafio

```swift
import SwiftUI

struct FileWriteExample: View {

    @State private var fileName: String = "meu_arquivo"
    @State private var fileContent: String = ""
    @State private var fileStatus: String = "Digite um conteúdo para salvar."

    var body: some View {

        VStack(spacing: 20) {

            Text("Criador de Arquivo")
                .font(.title)
                .fontWeight(.bold)

            TextField("Nome do arquivo", text: $fileName)
                .textFieldStyle(.roundedBorder)

            TextEditor(text: $fileContent)
                .frame(height: 200)
                .border(Color.gray.opacity(0.4))

            Button("Salvar Arquivo") {
                saveCustomFile()
            }
            .buttonStyle(.borderedProminent)

            Text(fileStatus)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
    }

    func saveCustomFile() {

        let trimmedFileName = fileName.trimmingCharacters(
            in: .whitespacesAndNewlines
        )

        let trimmedContent = fileContent.trimmingCharacters(
            in: .whitespacesAndNewlines
        )

        guard !trimmedFileName.isEmpty else {
            fileStatus = "Informe um nome para o arquivo."
            return
        }

        guard !trimmedContent.isEmpty else {
            fileStatus = "Informe um conteúdo para o arquivo."
            return
        }

        let finalFileName = "\(trimmedFileName).txt"

        guard let dataToWrite = trimmedContent.data(using: .utf8) else {
            fileStatus = "Erro ao converter conteúdo para Data."
            return
        }

        guard let documentsDirectory = FileManager.default.urls(
            for: .documentDirectory,
            in: .userDomainMask
        ).first else {
            fileStatus = "Erro ao acessar o diretório de documentos."
            return
        }

        let fileURL = documentsDirectory.appendingPathComponent(finalFileName)

        do {
            try dataToWrite.write(to: fileURL)
            fileStatus = "Arquivo salvo: \(finalFileName)"
        } catch {
            fileStatus = "Erro ao salvar: \(error.localizedDescription)"
        }
    }
}
```

---

## Resultado esperado

Ao final do exercício, a aplicação deve permitir:

- criar um arquivo `.txt`;
- salvar o arquivo no diretório de documentos do app;
- exibir uma mensagem de sucesso;
- tratar erros de escrita;
- validar entradas do usuário.

---

## Relação com aplicações reais

A escrita de arquivos é utilizada em vários cenários, como:

- geração de relatórios;
- exportação de dados;
- criação de logs;
- salvamento de imagens;
- criação de PDFs;
- cache local;
- backup de informações.

:::warning Atenção

Para dados simples de configuração, prefira `UserDefaults`.

Para dados estruturados e persistentes, considere SwiftData, Core Data ou arquivos JSON.

Para arquivos gerados pelo app, como PDFs, imagens e textos, o uso de `FileManager` é adequado.

:::
