//bibliotecas
const requester = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../app');

//mocks
const transferService = require('../../service/transferService');
const userModel = require('../../model/userModel');

//testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            // Gera um token JWT válido
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ username: 'Suelen', isFavored: true }, 'supersecret', { expiresIn: '1h' });
            const resposta = await requester(app)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                   from: "Suelen",
                    to: "Julio",
                    amount: 100
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Sender or recipient not found.');
        })

        it('Usando Mocks:Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            //mockar apenas a função Transfer do service
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ username: 'Suelen', isFavored: true }, 'supersecret', { expiresIn: '1h' });
            const transferServiceMock = sinon.stub(transferService,'transfer')//sinon.stub(objeto, 'metodo')
            transferServiceMock.throws(new Error('Sender or recipient not found.'));
            const resposta = await requester(app)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                   from: "Suelen",
                    to: "Julio",
                    amount: 100
                })
            expect(resposta.status).to.equal(404);
            expect(resposta.body).to.have.property('message', 'Sender or recipient not found.');
            //desfazer o mock
            sinon.restore();
        })

        it('Quando informo valores validos recebo 200',async()=>{
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ username: 'Fulano', isFavored: true }, 'supersecret', { expiresIn: '1h' });
            const transferServiceMock = sinon.stub(transferService,'transfer')
            const findUserStub = sinon.stub(userModel, 'findUser');
             findUserStub.withArgs('Fulano').returns({
                 name: "Fulano",
                 balance: 1000,
                 isFavored: true
                    });
    
            findUserStub.withArgs('Sicrano').returns({
                name: "Sicrano", 
                balance: 500,
                isFavored: true
                });
            transferServiceMock.resolves({status:200,message:'Transfer successful.'});
            const resposta = await requester(app)
                .post('/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                   from: "Fulano",
                    to: "Sicrano",
                    amount: 100
                })
            expect(resposta.status).to.equal(200);
            // validação com fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosRecebo200.json');
            expect(resposta.body).to.deep.equal(respostaEsperada);
            //desfazer o mock
            sinon.restore();
    });
    
});
});