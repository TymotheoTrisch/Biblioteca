"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const leitor = __importStar(require("readline-sync"));
let cliente = [];
let livro = [];
let emprestimo = [];
const senha = "admin";
const menu = () => {
    console.log(`
        ===== BIBLIOTECA =====

    1. Cadastrar cliente
    2. Listar clientes
    3. Cadastrar livro
    4. Listar livros
    5. Emprestar livro
    6. Devolver livro
    7. Sair
    `);
    let opcao = leitor.questionInt("Escolha uma opcao: ");
    switch (opcao) {
        case 1:
            cadastrarCliente();
            break;
        case 2:
            listarClientes();
            break;
        case 3:
            cadastrarLivro();
            break;
        case 4:
            listarLivros();
            break;
        case 5:
            emprestarLivro();
            break;
        case 6:
            devolverLivro();
            break;
        case 7:
            console.log("Encerrando...");
            break;
    }
};
const cadastrarCliente = () => {
    if (verificarSenha()) {
        let nome = leitor.question("Digite o seu nome: ");
        let cpf = leitor.question("Digite seu CPF: ");
        const novoCliente = { nome, cpf };
        cliente.push(novoCliente);
    }
    setTimeout(() => {
        menu();
    }, 1000);
};
const tratarCliente = (emprestimo, cliente) => {
    let clientes = [];
    let verificaStatus = false;
    for (let i = 0; i < cliente.length; i++) {
        verificaStatus = false;
        for (let j = 0; j < emprestimo.length; j++) {
            if (emprestimo[j].codigoDoCliente === i) {
                verificaStatus = true;
            }
        }
        if (verificaStatus) {
            let clienteMod = Object.assign(Object.assign({}, cliente[i]), { statusCliente: "Está com um livro" });
            clientes.push(clienteMod);
        }
        else {
            let clienteMod = Object.assign(Object.assign({}, cliente[i]), { statusCliente: "Não está com um livro" });
            clientes.push(clienteMod);
        }
    }
    return clientes;
};
const tratarLivro = (emprestimo, livro) => {
    let livros = [];
    let verificaStatus = false;
    for (let i = 0; i < livro.length; i++) {
        verificaStatus = false;
        for (let j = 0; j < emprestimo.length; j++) {
            if (emprestimo[j].codigoDoLivro === i) {
                verificaStatus = true;
            }
        }
        if (verificaStatus) {
            let livroMod = Object.assign(Object.assign({}, livro[i]), { statuslivro: "Emprestado" });
            livros.push(livroMod);
        }
        else {
            let livroMod = Object.assign(Object.assign({}, livro[i]), { statuslivro: "Disponível" });
            livros.push(livroMod);
        }
    }
    return livros;
};
const listarClientes = () => {
    console.log(`
    --------------------
    LISTAGEM DE CLIENTES:
    --------------------`);
    console.table(tratarCliente(emprestimo, cliente));
    setTimeout(() => {
        menu();
    }, 1000);
};
const cadastrarLivro = () => {
    if (verificarSenha()) {
        let nome = leitor.question("Digite o nome do livro: ");
        const novoLivro = { nome };
        livro.push(novoLivro);
    }
    setTimeout(() => {
        menu();
    }, 1000);
};
const listarLivros = () => {
    console.log(`
    --------------------
    LISTAGEM DE LIVROS:
    --------------------`);
    console.table(tratarLivro(emprestimo, livro));
    setTimeout(() => {
        menu();
    }, 1000);
};
const emprestarLivro = () => {
    if (cliente.length === 0 || livro.length === 0 || emprestimo.length === livro.length) {
        console.log("Cadastre um cliente ou um livro primeiro!");
        return;
    }
    if (!verificarSenha()) {
        return;
    }
    const codigoDoCliente = leitor.questionInt("Digite o código do cliente: ");
    const codigoDoLivro = leitor.questionInt("Digite o código do livro: ");
    const emprestimoExistente = emprestimo.find((e) => e.codigoDoCliente === codigoDoCliente && e.codigoDoLivro === codigoDoLivro);
    if (emprestimoExistente) {
        console.log("Livro já emprestado ou cliente já está com um livro!");
        return;
    }
    else {
        const novoEmprestimo = { codigoDoCliente, codigoDoLivro };
        emprestimo.push(novoEmprestimo);
        console.log("Livro emprestado com sucesso!");
    }
    setTimeout(() => {
        menu();
    }, 1000);
};
const devolverLivro = () => {
    if (cliente.length == 0 || livro.length == 0 || emprestimo.length !== livro.length) {
        console.log("Cadastre um cliente ou um livro primeiro!");
    }
    else if (emprestimo.length == 0) {
        console.log("Empreste um livro primeiro!");
    }
    else {
        if (verificarSenha()) {
            let verificaCliente = -1;
            let verificaLivro = -1;
            let codigoDoCliente = leitor.questionInt("Digite o codigo do cliente: ");
            let codigoDoLivro = leitor.questionInt("Digite o codigo do livro: ");
            for (let i = 0; i < emprestimo.length; i++) {
                if (emprestimo[i].codigoDoCliente === codigoDoCliente) {
                    verificaCliente = i;
                }
                if (emprestimo[i].codigoDoLivro === codigoDoLivro) {
                    verificaLivro = i;
                }
            }
            if (verificaCliente === -1) {
                console.log("Código do cliente inválido!");
            }
            else if (verificaLivro === -1) {
                console.log("Código do livro inválido!");
            }
            else if (verificaCliente === verificaLivro) {
                let sn = leitor.question("\n\nO livro esta em atraso? ");
                if (sn === "sim" || sn === "Sim") {
                    let taxaLivro = leitor.questionInt("Quantos dias? ");
                    console.log(`O valor da taxa é igual a: R$${taxaLivro * 5}\n`);
                    sn = leitor.question("Precione uma tecla para continuar. ");
                }
                emprestimo.splice(verificaCliente, 1);
                console.log("Livro devolvido com sucesso!");
            }
            else {
                console.log("Livro já emprestado ou cliente ja está com um livro!");
            }
        }
    }
    setTimeout(() => {
        menu();
    }, 1000);
};
const verificarSenha = () => {
    console.clear();
    let verificaSenha = leitor.question("Digite a senha: ");
    console.clear();
    if (verificaSenha === senha) {
        return true;
    }
    else {
        console.log("Senha inválida!");
        setTimeout(() => {
            console.clear();
        }, 1000);
        return false;
    }
};
menu();
//# sourceMappingURL=index.js.map