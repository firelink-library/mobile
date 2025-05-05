---
sidebar_position: 6
slug: /pond5
title: "Rinha de Backend"
---

## Rinha de Backend

> "Murilo, por que uma atividade de backend está aqui?"

Porque eu ainda não achei um repositório interessante para deixar ela, por enquanto ela fica aqui mesmo.

Pessoal este projeto segue a ideia disponível em: https://github.com/zanfranceschi/rinha-de-backend-2024-q1?tab=readme-ov-file.

Logo menos vou colocar mais detalhes de como realizar essa atividade. Vou deixar alguns links de vídeos relacionados para quem quiser visualizar.

## Objetivo do Projeto

Pessoal o grande objetivo deste projeto é criar uma API RESTful que permita a interação entre sistemas. Contudo, este backend vai sofrer pressão de carga, ou seja, ele vai ter que suportar um grande número de requisições simultâneas. Para isso, o backend deve ser capaz de lidar com múltiplas requisições ao mesmo tempo, utilizando técnicas como balanceamento de carga e escalabilidade horizontal.

O desafio aqui é implementar estas funcionalidades de forma eficiente e escalável, garantindo que o sistema possa suportar um grande número de requisições simultâneas sem comprometer a performance ou a disponibilidade do serviço. Aqui cabe ressaltar que qualquer ferramenta pode ser utilizada para sua criação, Python, Go, Rust, C, C++, Assembly e não vou continuar, mas deu para entender o conceito aqui. Basta que ela seja capaz de implementar uma API RESTful e que tenha a capacidade de suportar um grande número de requisições simultâneas.

A tecnologia utilizada no banco de dados também não é um problema, você pode implementar o banco de dados que achar mais adequado. Extremamente importante, é descrever a `ARQUITETURA DOS DADOS` e a `ARQUITETURA DO BACKEND` no README do projeto. Estou chamando de arquitetura o que você fez para suportar um grande número de requisições simultâneas. O que você fez para garantir a escalabilidade do sistema. O que você fez para garantir a disponibilidade do sistema. O que você fez para garantir a segurança do sistema. O que você fez para garantir a integridade dos dados. Acredito que aqui um diagrama de blocos traz grande valor para compreender o sistema.

Outros pontos importantes a serem considerados são:

- O que você fez para garantir a segurança do sistema?
- O que você fez para garantir a integridade dos dados?
- O que você fez para garantir a disponibilidade do sistema?
- O que você fez para garantir a escalabilidade do sistema?
- O que você fez para garantir a performance do sistema?
- O que você fez para garantir a manutenibilidade do sistema?
- O que você fez para garantir a testabilidade do sistema?

Essas perguntas devem ser respondidas no README do projeto. Também é importante destacar que não apenas elas precisam ser respondidas, mas também elas devem ser pontos para reflexão, do gênero: "O que você fez para garantir a segurança do sistema?" e não "O que você fez para garantir a segurança do sistema?". Importante deixar claro que não existe resposta clara para cada uma destas perguntas. Existe a escolha realizada para o sistema que foi implementado e a sua justificativa.

O teste do sistema será executado rodando o arquivo de compose. Verificar restrições do docker-compose neste [link](https://github.com/zanfranceschi/rinha-de-backend-2024-q1?tab=readme-ov-file#restricoes).

As características do teste podem ser vistas neste [link](https://github.com/zanfranceschi/rinha-de-backend-2024-q1?tab=readme-ov-file).


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

<iframe width="560" height="315" src="https://www.youtube.com/embed/EifK2a_5K_U?si=pWx4S5Yyp3jffR3X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/-yGHG3pnHLg?si=NXmkxXdajZNSsA5a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z4KNilvx8Pk?si=KqHswRnD4aqyTxQN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/AFtRYXJVO-4?si=oUGE4C3FQNo7nDp9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style={{display:"block", marginLeft:"auto", marginRight:"auto"}} allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/DM65_JyGxCo?si=xqns-5DKGDtZlzbU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />

<iframe width="560" height="315" src="https://www.youtube.com/embed/oap6A7VxtDs?si=EESdNglPw4jKBGm4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style={{ display: 'block', marginLeft: 'auto', maxHeight: '40vh', marginRight: 'auto', marginBottom: '24px' }}></iframe>
<br />