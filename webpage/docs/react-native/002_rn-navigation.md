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

Vamos entrar no diretório da nossa solução.