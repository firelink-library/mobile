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

Pessoal quanto mais aumentarmos o número de vezes que vamos repetir esses elementos, maior será o tempo para visualizar nossa lista. Isso acontece pois o ScrollView renderiza todos os componentes de uma vez. Para não termos esse problema, vamos utilizar um outro componente para fazer essa renderização, o `FlatList`.

## 2. FlatList

O **FlatList** é um componente otimizado para renderizar listas de dados roláveis, de maneira eficiente e escalável, mesmo com centenas ou milhares de itens. Diferente do ScrollView, ele não renderiza todos os itens de uma vez — apenas os visíveis na tela (renderização preguiçosa).

:::note[Lazy Rendering]

Calma lá! Existe algo que é chamado de Renderização Preguiçosa e é bom?
Sim! A estratégia do Lazy Loading ou Lazy Rendering, surgiu para lidar com o problema de recursos que não eram críticos para o funcionamento dos sistema e que poderiam ser carregados posteriormente. Em geral, ele é aplicado quando ocorre alguma interação com o usuário, como a navegação ou o escrolar de uma seção.

Para saber mais: [Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading).

<iframe width="560" height="315" src="https://www.youtube.com/embed/-zzmfjIiC3M?si=JX7w1BEb_JoEwo1N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />
:::

Algumas vantagens em utilizar o **FlatList**:
- Alto desempenho com listas grandes.
- Rolagem suave com renderização incremental.
- Suporte nativo para cabeçalhos, rodapés, separadores e pull-to-refresh.
- Melhor gerenciamento de memória que ScrollView.

Os componentes princípais (os props mais comuns) são:

| Propriedade | Obrigatório | Descrição |
| - | - | - |
| **data** | Sim | Array com os dados que serão exibidos. |
| **renderItem** | Sim | Função que renderiza cada item da lista. |
| keyExtractor | Não | Função que retorna uma chave única por item (obrigatória para listas dinâmicas). Se você não fornecer um keyExtractor ao FlatList, o React Native ainda tentará gerar uma chave (key) automaticamente, usando o índice do item no array como fallback. |
| ListHeaderComponent | Não | Componente opcional que aparece antes dos itens. |
| ListFooterComponent | Não | Componente opcional que aparece depois dos itens. |
| ItemSeparatorComponent | Não | Componente que aparece entre os itens. |
| onEndReached | Não | Função chamada quando o usuário chega ao fim da lista (ótimo para paginação). |

Agora, vamos pensar no projeto que acabamos de fazer. Vamos ajustar ele para que ele possa trabalhar com o **FlatList**.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList } from 'react-native';
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
                <FlatList
                    data={Object.entries(imagens).map(([index, url]) => (
                        url
                    ))}
                    renderItem={({item}) => (<Card imageUrl={item}/>)}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.texto}>Header Da Lista</Text>
                        </View>
                    }
                />
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

Aqui acho que vale destacar uma característica importante:
- Os dados extraídos e enviados para `data` são apenas as URL das imagens;
- Quando vamos manipular esses elementos, utilizamos eles como um objeto no contexto do `renderItem` para utilizar essa URL para exibir as informações para o usuário.

Mesmo se alterarmos nosso projeto para que ele possa exibir diversos elementos, é possível ver que ele não tem mais aquele tempo de carregamento muito grande de diversas imagens na aplicação.

```js
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList } from 'react-native';
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
                <FlatList
                    data={Array.from({ length: 100 }).map((_, i) =>
                        imagens[i % Object.keys(imagens).length]
                    )}
                    renderItem={({item}) => (<Card imageUrl={item}/>)}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.texto}>Header Da Lista</Text>
                        </View>
                    }
                />
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

Maravilha! Agora nós temos uma página que consegue exibir diversos elementos! Mas e se for necessário enviar dados de uma página para outra? Vamos verificar como implementar esse comportamento!

## 3. Enviando dados de uma página para outra

Aqui ainda estamos no mesmo aplicativo, mas agora, vamos tentar ajustar ele para exibir nosso nome da tela inicial para a tela seguinte. Sim, é simples, mas vamos utilizar esse conceito nos nossos próximos projetos.

Primeiro, vamos trocar em nossa aplicação tudo do `app/index.js`, para a tela `app/lista.js`. Vamos construir uma primeira tela que recebe como dados o nome do usuário e seu cavaleito do zodiaco favorito (eu estava já meio sem criatividade, ai foi o que eu consegui pensar). Vamos ver como fazer o envio destes dados. A princípio, a `app/lista.js` está igual, vamos modificar ela posteriormente.

Para isso, vamos adicionar um componente para o nosso sistema, o `Picker`. Para instalar ele, vamos utilizar:

```sh
npx expo install @react-native-picker/picker
```

Maiores informações sobre a biblioteca podem ser vistas [aqui](https://github.com/react-native-picker/picker). Vamos adicionar ele e o primeiro método que vamos mandar os dados para a nossa segunda tela. Para isso vamos avaliar o código abaixo:

```js
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

function chamarSegundaTela(texto, valorSelecionado){
    // Pega o router
    const router = useRouter();
    if (texto.trim() === '') {
      Alert.alert('Campo obrigatório', 'Por favor, preencha o campo.');
    } else {
      // Envia o app para a próxima tela
      router.push({pathname:"/lista", params:{nome:texto, cavaleiro:valorSelecionado}});
    }
}

export default function App() {
    const [texto, onChangeTexto] = React.useState('');
    const [valorSelecionado, setValorSelecionado] = React.useState('');
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.texto}>Dados do Usuário</Text>
                    <TextInput
                        value={texto}
                        placeholder='Informe seu nome'
                        onChangeText={onChangeTexto}
                        style={styles.input}
                    />
                    
                    <Picker
                        selectedValue={valorSelecionado}
                        onValueChange={(itemValue, itemIndex) => {
                            setValorSelecionado(itemValue);
                        }}>
                        <Picker.Item label="Áries" value="Mu" />
                        <Picker.Item label="Touro" value="Aldebaran" />
                        <Picker.Item label="Gêmeos" value="Saga" />
                        <Picker.Item label="Câncer" value="Máscara da Morte" />
                        <Picker.Item label="Leão" value="Aiolia" />
                        <Picker.Item label="Virgem" value="Shaka" />
                        <Picker.Item label="Libra" value="Dohko" />
                        <Picker.Item label="Escorpião" value="Milo" />
                        <Picker.Item label="Sagitário" value="Aiolos" />
                        <Picker.Item label="Capricórnio" value="Shura" />
                        <Picker.Item label="Aquário" value="Camus" />
                        <Picker.Item label="Peixes" value="Afrodite" />
                    </Picker>

                    <TouchableOpacity style={styles.botao} onPress={()=>chamarSegundaTela(texto, valorSelecionado)}>
                        <Text style={styles.textoBotao}>Enviar Os Dados</Text>
                    </TouchableOpacity>
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
        paddingVertical: '20',
    },
    texto: {
        fontSize: 42,
        color: '#c4c4c4',
        padding: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    botao: {
        padding: 8,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#797979',
        borderRadius: 20,
    },
    textoBotao: {
        fontSize: 24,
        color: '#c4c4c4',
        padding: 16,
    },
});
```


