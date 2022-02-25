
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
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
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


## Application

<img src="https://xesque.rocketseat.dev/1571029149847-attachment.png" />


### Repositories

- Camada responsável por fazer toda a manipulação de dados da nossa aplicação

- Responsável por acessar o banco, editar, criar


DTO => Date Transfer Object

- As rotas não devem conhecer a Model, quem deve conhecer são os repositórios

- DTO -> Receber os dados das rotas e receber nos repositórios


