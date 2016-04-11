'use strict'
const url = '/api/priv/movimientos'
const urlS = '/api/pub/sesiones'

module.exports.test = (req) => {
    describe(url, () => {
        it('GET respond with 401 unauthorized to non authenticated users', (done) => req.get(url).expect(401, done))
        it('GET respond with 204 no content to a new authenticated user', (done) => {
            req
                .post(urlS)
                .send({ email: 'a@b.c', password: '1234' })
                .end((err, res) => {
                    req
                        .get(url)
                        .set('sessionId', res.body)
                        .expect(204, done)
                })
        })
        it('POST respond with 201 created to a new movimiento by authenticated user', (done) => {
            req
                .post(urlS)
                .send({ email: 'a@b.c', password: '1234' })
                .end((err, res) => {
                    req
                        .post(url)
                        .send({esIngreso:1, importe: 199, fecha : new Date()})
                        .set('sessionId', res.body)
                        .expect(201, done)
                })
        })
        it('GET respond with 200 ok to a pos-write user', (done) => {
            req
                .post(urlS)
                .send({ email: 'a@b.c', password: '1234' })
                .end((err, res) => {
                    req
                        .get(url)
                        .set('sessionId', res.body)
                        .expect(200, done)
                })
        })
    })
}