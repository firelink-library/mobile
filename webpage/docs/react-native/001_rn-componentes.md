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
            flex: 1,
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

```


