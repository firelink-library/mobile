---
sidebar_position: 5
slug: /rn-consumo-api-ciclo
title: "Consumo de API e Ciclo de Vida dos Componentes"
---

Pessoal vamos construir aqui uma aplicação que está integrada ao nosso backend. Para fazer este papel, vamos utilizar o [Json-Server](https://firelink-library.github.io/tools/json-server/). Nossa aplicação vai ser um aplicativo para um restaurante de [Lamen](https://pt.wikipedia.org/wiki/Ramen).

## 1. Proposta de Protótipo

<img src="https://64.media.tumblr.com/1410879ae6d00e77f5dbe27c03f252fc/tumblr_inline_ofgcs4tnDi1r5ight_400.gifv" alt="Gai sensei and Rock Lee Training" style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }} />

Nosso aplicativo vai ficar dentro do diretório: `lamen-menu`. Criar aplicação com o template black do expo e adicionar o expo-router.

```sh
npx create-expo-app lamen-menu --template blank
cd lamen-menu
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

## 2. Construção do Backend

Para construir nosso backend, vamos ter algumas rotas:

- **[GET] /hist**: vai trazer a história do lamen para exibirmos em uma página de informação do tipo sobre.
- **[GET] /items**: vai trazer uma lista com os itens, seus preços, as imagens que devem ser exibidas e seu id.
- **[GET] /items/[id]**: traz os detalhes do item, como imagem não em miniatura e descrição detalhada.
- **[POST] /pedidos/[mesa]**: recebe os dados que devem ser gravados referentes a mesa atual.
- **[GET] /pedidos/[mesa]**: recebe os dados que devem ser exibidos referentes a mesa atual.
- **[GET] /pedidos**: retorna todos os pedidos adicionados.

Para facilitar a visualização aqui no documento, vou fazer os pedidos e suas verificações utilizando o [`CURL`](https://curl.se/).

Vamos iniciar construindo o JSON que vai ficar em nosso servidor, para servir como base de dados, salvar os dados dentro do diretório `/server` da solução criada:

:::tip[JSON]

Não consigo recomendar mais esse vídeo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xZdNGfFh5BY?si=BHW-I3l2k30ue3Lt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

:::

```json
{
    "hist": {
        "origem": "O macarrão é uma obra-prima derivada da farinha de trigo e a sua história nada mais do que o caminho trilhado por muitos anos durante os quais foram se agregando muitas sabedorias. Vamos chamá-la de “a rota do macarrão”. A história do trigo se inicia na Mesopotâmia (atualmente Irã) há 7 mil anos, quando o cultivo foi desenvolvido e de onde se espalhou para o resto do mundo. Dizem que, a partir do trigo, o pão se desenvolveu na Europa enquanto o macarrão se desenvolvia na Ásia, principalmente na China. No Japão, o macarrão é citado em um documento que data da Era Kamakura (1185-1333). A história do lámen japonês começa em 1910, durante a Era Meiji, ano em que o restaurante “RaiRai Ken” abriu as portas em Asakusa, bairro de Tokyo. Esse restaurante de comida chinesa incluiu em seu cardápio o “Shinasoba (macarrão chinês)”, que consistia de um macarrão fino e comprido, dentro de um caldo leve à base de shoyu (molho de soja). Esse prato que dizem ter dado origem ao lámen, era completado com fatias finas de châshû (lombinho de porco), fatias de naruto (pasta curtida à base de peixe) e cebolinha picada. O nome, no entanto, só surgiria mais tarde, em 1922, na cidade de Sapporo, província de Hokkaido, depois que um restaurante simples de nome “Takeya” abriu as portas. Mais tarde, o estabelecimento mudou de escrita e passou a se chamar “Restaurante Chinês Takeya”. Dizem que Tatsu, a esposa de Masaharu Ohkubo, o dono do estabelecimento, gostava muito das retrucadas que o funcionário chinês bradava da cozinha, “haoliao (está pronto)” e daí batizou o prato de “liao-men (men — macarrão — do liao)” e que na pronúncia japonesa se transformou em “ramen” ou “lamen”.",
        "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg",
        "video": "https://youtu.be/PE6tQ5QUU_E?si=D23mIEGbYpkZKnWB"
    },
    "items": [
        {
            "id": "1",
            "nome": "Tokyo Ramen",
            "preco": 14.50,
            "descricao": "Caldo cremoso de porco (tonkotsu) com macarrão, chashu, ovo cozido e cebolinha.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "2",
            "nome": "Miso Ramen",
            "preco": 13.00,
            "descricao": "Caldo à base de pasta de soja (miso) com macarrão, legumes e carne de porco.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "3",
            "nome": "Shoyu Ramen",
            "preco": 12.50,
            "descricao": "Caldo leve de soja (shoyu) com macarrão, camarão, brotos de bambu e nori.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "4",
            "nome": "Gyoza",
            "preco": 8.00,
            "descricao": "Pastéis recheados de carne de porco e vegetais, servidos com molho ponzu.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "5",
            "nome": "Ebi Tempura",
            "preco": 18.00,
            "descricao": "Camarões empanados e fritos em massa leve, acompanhados de molho tentsuyu.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "6",
            "nome": "Yakisoba",
            "preco": 11.50,
            "descricao": "Macarrão frito com legumes, frango e molho agridoce.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "7",
            "nome": "Katsu Don",
            "preco": 16.00,
            "descricao": "Tonkatsu (lombo de porco empanado) servido sobre arroz com ovo e cebola.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "8",
            "nome": "Unagi Don",
            "preco": 25.00,
            "descricao": "Máscara de enguia grelhada com molho kabayaki sobre arroz japonês.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "9",
            "nome": "Sushi Misto",
            "preco": 30.00,
            "descricao": "Seleção de nigiris e sashimis variados, servidos com wasabi e gengibre em conserva.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "10",
            "nome": "Uramaki de Salmão",
            "preco": 22.00,
            "descricao": "Enrolado de arroz por fora, recheado com salmão, abacate e cream cheese.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "11",
            "nome": "Temaki de Atum",
            "preco": 9.50,
            "descricao": "Cone de alga nori recheado com arroz, atum fresco e cebolinha.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "12",
            "nome": "Sashimi de Salmão",
            "preco": 28.00,
            "descricao": "Fatias finas de salmão fresco, servidas com molho shoyu e wasabi.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "13",
            "nome": "Sunomono",
            "preco": 7.00,
            "descricao": "Salada agridoce de pepino japonês com kani e gergelim.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "14",
            "nome": "Okonomiyaki",
            "preco": 15.50,
            "descricao": "Panqueca salgada japonesa com repolho, bacon, molho e maionese.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        },
        {
            "id": "15",
            "nome": "Chawanmushi",
            "preco": 9.00,
            "descricao": "Flan salgado de ovo no vapor com pedaços de frango e cogumelos.",
            "imagem": "https://www.mnlamen.com.br/images/img-lamen-3.jpg"
        }
    ],
    "pedidos": [
        {
            "id":"1",
            "mesa":1,
            "items":[
                {
                    "item_id":1, 
                    "quantidade":2
                }
            ]
        },
        {
            "id":"2",
            "mesa":12,
            "items":[
                {
                    "item_id":2, 
                    "quantidade":1
                },
                {
                    "item_id":1, 
                    "quantidade":1
                }
            ]
        }
    ]
}
```

Agora para servir a aplicação, vamos utilizar:

```sh
# Entrar no diretório com os dados
cd server
# Rodar a aplicação
npx json-server -p 3000 dados.json
```

Vamos obter a seguinte saída:

```sh
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching dados.json...

♡( ◡‿◡ )

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/hist
http://localhost:3000/items
http://localhost:3000/pedidos

```
Vamos conseguir acessar essas rotas da seguinte maneira:

```sh
# Batendo na rota /hist
curl -X GET http://localhost:4000/hist
```

Pessoal aqui temos um ponto interessante a observar na documentação do [Json-Server](https://github.com/typicode/json-server), as rotas da API Rest que ele disponibiliza para a aplicação, conseguimos fazer o nosso servidor fornecer os arquivos estáticos também.

Eles serão fornecidos, por padrão de um diretório `./public` dentro do local onde o servidor está sendo executado. O que vamos fazer aqui é criar um diretório chamado `/images` e fornecer as imagens da nossa aplicação ali. Vamos adicionar esses endereços em nossos endpoints.

```json
{
    "hist": {
        "origem": "O macarrão é uma obra-prima derivada da farinha de trigo e a sua história nada mais do que o caminho trilhado por muitos anos durante os quais foram se agregando muitas sabedorias. Vamos chamá-la de “a rota do macarrão”. A história do trigo se inicia na Mesopotâmia (atualmente Irã) há 7 mil anos, quando o cultivo foi desenvolvido e de onde se espalhou para o resto do mundo. Dizem que, a partir do trigo, o pão se desenvolveu na Europa enquanto o macarrão se desenvolvia na Ásia, principalmente na China. No Japão, o macarrão é citado em um documento que data da Era Kamakura (1185-1333). A história do lámen japonês começa em 1910, durante a Era Meiji, ano em que o restaurante “RaiRai Ken” abriu as portas em Asakusa, bairro de Tokyo. Esse restaurante de comida chinesa incluiu em seu cardápio o “Shinasoba (macarrão chinês)”, que consistia de um macarrão fino e comprido, dentro de um caldo leve à base de shoyu (molho de soja). Esse prato que dizem ter dado origem ao lámen, era completado com fatias finas de châshû (lombinho de porco), fatias de naruto (pasta curtida à base de peixe) e cebolinha picada. O nome, no entanto, só surgiria mais tarde, em 1922, na cidade de Sapporo, província de Hokkaido, depois que um restaurante simples de nome “Takeya” abriu as portas. Mais tarde, o estabelecimento mudou de escrita e passou a se chamar “Restaurante Chinês Takeya”. Dizem que Tatsu, a esposa de Masaharu Ohkubo, o dono do estabelecimento, gostava muito das retrucadas que o funcionário chinês bradava da cozinha, “haoliao (está pronto)” e daí batizou o prato de “liao-men (men — macarrão — do liao)” e que na pronúncia japonesa se transformou em “ramen” ou “lamen”.",
        "imagem": "/images/lamen-geral.png",
        "video": "https://youtu.be/PE6tQ5QUU_E?si=D23mIEGbYpkZKnWB"
    },
    "items": [
        {
            "id": "1",
            "nome": "Tokyo Ramen",
            "preco": 14.50,
            "descricao": "Caldo cremoso de porco (tonkotsu) com macarrão, chashu, ovo cozido e cebolinha.",
            "imagem": "/images/tokyo-ramen.png"
        },
        {
            "id": "2",
            "nome": "Miso Ramen",
            "preco": 13.00,
            "descricao": "Caldo à base de pasta de soja (miso) com macarrão, legumes e carne de porco.",
            "imagem": "/images/miso-ramen.png"
        },
        {
            "id": "3",
            "nome": "Shoyu Ramen",
            "preco": 12.50,
            "descricao": "Caldo leve de soja (shoyu) com macarrão, camarão, brotos de bambu e nori.",
            "imagem": "/images/shoyu-ramen.png"
        },
        {
            "id": "4",
            "nome": "Gyoza",
            "preco": 8.00,
            "descricao": "Pastéis recheados de carne de porco e vegetais, servidos com molho ponzu.",
            "imagem": "/images/gyoza.png"
        },
        {
            "id": "5",
            "nome": "Ebi Tempura",
            "preco": 18.00,
            "descricao": "Camarões empanados e fritos em massa leve, acompanhados de molho tentsuyu.",
            "imagem": "/images/ebi-tempura"
        },
        {
            "id": "6",
            "nome": "Yakisoba",
            "preco": 11.50,
            "descricao": "Macarrão frito com legumes, frango e molho agridoce.",
            "imagem": "/images/yakisoba.png"
        },
        {
            "id": "7",
            "nome": "Katsu Don",
            "preco": 16.00,
            "descricao": "Tonkatsu (lombo de porco empanado) servido sobre arroz com ovo e cebola.",
            "imagem": "/images/katsu-don.png"
        },
        {
            "id": "8",
            "nome": "Unagi Don",
            "preco": 25.00,
            "descricao": "Máscara de enguia grelhada com molho kabayaki sobre arroz japonês.",
            "imagem": "/images/unagi-don.png"
        },
        {
            "id": "9",
            "nome": "Sushi Misto",
            "preco": 30.00,
            "descricao": "Seleção de nigiris e sashimis variados, servidos com wasabi e gengibre em conserva.",
            "imagem": "/images/sushi-misto.png"
        },
        {
            "id": "10",
            "nome": "Uramaki de Salmão",
            "preco": 22.00,
            "descricao": "Enrolado de arroz por fora, recheado com salmão, abacate e cream cheese.",
            "imagem": "/images/urumaki-salmao.png"
        },
        {
            "id": "11",
            "nome": "Temaki de Atum",
            "preco": 9.50,
            "descricao": "Cone de alga nori recheado com arroz, atum fresco e cebolinha.",
            "imagem": "/images/temaki-atum.png"
        },
        {
            "id": "12",
            "nome": "Sashimi de Salmão",
            "preco": 28.00,
            "descricao": "Fatias finas de salmão fresco, servidas com molho shoyu e wasabi.",
            "imagem": "/images/sashimi-salmao.png"
        },
        {
            "id": "13",
            "nome": "Sunomono",
            "preco": 7.00,
            "descricao": "Salada agridoce de pepino japonês com kani e gergelim.",
            "imagem": "/images/sunomono.png"
        },
        {
            "id": "14",
            "nome": "Okonomiyaki",
            "preco": 15.50,
            "descricao": "Panqueca salgada japonesa com repolho, bacon, molho e maionese.",
            "imagem": "/images/okonomiyaki.png"
        },
        {
            "id": "15",
            "nome": "Chawanmushi",
            "preco": 9.00,
            "descricao": "Flan salgado de ovo no vapor com pedaços de frango e cogumelos.",
            "imagem": "/images/chawanmushi.png"
        }
    ],
    "pedidos": [
        {
            "id":"1",
            "mesa":1,
            "items":[
                {
                    "item_id":1, 
                    "quantidade":2
                }
            ]
        },
        {
            "id":"2",
            "mesa":12,
            "items":[
                {
                    "item_id":2, 
                    "quantidade":1
                },
                {
                    "item_id":1, 
                    "quantidade":1
                }
            ]
        }
    ]
}
```

O que fizemos aqui foi só ajustar o endereço dos recursos das imagens. Agora vamos trabalhar com nossa aplicação.

## 3. Início da Construção da Aplicação

Agora vamos iniciar o desenvolvimento da nossa aplicação. Primeiro, vamos criar o diretório `/src` e o `/src/app` dentro dele para iniciarmos nosso desenvolvimento. Vamos ajustar o `app.json` e o `package.json` para alterar o ponto de entrada da nossa aplicação.

- `package.json`:

```json
{
  "name": "lamen-menu",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~53.0.8",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-native": "0.79.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
```

- `app.json`:

```json
{
  "expo": {
    "name": "lamen-menu",
    "slug": "lamen-menu",
    "scheme": "meuapp.lamen.menu",
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
    }
  }
}
```

Show, agora vamos pensar na estrutura de diretórios para estruturar nossas rotas da aplicação. Primeiro vamos criar nosso layout base dentro do `/src/app/_layout.js`:

```js
// /src/app/_layout.js
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { CustomHeader } from '../components/CustomHeader';

export default function LayoutBase() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ 
                flex: 1,
                backgroundColor: '#fc7a17' }}>
                <Stack screenOptions={{
                    // Define a cor de fundo do header
                    headerStyle: {
                        backgroundColor: '#FFA07A', // laranja claro
                    },
                    // Remove o título padrão (opcional)
                    headerTitle: '',
                    // Renderiza seu componente customizado no lugar do header
                    header: (props) => <CustomHeader {...props} />,
                }}>
                    <Stack.Screen name="index" options={{title:"Bem Vindo"}}/>
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
```

Aqui temos algumas mudanças que fizemos em relação a outros `_layout.js` que produzimos. Estamos utilizando o `SafeAreaProvider` e o `SafeAreaView` para evitar pontos não vísiveis da tela e o `Stack` para trazer a nossa navegação. Agora, configuramos a `Stack` de uma forma um pouco diferente, na propriedade `screenOptions`, estamos definindo como desejamos que nossa pilha de telas se comporte. Definimos qual a cor do fundo, que por padrão os nomes das rotas não são utilizadas como título pela stack e que o Header é implementado por um component customizado nosso, o `CustomHeader`.

O `CustomHeader` está em `/src/components/CustomHeader.js`, lembrando que todos os arquivos que estiverem dentro do diretório `app` possuiem uma rota associada a ele, portanto componentes não devem ficar neste diretório quanto estamos utilizando nosso `expo-router`. Vamos ver esse componente agora:

```js
// /src/components/CustomHeader.js
// components/CustomHeader.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function CustomHeader({ navigation, route, options, back }) {
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹ Voltar</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>
        {options.title ?? route.name}
      </Text>
      {/* Você pode adicionar botões, ícones, avatar etc. */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // Garanta que coincida com o headerStyle do Stack
    backgroundColor: '#FFA07A',
  },
  backButton: {
    fontSize: 18,
    color: '#fff',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

```

Aqui podemos destacar que recebemos com o `props` alguns atributos que são verificados para a construção de todos os elementos na tela. O primeiro que vale destacar é o botão de **voltar**, que só será exibido quando o `Stack` informar que ele existe. Repare que utilizamos um ternário do JavaScript para verificar se o componente existe, para descidir se retornamos ou não o nosso botão de voltar customizado.

Vamos ajustar agora nossa aplicação principal para que ela possa iniciar o pedido e trazer informações sobre lamen (tela de história). Nosso objetivo aqui vai ser colocar os botões que vão colocar nossa aplicação indo para a página de sobre e para página principal.

```js
// src/app/index.js

import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Botao } from '../components/Botao';
import { router } from 'expo-router';

