---
sidebar_position: 4
slug: /rn-listas
title: "Listas com React Native"
---

<!-- ## TODO

<img src="https://64.media.tumblr.com/1410879ae6d00e77f5dbe27c03f252fc/tumblr_inline_ofgcs4tnDi1r5ight_400.gifv" alt="Gai sensei and Rock Lee Training" style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} /> -->

Pessoal vamos discultir agora sobre um dos pontos bastante relevante quando estamos construindo um aplicativo: como exibir diversos componentes no formato de uma lista. Mas por que isso é relevante? Essa é uma ótima pergunta! Vamos pensar na nossa interação com os dispositivos móveis, não temos ali uma tela muito grande (por mais polegadas que ele possa ter, ainda é uma tela pequena quando comparado com um tablet ou um computador). Nesse espaço reduzido, como podemos colocar muitas informações?

> "Uhhhh alguma coisa que permita colocar mais informações no mesmo espaço, algo como uma lista?"

Exatamente!!

Vamos adicionar em nossas aplicações exatamente essa capacidade, dela se comportar como uma lista e depois de exibir listas!

## 1. ScrollView

O ScrollView é um componente do React Native usado para permitir a rolagem vertical (ou horizontal) de conteúdo que ultrapassa os limites visíveis da tela. Ele renderiza todos os elementos de uma vez, o que o torna ótimo para listas pequenas ou conteúdos fixos com altura variável. A documentação do ScrollView pode ser acessada [aqui](https://reactnative.dev/docs/scrollview).

Ele é importante pois traz acessibilidade ao conteúdo, indepente do tamanho da tela. Ele também melhor a aexperiência do usuário enquanto está utilizando a aplicação, pois permitem que eles deslizem naturalmente pelo aplicativo. Vamos verificar como utilizar ele em nossos projetos. Vamos aproveitar e instalar o expo router.

```sh
npx create-expo-app varios-componentes --template blank
cd varios-componentes
npx expo install expo-router react-native-screens react-native-safe-area-context
```

Vamos alterar primeiro o `package.json` para utilizar o router.

```json
{
  "name": "varios-componentes",
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
    "expo-router": "~5.0.7",
    "react-native-screens": "~4.10.0",
    "react-native-safe-area-context": "5.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

E alterar também o `app.json` para adicionar o `scheme` da nossa aplicação.

```json
{
  "expo": {
    "name": "varios-componentes",
    "slug": "varios-componentes",
    "scheme": "br.com.meudominio.varios-componentes",
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

Pronto, agora podemos criar nosso diretório `app` para construir nossa aplicação.

```js
// app/index.js
import { StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <View>
            <Text>Open up App.js to start working on your app!</Text>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
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

> "Murilão calma ai! Tem coisa igual e coisa que está diferente ai!"

Sim! Você está correto! O que está diferente aqui é a presença de um elemento novo para nós, o `SafeAreaProvider`. Por que estamos utilizando ele agora? Até aqui utilizamos apenas o componente `SafeAreaView`, ele tenta evitar que nosso aplicativo fique atrás de algum item físico do celular, como cameras, notch ou outros. Contudo, esse elemento precisa conhecer onde estes elementos estão. Ele tem um comportamento misto quando não utilizamos o provider, ele pode funcionar ou não dependendo do aparelho. O `SafeAreaProvider` está dentro do pacote `react-native-safe-area-context`, que foi instalado quando adicionamos o `router` a nossa aplicação.

Beleza, agora vamos colocar nosso elemento de scroll a tela. Para isso, vamos adicionar algumas imagens como cards na nossa aplicação. Vamos utilizar essas imagens aqui:

<img src="https://images.pexels.com/photos/32056657/pexels-photo-32056657/free-photo-of-black-and-white-close-up-of-a-farm-cow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/17572427/pexels-photo-17572427/free-photo-of-cow-with-bell.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/551624/pexels-photo-551624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/30160395/pexels-photo-30160395/free-photo-of-close-up-portrait-of-a-brown-cow-in-green-pasture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/31669033/pexels-photo-31669033/free-photo-of-tranquil-black-and-white-swans-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/6771859/pexels-photo-6771859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/17826916/pexels-photo-17826916/free-photo-of-swan-flying-above-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

<img src="https://images.pexels.com/photos/16386700/pexels-photo-16386700/free-photo-of-swans-swimming-in-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagem para lista" 
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />
<br />

Beleza, temos nossas imagens, vamos agora adicionar esses elementos. Vamos aproveitar para estudar mais uma característica aqui, como enviar propriedades para os componentes. Vamos criar um diretório chamado `components` e criar o componente `Card.js` dentro dele.

```js
// components/Card.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Card({ imageUrl }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
```

Aqui, ajustamos nosso Card para exibir os componentes. Agora vamos colocar eles na nossa aplicação.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Card from '../components/Card';

export default function App() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.texto}>Meu App de Imagens!</Text>
            <Card imageUrl={"https://images.pexels.com/photos/32037884/pexels-photo-32037884/free-photo-of-airplane-silhouette-against-sunset-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"}></Card>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  texto:{
    fontSize:42,
    color:'#c4c4c4',
    padding:16,
  }
});
```

Vamos fazer um ajuste para adicionar todas as nossas imagens agora.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Card from '../components/Card';

const imagens = {
    0: "https://images.pexels.com/photos/32056657/pexels-photo-32056657/free-photo-of-black-and-white-close-up-of-a-farm-cow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    1: "https://images.pexels.com/photos/17572427/pexels-photo-17572427/free-photo-of-cow-with-bell.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    2: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    3: "https://images.pexels.com/photos/551624/pexels-photo-551624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    4: "https://images.pexels.com/photos/30160395/pexels-photo-30160395/free-photo-of-close-up-portrait-of-a-brown-cow-in-green-pasture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    5: "https://images.pexels.com/photos/31669033/pexels-photo-31669033/free-photo-of-tranquil-black-and-white-swans-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    6: "https://images.pexels.com/photos/6771859/pexels-photo-6771859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    7: "https://images.pexels.com/photos/17826916/pexels-photo-17826916/free-photo-of-swan-flying-above-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    8: "https://images.pexels.com/photos/16386700/pexels-photo-16386700/free-photo-of-swans-swimming-in-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.texto}>Meu App de Imagens!</Text>
                    {
                        Object.entries(imagens).map(([index,url]) => (
                            <Card key={index} imageUrl={url}> </Card>
                        ))
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    texto: {
        fontSize: 42,
        color: '#c4c4c4',
        padding: 16,
    }
});
```

> "Murilão, não poderiamos ter colocado esses elementos como um array?"

Sim ou com certeza? Aqui foi só uma forma que eu representei eles.

Agora, podemos ver que não é possível navegar por esses elementos. Vamos adicionar nosso `ScrollView`.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Card from '../components/Card';

const imagens = {
    0: "https://images.pexels.com/photos/32056657/pexels-photo-32056657/free-photo-of-black-and-white-close-up-of-a-farm-cow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    1: "https://images.pexels.com/photos/17572427/pexels-photo-17572427/free-photo-of-cow-with-bell.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    2: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    3: "https://images.pexels.com/photos/551624/pexels-photo-551624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    4: "https://images.pexels.com/photos/30160395/pexels-photo-30160395/free-photo-of-close-up-portrait-of-a-brown-cow-in-green-pasture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    5: "https://images.pexels.com/photos/31669033/pexels-photo-31669033/free-photo-of-tranquil-black-and-white-swans-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    6: "https://images.pexels.com/photos/6771859/pexels-photo-6771859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    7: "https://images.pexels.com/photos/17826916/pexels-photo-17826916/free-photo-of-swan-flying-above-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    8: "https://images.pexels.com/photos/16386700/pexels-photo-16386700/free-photo-of-swans-swimming-in-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.texto}>Meu App de Imagens!</Text>
                    {
                        Object.entries(imagens).map(([index,url]) => (
                            <Card key={index} imageUrl={url}> </Card>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    texto: {
        fontSize: 42,
        color: '#c4c4c4',
        padding: 16,
    }
});
```

E agora nossa aplicação consegue exibir todos os nossos elementos! Mas e se desejassemos adicionar ainda mais elementos? Observe o que vai acontecer com a aplicação.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Card from '../components/Card';

const imagens = {
    0: "https://images.pexels.com/photos/32056657/pexels-photo-32056657/free-photo-of-black-and-white-close-up-of-a-farm-cow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    1: "https://images.pexels.com/photos/17572427/pexels-photo-17572427/free-photo-of-cow-with-bell.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    2: "https://images.pexels.com/photos/33550/cows-curious-cattle-agriculture.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    3: "https://images.pexels.com/photos/551624/pexels-photo-551624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    4: "https://images.pexels.com/photos/30160395/pexels-photo-30160395/free-photo-of-close-up-portrait-of-a-brown-cow-in-green-pasture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    5: "https://images.pexels.com/photos/31669033/pexels-photo-31669033/free-photo-of-tranquil-black-and-white-swans-on-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    6: "https://images.pexels.com/photos/6771859/pexels-photo-6771859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    7: "https://images.pexels.com/photos/17826916/pexels-photo-17826916/free-photo-of-swan-flying-above-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    8: "https://images.pexels.com/photos/16386700/pexels-photo-16386700/free-photo-of-swans-swimming-in-the-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.texto}>Meu App de Imagens!</Text>
                    {
                        Array.from({ length: 100 }).map((_, i) => {
                            const url = imagens[i % Object.keys(imagens).length]; // repete ciclicamente
                            return <Card key={i} imageUrl={url} />;
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    texto: {
        fontSize: 42,
        color: '#c4c4c4',
        padding: 16,
    }
});
```

Pessoal quanto mais aumentarmos o número de vezes que vamos repetir esses elementos, maior será o tempo para visualizar nossa lista. Isso acontece pois o ScrollView renderiza todos os componentes de uma vez. 