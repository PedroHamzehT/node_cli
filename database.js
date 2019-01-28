// Implementando o readFile do fs(file system)
const {
    readFile,
    writeFile
} = require('fs');

// Implementando o promisify do util
// Transforma uma função em promise para trabalhar com async/await
// Exemplo o readFileAsync 
// Utiliza-se o async awai

const {
    promisify
} = require('util');

// Usando o promisify para transformar as funções abaixo em uma promise e trabalhar com async
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

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

    async writeFile(datas) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(datas));
        return true
    }
    
    async saveFile(hero) {
        const datas = await this.getFileData();
        const id = hero.id <= 2 ? hero.id : Date.now();
        // Concatenando objetos
        const heroWithId = {
            id,
            ...hero
        }
        // Concatenando array com objeto
        const finalDatas = [
            ...datas,
            heroWithId
        ]

        const resultado = await this.writeFile(finalDatas)

        return resultado
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