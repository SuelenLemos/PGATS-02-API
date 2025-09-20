//bibliotecas
const requester = require('supertest');
const { expect } = require('chai');

//aplicação



//testes
describe('Transfer Controller External', () => {
    let token;
    before(async () => {
        // Cria usuário para login
        await requester('http://localhost:3000')
            .post('/users/register')
            .send({ username: 'Suelen', password: '123456', isFavored: true });
        // Realiza login e captura o token
        const loginRes = await requester('http://localhost:3000')
            .post('/users/login')
            .send({ username: 'Suelen', password: '123456' });
        token = loginRes.body.token;
    });

    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            const resposta = await requester('http://localhost:3000')
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                   from: "Suelen",
                    to: "Julio",
                    amount: 100
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Sender or recipient not found.');
        });
    });
});