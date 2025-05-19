---
sidebar_position: 2
slug: /pond1
title: "Desenvolvimento com Flutter"
---

Pessoal cada um dos projetos tem por objetivo treinar e praticar os conceitos necessários para o desenvolvimento de aplicações Mobile. Acredito que com eles, vocês poderão aprimorar e validar seus conhecimentos. Eventuais dúvidas que vocês tiverem, não deixem de perguntar, estarei sempre à disposição para ajudar. Você podem abrir uma `issue` no repositório do projeto ou me chamar diretamente por <a href='mailto:carvalho.zanini@gmail.com'>e-mail</a>.

## Desenvolvimento de Aplicativo com Flutter

O objetivo deste projeto é realizar a implementação de um aplicativo que traga as seguintes características:
- Ele deve realizar uma implementação do protótipo de baixa fidelidade apresentado;
- Ele deve seguir algum *design system* comercial ([Google Material Design](https://m3.material.io/), [HIG Apple](https://developer.apple.com/design/human-interface-guidelines), [Fluent Microsoft](https://fluent2.microsoft.design/));
- A aplicação deve ser entregue na plataforma Github;
- Ela deve interagir com uma API (essa não precisa ser implementada, pode-se utilizar a interação com ela mocada - [Fakerjs](https://fakerjs.dev/) ou [`{JSON} Placeholder`](https://jsonplaceholder.typicode.com/));

:::note[Sugestão de Server para os Dados]

Pessoal deixo aqui uma sugestão para utilizar a API Rest para os testes: [Json-Server](https://firelink-library.github.io/tools/json-server).

:::

- Na tela de exibição de produtos, ela deve necessáriamente exibir 10000 itens (o objetivo principal aqui é verificar qual estratégia de paginação vocês estão utilizando);
- Deve ser possível utilizar a camera do dispositivo;
- Deve ser possível compartilhar imagens com a aplicação;
- A aplicação deve ter algum tipo de controle de usuário (fica a critério do desenvolvedor como está implementação será realizada);
- O aplicativo deve possuir um sistema de notificação (estas notificações podem ser implementadas apenas quando o aplicativo está aberto).


## Sugestões de Telas e Funcionalidades

### Login / Autenticação

O objetivo desta tela é permitir que o usuário realize o login na aplicação. Para isso, ele deve informar o e-mail e a senha. Caso o usuário não tenha um cadastro, ele deve ser redirecionado para a tela de cadastro. Isso já implica na criação também de uma tela de cadastro!!

Interessante que o usuário possa realizar o reset da senha, caso ele tenha esquecido. Para isso, ele deve informar o e-mail e o sistema deve enviar um e-mail para o usuário com as instruções de como realizar o reset da senha. Essa é uma das possíveis soluções para o problema de esquecer a senha. Minha sugestão é que vocês verifiquem o mecanismo de OTP (One Time Password) para o envio do e-mail. O que é isso? É um código que é enviado para o e-mail do usuário e ele deve informar esse código na tela de reset de senha. Isso garante que o usuário realmente tenha acesso ao e-mail informado.

:::tip[Sugestão de Leitura para compreender melhor o conceito de OTP]

Pessoal seguem duas sugestões de leitura para vocês compreenderem melhor o conceito de OTP:

- <a href='https://auth0.com/blog/what-is-a-one-time-password-otp/'>O que é uma senha de uso único (OTP)</a>
- <a href='https://www.freecodecamp.org/news/how-time-based-one-time-passwords-work-and-why-you-should-use-them-in-your-app-fdd2b9ed43c3/'>Como funcionam as senhas de uso único baseadas em tempo e por que você deve usá-las em seu aplicativo</a>

:::

<img  
  src={require('/img/login.jpg').default} alt="Tela de Login"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

###  Principal / Lista de Produtos (Home)

O objetivo do Home é exibir uma tela de boas vindas. Pense nesta tela como a tela inicial de um aplicativo de compras. Ele deve exibir uma lista geral de produtos. Aqui o objetivo é que seu aplicativo consegui exibir até os 10.000 produtos, mas claro que não todos de uma única vez. Acredito que o ideal aqui seria a exibição de 10 produtos, como critério de sugestão, e uma tela para exibir os produtos, com a possibilidade da adição de filtros seja interessante.  


Essa tela também é a tela que o usuário é direcionado depois de realizar o login. É interessante que ele possa acessar as demais funcionalidades do aplicativo a partir desta tela.

<img
  src={require('/img/10000produtos.jpg').default}
  alt="Tela Principal"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

### Detalhes do Produto

Na tela de detalhes do produto, algum texto descritivo do produto, junto com sua imagem, devem ser exibidos para o usuário. Aqui o objetivo é que o usuário consiga visualizar as informações do produto, como preço, descrição, etc. Essa tela deve ser acessada a partir da tela de produtos. 

Note que aqui é um bom momento para adicionar uma funcionalidade de favoritar o produto. Isso pode ser feito através de um botão que o usuário pode clicar para adicionar o produto a sua lista de favoritos. Essa funcionalidade não é obrigatória, mas é interessante para o usuário.

<img
  src={require('/img/detalhes.jpg').default}
  alt="Tela de Detalhes"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />


### Câmera / Adicionar Item

Está tela, por mais simples que possa parecer, tem diversas funcionalidades. Primeiro que ela traz a possibilidade de adicionar um novo item na lista de produtos. Apenas está funcionalidade tem um grande impacto no design do aplicativo, pois demanda que a sua aplicação que vai funcionar de `backend` tenha a capacidade de receber novos produtos. Isso pode ser feito através de uma API, que pode ser implementada com o `Node.js`, `Python`, `GoLang` ou qualquer outra ferramenta de sua preferencia. Caso você opte por não implementar a API, você pode utilizar o `Fakerjs` ou o `{JSON} Placeholder` para simular a adição de novos produtos. Também é possível utilizar apenas o armazenamento local do dispositivo para armazenar os produtos. 

Outro objetivo desta tela é permitir que o usuário tire uma foto do produto. Isso pode ser feito através da câmera do dispositivo. Interagir como hardware do dispositivo é uma das funcionalidades interessantes da criação de aplicativos. Sempre é interessante verificar qual o grau de interação esperado pelo usuário com a aplicação, para verificar acima de tudo se a ferramenta utilizada para o desenvolvimento do aplicativo é compatível com isso (se já existe suporte para o que se deseja fazer).

É interessante colocar um pouco de energia em estudar como fazer o `storage` das imagens enviadas. Minha sugestão é verificar algum serviço que consiga fazer esse armazenamento, como o [`Supabase`](https://supabase.com/), o [`PocketBase`](https://pocketbase.io/) ou o [`MinIO`](https://min.io/).

<img
  src={require('/img/camera.jpg').default}
  alt="Tela da Câmera"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

### Perfil

Aqui informações do usuário devem ser exibidas. O objetivo é que o usuário consiga visualizar as informações do seu perfil, como nome, e-mail, telefone, etc. Essa tela deve ser acessada a partir da tela Home. Contudo, outras estratégias de navegação podem ser utilizadas. O usuário deve ser capaz de editar as informações do seu perfil. Isso pode ser feito através de um botão que o usuário pode clicar para editar as informações do seu perfil. Essa funcionalidade não é obrigatória, mas é interessante para o usuário. O usuário deve ser capaz de alterar a sua senha e sua foto de perfil.

<img
  src={require('/img/perfil.jpg').default}
  alt="Tela de Perfil"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

### Notificações

Aqui o objetivo é trabalhar com notificações dentro da aplicação. Qualquer tipo de notificação pode ser utilizada, como por exemplo, uma notificação de um novo produto adicionado. O objetivo é que o usuário consiga visualizar as notificações recebidas. Fica a critério do desenvolvedor como as notificações serão exibidas. O usuário deve ser capaz de visualizar as notificações recebidas. 

<img
  src={require('/img/notificacoes.jpg').default}
  alt="Tela de Notificações"
  style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}
/>
<br />

## Barema de Avaliação

Aqui será descrito quais critérios de aceite para a solução submetido.

| Faixa de Valor | Descrição         | Comentários Gerais |
|----------------|-------------------|--------------------|
| 0 - 1 | Não iniciou o projeto | Não foi iniciado o projeto ou não foi entregue. Ou ainda o projeto não tem nada além do template inicial do projeto. |
| 1,1 - 5 | Iniciou o projeto | O projeto foi iniciado, mas não tem a maioria das funcionalidades implementadas. Ou ainda o projeto não tem a funcionalidades corretamente implementadas. |
| 5,1 - 8 | Projeto em andamento | O projeto está em andamento, mas ainda faltam implementar algumas das funcionalidades essenciais para o seu pleno funcionamento. Tudo que foi implementado está devidamente funcional. |
| 8,1 - 9 | Projeto em fase de finalização | O projeto está em fase de finalização, faltando apenas alguns detalhes para o seu pleno funcionamento. Tudo que foi implementado está devidamente funcional. |
| 9,1 - 10 | Projeto finalizado | O projeto está finalizado, tudo que está implementado funciona corretamente. |

## Sugestão de Material de Consulta

- [10 Public design systems](https://medium.com/@ludaboss/10-public-design-systems-44db58f377f6)
- [Afinal, o que é Design System?](https://brasil.uxdesign.cc/afinal-o-que-%C3%A9-design-system-448c257b0021)
- [Fakerjs](https://fakerjs.dev/)
- [`{JSON} Placeholder`](https://jsonplaceholder.typicode.com/)
- [Documentação do Flutter](https://docs.flutter.dev/get-started/install)


<iframe width="560" height="315" src="https://www.youtube.com/embed/pTJJsmejUOQ?si=YyAY1uCy2IGMVbFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/VPvVD8t02U8?si=Qfl_OZqO-81XQdfJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/9gpAtzQhYkY?si=DiMM5gLeYndpl7kn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/XeUiJJN0vsE?si=DX8Jcpk1cuyidc8o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/J4BVaXkwmM8?si=8yhpxbPNO0kYXBLS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />