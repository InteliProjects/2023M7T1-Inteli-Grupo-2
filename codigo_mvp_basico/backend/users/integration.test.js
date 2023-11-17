import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import app from "./index.js";

const should = chai.should();
const expect = chai.expect;

describe("User test", () => {
    let userId;

    let user = {
        "name": "New User",
        "email": "newuser@example.com",
        "password": "newpassword",
        "phone": "(12) 3456-7890",
        "city": "New City",
        "cnpj": "123.456.789-02",
        "cpf": "",
        "working_hours": "09:00 às 18:00",
        "segment": "New Segment"
    }

    it('Should add a new user', (done) => {
        chai
            .request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.should.have.status(201);
                    expect(res.body).to.have.property('insertId');
                    userId = res.body.insertId;
                    done();
                }
            });
    });

    it('Should return a user created', done => {
        chai
            .request(app)
            .get('/users/' + userId)
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    user.id = userId;
                    expect(res.body).to.deep.equal([user]);
                    done(); // Call done to signal that the test is complete
                }
            });
    })

    it('Should return all users', done => {
        chai
            .request(app)
            .get('/users')
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.greaterThan(0);
                    done(); // Call done to signal that the test is complete
                }
            });
    })

    it('Should edit the user information', done => {
        user.id = userId;
        user.name = "Edit User";
        chai.
            request(app)
            .put('/users')
            .send(user)
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    expect(res.body.message).to.equal("usuário atualizado com sucesso!");
                    done(); // Call done to signal that the test is complete
                }
            });
    })

    it('Should login the user', done => {
        user.id = userId;
        chai
            .request(app)
            .post('/users/login')
            .send({ "email": user.email, "password": user.password })
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    expect(res.body).to.deep.equal([user]);
                    done(); // Call done to signal that the test is complete
                }
            });
    })

    it('Should update the password', done => {
        user.id = userId;
        let newPassword = "assasasasasa";
        chai
            .request(app)
            .post('/users/confirm')
            .send({ "email": user.email, "password": "newpassword" })
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    user.password = newPassword;
                    expect(res.body.changedRows).to.deep.equal(1);
                    done(); // Call done to signal that the test is complete
                }
            })
    })

    it ('Should delete a user', done => {
        chai
            .request(app)
            .delete('/users/' + userId)
            .end((err, res) => {
                if (err) {
                    done(err); // Pass any request error to the done function
                } else {
                    res.should.have.status(200);
                    expect(res.body.affectedRows).to.deep.equal(1);
                    done(); // Call done to signal that the test is complete
                }
            })
    })
});