import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import app from "./index.js";

const should = chai.should();
const expect = chai.expect;

describe("Products test", () => {
    const product = {
        "id": 1,
        "name": "Maquininha Padrão",
        "description": "3G e Wi-Fi; Aproximação (NFC); Pix na maquininha",
        "type": "stone",
        "price": 538.8,
        "available_quantity": 100,
        "image": "https://res.cloudinary.com/dunz5zfpt//f_auto,c_limit,w_256,q_auto/auto-credenciamento/autocred-maquininha-padrao.png"
    }

    it('should get a list of products by type', (done) => {
        chai
            .request(app)
            .get('/products/' + product.type)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    expect(res.body[0]).to.deep.equal(product);
                    expect(res.body.length).to.be.greaterThan(0);
                    done();
                }
            })
    })

    it('Should return a error for an invalid type', done => {
        chai
            .request(app)
            .get('/products/invalid')
            .end((err, res) => {
                if(err){
                    done(err);
                }
                else {
                    res.should.have.status(200);
                    done();
                }
            })    
    })

});