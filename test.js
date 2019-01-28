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

describe('Manipulação de Herois', () => {
    before(async () => {
        await database.saveFile(DEFAULT_ITEM_CADASTRAR);
    });
    it('deve pesquisar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        // Retorna só a primeira posição do valor que irá receber
        const [resultado] = await database.list(expected.id)

        console.log(resultado);

        // O teste só será passado caso o valor esperado seja exatamente igual ao enviado
        deepEqual(resultado, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.saveFile(DEFAULT_ITEM_CADASTRAR);
        const [atual] = await database.list(DEFAULT_ITEM_CADASTRAR.id);

        console.log(atual);

        deepEqual(atual, expected);
    });

    it.only('deve remover um heroi, usando arquivos', async () => {
        const expected = true;
        const resultado = await database.removeFile(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected);
    });

});