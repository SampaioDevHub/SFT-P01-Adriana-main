## Documentação dos testes do projeto

### Arquivos base (não editar):

- `jest.config.ts`: estrutura base do jest para os testes do projeto
- `jest.setup.ts`: usado para instanciar a React Testing Library para escrever testes melhores

### Docs do jest e React Testing Library:

- `React Testing Library`: https://testing-library.com/docs/

- `jest`: https://jestjs.io/pt-BR/docs/getting-started

### Comandos para os testes:

#### comando dos devs:

```bash
comando para rodar um teste: pnpm  test,
```

```bash
 comando para observar apenas um teste: pnpm test:watch
```

```bash
comando para observar todos os testes:pnpm test:watchAll",
```

```bash
 comando que gera cobertura de todos os testes: pnpm test:coverage,
```

#### comando de commit e push (husky faz isso):

```bash
comando que o roda os testes ao commitar (lintstaged): "test:staged": "jest --findRelatedTests --passWithNoTests",
```

```bash
comando que o gera cobertura de todos os testes ao dar push (lintstaged):"test:push": "jest --coverage",
```
