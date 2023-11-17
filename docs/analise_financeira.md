# Análise Financeira do Projeto: Visão Geral e Objetivos
A análise financeira de um projeto é uma ferramenta essencial para avaliar a viabilidade, rentabilidade e riscos associados a um empreendimento. Nesta análise, abordamos os principais aspectos financeiros relacionados ao projeto, incluindo os custos. O objetivo é fornecer informações detalhadas e precisas para auxiliar na tomada de decisões e na gestão eficiente dos recursos disponíveis.

A análise financeira desenvolvida para este projeto pode ser dividida em 2 partes principais: investimentos para o desenvolvimento da aplicação e investimentos para a sua manutenção.

Iniciando pelo escopo do desenvolvimento, abordamos 8 conceitos principais, incluindo:

1. **Duração do projeto** - O tempo de desenvolvimento da solução, dividido em 5 sprints (10 semanas).
2. **Número de integrantes no time** - O número de gerentes de projetos júnior na equipe.
3. **Disponibilidade em caixa da empresa para o custeio do projeto** - Valor que o cliente está disposto a investir no projeto. Até o momento, não nos foi disponibilizado nenhum valor.
4. **Salário de cada gerente de produto júnior** - Baseado na média salarial de um gerente de projetos júnior, conforme informações disponíveis em https://www.glassdoor.com.br/Sal%C3%A1rios/gerente-de-projetos-j%C3%BAnior-sal%C3%A1rio-SRCH_KO0,26.htm
5. **Custos relacionados à manutenção do projeto** - Neste caso, o custo para manutenção é composto pelos custos cobrados pela AWS sobre a alocação da infraestrutura (armazenamento, poder computacional, etc.) em nuvem utilizada no projeto.
6. **Horas totais** - Considerando o plano da faculdade para este módulo e descontando os dias de encontros com o cliente e as Sprints Planning, temos 232h 30min disponíveis para a realização do estudo e desenvolvimento do projeto.
7. **Remuneração por hora** - Com base no salário total de cada desenvolvedor e na quantidade total de horas trabalhadas, a remuneração por hora para cada gerente de projetos júnior é de R$ 53,72.
8. **Custo de desenvolvimento do projeto** - A soma de todos os custos com salários resulta em um custo total de R$ 91.142,10.

Tendo em vista que a aplicação será disponibilizada em nuvem, haverá gastos relacionados à manutenção dos serviços contratados da AWS. Para calcularmos a estimativa desses custos em 12 meses, utilizamos a pricing calculator (calculadora de precificação) fornecida pela AWS. Na calculadora, é necessário selecionarmos qual(is) serviço(s) iremos usar, sendo duas instâncias de AWS EC2, uma usada para hospedar o front-end e outra para o back-end, uma instância de AWS RDS for MySQL para hospedar o banco de dados criado em MySQL, um cluster do serviço AWS EKS, usado para criar e visualizar os clusters da aplicação, um ambiente privado usando o AWS VPC com 3 conexões site-to-site e 2 associações de sub-rede para podermos controlar os acessos da rede pública à nossa aplicação e, por fim, utilizaremos o Amazon Route 53 para controlarmos o domínio utilizado pela aplicação e verificações iniciais de DNS. Porém, como estamos em fase inicial de desenvolvimento, não é possível saber com exatidão qual tipo de instâncias iremos usar definitivamente. Portanto, iremos selecionar os tipos que, segundo nossas previsões, serão suficientes para suprir nossas necessidades com o mínimo de recursos ociosos.

Para nossos objetivos, precisaremos de instâncias que suportem uma aplicação web simples, mas que, ao mesmo tempo, aguentem muitos acessos. Sendo assim, prevemos que as instâncias T3 serão suficientes, visto que são recomendadas para aplicações com picos temporários de uso, assim como a em desenvolvimento. Em relação a qual tipo de T3, prevemos que o T3.small atenda nossos requisitos.

