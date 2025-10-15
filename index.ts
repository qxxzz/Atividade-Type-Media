import * as rs from "readline-sync";
import * as fs from "fs";
import * as path from "path";

interface Aluno {
  nome: string;
  serie: string;
  presenca: number;
  materias: Record<string, number>;
  aprovado: boolean;
}

// Lista de matérias
const materias = ["Matematica", "Portugues", "Geografia", "Historia", "Quimica"];

// Função para coletar notas de uma matéria
function coletarNotas(materia: string): number {
  console.log(`\n=== ${materia.toUpperCase()} ===`);
  let soma = 0;

  // Notas dos trabalhos (1 a 4)
  for (let i = 1; i <= 4; i++) {
    let nota: number;
    do {
      nota = Number(rs.question(`Trabalho ${i} (0 a 10): `));
    } while (isNaN(nota) || nota < 0 || nota > 10);
    soma += nota;
  }

  // Notas das provas (5 a 8)
  for (let i = 5; i <= 8; i++) {
    let nota: number;
    do {
      nota = Number(rs.question(`Prova ${i - 4} (0 a 10): `));
    } while (isNaN(nota) || nota < 0 || nota > 10);
    soma += nota;
  }

  const media = soma / 8;
  return media;
}


// Função para criar boletim TXT
function gerarBoletim(aluno: Aluno) {
  let conteudo = `BOLETIM FINAL\nAluno: ${aluno.nome}\nSérie: ${aluno.serie}\nPresença: ${aluno.presenca.toFixed(2)}%\n\n`;
  conteudo += "--- MÉDIAS DAS MATÉRIAS ---\n";

  for (const materia of materias) {
    const media = aluno.materias[materia];
    const status = media >= 7 ? "APROVADO" : "REPROVADO";
    conteudo += `${materia}: ${media.toFixed(2)} - ${status}\n`;
  }

  conteudo += aluno.aprovado ? "\n🎓 RESULTADO FINAL: APROVADO NO ANO!\n" : "\n RESULTADO FINAL: REPROVADO NO ANO!\n";

  const arquivoTXT = path.join(__dirname, `boletim_${aluno.nome.replace(/\s+/g, "_")}.txt`);
  fs.writeFileSync(arquivoTXT, conteudo);
  console.log(`\n Boletim salvo em: ${arquivoTXT}`);
}

// Função para salvar aluno no CSV
function salvarAlunoCSV(aluno: Aluno) {
  const arquivoCSV = path.join(__dirname, "alunos.csv");
  const existe = fs.existsSync(arquivoCSV);
  const cabecalho = "Nome,Série,Presenca,Matematica,Portugues,Geografia,Historia,Quimica,Aprovado\n";

  const linha = `${aluno.nome},${aluno.serie},${aluno.presenca.toFixed(2)},${aluno.materias["Matematica"].toFixed(2)},${aluno.materias["Portugues"].toFixed(2)},${aluno.materias["Geografia"].toFixed(2)},${aluno.materias["Historia"].toFixed(2)},${aluno.materias["Quimica"].toFixed(2)},${aluno.aprovado ? "APROVADO" : "REPROVADO"}\n`;

  if (!existe) {
    fs.writeFileSync(arquivoCSV, cabecalho + linha);
  } else {
    fs.appendFileSync(arquivoCSV, linha);
  }
}

// === Programa principal ===
console.log("=== SISTEMA DE BOLETIM ESCOLAR ===\n");

const nome = rs.question("1) Nome do Aluno: ").trim();
const serie = rs.question("2) Qual e a sua serie: ").trim();

// Frequência
const totalAulas = Number(rs.question("3) Total de aulas no ano: "));
let faltas: number;
do {
  faltas = Number(rs.question("4) Total de faltas do aluno: "));
} while (isNaN(faltas) || faltas < 0 || faltas > totalAulas);

const presenca = ((totalAulas - faltas) / totalAulas) * 100;

// Coleta de notas
const notasPorMateria: Record<string, number> = {};
for (const materia of materias) {
  notasPorMateria[materia] = coletarNotas(materia);
}

// Verificar aprovação
let aprovadoEmTudo = presenca >= 75;
for (const materia of materias) {
  if (notasPorMateria[materia] < 7) aprovadoEmTudo = false;
}

const aluno: Aluno = {
  nome,
  serie,
  presenca,
  materias: notasPorMateria,
  aprovado: aprovadoEmTudo,
};

// Mostrar boletim no console
console.log("\n=== BOLETIM FINAL ===");
console.log(`Aluno: ${aluno.nome}`);
console.log(`Série: ${aluno.serie}`);
console.log(`Presença: ${aluno.presenca.toFixed(2)}%`);

for (const materia of materias) {
  const media = aluno.materias[materia];
  const status = media >= 7 ? " Aprovado" : " Reprovado";
  console.log(`${materia}: ${media.toFixed(2)} - ${status}`);
}

console.log(aluno.aprovado ? "\n🎓 RESULTADO FINAL: APROVADO NO ANO!" : "\n RESULTADO FINAL: REPROVADO NO ANO!");

// Salvar boletim TXT
gerarBoletim(aluno);

// Salvar aluno no CSV
salvarAlunoCSV(aluno);
