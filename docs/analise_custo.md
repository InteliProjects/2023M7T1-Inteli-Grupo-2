# Análise de Gestão de Custo

A análise de gestão de custos apresenta uma atualização final da análise financeira desenolvida na sprint 1, agora com uma visão mais específica dos serviços que foram utilizados no sistema e como foram configurados.
  
Assim como inicialmente, a análise financeira desenvolvida para este projeto pode ser dividida em 2 partes principais: investimentos para o desenvolvimento da aplicação e investimentos para a sua manutenção.

## Custos de desenvolvimento

Iniciando pelo escopo do desenvolvimento, abordamos 8 conceitos principais, incluindo:

1. **Duração do projeto** - O tempo de desenvolvimento da solução, dividido em 5 sprints (10 semanas).

2. **Número de integrantes no time** - O número de gerentes de projetos júnior na equipe.

3. **Disponibilidade em caixa da empresa para o custeio do projeto** - Valor que o cliente está disposto a investir no projeto. Até o momento, não nos foi disponibilizado nenhum valor.

4. **Salário de cada gerente de produto júnior** - Baseado na média salarial de um gerente de projetos júnior, conforme informações disponíveis em https://www.glassdoor.com.br/Sal%C3%A1rios/gerente-de-projetos-j%C3%BAnior-sal%C3%A1rio-SRCH_KO0,26.htm

5. **Custos relacionados à manutenção do projeto** - Neste caso, o custo para manutenção é composto pelos custos cobrados pela AWS sobre a alocação da infraestrutura (armazenamento, poder computacional, etc.) em nuvem utilizada no projeto.

6. **Horas totais** - Considerando o plano da faculdade para este módulo e descontando os dias de encontros com o cliente e as Sprints Planning, temos 232h 30min disponíveis para a realização do estudo e desenvolvimento do projeto.

7. **Remuneração por hora** - Com base no salário total de cada desenvolvedor e na quantidade total de horas trabalhadas, a remuneração por hora para cada gerente de projetos júnior é de R$ 53,72.

8. **Custo total de desenvolvimento do projeto** - A soma de todos os custos de desenvolvimento com salários resulta em um custo total de R$ 91.142,10.

A seguir, apresentamos uma tabela resumida com todos os gastos destinados ao desenvolvimento do projeto, assim facilitando a visualização.

| Item                                      | Descrição                     | Valor        |
| ----------------------------------------- | ----------------------------- | ------------ |
| Duração do projeto                        | 5 sprints (10 semanas)        |              |
| Número de integrantes no time             | 7 gerentes de projetos júnior |              |
| Salário mensal de cada gerente (júnior)   | Média salarial do mercado     | R$ 6.245,00  |
| Salário total de cada gerente (2 meses)   | Salário mensal x 2 meses      | R$ 12.490,00 |
| Horas totais disponíveis                  | 232h 30min                    |              |
| Remuneração por hora                      | Salário total / horas totais  | R$ 53,72     |
| Custo total de desenvolvimento do projeto | Salários + horas trabalhadas  | R$ 91.142,10 |


## Custos de infraestrutura e manutenção

### Mudanças em relação à análise financeira inicial

Conforme o projeto foi desenvolvido, alguns serviços que antes estavam previstos para serem utilizados foram deixados de lado, assim como novos serviços surgiram na arquitetura da solução. Com isso, ocorreram mudanças na análise de custos devido a essas alterações na infraestrutura.

