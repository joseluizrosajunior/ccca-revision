import Order from "../src/Order";

test('Não deve criar um pedido com CPF inválido', () => {
    const cpf = '123.456.789-10';
    expect(() => new Order(cpf)).toThrow('CPF inválido');
});