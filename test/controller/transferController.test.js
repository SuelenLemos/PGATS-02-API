//bibliotecas
const requester = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../app');

//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            const resposta = await requester(app)
                .post('/transfers')
                .send({
                   from: "Suelen",
                    to: "Julio",
                    amount: 100
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Sender or recipient not found.');

        })
    });
});