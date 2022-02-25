# Chapter 2 - Ignite Node.js

## Using TS

```
yarn add typescript -D 
```

```
yarn tsc --init # init ts
```

- TSC transpile ts to js

```
yarn tsc
```

`tsconfig.json` > outDir => output path to js files
`tsconfig.json` > strict => disabled

## ESlint e Prettier

<a href="https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da">Notion Rocketseat</a>


## Watch APP

```
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

- Conceito de código limpo

S -> SRP - Single Responsability Principle
O -> OCP - Open-Closed Principle
L -> LSP - Liskov Substitution Principle
I -> ISP - Interface Segregation Principle 
D -> DIP - Dependency Inversion Principle

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

- Permitir que as partes do programa seja substituído sem que tenha impacto


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