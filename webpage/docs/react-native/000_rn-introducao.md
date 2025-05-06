---
sidebar_position: 1
slug: /rn-introducao
title: "Introdução ao Desenvolvimento com React Native"
---

Pessoal aqui vamos avaliar e estudar como podemos utilizar a ferramenta React Native para criar nossos projetos mobile. Para isso, vamos estudar alguns conceitos importantes primeiro e verificar como eles podem ser utilizados para a criação de aplicativos. Existe uma máxima no desenvolvimento mobile que é: "A melhor maneira de aprender a desenvolver algo mobile é fazendo", vamos seguir bastante essa máxima para diversos pontos ao longo do material.

Lembrem, você podem e devem mandar eventuais dúvidas e conquistas que vocês tiverem enquanto desenvolvendo! Não deixem de compartilhar [aqui](https://www.linkedin.com/in/murilo-zanini-de-carvalho-0980415b/).


## 1. Configuração do Ambiente de Desenvolvimento

:::warning[Dica do professor Linguine 🤓☝]
Caso o seu querido computador possuir um firewall que não deva ser desligado e que bloqueie a exposição de serviços na rede, o **Expo Go** (versão para acessar o app diretamente do celular) pode não funcionar corretamente. Nesses casos, recomenda-se o uso de um sistema operacional que permita contornar essas restrições, como o **Ubuntu**.
:::

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

No momento da instalação, deixar selecionado que além do Android Studio, desejamos instalar um `Android Virtual Device` (esse é o principal motivo de estarmos realizando está instalação). Terminada a instalação, execute o Android Studio pela primeira vez. Na tela `Install Type`, selecionar `Custom`, para verificar quais elementos serão instalados juntos ao sistema. Verificar que o `Android Virtual Device` está selecionado e, para quem estiver utilizando o sistema operacional Windows (se não me engano é apenas nele), que a opção `Performance (Android Emulator hypervisor driver)` também está instalada. Você será apresentado ao License Agreement para utilizar o sistema e um novo download irá acontecer.

Uma vez que o Android Studio tiver terminado de baixar todos os pacotes necessários, é hora de lançar o emulador. Para isso selecionar `More Actions` e selecionar `Virtual Device Manager`.

<img
  src={require('/img/instalacao/iniciar-avd-manager.png').default}
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Nesta tela, podemos criar um novo dispositivo (pequeno sinal de `+` no canto superior esquerdo da tela) e lançar os dispositivos já criados. Neste caso, vou iniciar o dispositivo que foi criado junto a instalação do Android Studio. Basta clicar no botão de `play` ao lado do dispositivo.

<img
  src={require('/img/instalacao/emulador-android.png').default}
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Agora temos nosso emulador pronto para utilizar 🤖🎉☕!



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

Agora estamos prontos para iniciar o desenvolvimento! Vamos testar nosso `ola mundo`.

<img src='https://media.tenor.com/AlLJYGZ8YrYAAAAM/ready-to-go-spongebob.gif' alt='Bob esponja dizendo que está pronto'
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />

## 2. Executando Primeiro Programa

Agora vamos executar nosso primeiro programa! Para isso, vamos realizar algumas ações. A primeira delas, vamos verificar se o nosso emulador está rodando.

> "Mas Murilão eu quero testar no meu dispositivo! Tem problema?"

De forma alguma! Recomendo fazer o teste no emulador para garantir que você tem um forma de testar seus aplicativos apenas utilizando seu computador de desenvolvimento e também porque as vezes ... seu celular não estará com você, ele pode estar em terras longínquas, como o outro lado da sala.

:::note[Aplicativo Expo Go]

Pessoal quem for testar no seu próprio dispositivo, será necessário utilizar um aplicativo chamado `Expo Go`. Ele está disponível para o Android e para o iOS nas lojas respectivas de cada sistema operacional. Aqui, temos um detalhe bastante interessante: o funcionamento do Expo Go. O que o aplicativo faz é realizar o download do bundle JS do aplicativo que estamos desenvolvendo. Ele realiza essa ação baixando os dados para cache local do aplicativo. ***IMPORTANTE:*** para que este fluxo funcione, tanto o computador de desenvolvimento quanto o dispositivo precisam estar na mesma rede local.

<img src='https://retool.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fbclf52sw%2Fproduction%2F45f62b4cbf30f60d8be42ef7b9f7973f0c204844-1400x494.webp&w=3840&q=75' alt='Fluxo de download do aplicativo para o Expo Go'
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />

Não existe um tempo de validade específico para o cache do Expo Go, portanto, uma vez baixado, o aplicativo pode ser utilizado mesmo que o servidor de desenvolvimento tenha sido desligado. ***CUIDADO:*** Isso não é equivalente a baixar o aplicativo, é apenas uma forma de testar algumas interações com ele. Vamos compilar o aplicativo posteriormente.

<iframe width="560" height="315" src="https://www.youtube.com/embed/vFW_TxKLyrE?si=bvWhENtPiCxrm9zm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>

:::

Primeiro, vamos estudar como criar nossos aplicativos utilizando JavaScript, depois vamos verificar como mudar para TypeScript e outras coisas. Vamos focar agora nos primeiros elementos para realizar está criação. No terminal, utilizar o comando:

```sh
npx create-expo-app ola-mundo --template blank
```

O que fizemos aqui foi criar um diretório chamado `ola-mundo` que vai armazenar nosso projeto. Outro ponto importante de se observar: `--template blank`, o que está flag está dizendo é que desejamos utilizar o template de JavaScript do React Native. Para ver mais templates disponíveis, verificar [aqui](https://docs.expo.dev/more/create-expo/). 

:::danger[Cuidado quando com controle de versão]

Por padrão, os projetos criados com o Expo trazem o controle de versão com o Git. Isso é muito bom, mas também traz um cuidado adicional quando o projeto for adicionado em um repositório já existente. A utilização de [`submodules`](https://github.blog/open-source/git/working-with-submodules/) é muito boa quando trabalhamos com projetos em repositórios distintos. Minha recomendação, quando for utilizar o projeto dentro de outro repositório, é apenas remover o diretório `.git` do projeto criado com o Expo. 

:::

Antes de verificarmos a estrutura do nosso projeto, vamos verificar se ele está funcionando! Para isso, vamos utilizar os seguintes comandos:

```sh
# Entrar do diretório do projeto
cd ola-mundo
# Iniciar o servidor de desenvolvimento
npx expo start
```

Isso vai lançar o servidor de desenvolvimento. Agora, você vai ver que vai aparecer um QrCode na tela do seu terminal. Esse QrCode pode ser escaneado com a camera de dispositivo físico para iniciar o download do bundle para dentro do aplicativo Expo Go.

<img
  src={require('/img/instalacao/npx-start.png').default}
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

É possível observar que existem algumas opções abaixo do QrCode. Vamos utilizar algumas delas agora. A primeira, vai ser a opção de pressionar a tecla `a` para lançar nossa aplicação dentro do emulador Android. Isso vai fazer o Expo Go ser baixado dentro do emulador e nossa aplicação ser enviada para ele. E em alguns instantes, vamos ver nossa aplicação rodando no emulador.

<img
  src={require('/img/instalacao/primeiro-app-rodando-emulador.png').default}
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Parabéns🎉🎉☕🎉🎉! Seu primeiro aplicativo está sendo executado. Vamos estudar agora o que está acontecendo e como isso foi possível!

<img
  src='https://i.programmerhumor.io/2025/04/3522e08522f43f2f163d7d93c486b7b3998bd615253fb0201f9c2f5e43d16115.png' alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

## 3. Estrutura de Arquivos e Componentes Fundamentais

Agora vamos analisar a nossa estrutura de diretórios e arquivos do projeto. Cada tipo de template traz uma estrutura de diretórios e arquivos diferente, diante dos recursos que ele apresenta para a aplicação. Aqui estamos analisando a estrutura do nosso projeto `ola-mundo`, que utilizou o template `blank`.

<img
  src={require('/img/instalacao/estrutura-pastas.png').default} 
  alt="Tela de Notificações" 
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Qual a função de cada um destes arquivos:

- `.expo`: Este diretório é criado e gerenciado pelo Expo CLI. Ele contém arquivos de cache e configuração interna que o Expo usa para otimizar o processo de build e execução do seu aplicativo. Geralmente, você não precisa mexer nesses arquivos diretamente.
- `assets`: Este diretório é o local padrão para armazenar recursos estáticos do seu aplicativo, como imagens (.png, .jpg, etc.), fontes personalizadas e outros arquivos multimídia que você usará no seu projeto. É uma convenção comum, embora você possa carregar assets de outros locais, organizar seus recursos aqui torna o projeto mais organizado. O template blank já vem com alguns exemplos de imagens de ícone e splash screen aqui dentro.
- `node_modeles`: Aqui fica a internet toda 🫠. Brincadeira, este diretório é criado pelo gerenciador de pacotes que você usou para criar o projeto (npm ou yarn). Ele contém todas as bibliotecas e dependências do seu projeto, incluindo React, React Native, Expo SDK e quaisquer outras bibliotecas que você instalar. Este diretório geralmente não deve ser versionado em sistemas de controle como o Git, por isso ele é listado no arquivo .gitignore.
- `.gitignore`: Este arquivo é usado pelo sistema de controle de versão Git para especificar quais arquivos e diretórios devem ser ignorados e não incluídos no repositório. Ele lista itens como a pasta node_modules, arquivos de log, cache, e outros arquivos gerados automaticamente que não precisam ser rastreados no histórico de versão do código.
- `App.js`: Este é o ponto de entrada principal do seu aplicativo React Native. É aqui que você começará a escrever o código da interface do usuário do seu aplicativo. No template blank, este arquivo geralmente contém um componente React funcional simples que exibe algum texto básico na tela. É o arquivo que você mais modificará no início para construir a UI do seu app.
- `app.json`: Este arquivo é o arquivo de configuração do seu aplicativo Expo. Ele contém metadados e configurações importantes para o seu projeto, como o nome do aplicativo, a versão, o ícone, a splash screen, a orientação da tela, permissões, configurações específicas por plataforma (iOS/Android) e as configurações do Expo SDK. Quando você constrói a versão final do seu app (build standalone) usando o Expo, muitas dessas configurações são lidas a partir deste arquivo.
- `index.js`: Este arquivo é um pequeno script (geralmente muito curto) que registra o ponto de entrada do seu aplicativo (App.js) no sistema do React Native/Expo. Ele diz ao runtime do React Native para carregar e rodar o componente App definido em App.js. Em projetos Expo, este arquivo é padrão e você raramente precisará modificá-lo.
- `package.json`: Este é o manifesto do seu projeto. Ele contém informações sobre o projeto, como nome, versão, descrição, autor, licença, e, o mais importante, lista as dependências diretas do seu projeto (dependencies e devDependencies) e scripts customizados que você pode rodar (como npm start, npm install, etc.). É aqui que você adicionará novas bibliotecas ao seu projeto (usando `npm install biblioteca`> ou `yarn add biblioteca`) e elas serão listadas automaticamente.
- `package-lock.json`: Este arquivo é gerado automaticamente pelo gerenciador de pacotes (npm gera package-lock.json, yarn gera yarn.lock). Ele registra as versões exatas de todas as dependências (incluindo as sub-dependências dentro de node_modules) que foram instaladas. Isso garante que qualquer pessoa que clone seu repositório e rode npm install ou yarn install obtenha exatamente as mesmas versões de bibliotecas que você usou, evitando problemas de compatibilidade. Este arquivo deve ser versionado no Git.

Em geral, vamos trabalhar com o arquivo `App.js` hoje. Por isso, vamos analisar o que ele faz:

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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

Agora vamos analisar um pouco dos elementos que estão sendo utilizados. Todos os elementos que são utilizados na construção da interface da nossa aplicação são chamados de `Componentes`. Estes componentes podem ser de três categorias:

- **Componentes Fundamentais (Core Components):** Os componentes básicos são chamados de Core Components, são os componentes já presentes no React Native;
- **Componentes da Comunidade (Community Components):** São os componentes desenvolvidos por bibliotecas externas para utilização nos projetos;
- **Seus Componentes Nativos (Your Native Componentes):** São componentes escritos pelo programador para utilizar o sistema nativo.

<img
  src='https://reactnative.dev/docs/assets/diagram_react-native-components_dark.svg'
  alt="Tela de Notificações" 
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Mais informações sobre os componentes podem ser encontradas na [documentação](https://reactnative.dev/docs/intro-react-native-components).



