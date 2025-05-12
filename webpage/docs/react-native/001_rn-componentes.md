---
sidebar_position: 2
slug: /rn-componentes
title: "Componentes do React Native"
---

Boa pessoal, agora vamos avançar um pouco mais com o nosso desenvolvimento de aplicações. Aqui vamos trabalhar com mais alguns componentes e ver qual o processo necessário para utilizar e configurar cada um deles. Muito importante: Não deixem de praticar! Esse de longe é o componente principal para ganhar mais familiaridade com cada uma das etapas e utilização destes elementos!

## 1. Criando um novo projeto

Esse primeiro passo é mais um recap. Vamos criar nosso projeto utilizando o template de JavaScript novamente. Para isso:

```sh
npx create-expo-app lanca-dados --template blank
```

:::note[Quando criando um projeto dentro de um repositório]

Um ponto que não é demais chamar a atenção: quando um projeto é criado dentro de um repositório, ele não inicia um novo controle de versão. Contudo, o arquivo de `.gitignore` é mantido, para não termos problemas de subir algum arquivo ou diretório default que não deveriamos para nosso serviço de repositório remoto (node_modules 😔).

:::

Legal, agora com nosso projeto criado vamos iniciar nossas edições! Vamos iniciar nosso servidor de desenvolvimento:

```sh
# Muda para o diretório da solução
cd lanca-dados
# Ativa o servidor de desenvolvimento
npx expo start
```

## 2. Organizando o projeto em componentes

Um dos conceitos mais relevantes do desenvolvimento com componentes reutilizáveis é um dos pilares fundamentais e um dos grandes trunfos que impulsionam a popularidade e a eficiência do React e do React Native. Essa filosofia de desenvolvimento encoraja a criação de 'blocos de construção' de interface — como botões customizados, cards de informação, ou até seções inteiras de uma tela — que encapsulam tanto a sua aparência quanto o seu comportamento. Uma vez que um componente é desenvolvido e testado, ele pode ser facilmente importado e utilizado inúmeras vezes em diferentes partes da aplicação, ou mesmo em outros projetos. Isso não apenas reduz drasticamente a duplicação de código, promovendo uma base mais enxuta e organizada, mas também simplifica enormemente a manutenção: uma correção ou atualização feita em um componente se reflete automaticamente em todas as suas instâncias. O resultado direto é um ciclo de desenvolvimento mais ágil, interfaces mais consistentes e aplicações mais escaláveis e fáceis de evoluir.

Legal, depois desta afirmação sobre a importancia de utilizar componentes, vamos fazer isso! Até mesmo com a nossa tela! Primeiro vamos criar um diretório que vai guardar todas as nossas telas: o `app`. Ele vai ser muito importante para outro componente que vamos discultir logo mais.

Agora, vamos criar um componente que vai definir a tela inicial da nossa aplicação. Ela vai ser o ponto de entrada da nossa aplicação. Para isso, vamos criar dentro do diretório `app` que criamos, um arquivo chamado `MainScreen.js`.

```js
import {Text,SafeAreaView,View} from 'react-native';

export function MainScreen(){
    return (
        <SafeAreaView>
            <Text>Ola Mundo Diferente!</Text>
        </SafeAreaView>
    );
}
```

Vamos verificar se nosso componente foi criado com sucesso, alterando o código do nosso arquivo `App.js`:

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MainScreen } from './app/MainScreen';

