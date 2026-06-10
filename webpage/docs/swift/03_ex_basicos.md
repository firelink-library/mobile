---
sidebar_position: 3
title: Exercícios Básicos de SwiftUI
sidebar_label: Exercícios Básicos de SwiftUI
slug: /swift/swiftui-01
---

## Exercícios Básicos

### Exercício 1: ZStack e Spacer

**Tópico:** Layout avançado com `ZStack` e `Spacer`

---

## Objetivo do exercício

O objetivo deste exercício é compreender como utilizar o `ZStack` para sobrepor elementos na tela e como o `Spacer()` pode ser usado para controlar espaços e posicionamentos dentro de uma interface SwiftUI.

Neste exercício, você deverá criar uma tela com:

- uma cor de fundo ocupando toda a tela;
- um texto centralizado;
- um ícone posicionado próximo ao canto inferior da tela.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `ZStack`
- `Color`
- `ignoresSafeArea()`
- `Text`
- `Image`
- `Spacer`
- `frame`
- `padding`

:::

---

## Código-base

```swift
import SwiftUI

struct ZStackExample: View {
    var body: some View {
        ZStack {
            // Elemento de fundo
            Color.gray
                .ignoresSafeArea()

            // Texto centralizado
            Text("Meu Conteúdo Central")
                .font(.system(size: 48, weight: .bold))
                .foregroundColor(.white)

            // Ícone
            Image(systemName: "star.fill")
                .resizable()
                .frame(width: 50, height: 50)
                .foregroundColor(.yellow)
                .padding(.bottom, 30)
        }
    }
}
```

---

## Desafio

Altere o código para posicionar o ícone no canto inferior direito da tela.

Para isso, você pode combinar:

- `VStack`
- `HStack`
- `Spacer()`
- `padding()`

---

## Solução sugerida

```swift
import SwiftUI

struct ZStackExample: View {
    var body: some View {
        ZStack {
            Color.gray
                .ignoresSafeArea()

            Text("Meu Conteúdo Central")
                .font(.system(size: 48, weight: .bold))
                .foregroundColor(.white)

            VStack {
                Spacer()

                HStack {
                    Spacer()

                    Image(systemName: "star.fill")
                        .resizable()
                        .frame(width: 50, height: 50)
                        .foregroundColor(.yellow)
                        .padding()
                }
            }
        }
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `ZStack` permite empilhar elementos em camadas.

Neste exemplo:

- `Color.gray.ignoresSafeArea()` cria o fundo da tela;
- `Text` aparece centralizado por padrão dentro do `ZStack`;
- `VStack` organiza o conteúdo verticalmente;
- o primeiro `Spacer()` empurra o conteúdo para baixo;
- `HStack` organiza o conteúdo horizontalmente;
- o segundo `Spacer()` empurra o ícone para a direita;
- `padding()` evita que o ícone fique colado na borda da tela.

:::

---

## Experimentos sugeridos

Tente modificar o exercício para:

1. trocar o ícone por outro símbolo do SF Symbols;
2. alterar a cor de fundo;
3. posicionar o ícone no canto superior esquerdo;
4. adicionar mais de um ícone na tela;
5. substituir o `Text` central por uma imagem.

---

## Resultado esperado

Ao final do exercício, a tela deve apresentar:

- fundo cinza ocupando toda a tela;
- texto branco centralizado;
- ícone amarelo posicionado no canto inferior direito.

```text
+-----------------------------+
|                             |
|                             |
|     Meu Conteúdo Central     |
|                             |
|                             |
|                         ⭐  |
+-----------------------------+
```

---

### Exercício 2: HStack e Spacer

**Tópico:** Layout horizontal com `HStack`

---

## Objetivo do exercício

O objetivo deste exercício é compreender como utilizar o `HStack` para organizar elementos horizontalmente e como o `Spacer()` pode ser utilizado para distribuir o espaço disponível entre componentes.

Ao final do exercício, você deverá criar uma barra de navegação simples contendo três botões distribuídos uniformemente ao longo da largura da tela.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

- `HStack`
- `Button`
- `Image`
- `Spacer`
- `padding`
- `background`
- `cornerRadius`
- SF Symbols

:::

---

## Código-base

```swift
import SwiftUI