Dessa forma, é mister destacar o motivo das mudanças supracitadas. Por conta da arquitetura anterior levar em consideração uma aplicação monolítica, com instâncias EC2 para suportar todo o frontend e backend foi preciso realizar mudanças para tornar o sistema mais eficiente e econômico. Isso porque o monolito não é interessante nem no quesito financeiro, por conta de em casos de muitos acessos simultâneos ser preciso escalar a aplicação inteira, nem no quesito eficiência, por demorar para haver o escalonamento da arquitetura. Dentre as mudanças, destaca-se o serviço **S3** para armazenar o frontend e, pelo serviço já possuir a funcionalidade automática de escalonamento, o frontend está armazenado de forma mais eficaz do que com o EC2, em linha com o **CloudFront**, que permite o rápido acesso à aplicação em qualquer local do mundo pelo armazenamento em cache. Nessa perspectiva, a adoção do **ELB** faz com que as requisições sejam balanceadas e distribuídas entre as instâncias criadas pelo sistema do EKS, distribuindo o acesso e maximizando a eficiência entre os EC2, diminuindo custos, recurso esse que não constava na versão inicial. A fim de gerar economias no armazenamento, foi incorporado o serviço **ECR**, que possibilita com que imagens e artefatos de contêiners sejam hospedados, compartilhados e implantados com alta performance, permitindo que seja especificada uma política de vida das imagens, o que não constava na versão inicial, e agrega valor ao projeto. Já o **SQS** permite a comunicação de serviços internos a aplicação, sendo possível enviar emails após o cadastro do usuário, funcionalidade nova que torna o sistema mais eficaz e ajuda na jornada do usuário. Por fim, cabe destacar que o **Route 53** foi deixado de lado, uma vez que existem burocracias financeiras fora do escopo do projeto que impedem a sua utilização para a modificação do domínio.   

Sendo assim, ilustra-se no diagrama abaixo as mudanças para melhor visualização:

| Serviço                           | Sprint 1                          | Sprint 5              |
| --------------------------------- | --------------------------------- | --------------------- |
| EC2                               | Frontend + Backend + Bastion Host | Microsserviço backend |
| S3                                | Ausente                           | Presente              |
| ELB                               | Ausente                           | Presente              |
| ECR                               | Ausente                           | Presente              |
| SQS                               | Ausente                           | Presente              |
| CloudFront                        | Ausente                           | Presente              |
| Route 53                          | Presente                          | Ausente               |



### Cenários

Visando trazer mais precisão para os possíveis custos relacionados à manutenção da infraestrutura em nuvem, serão simulados 2 cenários de gastos. O primeiro em um cenário de uso mínimo da aplicação, ou seja, o quanto será o mínimo de custo para que a aplicação funcione corretamente. O segundo será uma simulação de custos em um cenário de maior uso possível, expandindo a infraestrutura ao máximo para manter o bom funcionamento do sistema.

#### 1º cenário: Mínimo de uso

Para o cenário de uso mínimo dos recursos, os custos foram calculados **sem** levar em consideração picos de acessos ou grandes volumes inesperados de requisições, somente considerando o básico para a aplicação funcionar.

| Item                                                              | Descrição                                                                              | Valor         |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| Dólar                                                             | Cotação do dolár usada nas conversões                                                  | R$ 4,90       |
| Custo mensal EC2                                                  | 2 instâncias t3.medium                                                                 | USD 12,15     |
| Custo anual EC2                                                   | Custo mensal EC2 x 12 meses                                                            | USD 145,8     |
| Custo mensal S3                                                   | Usado para armazenamento de imagens e hospedagem front-end                             | USD 2,30      |
| Custo anual S3                                                    | Custo mensal S3 x 12 meses                                                             | USD 27,60     |
| Custo CloudFront                                                  | Usado para acelerar a entrega de conteúdo web                                          | USD 0,00      |
| Custo mensal ELB                                                  | Usado para balancear o tráfego entre as diferentes instâncias                          | USD 66,79     |
| Custo anual ELB                                                   | Custo mensal ELB x 12 meses                                                            | USD 801,48    |
| Custo mensal RDS                                                  | Usado para armazenar dados usados pelas instâncias                                     | USD 29,42     |
| Custo anual RDS                                                   | Custo mensal RDS x 12 meses                                                            | USD 353,04    |
| Custo mensal EKS                                                  | Usado para iniciar, executar e escalar o Kubernetes                                    | USD 73,00     |
| Custo anual EKS                                                   | Custo mensal EKS x 12 meses                                                            | USD 876,00    |
| Custo mensal ECR                                                  | Usado para gerenciar os contêiners da aplicação                                        | USD 1,50      |
| Custo anual ECR                                                   | Custo mensal ECR x 12 meses                                                            | USD 18,00     |
| Custo SQS                                                         | Usado para gerenciar os microsserviços criados                                         | USD 0,00      |
| Custo mensal VPC                                                  | Usado para criar um ambiente privado para a implementação da infraestrutura do sistema | USD 63,88     |
| Custo anual VPC                                                   | Custo mensal VPC x 12 meses                                                            | USD 766,56    |
| Custo anual total para manutenção de infraestrutura em uso mínimo | Soma de todos os custos de manutenção                                                  | USD 2.988,48  |
| Custo anual total **em reais** para manutenção                    | Soma de todos os custos de manutenção x Dólar                                          | R$ 14.643,55  |
| Custo total do projeto com 1 ano de manutenção em real            | Soma de todos os custos de manutenção + custo desenvolvimento                          | R$ 105.785,65 |