function mudarParaInfo(){
    router.navigate("/info")
}

function mudarParaHome(){
    router.navigate("/home/items");
}

export default function TelaPrincipal() {
    return (
        <View style={estilo.fundoContainer}>
            <Image source={require("../../assets/images/lamen-logo.png")} resizeMode='cover' style={{width:'100%', height:'60%'}}/>
            <Botao texto={"Iniciar"} funcao={mudarParaHome}/>
            <Botao texto={"Sobre"} funcao={mudarParaInfo}/>
        </View>
    );
}

const estilo = StyleSheet.create(
    {
        fundoContainer: {
            backgroundColor: '#fa883c',
            flex: 1,
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
);
```

E o nosso componente botão:

```js
// src/components/Botao.js
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export function Botao({texto, funcao}) {
    return (
            <TouchableOpacity style={estilo.botao} onPress={funcao?? null}>
                <Text style={estilo.textoBotao}>{texto}</Text>
            </TouchableOpacity>
    );
}

const estilo = StyleSheet.create(
    {
        botao: {
            width: "80%",
            padding: 8,
            margin: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#f0f0f0',
            backgroundColor: '#693c3f',
            borderRadius: 20,
        },
        textoBotao: {
            fontSize: 24,
            color: '#c4c4c4',
            padding: 16,
            textAlign: 'center',
        },
    }
);
```

Maravilha! Nossa navegação já está funcionando! Ainda levamos um erro quando vamos para essas telas, uma vez que elas ainda não existem!
Vamos ajustar isso!! Primeiro, vamos compreender como cada parte desta lógica vai funcionar. Primeiro vamos fazer a tela sobre buscando as informações do servidor.

> "Calma ai Murilão! Será que isso não vai trazer uma sobrecarga desnecessária para a aplicação?"

Você tem um ponto interessante aqui. Estamos fazendo uma troca aqui, uma vez que vamos pegar as informações por uma rota do servidor, qualquer mudança, será realizada no backend. Isso faz com que as informações do aplicativo possam ser alteradas, sem ter que trocar a versão do aplicativo. É desta vantagem que estamos interessados! Vamos trabalhar com esse paradigma!

Primeiro vamos deixar nosso servidor funcionando para servir as informações:

```sh
npx json-server -p 3000 dados.json
```

Ahh para exibirmos nosso vídeo no aplicativo, vamos instalar o navegador dentro do nosso aplicativo, para isso:

```sh
# Instalar no diretório da nossa solução
npx expo install expo-web-browser
```

Agora, nossa exibição vai ficar:

```js
// src/app/info.js

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const meuServer = 'http://10.128.0.171:4000'

export default function Sobre() {
  const [hist, setHist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHist() {
      try {
        const res = await fetch(`${meuServer}/hist`); // ← ajuste para sua URL
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setHist(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHist();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erro: {error}</Text>
      </View>
    );
  }
  if (!hist) {
  return (
    <View style={styles.center}>
      <Text style={styles.error}>Nenhum dado disponível</Text>
    </View>
  );
}
  console.log(`error: ${error} loading: ${loading} hist: ${hist}`)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagem */}
      <Image 
        source={{ uri: `${meuServer}${hist.imagem}` }} 
        style={styles.image} 
        resizeMode="cover"
      />

      {/* Texto */}
      <Text style={styles.text}>
        {hist.origem}
      </Text>

      {/* Botão para abrir vídeo */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => WebBrowser.openBrowserAsync(hist.video)}
      >
        <Text style={styles.buttonText}>Ver vídeo sobre a história</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  image: {
    width: '100%', 
    height: 200, 
    borderRadius: 8, 
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFA07A', // mesmo laranja do header
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
```

Beleza! Temos que ajustar nossa página do `_layout.js`:

```js
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { CustomHeader } from '../components/CustomHeader';

export default function LayoutBase() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ 
                flex: 1,
                backgroundColor: '#fc7a17' }}>
                <Stack screenOptions={{
                    // Define a cor de fundo do header
                    headerStyle: {
                        backgroundColor: '#fc7a17', // laranja claro
                    },
                    // Remove o título padrão (opcional)
                    headerTitle: '',
                    // Renderiza seu componente customizado no lugar do header
                    header: (props) => <CustomHeader {...props} />,
                }}>
                    <Stack.Screen name="index" options={{title:"Bem Vindo"}}/>
                    <Stack.Screen name="info" options={{title: "História do Lamen"}} />
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
```

Beleza, agora vamos para nosso menu de navegação com os items 🍜.

## 4. Menu com os items

Nosso menu será exibido com uma navegação no formato de `Tab`, assim o usuário vai conseguir ver seu pedido e também as opções. Nossa página de exibição de items vai ficar com o seguinte formato:

```js
// app/lamens.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

const SERVER = 'http://10.128.0.171:4000';

export default function Lamens() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch(`${SERVER}/items`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setItems(json);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Erro: {error}</Text>
            </View>
        );
    }
    if (!items) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Nenhum dado disponível</Text>
            </View>
        );
    }

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: `${SERVER}${item.imagem}` }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.description}>{item.descricao}</Text>
                <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
            </View>
            {/* Exemplo de botão caso queira ação no card */}
            <TouchableOpacity style={styles.button} onPress={() => {/* ação */ }}>
                <Text style={styles.buttonText}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
    card: {
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        // sombra (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // sombra (Android)
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#eee',
    },
    info: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA07A', // laranja do header
    },
    button: {
        backgroundColor: '#FFA07A',
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});
```

Agora vamos precisar ajustar o layout para exibir corretamente os items e um modal para exibir seus detalhes. Adicionando o Modal.

```js
// app/lamens.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Modal
} from 'react-native';

