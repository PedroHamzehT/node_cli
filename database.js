// Implementando o readFile do fs(file system)
const {
    readFile
} = require('fs');

// Implementando o promisify do util
// Transforma uma função em promise para trabalhar com async/await
// Exemplo o readFileAsync 
// Utiliza-se o async awai

const {
    promisify
} = require('util');

// Usando o promisify para transformar o readFile em uma promise e trabalhar com async
const readFileAsync = promisify(readFile);

// Outra forma de obter dados json
// const jsonData = require('./herois.json');

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async getFileData() {
        // Simula a leitura de um arquivo, exemplo .txt
        const file = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        // Transforma o file que vem como Buffer em String
        return JSON.parse(file.toString());
    }

    setFile() {

    }
    
    async list(id) {
        // Pegando os arquivos
        const datas = await this.getFileData();
        // Filtrando o datas pelo ID que vai ser passado para ele
        const filterDatas = datas.filter(item => (id ? (item.id === id) : true));
        return filterDatas
    }
}

// Exportando database de modo que ela não precise ser instanciada para chamar seus métodos
module.exports = new Database();