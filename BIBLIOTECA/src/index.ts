import * as leitor from "readline-sync";

interface Cliente {
    nome: string;
    cpf: string;
}

interface Livro {
    nome: string;
}

interface Emprestimo {
    codigoDoCliente: number;
    codigoDoLivro: number;
}

let cliente: Cliente[] = [];
let livro: Livro[] = [];
let emprestimo: Emprestimo[] = [];
const senha: string = 'admin';


function menu(): void {
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

const cadastrarCliente = (): void => {
    if (verificarSenha()) {
        let nome: string = leitor.question("Digite o seu nome: ");
        let cpf: string = leitor.question("Digite seu CPF: ");

        const novoCliente: Cliente = { nome, cpf };

        cliente.push(novoCliente);
    }
    setTimeout(() => {
        menu();
    }, 1000);
};

const tratarCliente = (emprestimo: Emprestimo[], cliente: Cliente[]): any => {
    let clientes: any[] = [];

    let verificaStatus: boolean = false;

    for (let i: number = 0; i < cliente.length; i++) {
        verificaStatus = false;

        for (let j: number = 0; j < emprestimo.length; j++) {
            if (emprestimo[j].codigoDoCliente === i) {
                verificaStatus = true;
            }
        }

        if (verificaStatus) {
            let clienteMod: any = {
                ...cliente[i],
                statusCliente: "Está com um livro",
            };

            clientes.push(clienteMod);
        } else {
            let clienteMod: any = {
                ...cliente[i],
                statusCliente: "Não está com um livro",
            };

            clientes.push(clienteMod);
        }
    }
    return clientes;
};

const tratarLivro = (emprestimo: Emprestimo[], livro: Livro[]): any => {
    let livros: any[] = [];

    let verificaStatus: boolean = false;

    for (let i: number = 0; i < livro.length; i++) {
        verificaStatus = false;

        for (let j: number = 0; j < emprestimo.length; j++) {
            if (emprestimo[j].codigoDoLivro === i) {
                verificaStatus = true;
            }
        }

        if (verificaStatus) {
            let livroMod: any = {
                ...livro[i],
                statuslivro: "Emprestado",
            };

            livros.push(livroMod);
        } else {
            let livroMod: any = {
                ...livro[i],
                statuslivro: "Disponível",
            };

            livros.push(livroMod);
        }
    }
    return livros;
};

const listarClientes = (): void => {
    console.log(`
    --------------------
    LISTAGEM DE CLIENTES:
    --------------------`);

    console.table(tratarCliente(emprestimo, cliente));

    setTimeout(() => {
        menu();
    }, 1000);
};

const cadastrarLivro = (): void => {
    if (verificarSenha()) {
        let nome: string = leitor.question("Digite o nome do livro: ");

        const novoLivro: Livro = { nome };

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

    const codigoDoCliente: number = leitor.questionInt("Digite o código do cliente: ");
    const codigoDoLivro: number = leitor.questionInt("Digite o código do livro: ");

    const emprestimoExistente = emprestimo.find(
        (e) => e.codigoDoCliente === codigoDoCliente && e.codigoDoLivro === codigoDoLivro
    );

    if (emprestimoExistente) {
        console.log("Livro já emprestado ou cliente já está com um livro!");
        return;
    } else {
        
        const novoEmprestimo: Emprestimo = { codigoDoCliente, codigoDoLivro };
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

    } else if (emprestimo.length == 0) {
        console.log("Empreste um livro primeiro!");

    } else {
        if (verificarSenha()) {
            let verificaCliente: number = -1
            let verificaLivro: number = -1
            let codigoDoCliente: number = leitor.questionInt("Digite o codigo do cliente: ");
            let codigoDoLivro: number = leitor.questionInt("Digite o codigo do livro: ");

            for (let i: number = 0; i < emprestimo.length; i++) {
                if (emprestimo[i].codigoDoCliente === codigoDoCliente) {
                    verificaCliente = i;
                }
                if (emprestimo[i].codigoDoLivro === codigoDoLivro) {
                    verificaLivro = i
                }
            }

            if (verificaCliente === -1) {
                console.log("Código do cliente inválido!")

            } else if (verificaLivro === -1) {
                console.log("Código do livro inválido!")

            } else if (verificaCliente === verificaLivro) {
                let sn: string = leitor.question("\n\nO livro esta em atraso? ")
                if (sn === "sim" || sn === "Sim") {
                    let taxaLivro: number = leitor.questionInt("Quantos dias? ")

                    console.log(`O valor da taxa é igual a: R$${taxaLivro * 5}\n`)
                    sn = leitor.question("Precione uma tecla para continuar. ")
                }

                emprestimo.splice(verificaCliente, 1)
                console.log("Livro devolvido com sucesso!");


            } else {
                console.log("Livro já emprestado ou cliente ja está com um livro!");

            }
        }
    }

    setTimeout(() => {
        menu();
    }, 1000);
};


const verificarSenha = (): boolean => {
    console.clear();
    let verificaSenha: string = leitor.question("Digite a senha: ")

    console.clear();
    if (verificaSenha === senha) {

        return true
    } else {
        console.log("Senha inválida!");
        setTimeout(() => {
            console.clear();
        }, 1000)
        return false
    }
}

menu();