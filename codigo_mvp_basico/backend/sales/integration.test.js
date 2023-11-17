import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import app from "./index.js";

const should = chai.should();
const expect = chai.expect;

// To execute this test it's necessary to have a column user with at least one user

describe("Sales test", () => {
    let saleId;
    let sale = {
        "idProducts": "1",
        "idUser": 2,
        "value": 100,
        "status": "processando"
    }

    it('Should create a sale', (done) => {
        chai
            .request(app)
            .post('/sales')
            .send(sale)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.should.have.status(201); // Expect a 201 (Created) status code
                    res.body.should.be.an('object');
                    saleId = res.body.insertId;
                    res.body.should.have.property('insertId'); // Assuming your response contains an insertId
                    done();
                }
            });
    })

    it('Get sale by id', done => {
        sale.id = saleId;
        chai
            .request(app)
            .get('/sales/' + sale.idUser)
            .end((err, res) => {
                if(err) {
                    done(err);
                }
                else {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[res.body.length - 1]).to.deep.equal(sale);
                    done();
                }
            })
    })

    it('Should update a sale', done => {
        sale.status = "Aprovado";
        sale.id = saleId;
        chai
            .request(app)
            .put('/sales')
            .send(sale)
            .end((err, res) => {
                if(err) {
                    done(err);
                }
                else {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    console.log(res.body.message);
                    expect(res.body.message).to.equal('venda atualizada com sucesso!');
                    done();
                }
            })
    })

    it('Should delete a sale', done => {
        chai
            .request(app)
            .delete('/sales/' + saleId)
            .end((err, res) => {
                if(err) {
                    done(err);
                }
                else {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    expect(res.body.affectedRows).to.equal(1);
                    done();
                }
            })
    })
})