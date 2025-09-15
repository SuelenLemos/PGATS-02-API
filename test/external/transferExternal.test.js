//bibliotecas
const requester = require('supertest');
const { expect } = require('chai');

//aplicação



//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            const resposta = await requester('http://localhost:3000')
                .post('/transfers')
                .send({
                   from: "Suelen",
                    to: "Julio",
                    amount: 100
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Sender or recipient not found.');

        })
    })
})