struct HStackExample: View {
    var body: some View {
        HStack {

            Button(action: {
                print("Botão 1")
            }) {
                Image(systemName: "home.fill")
            }

            Spacer()

            Button(action: {
                print("Botão 2")
            }) {
                Image(systemName: "gear")
            }

            Spacer()

            Button(action: {
                print("Botão 3")
            }) {
                Image(systemName: "person.circle.fill")
            }
        }
        .padding()
        .background(Color.blue.opacity(0.2))
        .cornerRadius(10)
    }
}
```

---

## Entendendo a interface

A estrutura produz uma barra horizontal semelhante a uma barra de navegação.

Visualmente:

```text
+--------------------------------------+
| 🏠           ⚙️            👤 |
+--------------------------------------+
```

O espaço entre os ícones é criado pelos componentes `Spacer()`.

---

## Desafio

Modifique o código para:

1. Adicionar um quarto botão utilizando o ícone `"bell.fill"`;
2. Alterar a cor de fundo da barra;
3. Aumentar o tamanho dos ícones;
4. Fazer com que todos os botões utilizem a mesma cor.

---

## Solução sugerida

```swift
import SwiftUI

struct HStackExample: View {
    var body: some View {
        HStack {

            Button(action: {}) {
                Image(systemName: "home.fill")
                    .font(.title)
            }

            Spacer()

            Button(action: {}) {
                Image(systemName: "gear")
                    .font(.title)
            }

            Spacer()

            Button(action: {}) {
                Image(systemName: "bell.fill")
                    .font(.title)
            }

            Spacer()

            Button(action: {}) {
                Image(systemName: "person.circle.fill")
                    .font(.title)
            }
        }
        .foregroundColor(.white)
        .padding()
        .background(Color.indigo)
        .cornerRadius(12)
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `HStack` organiza elementos horizontalmente.

Cada `Spacer()` ocupa todo o espaço livre disponível entre os elementos vizinhos.

Quanto mais `Spacer()` forem adicionados, mais uniforme será a distribuição dos componentes ao longo da linha.

Neste exemplo:

- os botões são posicionados lado a lado;
- os `Spacer()` distribuem os ícones pela largura disponível;
- `padding()` adiciona espaço interno;
- `background()` define a cor de fundo;
- `cornerRadius()` arredonda os cantos da barra.

:::

---

## Explorando o Spacer

Remova os `Spacer()` do código:

```swift
HStack {
    Image(systemName: "home.fill")
    Image(systemName: "gear")
    Image(systemName: "person.circle.fill")
}
```

Resultado:

```text
🏠⚙️👤
```

Agora adicione os `Spacer()`:

```swift
HStack {
    Image(systemName: "home.fill")

    Spacer()

    Image(systemName: "gear")

    Spacer()

    Image(systemName: "person.circle.fill")
}
```

Resultado:

```text
🏠           ⚙️           👤
```

Observe como os elementos passam a ocupar toda a largura disponível.

---

## Desafio extra

Tente reproduzir a barra abaixo:

```text
+--------------------------------------+
| ☰                          🔍 ⚙️ |
+--------------------------------------+
```

Dicas:

- Utilize apenas um `Spacer()`;
- Adicione um `HStack` interno para agrupar os ícones da direita;
- Experimente utilizar `.spacing()` para controlar a distância entre eles.

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

- como organizar elementos horizontalmente;
- como distribuir espaço utilizando `Spacer()`;
- como criar barras de navegação simples;
- como combinar botões e ícones em layouts SwiftUI.

:::tip Relação com SwiftUI real

O padrão `HStack + Spacer()` é extremamente comum em SwiftUI.

Você o encontrará frequentemente em:

- barras de navegação customizadas;
- cabeçalhos de telas;
- cards;
- linhas de listas;
- barras inferiores de navegação.


:::

---


### Exercício 3: VStack e Estilização

**Tópico:** Layout vertical com `VStack`

---

## Objetivo do exercício

O objetivo deste exercício é compreender como utilizar o `VStack` para organizar elementos verticalmente e aplicar modificadores visuais para criar interfaces mais agradáveis e profissionais.

Ao final do exercício, você deverá construir um cartão de perfil contendo:

* nome do usuário;
* descrição;
* botão de ação;
* espaçamentos adequados;
* cantos arredondados;
* sombra para destacar o conteúdo.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

* `VStack`
* `Text`
* `Button`
* `padding`
* `background`
* `cornerRadius`
* `shadow`
* `font`
* `foregroundColor`

---

## Código-base

```swift
import SwiftUI

struct VStackExample: View {
    var body: some View {

        VStack(alignment: .center, spacing: 15) {

            Text("Nome do Usuário")
                .font(.title)
                .fontWeight(.heavy)

            Text("Este é o meu perfil. Eu amo programação SwiftUI!")
                .font(.subheadline)
                .foregroundColor(.secondary)

            Button("Editar Perfil") {
                print("Ação de edição realizada.")
            }
            .buttonStyle(.borderedProminent)
            .padding(.top, 20)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(15)
        .shadow(radius: 10)
    }
}
```

---

## Entendendo a interface

O código produz um cartão semelhante ao seguinte:

```text
+----------------------------------+
|                                  |
|      Nome do Usuário             |
|                                  |
| Este é o meu perfil. Eu amo      |
| programação SwiftUI!             |
|                                  |
|      [ Editar Perfil ]           |
|                                  |
+----------------------------------+
```

O `VStack` organiza todos os elementos verticalmente, um abaixo do outro.

---

## Desafio

Modifique o código para:

1. Adicionar uma foto de perfil acima do nome;
2. Alterar a cor de fundo do cartão;
3. Aumentar o espaçamento entre os elementos;
4. Adicionar um segundo botão chamado "Compartilhar Perfil";
5. Personalizar a sombra do cartão.

---

## Solução sugerida

```swift
import SwiftUI

struct VStackExample: View {
    var body: some View {

        VStack(spacing: 25) {

            Image(systemName: "person.crop.circle.fill")
                .font(.system(size: 80))
                .foregroundColor(.blue)

            Text("Nome do Usuário")
                .font(.title)
                .fontWeight(.bold)

            Text("Este é o meu perfil. Eu amo programação SwiftUI!")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Button("Editar Perfil") {
                print("Editar")
            }
            .buttonStyle(.borderedProminent)

            Button("Compartilhar Perfil") {
                print("Compartilhar")
            }
            .buttonStyle(.bordered)
        }
        .padding(30)
        .background(Color.blue.opacity(0.1))
        .cornerRadius(20)
        .shadow(radius: 15)
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `VStack` é o principal contêiner vertical do SwiftUI.

Todos os elementos adicionados dentro dele são posicionados de cima para baixo.

Neste exemplo:

* a imagem aparece primeiro;
* o nome é exibido logo abaixo;
* a descrição aparece em seguida;
* os botões ficam na parte inferior do cartão.

O parâmetro `spacing` controla a distância entre os elementos.

Quanto maior o valor, maior será o espaço vertical entre os componentes.

:::

---

## Explorando o alinhamento

O `VStack` permite alterar o alinhamento dos seus elementos.

### Alinhamento central (padrão)

```swift
VStack(alignment: .center) {
    Text("Nome")
    Text("Descrição")
}
```

Resultado:

```text
      Nome
   Descrição
```

---

### Alinhamento à esquerda

```swift
VStack(alignment: .leading) {
    Text("Nome")
    Text("Descrição")
}
```

Resultado:

```text
Nome
Descrição
```

---

### Alinhamento à direita

```swift
VStack(alignment: .trailing) {
    Text("Nome")
    Text("Descrição")
}
```

Resultado:

```text
        Nome
   Descrição
```

---

## Explorando o spacing

Observe a diferença entre:

```swift
VStack(spacing: 5)
```

e

```swift
VStack(spacing: 30)
```

Com um valor pequeno:

```text
Nome
Descrição
Botão
```

Com um valor maior:

```text
Nome


Descrição


Botão
```

O espaçamento influencia diretamente a legibilidade da interface.

---

## Desafio extra

Transforme o cartão em um perfil mais completo adicionando:

* foto;
* nome;
* cargo;
* e-mail;
* telefone;
* botão de contato.

Exemplo visual:

```text
+--------------------------------+
|             👤                |
|                                |
|       João da Silva            |
|      Desenvolvedor iOS         |
|                                |
|  joao@email.com                |
|  (11) 99999-9999               |
|                                |
|      [ Entrar em Contato ]     |
+--------------------------------+
```

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

* como organizar componentes verticalmente;
* como controlar espaçamento entre elementos;
* como criar cartões utilizando `background`;
* como arredondar bordas com `cornerRadius`;
* como adicionar profundidade utilizando `shadow`.

:::tip Relação com SwiftUI real

O padrão `VStack + padding + background + shadow` é extremamente comum em SwiftUI.

Ele é utilizado para criar:

* cartões de perfil;
* cards de produtos;
* componentes de dashboard;
* listas personalizadas;
* widgets.


:::

---

### Exercício 4: Estilização de Texto

**Tópico:** Modificadores de texto e estilização visual

---

## Objetivo do exercício

O objetivo deste exercício é compreender como utilizar modificadores do SwiftUI para alterar a aparência de textos.

Ao final da atividade, você deverá ser capaz de:

* alterar tamanhos de fonte;
* aplicar pesos diferentes às fontes;
* modificar cores;
* adicionar espaçamentos;
* criar hierarquias visuais entre elementos textuais.

Esses conceitos são fundamentais para a construção de interfaces modernas e legíveis.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

* `Text`
* `font`
* `fontWeight`
* `foregroundColor`
* `padding`
* `VStack`
* Hierarquia visual
* Modificadores de Views

---

## Código-base

```swift
import SwiftUI

struct TextStylingExample: View {
    var body: some View {

        VStack(spacing: 20) {

            Text("Título Básico")
                .font(.largeTitle)
                .foregroundColor(.primary)

            Text("Texto de Destaque")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.orange)
                .padding()

            Text("Detalhes")
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}
```

---

## Entendendo a interface

O resultado visual será semelhante a:

```text
TÍTULO BÁSICO

Texto de Destaque

Detalhes
```

Observe que cada texto possui um papel diferente na interface:

* o primeiro representa o título principal;
* o segundo chama a atenção do usuário;
* o terceiro apresenta informações secundárias.

---

## O que são modificadores?

Em SwiftUI, praticamente toda personalização é realizada através de modificadores.

Exemplo:

```swift
Text("Olá")
    .font(.title)
    .foregroundColor(.blue)
    .padding()
```

Cada modificador recebe a View anterior e retorna uma nova versão modificada.

Visualmente:

```text
Text
  ↓
font()
  ↓
foregroundColor()
  ↓
padding()
```

Essa abordagem é chamada de *Modifier Chain*.

---

## Desafio

Modifique o código para:

1. Criar um subtítulo abaixo do título principal;
2. Alterar a cor do texto de destaque para vermelho;
3. Utilizar uma fonte maior para o texto principal;
4. Adicionar um fundo colorido ao texto de destaque;
5. Centralizar todos os elementos da tela.

---

## Solução sugerida

```swift
import SwiftUI

struct TextStylingExample: View {
    var body: some View {

        VStack(spacing: 20) {

            Text("Título Principal")
                .font(.system(size: 40))
                .fontWeight(.bold)

            Text("Meu Subtítulo")
                .font(.title3)
                .foregroundColor(.secondary)

            Text("Texto de Destaque")
                .font(.title2)
                .fontWeight(.heavy)
                .foregroundColor(.white)
                .padding()
                .background(Color.red)
                .cornerRadius(10)

            Text("Detalhes")
                .font(.caption)
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity,
               maxHeight: .infinity)
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O SwiftUI utiliza modificadores para alterar a aparência das Views.

Neste exemplo:

* `font()` altera o tamanho da fonte;
* `fontWeight()` altera o peso da fonte;
* `foregroundColor()` altera a cor do texto;
* `padding()` cria espaço ao redor do conteúdo;
* `background()` adiciona uma cor de fundo;
* `cornerRadius()` arredonda os cantos do fundo.

A combinação desses modificadores permite criar componentes visualmente mais atraentes.

:::

---

## Explorando tamanhos de fonte

SwiftUI oferece diversos tamanhos pré-definidos.

```swift
Text("Large Title")
    .font(.largeTitle)

Text("Title")
    .font(.title)

Text("Headline")
    .font(.headline)

Text("Body")
    .font(.body)

Text("Caption")
    .font(.caption)
```

Visualmente:

```text
LARGE TITLE

Title

Headline

Body

caption
```

Esses estilos ajudam a manter consistência visual em toda a aplicação.

---

## Explorando pesos da fonte

O modificador `fontWeight()` permite alterar a espessura do texto.

```swift
Text("Light")
    .fontWeight(.light)

Text("Regular")
    .fontWeight(.regular)

Text("Bold")
    .fontWeight(.bold)

Text("Heavy")
    .fontWeight(.heavy)
```

Resultado aproximado:

```text
Light
Regular
Bold
HEAVY
```

---

## Explorando cores

SwiftUI possui diversas cores prontas.

```swift
.foregroundColor(.blue)
.foregroundColor(.red)
.foregroundColor(.green)
.foregroundColor(.orange)
.foregroundColor(.purple)
```

Também é possível criar cores customizadas.

```swift
.foregroundColor(
    Color(
        red: 0.2,
        green: 0.5,
        blue: 0.8
    )
)
```

---

## Explorando o padding

Sem padding:

```swift
Text("Exemplo")
    .background(Color.yellow)
```

Resultado:

```text
[Exemplo]
```

Com padding:

```swift
Text("Exemplo")
    .padding()
    .background(Color.yellow)
```

Resultado:

```text
[   Exemplo   ]
```

O conteúdo ganha espaço interno e melhora sua aparência visual.

---

## Desafio extra

Crie uma tela de boas-vindas semelhante à seguinte:

```text
---------------------------------

        Bem-vindo!

Aprenda SwiftUI de forma prática

      [ Começar ]

---------------------------------
```

Requisitos:

* título grande;
* subtítulo centralizado;
* botão destacado;
* cores personalizadas;
* espaçamento adequado.

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

* como modificar textos em SwiftUI;
* como criar hierarquias visuais;
* como combinar múltiplos modificadores;
* como estilizar componentes utilizando apenas código.

:::tip Relação com SwiftUI real

Praticamente toda interface SwiftUI utiliza modificadores de texto.

Você encontrará esses conceitos em:

* títulos de telas;
* menus;
* listas;
* formulários;
* dashboards;
* aplicativos corporativos.

:::

---

### Exercício 5: Color e Shape

**Tópico:** Estilização com cores e formas geométricas

---

## Objetivo do exercício

O objetivo deste exercício é compreender como utilizar cores e formas geométricas no SwiftUI para criar componentes visuais mais atrativos.

Ao final da atividade, você deverá ser capaz de:

* utilizar a View `Color`;
* aplicar cores em componentes;
* utilizar formas geométricas (*Shapes*);
* arredondar bordas;
* adicionar sombras;
* criar cartões visuais personalizados.

Esses recursos são amplamente utilizados na construção de interfaces modernas.

---

## Conceitos envolvidos

:::info Conceitos trabalhados

Neste exercício serão praticados:

* `Color`
* `Rectangle`
* `fill`
* `frame`
* `cornerRadius`
* `shadow`
* `VStack`
* Personalização visual

---

## Código-base

```swift
import SwiftUI

struct ColorShapeExample: View {
    var body: some View {

        VStack {

            Text("Cartão de Estilo")
                .font(.title2)
                .padding()

            Rectangle()
                .fill(Color.purple)
                .frame(width: 250, height: 150)
                .cornerRadius(20)
                .shadow(radius: 5)
        }
    }
}
```

---

## Entendendo a interface

O código produz uma interface semelhante a:

```text
+----------------------+
|                      |
|   Cartão de Estilo   |
|                      |
|  ┌───────────────┐   |
|  │               │   |
|  │   Retângulo   │   |
|  │    Roxo       │   |
|  │               │   |
|  └───────────────┘   |
|                      |
+----------------------+
```

O retângulo recebe uma cor, cantos arredondados e uma sombra para destacar-se visualmente.

---

## O que são Shapes?

SwiftUI fornece diversas formas geométricas prontas.

Algumas das mais utilizadas são:

```swift
Rectangle()

RoundedRectangle(cornerRadius: 20)

Circle()

Ellipse()

Capsule()
```

Cada uma delas pode ser estilizada com cores, gradientes, bordas e sombras.

---

## Explorando Shapes

### Rectangle

```swift
Rectangle()
    .fill(.blue)
```

Resultado:

```text
+------------+
|            |
|            |
+------------+
```

---

### RoundedRectangle

```swift
RoundedRectangle(cornerRadius: 20)
    .fill(.green)
```

Resultado:

```text
/------------\
|            |
|            |
\------------/
```

---

### Circle

```swift
Circle()
    .fill(.red)
```

Resultado:

```text
   *****
 *       *
 *       *
   *****
```

---

### Capsule

```swift
Capsule()
    .fill(.orange)
```

Resultado:

```text
(------------)
```

---

## Desafio

Modifique o código para:

1. Trocar o `Rectangle` por um `RoundedRectangle`;
2. Alterar a cor para azul;
3. Aumentar o tamanho do cartão;
4. Adicionar um texto sobre a forma;
5. Tornar a sombra mais evidente.

---

## Solução sugerida

```swift
import SwiftUI

struct ColorShapeExample: View {
    var body: some View {

        VStack {

            Text("Meu Cartão")
                .font(.title)

            ZStack {

                RoundedRectangle(cornerRadius: 30)
                    .fill(Color.blue)
                    .frame(width: 300, height: 180)
                    .shadow(radius: 15)

                Text("SwiftUI")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
        }
    }
}
```

---

## Solução comentada

:::tip Entendendo a solução

O `RoundedRectangle` funciona de forma semelhante ao `Rectangle`, porém com cantos arredondados.

Neste exemplo:

* a forma é utilizada como plano de fundo;
* o `ZStack` permite posicionar o texto sobre a forma;
* a sombra aumenta a sensação de profundidade;
* a cor azul destaca o cartão.

Esse padrão é muito utilizado em dashboards e aplicativos corporativos.

:::

---

## Trabalhando com cores

SwiftUI oferece diversas cores prontas.

```swift
Color.red

Color.blue

Color.green

Color.orange

Color.purple

Color.gray
```

Também é possível criar cores personalizadas:

```swift
Color(
    red: 0.2,
    green: 0.4,
    blue: 0.8
)
```

---

## Trabalhando com sombras

Uma sombra simples:

```swift
.shadow(radius: 5)
```

Uma sombra mais personalizada:

```swift
.shadow(
    color: .black.opacity(0.3),
    radius: 10,
    x: 5,
    y: 5
)
```

Parâmetros:

| Parâmetro | Função                  |
| --------- | ----------------------- |
| color     | Cor da sombra           |
| radius    | Intensidade do desfoque |
| x         | Deslocamento horizontal |
| y         | Deslocamento vertical   |

---

## Trabalhando com bordas arredondadas

Sem arredondamento:

```swift
Rectangle()
```

Resultado:

```text
+----------+
|          |
+----------+
```

Com arredondamento:

```swift
RoundedRectangle(cornerRadius: 20)
```

Resultado:

```text
/----------\
|          |
\----------/
```

O uso de cantos arredondados é um dos elementos mais comuns do design moderno.

---

## Desafio extra

Crie um cartão de produto semelhante ao seguinte:

```text
+--------------------------+
|                          |
|       📱 Produto         |
|                          |
|   Smartphone XYZ         |
|                          |
|      R$ 2.999,00         |
|                          |
+--------------------------+
```

Requisitos:

* utilizar `RoundedRectangle`;
* exibir um ícone;
* exibir nome e preço;
* aplicar sombra;
* utilizar cores personalizadas.

---

## Resultado esperado

Ao final do exercício, você deverá compreender:

* como utilizar formas geométricas;
* como aplicar cores;
* como criar cartões personalizados;
* como adicionar profundidade através de sombras;
* como utilizar formas como elementos visuais da interface.

:::tip Relação com SwiftUI real

Shapes são utilizados em praticamente qualquer aplicação SwiftUI.

Você encontrará esses componentes em:

* cartões;
* botões;
* dashboards;
* gráficos;
* indicadores visuais;
* widgets.

:::