export default function App() {
  return (
    <MainScreen></MainScreen>
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

Beleza, temos nossa tela carregada agora. Ela ainda não tem nada diferente do que utilizamos na nossa interação anterior. Vamos dar uma customizada em nossa tela. Para isso, vamos utilizar algumas mídias e mais alguns componentes. Primeiro vamos adicionar o diretório `components` dentro do diretório da nossa solução. Depois, vamos adicionar a pasta `images` dentro do diretório `assets`.

Com nossos diretórios criados, vamos agora criar nosso componente `HeaderApp` e `FooterApp`, dentro do diretório de componentes.

```js
// HeaderApp.js
import { View, Text, Image, StyleSheet } from 'react-native';

export function HeaderApp() {
    return (
        <View style={estilos.header}>
            <Text>Lançador D6</Text>
        </View>
    );
}

const estilos = StyleSheet.create(
    {
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#f8f8f8',
            height: 64
        }
    }
);
```

Ainda temos alguns ajustes que vamos precisar fazer dentro do nosso componente `HeaderApp`, mas primeiro, vamos ajustar o código de nossa aplicação. Para não termos que ficar chamando `HeaderApp` e `FooterApp` em todos os lugares que eles forem aparecer, vamos centralizar sua utilização dentro do componente principal, assim ele fica encarregado de ver a tela que será utilizada (por enquanto apenas uma) e fazer a renderização destes elementos.

Logo, nosso `App.js` fica assim: 

```js
// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { MainScreen } from './app/MainScreen';
import { HeaderApp } from './components/HeaderApp';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <HeaderApp></HeaderApp>
      <MainScreen></MainScreen>
    </SafeAreaView>
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

E vamos ajustar também o nosso `MainScreen.js`:

```js
// MainScreen.js
import { Text,View } from 'react-native';


export function MainScreen(){
    return (
        <View style={{flex:1, backgroundColor: '#fff',}}>
            <Text>Ola Mundo Diferente!</Text>
        </View>
    );
}
```

Beleza, temos agora nosso aplicativo funcionando com nosso Header e nossa Tela principal. Agora vamos dar uma melhorada em cada um deles. Vamos primeiro escolher qual imagem vamos utilizar de icone da nossa aplicação, que tal essa?

<img
  src='https://i.pinimg.com/736x/41/fb/be/41fbbebc8bcdd1f470e20e6ae2178334.jpg'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Vamos salvar essa imagem dentro do diretório `assets/images`, com o nome: `reiDadoLogo.jpg`. Agora vamos adicionar essa imagem dentro do nosso Header.

```js
import { View, Text, Image, StyleSheet } from 'react-native';

export function HeaderApp() {
    return (
        <View style={estilos.header}>
            <Image source={require('../assets/images/reiDadoLogo.jpg')} style={estilos.imagemLogo}/>
            <Text>Lançador D6</Text>
        </View>
    );
}

const estilos = StyleSheet.create(
    {
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#f8f8f8',
            height: 64
        },
        imagemLogo:{
            height:48,
            width:48,
            contentFit: 'contain',
            padding:4,
        }
    }
);
```

Boa! Agora temos nosso logo!!

:::note[require]

O `require` que estamos utilizando aqui serve para indicar ao empacotador (bundler que junta todos nossos arquivos JavaScript e demais recursos para o aplicativo), que o recurso que ele está utilizando é local e deve ser incluindo no conjunto de arquivos que estará disponível no aplicativo.

Este método retorna um identificador que indica onde está a imagem que está sendo utilizada, dentro do conjunto de arquivos.

:::

Agora vamos fazer alguns ajustes no nosso Header:

```js
// HeaderApp.js
import { View, Text, Image, StyleSheet } from 'react-native';

export function HeaderApp() {
    return (
        <View style={estilos.header}>
            <Image source={require('../assets/images/reiDadoLogo.jpg')} style={estilos.imagemLogo}/>
            <Text style={estilos.headerText}>Lançador D6</Text>
        </View>
    );
}

const estilos = StyleSheet.create(
    {
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#f8f8f8',
            height: 64,
            backgroundColor: '#ef1111'
        },
        imagemLogo:{
            height:48,
            width:48,
            contentFit: 'contain',
            padding:4,
            borderRadius: 24,
            overflow:'hidden',
        },
        headerText : {
            fontSize: 30,
            color: '#ececec',
            fontWeight: 'bold',
        }
    }
);
```

Pronto, agora temos nosso Header! Vamos agora trabalhar nos componentes da nossa tela.

## 3. Componentes da Tela

Para os componentes de nossa tela, vamos adicionar os elementos para fazer um lançamento de dados quando um botão for acionado. Vamos adicionar as imagens para o dado. 

<img
  src='data:image/png;base64,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'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

Agora vamos ajustar nosso código:

```js
import { Text,View,Image,StyleSheet,TouchableOpacity } from 'react-native';


