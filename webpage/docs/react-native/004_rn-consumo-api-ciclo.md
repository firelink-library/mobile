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