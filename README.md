# Chapter 2 - Ignite Node.js

## Using TS

```bash
yarn add typescript -D 
```

```bash
yarn tsc --init # init ts
```

- TSC transpile ts to js

```bash
yarn tsc
```

`tsconfig.json` > outDir => output path to js files
`tsconfig.json` > strict => disabled

## ESlint e Prettier

<a href="https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da">Notion Rocketseat</a>


## Watch APP

```bash
yarn add -D ts-node-dev
```

## Debug

`create a launch.json file` > node


```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ]
    }
  ]
}
```

- Need insert `--inspect` to script dev in package.json


# Creating the app

<img src="https://xesque.rocketseat.dev/1571029149847-attachment.png" />


## Repositories

- Camada responsável por fazer toda a manipulação de dados da nossa aplicação

- Responsável por acessar o banco, editar, criar


### DTO => Date Transfer Object

- As rotas não devem conhecer a Model, quem deve conhecer são os repositórios
- DTO -> Receber os dados das rotas e receber nos repositórios

## SOLID

> Conceito de código limpo


- S -> SRP - Single Responsability Principle
- O -> OCP - Open-Closed Principle
- L -> LSP - Liskov Substitution Principle
- I -> ISP - Interface Segregation Principle 
- D -> DIP - Dependency Inversion Principle

### Single Responsability Principle

- Cada rota deve ter uma única responsabilidade

Olhando para a rota de criação de categoria:

```ts
categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({
      error: "Category already exists",
    });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).json({ success: true });
});
```

temos a responsabilidade de validar se a categoria já existe e de criar


- Devemos isolar a lógica da rota em um service, para que seja possível cadastrar a categoria, separando a responsabilidade do contexto

### Dependency Inversion Principle

Olhando pra esse código:

```ts
class CreateCategoryService {
  execute({ name, description }: IRequest) {
    const categoriesRepository = new CategoriesRepository();
  }
}
```

- Imaginando que nós temos 3 classes: list, create e delete, todas elas instanciando o `CategoriesRepository`, logo teríamos um novo repositório e nunca usaríamos a mesma instância do repositório

- O código q implementa uma política de alto nível, não deve depender de um código q implementa detalhes de baixo nível, ou seja, o `service` (alto nível - mais próximo do domínio) não deve conhecer o tipo do `repositório`. As rotas são os de baixo nível, pois estão mais perto do contato com o usuário

- A responsabilidade passa a ser de quem chama o service

- [x] Tirar a responsabilidade da rota de fazer a regra de negócio (responsabilidade da rota: receber a request, chamar o serviço, executar a função para retornar algo)
- [x] Separar a responsabilidade em um serviço, para criar uma categoria


### Liskov Substitution Principle

- Permitir que as partes do programa sejam substituídos sem que gere impacto na aplicação


```ts
interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
```

- Basta que os repositórios recebam o mesmo contrato (interface)

- O repositório se torna um subtipo da interface

```ts
// Antes
class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}
}

// Depois
class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}
}
```

- Ao invés de receber o repositório, travando o service, agora a gente recebe a interface, removendo a definição do tipo que a gente esperava no `constructor` e agora utiliza o subtipo. Qualquer classe que implementar a interface, pode ser implementada nas routes e substituir q vai continuar funcionando


## Use Cases (regras de negócio)

- Separação de operações (separar arquivos de criação de categoria, listagem de categoria, criação de especificação, etc)

### Controllers

- Classes que recebem nossa requisição e retornam a resposta pra quem está chamando elas

### SingleTon Pattern

- Criando apenas uma instância global
- Ponto de atenção: verificar se a instância deve ser única em todo o projeto

no arquivo CategoriesRepository.ts:

```ts
private static INSTANCE: CategoriesRepository;

```

- somente a class `CategoriesRepository` vai poder criar a instância


### Upload de arquivos

```bash
yarn add multer # lib para leitura de arquivos
```

// TODO =

1. Receber o arquivo de upload
2. Armazenar em uma pasta temporária
3. Fazer a leitura desses arquivos
4. Deletar os arquivos dessa pasta


### Stram

- `ReadFile` faz a leitura de uma vez do arquivo, se o arquivo tiver muitas linhas, será uma leitura pesada e a aplicação começa a consumir muita memória do servidor

- Conceito de stream: permite ler o arquivo em partes (chunks)

- `pipe`, pega as informações e passa pra algum lugar


### Swagger

- O back-end deve ser desenvolvido pensando em quem vai consumir ele, por isso é importante ter uma documentação


```bash
yarn add swagger-ui-express && yarn add -D @types/swagger-ui-express
```