Além disso, o tipo de pagamento também afeta o custo final. Temos a opção de pagar sob demanda, com um custo mensual conforme usamos, ou com um plano de reserva, no qual se define um tempo de 1 ou 3 anos em que a instância será usada. Nesse modelo, há um desconto dado pela AWS sobre o preço final. Como não é certo qual instância usaremos e por quanto tempo, escolhemos o modelo de pagamento sob demanda.

Por fim, acreditamos que um RDS no modelo db.t3.micro seja suficiente, visto que prevemos que nosso banco de dados não será muito extenso e complexo. Após essas definições, temos um custo anual de manutenção da infraestrutura estimado em 9.581,76 USD.

A seguir, apresentamos uma tabela resumida com os principais aspectos financeiros abordados na análise financeira do projeto. A tabela inclui informações detalhadas sobre custos, salários e horas trabalhadas, fornecendo uma visão geral dos recursos necessários para o projeto.

### Tabela Resumida da Análise Financeira do Projeto
| Item                                    | Descrição                                        | Valor         |
| --------------------------------------- | ------------------------------------------------ | ------------- |
| Duração do projeto                      | 5 sprints (10 semanas)                           |               |
| Dólar                                   | Cotação do dolár usada nas conversões            | R$ 4,90       |
| Número de integrantes no time           | 7 gerentes de projetos júnior                    |               |
| Salário mensal de cada gerente (júnior) | Média salarial do mercado                        | R$ 6.245,00   |
| Salário total de cada gerente (2 meses) | Salário mensal x 2 meses                         | R$ 12.490,00  |
| Horas totais disponíveis                | 232h 30min                                       |               |
| Remuneração por hora                    | Salário total / horas totais                     | R$ 53,72      |
| Custo de desenvolvimento do projeto     | Salários + horas trabalhadas                     | R$ 91.142,10  |
| Custo mensal EC2's                      | Custo mensal dos dois EC2 contratados            | USD 30,37     |
| Custo anual EC2's                       | Custo mensal dos dois EC2 contratados x 12 meses | USD 364,44    |
| Custo mensal RDS                        | Custo mensal do RDS contratado                   | USD 36,61     |
| Custo anual RDS                         | Custo mensal do RDS x 12 meses                   | USD 439,32    |
| Custo mensal EKS                        | Custo mensal do EKS contratado                   | USD 73,00     |
| Custo anual EKS                         | Custo mensal do EKS x 12 meses                   | USD 876,00    |
| Custo mensal VPC                        | Custo mensal do VPC contratado                   | USD 530,50    |
| Custo anual VPC                         | Custo mensal do VPC x 12 meses                   | USD 6.366,00  |
| Custo mensal Route 53                   | Custo mensal do Route 53 contratado              | USD 128,00    |
| Custo anual Route 53                    | Custo mensal do Route 53 x 12 meses              | USD 1.536,00  |
| Custo anual de manutenção da aplicação  | Soma de todos os custos anuais de manutenção     | USD 9.581,76  |
| Custo anual de manutenção em reais      | Custo anual de manutenção x Dólar                | R$ 46.950,62  |
| Custo total do projeto                  | Custo desenvolvimento + custo manutenção         | R$ 138.092,72 |

#### Considerações Adicionais
É importante ressaltar que a receita gerada pelo projeto em um ano não foi estimada nesta análise, pois está fora do escopo do projeto e depende de fatores externos, como a quantidade de acessos que serão convertidos em vendas. Recomendamos uma análise adicional para estimar a receita gerada pelo projeto e avaliar seu impacto financeiro no longo prazo.

Além disso, a disponibilidade em caixa da empresa para o custeio do projeto ainda não foi fornecida pela Stone. Essa informação é crucial para determinar a viabilidade do projeto e garantir que os recursos financeiros necessários estejam disponíveis.

Por fim, é importante notar que a análise financeira é somente uma estimativa de gastos, necessária para avaliar a viabilidade do projeto.