export function MainScreen(){
    return (
        <View style={estilos.container}>
            <Image source={require('../assets/images/dados_00.png')} style={estilos.image}/>
            <TouchableOpacity style={estilos.botaoContainer}>
                <Text style={estilos.botaoTexto}>Rolar!</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor: '#ececec',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center'
        },
        image:{
            height:'80%',
            width:'80%',
            resizeMode: 'contain',
            padding:4,
            borderRadius: '35%',
            overflow:'hidden',
        },
        botaoContainer:{
            backgroundColor: '#007bff',
            width: '80%',
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            elevation: 2,
            marginBottom: 15,
        },
        botaoTexto:{
            fontSize: 20,
            color: '#ececec',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    }
);
```

Muitas coisas aqui:
- Criamos um `TouchableOpacity` para criar um elemento clicável. Assim, conseguimos ajustar seu formato da maneira que desejarmos.

Agora vamos ajustar a lógica para sortear nosso botão. As imagens que vamos utilizar:

<img
  src='https://cdn-icons-png.flaticon.com/512/10877/10877983.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />
<img
  src='https://cdn-icons-png.flaticon.com/512/318/318773.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />
<img
  src='https://cdn-icons-png.flaticon.com/512/12355/12355835.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />
<img
  src='https://cdn-icons-png.flaticon.com/512/318/318777.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />
<img
  src='https://cdn-icons-png.flaticon.com/512/152/152510.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />
<img
  src='https://cdn-icons-png.flaticon.com/512/142/142306.png'
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

E o código:

```js
// MainScreen.js
import { Text,View,Image,StyleSheet,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const imagensDados = {
    0: require('../assets/images/dados_00.png'),
    1: require('../assets/images/dados_01.png'),
    2: require('../assets/images/dados_02.png'),
    3: require('../assets/images/dados_03.png'),
    4: require('../assets/images/dados_04.png'),
    5: require('../assets/images/dados_05.png'),
    6: require('../assets/images/dados_06.png'),
  };
  

export function MainScreen(){
    // Estado para guardar o número do dado atualmente exibido.
  // Começa mostrando a face 1 do dado.
  const [faceAtualDado, setFaceAtualDado] = useState(0);

  // Função para "rolar" o dado
  const rolarDado = () => {
    // Gera um número aleatório entre 1 e 6
    const numeroSorteado = Math.floor(Math.random() * 6) + 1;
    setFaceAtualDado(numeroSorteado);
  };
    return (
        <View style={estilos.container}>
            <Image source={imagensDados[faceAtualDado]} style={estilos.image}/>
            <TouchableOpacity style={estilos.botaoContainer} onPress={rolarDado}>
                <Text style={estilos.botaoTexto}>Rolar!</Text>
            </TouchableOpacity>
        </View>
    );
}



const estilos = StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor: '#ececec',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center'
        },
        image:{
            height:'80%',
            width:'80%',
            resizeMode: 'contain',
            padding:4,
            borderRadius: '35%',
            overflow:'hidden',
        },
        botaoContainer:{
            backgroundColor: '#007bff',
            width: '80%',
            paddingVertical: 12,
            paddingHorizontal: 25,
            borderRadius: 8,
            elevation: 2,
            marginBottom: 15,
        },
        botaoTexto:{
            fontSize: 20,
            color: '#ececec',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    }
);
```

Pessoal, aqui acredito que faz sentindo avaliarmos um pouco mais o conceito principal que faz nossa aplicação funcionar. O que temos aqui é a função `rolarDado()`, que faz duas tarefas muito importantes para o nosso aplicativo:

- Sorteia um número aleatório entre 1 e 6, toda vez que ela é chamada;
- Chama o *hook* `useState`, pela função `setFaceAtualDado()`, que faz com que nossa aplicação seja atualizada.

O conceito da atualização aqui do ReactNative é o mesmo que do React em aplicações Web.

## 4. Compreendendo Hooks e outros Eventos

> "Aviso do Murilo aqui: essa nota vai ser longa."

Pessoal a ideia desta seção é avaliarmos um pouco de onde vem esse negócio de *Hooks* e por que ele é tão importante no contexto de criação de uma aplicação. Primeiro vamos avaliar um pouco a nossa utilização do React (sim, Web, não o Native), para criação de soluções.

### 4.1 Componentes como Classes

Logo nas primeiras aplicações com React, os desenvolvedores utilizavam classes para representar seus componentes. Essa abordagem trazia algumas vantagens:

- Era possível armazenar estado dentro de cada objeto: cada instância de uma classe era capaz de armazenar valores dentro dela! O que permitia gerenciar valores que poderiam mudar ao longo do tempo dentro da própria classe.
- Existiam os chamados *Métodos de Ciclo de Vida*: os métodos de ciclo de vida são chamados de forma automática quando os eventos aconteciam com os componentes, como ele ser montado na tela (`componentDidMount`) e outros.

> Poxa, mas se possuíamos essas vantagens, por que não continuamos utilizando elas para criar nossas aplicações?

Porque eu falei apenas um lado desta moeda, ela com toda certeza tem mais um (esses aqui o Gemini me ajudou a sintetizar):

- **Reutilização Lógica Statefult Difícil:** Compartilhar lógica com estado entre componentes era complicado. Padrões como Higher-Order Components (HOCs) e Render Props ajudavam, mas podiam levar ao que era conhecido como "Wrapper Hell" (um aninhamento excessivo de componentes no React DevTools, dificultando a depuração e a compreensão da árvore de componentes). Esses padrões muitas vezes alteravam a estrutura da árvore de componentes, o que não era ideal apenas para reutilizar comportamento.
- **Lógica Espalhada em Métodos de Ciclo de Vida:** Código relacionado a uma única funcionalidade (como buscar dados) frequentemente ficava espalhado por diferentes métodos de ciclo de vida (componentDidMount para a busca inicial, componentDidUpdate para atualizar quando props mudam, componentWillUnmount para limpeza). Isso tornava o código mais difícil de ler e manter, pois a lógica coesa estava fragmentada.
- **Complexidade do this em Classes:** O uso do this em JavaScript dentro de classes pode ser confuso, exigindo bind ou arrow functions para garantir que o contexto esteja correto em callbacks de eventos. Embora seja um detalhe da linguagem, era uma fonte comum de erros para desenvolvedores React.
- **Classes Dificultam Otimizações (Potencialmente):** Embora o React seja eficiente, o modelo de classes adicionava uma certa sobrecarga na criação de instâncias e no gerenciamento interno que os componentes funcionais puros não tinham.


<iframe width="560" height="315" src="https://www.youtube.com/embed/zbHDMJ60V78?si=_cDjgQnC_jj47Jxw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

### 4.2 Componentes Funcionais

Pessoal, a programação orientada a objetos é um paradigma de programação. Quando pensamos em um paradigma, estamos falando de um conjunto de convenções colocadas em conjunto para facilitar a forma como representamos nossas lógicas como código. 

:::note[Paradigmas de Programação]

<iframe width="560" height="315" src="https://www.youtube.com/embed/hZzpNiSD0bg?si=DAQAG-LpvKRbVJH1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/GGF9kaX24tA?si=oqfMy35P5jm2uuBX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

:::

Muitos dos problemas que os programadores enfrentavam com os componentes como classes, estava no fato de lidar com o seu estado ou ainda quando precisavam compartilhar esse valor pela aplicação. Uma alternativa a esta abordagem, foi utilizar os componentes sem uma representação de estado, o que levou a criação dos componentes funcionais. No início, estes componentes eram limitados a apresentação (renderização) de alguma parte da UI, frente aos valores que recebiam.

### 4.3 React Hooks

A partir da versão **16.8** do React, as coisas mudaram. Foi adicionado um conjunto poderoso de recursos a biblioteca, que permitia lidar com estado dentro de componentes funcionais, os ***hooks***. Na documentação do React, podemos ver a descrição da implementação deste recurso. Sim é um link legado, mas sugiro fortemente a leitura: [link](https://legacy.reactjs.org/docs/hooks-overview.html).

Hooks são funções JavaScript especiais que permitem que você "engate" (hook into) recursos de estado e ciclo de vida do React a partir de componentes de função. A palavra-chave aqui é "*a partir de componentes de função*". A ideia central é permitir a reutilização de lógica stateful sem alterar a hierarquia de componentes e agrupar a lógica relacionada em um só lugar (ao invés de espalhada pelos métodos de ciclo de vida). Existem algumas regras para utilização dos Hooks:

- ***Chamar Hooks apenas no Top Level:*** Nunca chame Hooks dentro de loops, condicionais ou funções aninhadas. O React confia na ordem em que os Hooks são chamados para associar o estado e os efeitos corretos a cada chamada de Hook específica em uma renderização.
- ***Chamar Hooks apenas de Funções React:*** Chame Hooks apenas de componentes de função React ou de seus próprios Hooks customizados.

Vamos estudar a utilização de mais alguns hooks e componentes, mas vou deixar mais alguns vídeos para quem desejar conhecer mais sobre o conceito.

:::note[Para saber mais sobre Hooks]

<iframe width="560" height="315" src="https://www.youtube.com/embed/TNhaISOUy6Q?si=ienI-NB9WwQfWHxa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/ORSHG3dfUrk?si=xq4oF9dpBSWANK0a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

:::

### 4.4 Sumarizando para a aplicação

Apenas para fazer um fechamento, onde utilizamos este conceito todo dentro da nossa aplicação? Estamos utilizando o hook `useState()` para definir um valor inicial para o valor associado a lógica de troca de face sorteada do dado. Ele é inicializado com um tupla de dois valores:

- **Variável:** quem vai armazenar o valor monitorado pelo Hook;
- **Método para atualização da variável:** é o método que poderá ser chamado com a lógica da atualização do valor da variável. Quando ele é invocado e troca o valor da variável, os componentes de UI que utilizam ele são re-desenhados na tela.

O valor enviado na função `useState()`, é o valor inicial que é atribuído a variável associada ao hook.

### 4.5 Mais documentação oficial

- [Using the State Hook](https://legacy.reactjs.org/docs/hooks-state.html)
- [Built-in React Hooks](https://react.dev/reference/react/hooks)