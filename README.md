# Sistema de Boletim Escolar em TypeScript

**Autores:**

* João Pedro de Andrade Silva – 2508650
* Caio Zanffolim Cunha – 2509832

## 1. Introdução

Este projeto implementa um **Sistema de Boletim Escolar** em **TypeScript** com **Node.js**.
O sistema coleta informações de alunos, faltas e notas, calcula médias, verifica aprovação e gera:

* **Boletim individual em TXT**
* **Registro de alunos em CSV**

---

## 2. Pré-requisitos

Antes de executar o sistema, é necessário ter instalado:

* **Node.js**
* **VS Code** (ou outro editor de sua preferência)
* **npm** (gerenciador de pacotes do Node.js)

---

## 3. Tecnologias Utilizadas

* **TypeScript**
* **Node.js**
* **CSV**
* **Sistema de arquivos (TXT)**

---

## 4. Estrutura do Projeto

```bash
Atividade-Type-Media/
├─ dist/
│  ├─ index.js           # Arquivo compilado do TypeScript
│  ├─ alunos.csv         # Base de dados dos alunos
│  └─ boletim_Nome.txt   # Boletim individual
├─ node_modules/         # Dependências do projeto
├─ index.ts              # Código principal do sistema
├─ package.json          # Dependências e scripts do Node.js
├─ package-lock.json     # Controle de versões das dependências
├─ tsconfig.json         # Configuração do TypeScript
└─ README.md             # Manual de utilização e informações do projeto
````

---

## 5. Funcionalidades do Sistema

* **Entrada:** nome, série, total de aulas, faltas e notas (trabalhos e provas).
* **Cálculos:** presença (%) e média de cada matéria.
* **Aprovação:** presença mínima de 75% e nota mínima 7 por matéria.
* **Saída:** boletim individual em TXT, com status aprovado/reprovado.
* **Armazenamento:** todos os alunos registrados no `alunos.csv`.

---

## 6. Comandos de Instalação e Configuração

```bash
# Instalar dependências
npm install

# Compilar o TypeScript para JavaScript
npm run build
```

---

## 7. package.json recomendado

```json
{
  "name": "atividade-type-media",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^24.5.1",
    "readline-sync": "^1.4.10",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.2"
  }
}
```

---

## 8. tsconfig.json recomendado

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "rootDir": "./",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["./**/*.ts"]
}
```

---

## 9. Como Executar

No terminal, dentro da pasta raiz do projeto:

```bash
# Rodar o programa compilado
npm start
```

Ou diretamente com Node:

```bash
node dist/index.js
```

---

## 10. Build para Produção

Para gerar os arquivos JavaScript prontos:

```bash
npm run build
```

* Isso criará os arquivos compilados na pasta `dist/`.
* Em seguida, execute com Node:

```bash
node dist/index.js
```

---

## 11. Estrutura de arquivos gerados pelo programa

* `boletim_NomeAluno.txt` → Boletim individual do aluno
* `alunos.csv` → Lista com todos os alunos cadastrados e suas médias