#### 2º cenário: Máximo de uso

Para o cenário máximo de uso, foi simulado um momento em que a aplicação esteja recebendo o maior número possível de acessos simultâneos por um mês, portanto, por conta da escalabilidade automática do sistema espera-se que alguns serviços sejam redimensionados e utilizados ao máximo e, com isso, o preço será maior.



| Item                                                              | Descrição                                                                              | Valor         |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| Dólar                                                             | Cotação do dolár usada nas conversões                                                  | R$ 4,90       |
| Custo mensal EC2                                                  | 6 instâncias t3.medium                                                                 | USD 182,21    |
| Custo anual EC2                                                   | Custo mensal EC2 x 12 meses                                                            | USD 2.186,52  |
| Custo mensal S3                                                   | Usado para armazenamento de imagens e hospedagem front-end                             | USD 52,77     |
| Custo anual S3                                                    | Custo mensal S3 x 12 meses                                                             | USD 633,24    |
| Custo CloudFront                                                  | Usado para acelerar a entrega de conteúdo web                                          | USD 0,00      |
| Custo mensal ELB                                                  | Usado para balancear o tráfego entre as diferentes instâncias                          | USD 101,83    |
| Custo anual ELB                                                   | Custo mensal ELB x 12 meses                                                            | USD 1.221,96  |
| Custo mensal RDS                                                  | Usado para armazenar dados usados pelas instâncias                                     | USD 29,42     |
| Custo anual RDS                                                   | Custo mensal RDS x 12 meses                                                            | USD 353,04    |
| Custo mensal EKS                                                  | Usado para iniciar, executar e escalar o Kubernetes                                    | USD 73,00     |
| Custo anual EKS                                                   | Custo mensal EKS x 12 meses                                                            | USD 876,00    |
| Custo mensal ECR                                                  | Usado para gerenciar os contêiners da aplicação                                        | USD 1,50      |
| Custo anual ECR                                                   | Custo mensal ECR x 12 meses                                                            | USD 18,00     |
| Custo SQS                                                         | Usado para gerenciar os microsserviços criados                                         | USD 0,00      |
| Custo mensal VPC                                                  | Usado para criar um ambiente privado para a implementação da infraestrutura do sistema | USD 63,88     |
| Custo anual VPC                                                   | Custo mensal VPC x 12 meses                                                            | USD 766,56    |
| Custo anual total para manutenção de infraestrutura em uso máximo | Soma de todos os custos de manutenção                                                  | USD 6.055,32  |
| Custo anual total **em reais** para manutenção                    | Soma de todos os custos de manutenção x Dólar                                          | R$ 29.671,06  |
| Custo total do projeto com 1 ano de manutenção em real            | Soma de todos os custos de manutenção + custo desenvolvimento                          | R$ 120.813,16 |

#### Considerações Adicionais

É importante ressaltar que a receita gerada pelo projeto em um ano não foi estimada nesta análise, pois está fora do escopo do projeto e depende de fatores externos, como a quantidade de acessos que serão convertidos em vendas. Recomenda-se uma análise adicional para estimar a receita gerada pelo projeto e avaliar seu impacto financeiro no longo prazo.  

Além disso, a disponibilidade em caixa da empresa para o custeio do projeto não foi fornecida pela Stone. Essa informação é crucial para determinar a viabilidade do projeto e garantir que os recursos financeiros necessários estejam disponíveis.

Por fim, é importante notar que a análise financeira/custos é somente uma estimativa de gastos, necessária para avaliar a viabilidade do projeto e não garante que em ambiente de produção as estimativas serão exatas.