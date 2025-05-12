---
sidebar_position: 3
slug: /rn-navigation
title: "Navegação com React Native"
---

Pessoal, aqui vamos discutir um ponto muito importante: como fazer nossa aplicação ter mais de uma tela e como acessar essas telas. Existem algumas maneiras que podemos fazer isso de algumas maneiras. Vamos discutir como ao longo desta seção.

<!-- Para guardar: -->
<!-- <img src="https://64.media.tumblr.com/1410879ae6d00e77f5dbe27c03f252fc/tumblr_inline_ofgcs4tnDi1r5ight_400.gifv" alt="Gai sensei and Rock Lee Training" style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} /> -->

## 1. A navegação

Diversas vezes, nos deparamos com situações que nos fazem pensar: Caramba, eu poderia construir um aplicativo para isso que deixaria a sua utilização muito melhor. Pensamos no fluxo do usuário utilizando a aplicação e como ele estaria navegando entre elas. Quando estamos imaginando nossa aplicação, um caso comum é pensarmos ela já com diversas telas.

:::tip[Navegação em Sistemas Mobile]

- Navegação no Android: [link](https://developer.android.com/guide/navigation/principles?hl=pt-br);
- Navegação no IOs: [link](https://developer.apple.com/documentation/swiftui/navigation).

:::

Portando, precisamos conhecer como podemos fazer com que esse processo possa acontecer! No React Native, podemos fazer isso de algumas formas:
- **Trocando as telas manualmente:** modo de trabalho extremamente não recomendado. Ele só poderia ser utilizado em fluxos muito pequenos e toda a lógica de navegação entre telas precisaria ser implementada manualmente. 
- **React Navigation:** oferece diferentes tipos de navegadores (Stack, Tab, Drawer) e uma API flexível para gerenciar as telas e a transição entre elas. No entanto, configurar o React Navigation, definir as rotas, passar parâmetros e lidar com deep linking pode gerar uma quantidade considerável de código boilerplate e se tornar complexo em aplicações maiores.
- **Expo Router:**  surge como uma solução para simplificar e padronizar o processo de navegação em aplicações React Native, buscando trazer uma experiência mais próxima do desenvolvimento web com roteamento baseado em sistema de arquivos (como Next.js faz para a web). Ele é uma abstração construída sobre o React Navigation. A motivação principal por trás do Expo Router foi reduzir a complexidade da configuração e do gerenciamento de rotas, permitindo que os desenvolvedores se concentrem na lógica das telas, e não na infraestrutura de navegação.

:::danger[Cuidado, Web e Mobile não são a mesma coisa para navegação]

Para quem vem do desenvolvimento web, a navegação em aplicações mobile nativas (ou que compilam para nativo, como React Native) pode parecer um pouco diferente. Não temos o conceito intrínseco de URLs navegáveis controladas pelo navegador. Em React Native, a navegação é geralmente gerenciada por bibliotecas de terceiros que interagem com as APIs de navegação nativas de cada plataforma (iOS e Android).

:::

O Expo Router traz uma simplificação e padronização para o processo de navegação nas aplicações com esta camada de abstração adicionada. Vamos compreender alguns pontos primeiro sobre como utilizar este elemento.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Yh6Qlg2CYwQ?si=JzqlNicCRXwicwwa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

## 2. Projeto Inicial com Expo Router

Vamos iniciar nosso projeto primeiro com algumas considerações. A maior delas é que o template básico do React Native, não traz o Expo Router configurado inicialmente. Temos algumas opções aqui, como utilizar outro template, ou configurar manualmente o projeto. Vamos optar pela segunda opção!

Primeiro, vamos criar nosso projeto:

```sh
npx create-expo-app muda-tela --template blank
```

Vamos entrar no diretório da nossa solução. Seguindo os passos para adicionar o Expo Router, presentes na [documentação](https://docs.expo.dev/router/installation/), vamos adicionar a seguinte linha no terminal:

```sh
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

> "Calma lá Murilão, o que acabamos de fazer aqui?"

Aqui meus amigos e amigas, acabamos de adicionar uma dependência ao nosso aplicativo. Mas ainda precisamos ajustar mais algumas configurações. Vamos verificar o que cada um destes pacotes faz:

1. **expo-router:** é o pacote principal. Ele fornece a lógica de roteamento baseada em sistema de arquivos que discutimos anteriormente. Inclui o CLI para configurar o roteador, o componente link para navegação declarativa, o hook useRouter para navegação programática e a estrutura que lê o diretório app para definir suas rotas.

2. **react-native-safe-area-context:** Fornece uma maneira de obter as dimensões da "área segura" do dispositivo. A área segura é a parte visível da tela que não é obscurecida por elementos do sistema como a barra de status, entalhes ("notches"), indicadores de início (em iPhones mais recentes) ou teclados virtuais.
 Bibliotecas de navegação (incluindo o React Navigation, no qual o Expo Router se baseia) precisam saber sobre a área segura para renderizar corretamente seus componentes (cabeçalhos, barras de abas) de forma que o conteúdo da sua aplicação não fique escondido por esses elementos do sistema operacional. Este pacote fornece os valores de preenchimento (padding) necessários para ajustar o layout.

3. **react-native-screens:** Expõe as primitivas de tela nativas do iOS e Android para o React Native. Em vez de usar views JavaScript genéricas para representar suas telas, ela utiliza contêineres de tela nativos. Usar telas nativas melhora significativamente a performance e a experiência do usuário em aplicações React Native. Elas permitem que as transições entre telas sejam mais fluidas e responsivas, utilizem gestos nativos (como o gesto de voltar no iOS) e otimizem o uso de memória, pois as telas fora de foco podem ser descarregadas nativamente. O React Navigation (e, portanto, o Expo Router) utiliza react-native-screens para criar Stack Navigators, Drawer Navigators e outros navegadores que se comportam mais como seus equivalentes nativos.

4. **expo-linking:** Fornece funcionalidades para lidar com linking profundo (deep linking) e linking universal na sua aplicação Expo/React Native. Ele permite que você configure sua aplicação para responder a URIs específicas (como myapp://some/path ou links HTTP/HTTPS que abrem o app). Como o Expo Router é baseado em rotas (caminhos URI), expo-linking é faz com que esses caminhos sejam acessíveis externamente à aplicação. Ele é a ponte que captura um URI externo e o entrega ao sistema de roteamento do Expo Router para que ele navegue para a tela correspondente.

5. **expo-constants:** fornece acesso a informações constantes sobre o ambiente de execução e o manifesto do aplicativo Expo (como nome do app, ID do projeto, esquema de URI, etc.). Embora não seja diretamente parte da lógica de navegação, o expo-constants é frequentemente usado por outros pacotes do Expo, incluindo o expo-linking (para obter o esquema URI do app, por exemplo), e pode ser útil para lógica de roteamento que dependa do ambiente. É um pacote utilitário comum no ecossistema Expo.

6. **expo-status-bar:** Este pacote fornece um componente (`StatusBar`) e hooks para controlar a aparência da barra de status do dispositivo (cor do texto/ícones, cor de fundo) a partir do JavaScript em sua aplicação React Native. Por que instalar com o router: Embora também não seja estritamente parte do mecanismo de roteamento, a barra de status é um elemento de UI que tipicamente muda de estilo dependendo da tela atual. Ao configurar a navegação, é muito comum querer controlar a barra de status por tela (ou por grupo de telas via layout). Incluí-lo na instalação inicial facilita essa configuração comum dentro do contexto das rotas e layouts definidos pelo Expo Router.

:::tip[Instalar outros pacotes no projeto]

Pessoal é comum instalar outros pacotes de terceiros ou mesmo pacotes abertos da comunidade. Lembrem-se sempre de verificar se o pacote é seguro e da referência desejada.

<iframe width="560" height="315" src="https://www.youtube.com/embed/gjzf295b7ug?si=SUOHSaSCzG2GIZJH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

:::

Agora, com os pacotes instalados, vamos informar no nosso projeto que vamos fazer algumas alterações nos arquivos de configuração. No arquivo `package.json`, vamos alterar a chave `main`, para `expo-router/entry`. Assim, estamos indicando que nossa aplicação agora segue o ponto inicial da aplicação como `app/index.js`. Mais sobre esse ponto em alguns parágrafos. O arquivo completo:

```json
{
  "name": "muda-tela",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~53.0.9",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-native": "0.79.2",
    "expo-router": "~5.0.6",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.10.0",
    "expo-linking": "~7.1.4",
    "expo-constants": "~17.1.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

Ponto importante nesse momento: precisamos ajustar a estrutura do nosso projeto e terminar de configurar nossa aplicação. Primeiro vamos terminar de configurar o deeplink do projeto. O Deeplink permite que outros aplicativos consigam enviar links e que eles possam ser abertos dentro da nossa aplicação. Por hora, não vamos colocar energia neles. Apenas vamos deixar ele configurado no arquivo `app.config`. Adicionamos, logo depois do `slug`, a linha: `"scheme": "meu-app-multi-tela",`, o arquivo ficará com a seguinte aparência: 

```json
{
  "expo": {
    "name": "muda-tela",
    "slug": "muda-tela",
    "scheme": "meu-app-multi-tela",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

Se não estivermos construindo um projeto que também tem suporte para Web (mesmo code base), não vamos adicionar o Bundle Web para a build. Agora, vamos organizar a estrutura de pastas da aplicação. Vamos colocar todo o nosso código dentro do diretório `src`. Isso permite que ele fique organizado e que os arquivos do projeto possam ficar separados dos arquivos de configuração. Agora, muito importante: o Expo Router, utiliza o sistema de arquivos e diretório de dentro do diretório `app`.

> "Mas Murilo, o que isso significa?"

Isso significa que todas as nossas telas vão ficar neste diretório. Vamos criar primeiro o arquivo `index.js` e adicionar todo o conteúdo do arquivo `App.js` para ele.

```js
// src/app/index.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Minha Tela Inicial</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```

Para testar nossa aplicação, vamos utilizar o seguinte comando:

```bash
npx expo start --clear
```

Aqui, o ponto diferente é que como instalamos bibliotecas externas, é uma boa prática limpar qualquer cache que possa ter ficado. Quando a aplicação for executada, temos nossa base para fazer a navegação.


## 3. Construindo mais telas para navegar

Agora, vamos dentro do diretório `src\app\`, criar uma nova tela, que vamos chamar de segunda tela. Ela é uma tela que pode ser igual a primeira, mas com o texto dela indicando que é uma tela diferente:

```js

```

