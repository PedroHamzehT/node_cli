const {
    deepEqual,
    ok
} = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Velocidade',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do anel',
    id: 2
}

describe('Manipulação de Herois', () => {
    before(async () => {
        await database.saveFile(DEFAULT_ITEM_CADASTRAR);
        await database.saveFile(DEFAULT_ITEM_ATUALIZAR);
    });
    it('deve pesquisar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        // Retorna só a primeira posição do valor que irá receber
        const [resultado] = await database.list(expected.id)

        // O teste só será passado caso o valor esperado seja exatamente igual ao enviado
        deepEqual(resultado, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.saveFile(DEFAULT_ITEM_CADASTRAR);
        const [atual] = await database.list(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(atual, expected);
    });

    it('deve remover um heroi, usando arquivos', async () => {
        const expected = true;
        const resultado = await database.removeFile(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected);
    });

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro',
        };

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await database.updateFile(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.list(DEFAULT_ITEM_ATUALIZAR.id);

        deepEqual(resultado, expected);
    });

});