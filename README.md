# Grupo-2
<table>
  <tr width="100%">
    <td width="20%" align="center"><a href="https://www.stone.com.br/"><img src="./docs/img/stone-logo.png" alt="Stone" border="0" width="90%"></a></td>
    <td width="80%"><a href="https://www.inteli.edu.br/"><img src="./docs/img/inteli-logo.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width="30%"></a></td>
  </tr>
</table>

# Projeto: *Aplicações escaláveis em sistemas distribuídos*

# Grupo: *NimBBBus*

# Integrantes:

* [André Lessa](mailto:Andre.Junior@sou.inteli.edu.br)
* [Arthur Reis](mailto:Arthur.Reis@sou.inteli.edu.br)
* [Gabriel Nhoncanse](mailto:Gabriel.Nhoncanse@sou.inteli.edu.br)
* [Pedro Munhoz](mailto:Pedro.Rivero@sou.inteli.edu.br)
* [Pedro Silva](mailto:Pedro.Silva@sou.inteli.edu.br)
* [Raphael Lisboa](mailto:Raphael.Antunes@sou.inteli.edu.br)
* [Vitor Augusto](mailto:Vitor.Barros@sou.inteli.edu.br)

# Descrição

A empresa Stone é uma parceira do Big Brother Brasil e durante o programa, ocorrem inserções publicitárias que promovem a Stone, resultando em um aumento significativo no tráfego de seus sites, podendo chegar a até 35.000 requisições. Devido a essa alta demanda, os sites podem enfrentar diversos problemas, como instabilidade, erros, atrasos e lentidão. Portanto, é fundamental implementar uma solução robusta capaz de lidar com esses momentos de pico, mantendo a estabilidade do sistema e otimizando os custos.

O objetivo principal deste projeto é criar um site personalizado para a Stone Pagamentos e desenvolver uma infraestrutura tecnológica escalável baseada em um ambiente em nuvem, como a AWS (Amazon Web Services). Essa abordagem permitirá que a plataforma se adapte dinamicamente às flutuações na demanda, garantindo que permaneça eficiente e estável mesmo durante os períodos de alta carga. Além disso, o uso de uma infraestrutura em nuvem permite que a empresa pague apenas pelos recursos realmente utilizados, mantendo assim um equilíbrio financeiro adequado às necessidades específicas da Stone Pagamentos.

# Documentação

Os arquivos da documentação deste projeto estão na pasta [docs/index.md](docs/index.md), e o seu conteúdo é publicado via GitHub Pages.

# Artigo

O artigo deste projeto está no diretório [docs/artigo.md](docs/artigo.md)

# Configuração para desenvolvimento

Para o desenvolvimento do projeto, foi utilizado JavaScript com o Express para o backend e o framework React.js para o frontend. Portanto, é necessário ter o Node.js instalado em seu dispositivo desktop.

[Node.js](https://nodejs.org/en)

Além disso, o backend está distribuído em micros serviços, podendo ser executado através do Node.js ou do Docker, caso não esteja instalado em seu dispositivo:

[Docker](https://www.docker.com/)

Se você já tiver o Node.js e o Docker instalados, é necessário navegar até o diretório em que deseja executar o serviço (microserviço ou frontend) e instalar todas as dependências:

```npm i``` ou ```npm install```

Após a instalação das dependências, para rodar o backend, você pode fazê-lo através do Docker:

```docker compose up```

ou através do Node.js com o seguinte comando:

```node index.js```

Em ambos os casos, o backend estará rodando em "localhost:3333".

É importante observar que todos os microserviços estão expostos na mesma porta, sendo permitido rodar apenas um de cada vez.

No frontend, é necessário inserir o seguinte comando:

```npm run start```

E a aplicação será executada em "localhost:3000".

É importante notar que, dentro do diretório frontend/src/constants, deve-se alterar ec2Url para o endereço que está rodando o microserviço do backend localmente caso queira utilizar a aplicação integrada.

# Tags

* SPRINT 1:
  * MVP com deploy da aplicação com arquitetura básica.
  * Entendimento de Negócio.
  * Requisitos Funcionais e Não Funcionais.
  * Entendimento do Usuário.
* SPRINT 2:
  * Arquitetura corporativa.
  * Front-end.
  * Back-end.
  * Artigo (versão 1).
* SPRINT 3:
  * Modelagem e Implementação.
  * Artigo (versão 2).
* SPRINT 4:
  * Testes do sistema.
  * Relatório Técnico.
  * Definição da aplicação.
  * Artigo (versão 3).
* SPRINT 5:
  * Apresentação da sprint final.
  * Refinamentos da aplicação.
  * Artigo completo.
  * Análise de Gestão de Custo.

# Licença

<table>
  <tr><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"></tr>
</table>

<table>
  <tr><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></tr>
</table>

[Application 4.0 International](https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1)