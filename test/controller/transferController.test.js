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

        it('Usando Mocks:Quando informo remetente e destinatario inexistente recebo 404',async()=>{
            //mockar apenas a função Transfer do service

            const transferServiceMock = sinon.stub(transferService,'transfer')//sinon.stub(objeto, 'metodo')
            transferServiceMock.throws(new Error('Sender or recipient not found.'));
            const resposta = await requester(app)
                .post('/transfers')
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
                .send({
                   from: "Fulano",
                    to: "Sicrano",
                    amount: 100
                })
            expect(resposta.status).to.equal(200);
            // validação com fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosRecebo200.json');
            expect(resposta.body).to.deep.equal(respostaEsperada);

            /* se houver respostas com datas precisamos utilizar o comando delete:
            delete resposta.body.date; que vai eliminar a data da resposta
            delete respostaEsperada.date; que vai eliminar a data da resposta esperada
            */

            
            //expect(resposta.body).to.have.property('message', 'Transfer successful.');
            //console.log(resposta.body);

            //desfazer o mock
            sinon.restore();
    });
    
});
});