---
sidebar_position: 1
slug: /rn-introducao
title: "Introdução ao Desenvolvimento com React Native"
---

Pessoal aqui vamos avaliar e estudar como podemos utilizar a ferramenta React Native para criar nossos projetos mobile. Para isso, vamos estudar alguns conceitos importantes primeiro e verificar como eles podem ser utilizados para a criação de aplicativos. Existe uma máxima no desenvolvimento mobile que é: "A melhor maneira de aprender a desenvolver algo mobile é fazendo", vamos seguir bastante essa máxima para diversos pontos ao longo do material.

Lembrem, você podem e devem mandar eventuais dúvidas e conquistas que vocês tiverem enquanto desenvolvendo! Não deixem de compartilhar [aqui](https://www.linkedin.com/in/murilo-zanini-de-carvalho-0980415b/).


## 1. Configuração do Ambiente de Desenvolvimento

Pessoal para iniciarmos o nosso desenvolvimento com o React Native, primeiro precisamos de alguns elementos configurados em nossa máquina. Primeiro é importante lembrar que vamos utilizar o Expo CLI para fazer nosso desenvolvimento.

> "Mas Murilão, qual o impacto disso?"

Ótima pergunta! O impacto disso é que o Expo CLI vai facilitar muito a nossa vida, pois ele já vem com uma série de ferramentas e bibliotecas que vão nos ajudar a desenvolver nossos aplicativos. Além disso, ele também vai nos ajudar a testar nossos aplicativos em dispositivos reais, sem precisar de um emulador ou simulador. Mas calma que vamos iniciar nossa configuração com a instalação do emulador de Android. Cabe destacar mais uma vantagem: utilizando o Expo CLI, além de não ser necessário nenhuma outra ferramenta além do `Node.js`, o aplicativo pode ser testado em qualquer dispositivo Android ou iOS, mesmo que a máquina de desenvolvimento não seja um Mac. Isso pode parecer um detalhe, mas é um divisor de águas caso você esteja iniciando no desenvolvimento mobile e não tenha um Mac, mas um dispositivo iOS.

> "Murilo, calma ae! Você está falando que o primeiro passo que vamos fazer é opcional?"

Sim, pois podemos desenvolver diretamente com nossos dispositivos físicos. Contudo, pode ser que a pessoa desenvolvedora não deseje utilizar seu próprio dispositivo para isso. Portanto, vamos configurar um emulador Android para facilitar o nosso desenvolvimento.

### 1.1 Instalação do Android Studio

> "Eita eu li corretamente? Android Studio? Não vamos utilizar o React Native e o Expo CLI?"

Calma meu amigo e minha amiga! Vocês estão corretos, mas o Android Studio, além de ser uma excelente IDE para desenvolvimento, é a maneira mais simples e rápida de configurar um emulador Android. Portanto, vamos utilizar ele para isso. Para isso, vamos até o site do Android Studio e baixar a versão compatível com nosso sistema operacional.

- Link Android Studio: [site oficial](https://developer.android.com/studio?hl=pt-br)

No momento que eu estou escrevendo este artigo (2025-05-05), a versão estável mais recente do Android Studio é a versão `2024.3.1 Patch 2`. Fazer o downland e a instalação dele. Para o download, apenas verificar a versão que é compatível com seu sistema operacional.

### 1.2 Instalação do nvm

O `nvm` - Node Version Manager, é uma maneira de instalar o `Node.js` que possibilita gerenciar diferentes versões em nosso sistema operacional. Por que isso é importante? Pois diferentes versões de requisitos são geralmente uma demanda quanto trabalhamos com diferentes projetos com o `Node.js`, desta forma temos uma maneira de gerenciar essas diferentes instalações em nosso sistema operacional.

Primeiro, vamos no site do projeto para realizar sua download e instalação. Site oficial [aqui](https://github.com/nvm-sh/nvm).

:::note[Para o Windows]

A solução foi desenvolvida para sistema UNIX. A primeira solução é utilizar ele dentro do WSL, quando estiver no sistema Windows. Outra alternativa, é verificar o projeto [*NVM for Windows*](https://github.com/coreybutler/nvm-windows).

:::

Para fazer a instalação do versão necessária do `Node.js`, que pelo site do React Native é para utilizarmos uma versão LTS mais recente, vamos utilizar os comandos:

```sh
# Instala a última versão LTS
nvm install --lts
# Configura ela como a versão atual do Node
nvm use --lts
# Verifica se a versão correta foi instalada
node -version
```

Agora estamos prontos para iniciar o desenvolvimento!



