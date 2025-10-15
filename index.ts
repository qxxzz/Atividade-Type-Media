import * as rs from "readline-sync";

interface Aluno {
  nome: string;
  serie: string;
  presenca: number;
  materias: Record<string, number>; // nome da matéria -> média final
}

// === Passo 1: Coleta de informações básicas ===
const nome: string = rs.question("1) Nome do Aluno: ").trim();
const serie: string = rs.question("2) Qual é a sua série: ").trim();

// === Passo 2: Frequência ===
const totalAulas: number = Number(rs.question("3) Total de aulas no período: "));
const faltas: number = Number(rs.question("4) Quantas aulas o aluno faltou: "));
const presenca: number = ((totalAulas - faltas) / totalAulas) * 100;

// === Passo 3: Coleta das notas ===
const materias = ["Matemática", "Português", "Geografia", "História", "Química"];
const notasPorMateria: Record<string, number> = {};

for (const materia of materias) {
  console.log(`\n=== ${materia.toUpperCase()} ===`);
  let soma = 0;

  for (let i = 1; i <= 8; i++) {
    const nota = Number(rs.question(`Nota ${i}: `));
    soma += nota;
  }

  const media = soma / 8;
  notasPorMateria[materia] = media;
}

// === Passo 4: Montagem do objeto aluno ===
const aluno: Aluno = {
  nome,
  serie,
  presenca,
  materias: notasPorMateria
};

// === Passo 5: Exibição dos resultados ===
console.log("\n=== BOLETIM FINAL ===");
console.log(`Aluno : ${aluno.nome}`);
console.log(`Série : ${aluno.serie}`);
console.log(`Presença: ${aluno.presenca.toFixed(2)}%`);

if (aluno.presenca >= 75) {
  console.log("Frequência: ✅ Aprovado por presença");
} else {
  console.log("Frequência: ❌ Reprovado por faltas");
}

console.log("\n--- MÉDIAS DAS MATÉRIAS ---");
let aprovadoEmTudo = true;

for (const materia of materias) {
  const media = aluno.materias[materia] ?? 0;
  const status = media >= 7 ? "✅ Aprovado" : "❌ Reprovado";
  console.log(`${materia}: ${media.toFixed(2)} - ${status}`);
  if (media < 7) aprovadoEmTudo = false;
}


// === Passo 6: Resultado final ===
if (aluno.presenca >= 75 && aprovadoEmTudo) {
  console.log("\n🎓 Resultado final: ✅ APROVADO NO ANO!");
} else {
  console.log("\n📘 Resultado final: ❌ REPROVADO NO ANO!");
}
