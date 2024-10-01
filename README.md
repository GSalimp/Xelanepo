# Xelanepo

Xelanepo is a web application that allows users to search for paper authors. Built with React, it provides an intuitive interface for discovering researchers, their work, and related publications.

# Authors
- Guilherme Salim Monteiro de Castro Paes
- Mateus Filipe Moreira Silva

## Features

- **Author Search:** Find paper authors by name, field, or keywords.
- **Detailed Profiles:** View author profiles with relevant information such as their publications, affiliations, and areas of expertise.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend:** React
- **Styling:** CSS
- **API Integration:** OpenAlex API

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/GSalimp/xelanepo.git

2. Navigate to the project directory:
   ```bash
   cd xelanepo

3. Install the dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
    npm run dev

## ENUNCIADO

Projeto Final - Apresentação em 07/10/24
Desenvolver uma página responsiva que mostra alguns dados da produção científica de um cientista, obtidos a partir da OpenAlex (https://openalex.org/). 
Os dados que devem ser mostrados dizem respeito a:

-~~Número de artigos publicados~~
-~~Instituição onde a pessoa trabalha atualmente e já trabalhou antes~~
-~~Índices~~
-~~Tópicos mais abordados pelo cientista nos artigos~~
-Quais são os colaboradores desse cientista (coautores nos artigos)
-Quais desses coautores são mais frequentes.
-~~Quais são os artigos mais importantes (mais citados)~~

Usem a criatividade para mostrar esses dados de forma interessante e, se possível, interativa (clicar nos co-autores, voltar ao autor anterior, arrastar, etc, etc).
Olha só o que o próprio site da OpenAlex traz, para se inspirarem: https://openalex.org/works?page=1&filter=authorships.author.id%3Aa5058053632
O projeto poderá ser feito em dupla.
No dia 07/10/24 todas as duplas irão fazer uma apresentação de 5 a 10 minutos sobre seus projetos, mostrando o resultado final, como interagir com a página, mencionando quais tecnologias foram utilizadas e outros detalhes que acharem pertinente. Não é preciso utilizar slides.
A entrega pode ser feita a partir do link do repositório (github) ou com os arquivos todos em um zip.
Coloque o nome dos integrantes da dupla. Apenas 1 integrante da dupla deve entregar, que eu contabilizo a nota para os dois.
Prazo: 07/10/24
Bom trabalho para vocês!

## TODO
### Works
- Esta ficando com o icone de loading toda vez q vc scrolla na pagina = É isso mesmo
- Acho q esta fazendo requisição repedidamente, da uma olhada no terminal, tem um warning que fica incrementadno quando o scroll não esta na parte de work

### Mobile
- Search = Comecei
- Home = Feito 
- Profile = Feito

## TODO - MELHORIAS

### ProfileHeader
- Pegar os dados de algum lugar = Provavelmente não vamos fazer por ser muito complicado e não ter muito tempo. Mas pode tentar se quiser

### Pesquisa
- Funcionando, mas não esta boa, acho q não tem como arrumar sem muito trabalho

### Outros
- Tem uma cacetada de warning no console, não sei como resolver
- Parte de coautores (do enunciado) não esta feita = Precisa fazer?
- Reajustar cards do profile pra ficar igual o do figma
