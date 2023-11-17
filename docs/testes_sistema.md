# Testes do Sistema

## Cenários de testes
Cenário de Teste para Requisitos Funcionais do Sistema de Loja Online

Cenário 1: Cadastro de Informações Pessoais (RF1)

Descrição: O usuário deseja criar uma conta na loja online e cadastrar suas informações pessoais.

Passos do Cenário:

O usuário acessa a página inicial da loja online.
O usuário clica no botão "Criar Conta" ou "Cadastro".
O sistema exibe um formulário de cadastro com campos para informações pessoais, como nome completo, endereço de e-mail,senha, número de celular, cidade em que reside,CPF, CNPJ, o segmento de atuação no mercado de trabalho, horário de funcionamento de seu comércio e seu documento de identificação.
O usuário preenche todos os campos obrigatórios do formulário.
O usuário clica no botão "Enviar" para concluir o cadastro.
O sistema valida os dados do formulário.
O sistema cria uma conta para o usuário e exibe uma mensagem de confirmação.
Cenário 2: Visualização de Informações Pessoais (RF2)

Descrição: O usuário deseja visualizar as informações pessoais que cadastrou na loja online.

Passos do Cenário:

O usuário realiza o login na loja online.
O sistema redireciona o usuário para a página do seu perfil.
O sistema exibe as informações pessoais, incluindo todos os dados que o usuário cadastrou.
Cenário 3: Atualização de Informações Pessoais (RF3)

Descrição: O usuário deseja atualizar as informações pessoais cadastradas na loja online.

Passos do Cenário:

O usuário realiza o login na loja online.
O sistema redireciona o usuário para a página do seu perfil.
O usuário clica no botão "Editar Perfil".
O sistema exibe um formulário de edição com as informações pessoais atuais do usuário.
O usuário atualiza os campos desejados.
O usuário clica no botão "Salvar" para confirmar as alterações.
O sistema valida os dados atualizados e exibe uma mensagem de confirmação.
Cenário 4: Exclusão de Informações Pessoais (RF4)

Descrição: O usuário deseja deletar sua conta na loja online, o que inclui suas informações pessoais.

Passos do Cenário:

O usuário realiza o login na loja online.
O sistema redireciona o usuário para a página do seu perfil.
O usuário clica no botão "Deletar Conta".
O sistema exibe uma mensagem de confirmação, solicitando que o usuário confirme a exclusão da conta.
O usuário confirma a exclusão.
O sistema deleta a conta do usuário, incluindo todas as informações pessoais.
Cenário 5: Visualização de Informações de Produtos (RF5)

Descrição: O usuário deseja ver informações sobre os produtos disponíveis na loja online.

Passos do Cenário:

O usuário acessa a página inicial da loja online.
O sistema exibe uma lista de produtos com informações como nome, preço, descrição e imagem.
O usuário pode clicar em um produto para obter mais detalhes.
Cenário 6: Realização de Compras (RF6)

Descrição: O usuário deseja comprar um produto na loja online.

Passos do Cenário:

O usuário acessa a página de detalhes de um produto.
O sistema exibe informações detalhadas sobre o produto, incluindo nome, preço, descrição e imagem.
O usuário clica no botão "Adicionar ao Carrinho" ou "Comprar".
O sistema adiciona o produto ao carrinho de compras do usuário.
O usuário pode continuar navegando ou finalizar a compra.
O usuário vai para o carrinho de compras e revisa os produtos selecionados.
O usuário clica no botão "Finalizar Compra" e é direcionado para o processo de pagamento.
Cenário 7: Confirmação de Deleção de Conta (RF7)

Descrição: O usuário deseja deletar sua conta na loja online e o sistema pede uma confirmação.

Passos do Cenário:

O usuário realiza o login na loja online.
O sistema redireciona o usuário para a página do seu perfil.
O usuário clica no botão "Deletar Conta".
O sistema exibe uma mensagem de confirmação, solicitando que o usuário confirme a exclusão da conta.
O usuário pode escolher confirmar ou cancelar a ação.
Se o usuário confirmar, o sistema prossegue com a exclusão da conta (cenário 4). Se o usuário cancelar, a conta não é deletada.
Observações:

Em todos os cenários, é importante verificar se as informações exibidas correspondem aos dados inseridos pelo usuário.
Os cenários de compra (RF6) podem incluir testes de processamento de pagamento simulados, dependendo da implementação do sistema.
Os cenários devem ser adaptados para cobrir diferentes casos de uso e situações de exceção, incluindo validação de dados, os tratamento de erros e mensagens de feedback ao usuário.

## Testes de microsserviços
Testes de microsserviços são um conjunto de práticas e técnicas de teste usadas para verificar e validar o comportamento funcional e não funcional de microsserviços em um sistema de software. Microsserviços são uma arquitetura de software em que uma aplicação é dividida em vários componentes independentes e autônomos, chamados de microsserviços. Cada microsserviço é responsável por uma parte específica da funcionalidade da aplicação e pode ser desenvolvido, implantado e dimensionado de forma independente.

Para validar e verificar as funcionalidades dos endpoints de cada microsserviço foram escolhidos testes de integração, já que há uma comunicação com o banco de dados (outra parte do sistema) que representa de forma mais assertiva a aplicação. Foi decidido realizar apenas testes de sucesso pois para verificação e validação funcional é mais adequado.

Um teste dos endpoints com exemplos mais detalhados pode ser visto no link do Postman: https://documenter.getpostman.com/view/26564618/2s9YCARVZK

### Microsserviço Products

#### T1 - Obter produtos do tipo Stone
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar todos os produtos do tipo Stone que estão no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  GET /products/stone
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Adicionar na url: localhost:3333/products/stone (GET por padrão)<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: lista de produtos

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: lista de produtos

#### T2 -  Obter produtos do tipo Ton

**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar todos os produtos do tipo Ton que estão no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  GET /products/ton
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Adicionar na url: localhost:3333/products/ton (GET por padrão)<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: lista de produtos

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: lista de produtos

### Microsserviço Sales
#### T3 - Criar uma venda