const SERVER = 'http://10.128.0.171:4000';

export default function Lamens() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Novo estado para modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch(`${SERVER}/items`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setItems(json);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Erro: {error}</Text>
            </View>
        );
    }
    if (!items) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Nenhum dado disponível</Text>
            </View>
        );
    }

    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>
                <Image
                    source={{ uri: `${SERVER}${item.imagem}` }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.nome}</Text>
                    <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderCard}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal de detalhes */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedItem && (
                            <>
                                <Image
                                    source={{ uri: `${SERVER}${selectedItem.imagem}` }}
                                    style={styles.modalImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.modalTitle}>{selectedItem.nome}</Text>
                                <Text style={styles.modalDescription}>
                                    {selectedItem.descricao}
                                </Text>
                                <Text style={styles.modalPrice}>
                                    R$ {selectedItem.preco.toFixed(2)}
                                </Text>
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
    card: {
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        // sombra (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // sombra (Android)
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#eee',
    },
    info: {
        padding: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA07A', // laranja do header
    },
    button: {
        backgroundColor: '#FFA07A',
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    /* Estilos do Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // fundo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    modalImage: { width: '100%', height: 180, borderRadius: 4, marginBottom: 12 },
    modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#333' },
    modalDescription: { fontSize: 16, lineHeight: 22, color: '#555', marginBottom: 12 },
    modalPrice: { fontSize: 18, fontWeight: 'bold', color: '#FFA07A', marginBottom: 16 },

    closeButton: {
        backgroundColor: '#FFA07A',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

```


## Referências

<iframe width="560" height="315" src="https://www.youtube.com/embed/nOzaJPneCRY?si=dy4B4g428fMirvue" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/37vxWr0WgQk?si=N_NKmb0y-w5rY7LT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/q28lfkBd9F4?si=JEB6AtKM_JW0j03r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/r88z8nrk8Ww?si=JAoG4-LX7GkTTkm_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />