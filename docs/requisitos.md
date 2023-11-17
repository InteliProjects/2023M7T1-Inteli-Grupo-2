# Requisitos Funcionais e Não-Funcionais

## Requisitos Funcionais (RF):

### RF1

O sistema (Loja) deve permitir que o usuário realize o cadastro de suas informações pessoais.

### RF2

O sistema (Loja) deve permitir que o usuário visualize suas informações pessoais cadastradas.

### RF3

O sistema (Loja) deve permitir que o usuário atualize suas informações pessoais cadastradas.

### RF4

O sistema (Loja) deve permitir que o usuário delete suas informações pessoais.

### RF5

O sistema (Loja) deve permitir que o usuário visualize as informações dos produtos como nome, preço e descrição.

### RF6

O sistema (Loja) deve permitir que o usuário realize compras dos produtos Stone.

### RF7

O sistema (Loja) deve pedir uma confirmação ao usuário quando a solicitação de deletar conta for realizada.

## Requisitos Não Funcionais (RNF):

### RNF1

O sistema (Loja) deve suportar 30 mil requisições por segundo.

Descrição do teste: Os desenvolvedores irão utilizar uma ferramenta chamada K6, no qual irá gerar um determinado número de requisições, a partir disso construir um relatório para avaliar se a loja manteve o funcionamento do sistema.

### RNF2

O sistema (Loja) deve permitir ao usuário realizar uma compra com 5 cliques.

Descrição do teste: Os desenvolvedores irão elaborar um teste de usabilidade, no qual irá dar um objetivo que o usuário deve cumprir e verificar quais os passos que ele faz para cumprir, é necessário que o usuário realize a compra em 5 passos.

### RNF3

O sistema (Loja) deve estar disponível na plataforma WEB para celulares e tablets.

Descrição do teste: Os desenvolvedores irão utilizar recursos da google chamado "Google Dev Chrome", no qual há um recurso de simular a plataforma em diversos modelos de celulares, tablets e computadores.

### RNF4

O sistema (Loja) deve ter disponibilidade de 99,950%.

Descrição do teste: Para testar a disponibilidade deve-se realizar um cálculo que é o tempo disponível para uso dividido pelo tempo total. A plataforma da AWS, já oferece uma tabela em sua documentação mostrando a disponibilidade de cada serviço, a loja utiliza o AWS EC2 e AWS RDS, no qual, ambos têm a disponibilidade de 99,950%, logo a indisponibilidade máxima por ano é de 4 horas e 22 minutos.