**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue criar uma venda no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  POST /sales
```
corpo: <br>
{
    "idProducts",
    "idUser",
    "value",
    "status"
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `idProducts`      | `string` | **Produtos selecionados pelo usuário** |
| `idUser`      | `int` | **Usuário que realizou a compra** |
| `value`      | `float` | **Valor da venda/compra** |
| `status`      | `int` | **Status da venda/compra** |


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para POST <br>
(4) Adicionar na url: localhost:3333/sales/ <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
status: 201 Created <br>

**Resultado obtido:**<br>
status: 201 Created <br>

#### T4 - Atualizar uma venda
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue atualizar as informações de uma venda no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  PUT /sales
```
corpo: <br>
{
    "id",
    "idProducts",
    "idUser",
    "value",
    "status"
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Id da compra** |
| `idProducts`      | `string` | **Produtos selecionados pelo usuário** |
| `idUser`      | `int` | **Usuário que realizou a compra** |
| `value`      | `float` | **Valor da venda/compra** |
| `status`      | `int` | **Status da venda/compra** |


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para PUT <br>
(4) Adicionar na url: localhost:3333/sales/ <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: {"message": "venda atualizada com sucesso!"}

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: {"message": "venda atualizada com sucesso!"}

#### T5 - Obter venda de um usuário em processamento
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar vendas em processamento de um usuário específico.

**Pré-condição:** <br> 
url: <br>
```http
  GET /sales/:id
  id: id do usuário desejado
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Adicionar na url: localhost:3333/sales/:id (GET por padrão)<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: lista de vendas em processamento do usuário especificado

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: lista de vendas em processamento do usuário especificado

#### T6 - Deletar uma venda
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue deletar uma venda do banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  DELETE /sales/:id
  id: id da venda
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo de requisição para DELETE <br>
(3) Adicionar na url: localhost:3333/sales/:id<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>

**Resultado obtido:**<br>
status: 200 OK <br>

### Microsserviço Users
#### T7 - Criar novo usuário
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue criar um usuário no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  POST /users
```
corpo: <br>
{
    "name", 
    "email", 
    "password", 
    "phone", 
    "city", 
    "cnpj", 
    "cpf", 
    "working_hours", 
    "segment"
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **nome do usuário** |
| `email`      | `string` | **e-mail do usuário** |
| `password`      | `string` | **senha do usuário** |
| `phone`      | `string` | **telefone do usuário** |
| `city`      | `string` | **cidade do usuário** |
| `cnpj`      | `string` | **CNPJ do usuário** |
| `cpf`      | `string` | **CPF do usuário** |
| `working_hours`      | `string` | **horário de funcionamento do estabelecimento do usuário** |
| `segment`      | `string` | **segmento do usuário** |


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para POST <br>
(4) Adicionar na url: localhost:3333/users <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
status: 201 Created <br>

**Resultado obtido:**<br>
status: 201 Created <br>

#### T8 - Obter todos os usuários
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar todos os usuários do banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  GET /users
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Adicionar na url: localhost:3333/users (GET por padrão)<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: lista de usuários

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: lista de usuários

#### T9 - Logar Usuário
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar um usuário a partir de seu e-mail e senha. Dessa forma, o login do usuário na plataforma poder ser validado.

**Pré-condição:** <br> 
url: <br>
```http
  POST /users/login
```
corpo: <br>
{
    "email", 
    "password", 
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **e-mail do usuário** |
| `password`      | `string` | **senha do usuário** |

**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para POST <br>
(4) Adicionar na url: localhost:3333/users/login <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
Se o login estiver correto: <br>
 - status: 200 OK <br>
 - resposta: informações do usuário

Se o login estiver incorreto (e-mail ou senha erradas):
 - status: 200 OK <br>
 - resposta: array vazia
  
**Resultado obtido:**<br>
login correto: <br>
 - status: 200 OK <br>
 - resposta: informações do usuário

login incorreto (e-mail ou senha erradas):
 - status: 200 OK <br>
 - resposta: array vazia

#### T10 - Atualizar senha do usuário
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue atualizar a senha de um usuário.

**Pré-condição:** <br> 
url: <br>
```http
  POST /users/confirm
```
corpo: <br>
{
    "email", 
    "newPassword", 
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **e-mail do usuário** |
| `newPassword`      | `string` | **nova senha do usuário** |

**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para POST <br>
(4) Adicionar na url: localhost:3333/users/confirm <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
  
**Resultado obtido:**<br>
status: 200 OK <br>

#### T11 - Obter usuário por id
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue retornar um usuário específico.

**Pré-condição:** <br> 
url: <br>
```http
  GET /users/:id
  id: id do usuário desejado
```
corpo: Nenhum


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Adicionar na url: localhost:3333/users/:id (GET por padrão)<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: informações do usuário especificado

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: informações do usuário especificado

#### T12 - Atualizar usuário
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue atualizar um usuário no banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  PUT /users
```
corpo: <br>
{
    "name", 
    "email", 
    "password", 
    "phone", 
    "city", 
    "cnpj", 
    "cpf", 
    "working_hours", 
    "segment"
}

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **nome do usuário** |
| `email`      | `string` | **e-mail do usuário** |
| `password`      | `string` | **senha do usuário** |
| `phone`      | `string` | **telefone do usuário** |
| `city`      | `string` | **cidade do usuário** |
| `cnpj`      | `string` | **CNPJ do usuário** |
| `cpf`      | `string` | **CPF do usuário** |
| `working_hours`      | `string` | **horário de funcionamento do estabelecimento do usuário** |
| `segment`      | `string` | **segmento do usuário** |


**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo da requisição para PUT <br>
(4) Adicionar na url: localhost:3333/users <br>
(5) Adicionar o corpo da requisição na opção "Body" no formato json (selecionar "raw" e mudar o formato para json)
(6) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>
resposta: {"message": "usuário atualizado com sucesso!"}

**Resultado obtido:**<br>
status: 200 OK <br>
resposta: {"message": "usuário atualizado com sucesso!"}

#### T13 - Deletar um usuário
**Objetivo:** Esse teste tem como objetivo verificar se o endpoint consegue deletar um usuário do banco de dados.

**Pré-condição:** <br> 
url: <br>
```http
  DELETE /users/:id
  id: id do usuário
```
corpo: Nenhum

**Procedimento de teste:** <br>
(1) Abrir o Postman <br>
(2) Criar uma nova requisição <br>
(3) Mudar o tipo de requisição para DELETE <br>
(3) Adicionar na url: localhost:3333/users/:id<br>
(4) Enviar requisição

**Resultado esperado:** <br>
status: 200 OK <br>

**Resultado obtido:**<br>
status: 200 OK <br>

Algumas observações importantes:
- As requisições GET que são bem-sucedidas, mas não há nenhum dado no banco retornam uma array vazia.
- As demais requisições que no planejamento não possuem respostas esperadas e obtidas retornam informações referentes ao que houve no banco, por exemplo, linhas afetadas, id inserido, etc. Essas respostas podem ser vistas na documentação do Postman já mencionada acima já que são um pouco mais técnicas.


## Testes de integração

### Introdução 

Esta seção descreve uma série de testes automatizados que foram desenvolvidos para garantir a funcionalidade adequada do módulo de usuário de uma API. Os testes foram implementados usando a biblioteca Chai e Chai HTTP para testes de integração e estão destinados a verificar se as operações CRUD (Criar, Ler, Atualizar e Excluir) do módulo de usuário estão funcionando conforme o esperado. Além disso, o ambiente de teste utilizado é o Mocha.

### Pré-requisitos 

Para execução do teste é necessário ter instalado no dispositivo desktop Node.JS:

```https://nodejs.org/en```

Caso já tenha instalado é necessário navegar até o diretório do microserviço que será realizado o teste através de um terminal e digitar o seguinte comando:

```npm i```

ou

```npm install```

Após terminar a instalação das bibliotecas é necessário inserir o seguinte comando para que os testes sejam executados automaticamente:

```npm run test```

### Descrição dos testes

#### **Users (Usuário)**

**Teste 1: Deve adicionar um novo usuário** 

Descrição: Este teste verifica se um novo usuário pode ser adicionado à base de dados por meio da rota POST /users.

Resultado Esperado: O teste deve retornar um status HTTP 201 (Criado) e um objeto JSON contendo a propriedade 'insertId' após a inserção bem-sucedida do usuário.

**Teste 2: Deve retornar um usuário**

Descrição: Este teste verifica se é possível obter os detalhes de um usuário específico por meio da rota GET /users/:id.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e um objeto JSON contendo os detalhes do usuário recém-criado.

**Teste 3: Deve retornar todos os usuários**

Descrição: Este teste verifica se é possível obter uma lista de todos os usuários registrados por meio da rota GET /users.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e uma matriz JSON contendo todos os usuários registrados.

**Teste 4: Deve editar as informações do usuário**

Descrição: Este teste verifica se é possível editar as informações de um usuário existente por meio da rota PUT /users.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e uma mensagem de sucesso após a edição bem-sucedida do usuário.

**Teste 5: Deve realizar o login do usuário**

Descrição: Este teste verifica se um usuário pode fazer login com sucesso por meio da rota POST /users/login.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e um objeto JSON contendo os detalhes do usuário que fez login com sucesso.

**Teste 6: Deve atualizar a senha do usuário**

Descrição: Este teste verifica se a senha de um usuário pode ser atualizada por meio da rota POST /users/confirm.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e indicar que a senha foi atualizada com sucesso.

**Teste 7: Deve excluir um usuário**

Descrição: Este teste verifica se um usuário pode ser excluído com sucesso por meio da rota DELETE /users/:id.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e indicar que o usuário foi excluído com sucesso.

#### **Sales (Vendas)**

**Teste 1: Deve criar uma venda**

Descrição: Este teste verifica se é possível criar uma nova venda por meio da rota POST /sales.

Resultado Esperado: O teste deve retornar um status HTTP 201 (Criado) e um objeto JSON contendo a propriedade 'insertId' após a inserção bem-sucedida da venda.

**Teste 2: Deve obter uma venda por ID de usuário**

Descrição: Este teste verifica se é possível obter uma lista de vendas de um usuário específico por meio da rota GET /sales/:idUser, desde que o campo status tenha o valor de 'processando', caso não tenha irá retornar um JSON vazio.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e uma matriz JSON contendo todas as vendas do usuário correspondente.

**Teste 3: Deve Atualizar uma venda**

Descrição: Este teste verifica se é possível atualizar o status de uma venda existente por meio da rota PUT /sales.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e uma mensagem de sucesso após a atualização bem-sucedida do status da venda.

**Teste 4: Deve Excluir uma venda**

Descrição: Este teste verifica se é possível excluir uma venda por meio da rota DELETE /sales/:id.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e indicar que a venda foi excluída com sucesso.

#### **Products (Produtos)**

**Teste 1: Deve obter uma lista de produtos por tipo**

Descrição: Este teste verifica se é possível obter uma lista de produtos de um tipo específico por meio da rota GET /products/:type.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) e uma matriz JSON contendo produtos do tipo especificado. Além disso, o teste verifica se o primeiro produto da lista é igual ao produto de referência fornecido.

**Teste 2: Deve retornar um erro para um tipo inválido**

Descrição: Este teste verifica o comportamento da API quando um tipo de produto inválido é fornecido como parâmetro na rota GET /products/:type.

Resultado Esperado: O teste deve retornar um status HTTP 200 (OK) indicando que a solicitação foi processada. No entanto, o corpo da resposta não deve conter nenhum produto, já que o tipo especificado não corresponde a nenhum produto válido.

## Testes unitários

### Introdução

Esta seção descreve uma série de testes automatizados desenvolvidos para verificar a validação de e-mails e números de telefone utilizando funções definidas em um módulo denominado "constants/constants", que estão armazenadas no diretório do frontend. Esses testes fazem uso da biblioteca Chai para realizar asserções e assegurar o correto funcionamento das funções validateEmail e validatePhone. Além disso, o ambiente de teste utilizado é o Mocha.

### Pré-requisitos 

Para execução do teste é necessário ter instalado no dispositivo desktop Node.JS:

```https://nodejs.org/en```

Caso já tenha instalado é necessário navegar até o diretório do frontend/src através de um terminal e digitar o seguinte comando:

```npm i```

ou

```npm install```

Após terminar a instalação das bibliotecas é necessário inserir o seguinte comando para que os testes sejam executados automaticamente:

```mocha tests.js```

### Descrição dos testes

**Teste 1: Deve retornar falso para emails inválidos**

Descrição: Este teste verifica se a função validateEmail retorna false para uma lista de emails inválidos.

Resultado Esperado: A função validateEmail deve retornar false para todos os emails inválidos da lista.

**Teste 2: Deve retornar verdadeiro para emails válidos**

Descrição: Este teste verifica se a função validateEmail retorna true para uma lista de emails válidos.

Resultado Esperado: A função validateEmail deve retornar true para todos os emails válidos da lista.

**Teste 3: Deve retornar falso para números de telefone inválidos**

Descrição: Este teste verifica se a função validatePhone retorna false para uma lista de números de telefone inválidos.

Resultado Esperado: A função validatePhone deve retornar false para todos os números de telefone inválidos da lista.

**Teste 4: Deve retornar verdadeiro para números de telefone válidos**

Descrição: Este teste verifica se a função validatePhone retorna true para uma lista de números de telefone válidos.

Resultado Esperado: A função validatePhone deve retornar true para todos os números de telefone válidos da lista.