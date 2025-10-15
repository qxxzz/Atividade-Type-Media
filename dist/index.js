"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rs = require("readline-sync");
var fs = require("fs");
var path = require("path");
// Lista de matérias
var materias = ["Matematica", "Portugues", "Geografia", "Historia", "Quimica"];
// Função para coletar notas de uma matéria
function coletarNotas(materia) {
    console.log("\n=== ".concat(materia.toUpperCase(), " ==="));
    var soma = 0;
    for (var i = 1; i <= 8; i++) {
        var nota = void 0;
        do {
            nota = Number(rs.question("Nota ".concat(i, " (0 a 10): ")));
        } while (isNaN(nota) || nota < 0 || nota > 10);
        soma += nota;
    }
    return soma / 8;
}
// Função para criar boletim TXT
function gerarBoletim(aluno) {
    var conteudo = "BOLETIM FINAL\nAluno: ".concat(aluno.nome, "\nS\u00E9rie: ").concat(aluno.serie, "\nPresen\u00E7a: ").concat(aluno.presenca.toFixed(2), "%\n\n");
    conteudo += "--- MÉDIAS DAS MATÉRIAS ---\n";
    for (var _i = 0, materias_4 = materias; _i < materias_4.length; _i++) {
        var materia = materias_4[_i];
        var media = aluno.materias[materia];
        var status_1 = media >= 7 ? "APROVADO" : "REPROVADO";
        conteudo += "".concat(materia, ": ").concat(media.toFixed(2), " - ").concat(status_1, "\n");
    }
    conteudo += aluno.aprovado ? "\n🎓 RESULTADO FINAL: APROVADO NO ANO!\n" : "\n📘 RESULTADO FINAL: REPROVADO NO ANO!\n";
    var arquivoTXT = path.join(__dirname, "boletim_".concat(aluno.nome.replace(/\s+/g, "_"), ".txt"));
    fs.writeFileSync(arquivoTXT, conteudo);
    console.log("\n\uD83D\uDCC4 Boletim salvo em: ".concat(arquivoTXT));
}
// Função para salvar aluno no CSV
function salvarAlunoCSV(aluno) {
    var arquivoCSV = path.join(__dirname, "alunos.csv");
    var existe = fs.existsSync(arquivoCSV);
    var cabecalho = "Nome,Série,Presenca,Matematica,Portugues,Geografia,Historia,Quimica,Aprovado\n";
    var linha = "".concat(aluno.nome, ",").concat(aluno.serie, ",").concat(aluno.presenca.toFixed(2), ",").concat(aluno.materias["Matematica"].toFixed(2), ",").concat(aluno.materias["Portugues"].toFixed(2), ",").concat(aluno.materias["Geografia"].toFixed(2), ",").concat(aluno.materias["Historia"].toFixed(2), ",").concat(aluno.materias["Quimica"].toFixed(2), ",").concat(aluno.aprovado ? "APROVADO" : "REPROVADO", "\n");
    if (!existe) {
        fs.writeFileSync(arquivoCSV, cabecalho + linha);
    }
    else {
        fs.appendFileSync(arquivoCSV, linha);
    }
}
// === Programa principal ===
console.log("=== SISTEMA DE BOLETIM ESCOLAR ===\n");
var nome = rs.question("1) Nome do Aluno: ").trim();
var serie = rs.question("2) Qual e a sua serie: ").trim();
// Frequência
var totalAulas = Number(rs.question("3) Total de aulas no ano: "));
var faltas;
do {
    faltas = Number(rs.question("4) Total de faltas do aluno: "));
} while (isNaN(faltas) || faltas < 0 || faltas > totalAulas);
var presenca = ((totalAulas - faltas) / totalAulas) * 100;
// Coleta de notas
var notasPorMateria = {};
for (var _i = 0, materias_1 = materias; _i < materias_1.length; _i++) {
    var materia = materias_1[_i];
    notasPorMateria[materia] = coletarNotas(materia);
}
// Verificar aprovação
var aprovadoEmTudo = presenca >= 75;
for (var _a = 0, materias_2 = materias; _a < materias_2.length; _a++) {
    var materia = materias_2[_a];
    if (notasPorMateria[materia] < 7)
        aprovadoEmTudo = false;
}
var aluno = {
    nome: nome,
    serie: serie,
    presenca: presenca,
    materias: notasPorMateria,
    aprovado: aprovadoEmTudo,
};
// Mostrar boletim no console
console.log("\n=== BOLETIM FINAL ===");
console.log("Aluno: ".concat(aluno.nome));
console.log("S\u00E9rie: ".concat(aluno.serie));
console.log("Presen\u00E7a: ".concat(aluno.presenca.toFixed(2), "%"));
for (var _b = 0, materias_3 = materias; _b < materias_3.length; _b++) {
    var materia = materias_3[_b];
    var media = aluno.materias[materia];
    var status_2 = media >= 7 ? "✅ Aprovado" : "❌ Reprovado";
    console.log("".concat(materia, ": ").concat(media.toFixed(2), " - ").concat(status_2));
}
console.log(aluno.aprovado ? "\n🎓 RESULTADO FINAL: APROVADO NO ANO!" : "\n📘 RESULTADO FINAL: REPROVADO NO ANO!");
// Salvar boletim TXT
gerarBoletim(aluno);
// Salvar aluno no CSV
salvarAlunoCSV(aluno);