no arquivo server da aplicação

```js
/**
 * "/api-docs" -> rota pra acessar a documentação
 *  swagger.serve -> chamando o servidor
 *  swagger.setup() -> arquivo json com todas as informações da nossa aplicação, toda a parte de documentação
 */
app.use("/api-docs", swagger.serve, swagger.setup()); 
```

liberando a importação de json na aplicação
// tsconfig
```json
{
  "resolveJsonModule": true
}
```


## Docker

### run application in docker

- Instalando as ferramentas e configurando tudo no docker

- Criar o arquivo `Dockerfile`, que terá todo o passo a passo para rodar a aplicação dentro do docker

Imagens do docker [Hub Docker](https://hub.docker.com/search?q=node&type=image)


```Dockerfile
FROM node:latest # de qual imagem vai rodar


WORKDIR /path # diretório q as informações estão contidas


COPY package.json ./ # copiando o package pro workdir


RUN npm install # nem sempre as imagens vem com o yarn instalado


COPY . . # copiando tudo, para a pasta raíz

EXPOSE 3333

CMD ["npm", "run", "dev"] # comandos a serem rodados, precisa ser em itens do array
```

Rodando o **Dockerfile**:

```shell
docker build -t nome_da_imagem_a_ser_criada . # . -> raiz do projeto
```

**Rodando o container**:

```shell
docker run -p 3333:3333 nome_da_imagem_a_ser_criada # toda vez q chamar no localhost 3333, dentro do docker, será buscada a porta 3333
```

```shell
docker ps
```

**acessando o container**:
```shell
docker exec -it container_id /bin/bash # cairá no workdir
```


### docker-compose

- Orquestrador de container, define os serviços necessários para rodar a aplicação

`docker-compose.yml`

```yml
version: "3.7" # versão do compose

services: 
  app: # nome do serviço
    build: . # diretório local
    container_name: rentx # nome do container
    ports: 
      - 3333:3333 # acessando a 3333, será feito o mapeamento da porta 3333 do container
    volumes:
      - .:/usr/app # como se fosse o workdir, pegando tudo q está na aplicação e jogando pra /usr/app
```

**Rodando o compose**

```shell 
docker-compose up
```

```shell 
docker-compose up -d # roda em background
```

```shell
docker logs container_name -f
```

```shell
docker-compose stop # para o container
```

```shell
docker-compose start # inicia o container
```

```shell
docker-compose down # remove o container
```


## Banco de dados

### Usando driver nativo do banco

```shell
npm i pg # driver do postgres
```

**problema de usar dessa forma**:

- Pra cada banco que fossemos usar, teríamos q instalar o nosso driver

- Por exemplo, a forma de fazer uma query em postgres pode ser diferente do MySQL, o que seria mais cansativo de dar manutenção

### Query builder

`Knex.js`

- Mistura o SQL puro com js

- Precisa instalar os drivers nativos, mas possui um padrão para as queries

### ORMs

Model <-> ORM <-> Banco de dados

- Pega o código em js e converte pra uma maneira que o banco de dados entende


## Using TypeORM

Search Installation [Installation](https://typeorm.io/#/)

```shell
yarn add typeorm reflect-metadata pg
```

**tsconfig**
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```


### Criando conexão

- Dentro de `src`, criar a pasta `database`
- Criar o arquivo ormconfig.json

```js
{
  "type": "postgres",
  "port":5432,
  "host": "localhost",
  "username":"docker",
  "password":"database_ignite",
  "database":"rentx",
  "entities": ["src/modules/**/entities/*.ts", "./build/src/modules/**/entities/*.js"], // https://stackoverflow.com/questions/65336801/repositorynotfounderror-no-repository-for-user-was-found-looks-like-this-ent
  "migrations":["./src/database/migrations/*.ts"], // onde q estão as migrations para serem rodadas
  "cli": {
    "migrationsDir":"./src/database/migrations" // onde as migrations serão salvas
  }
} 
```

### Migrations

**incluir script no package**
```json
"typeorm":"ts-node-dev ./node_modules/typeorm/cli"
```

```shell
yarn typeorm migration:create -n CreateCategory
```

```shell
yarn typeorm migration:run # rodar as migrations
```

```shell
yarn typeorm migration:revert # reverter a última migration
```

### TSyringe

- Ferramenta para ajudar na inversão de dependências
- Facilitador de injeção de dependências

```shell
yarn add tsyringe
```


```ts
// container.registerSingleto<Interface>("nome do container", classe que será chamada)
container.registerSingleton<ICategoriesRepository>("", CategoriesRepository);
```