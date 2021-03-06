'use strict'
const url = '/api/priv/movimientos'
const urlS = '/api/pub/sesiones'
let sessionId
module.exports.test = (req) => {
    describe(url, () => {
        before((done) => {
            req
                .post(urlS)
                .send({ email: 'a@b.c', password: '1234' })
                .end((err, res) => {
                    if (err) return done(err)
                    sessionId = res.body
                    return done()
                })
        })
        it('GET respond with 401 unauthorized to non authenticated users',
            (done) =>
                req
                    .get(url)
                    .expect(401, done))
        it('GET respond with 204 no content to a new authenticated user',
            (done) => {
                req
                    .get(url)
                    .set('sessionId', sessionId)
                    .expect(204, done)
            })
        it('POST respond with 201 created to a new movimiento by authenticated user', (done) => {
            req
                .post(url)
                .send({ esIngreso: 1, importe: 199, fecha: new Date() })
                .set('sessionId', sessionId)
                .expect(201, done)
        })
        it('GET respond with 200 ok to a pos-write user', (done) => {
            req
                .get(url)
                .set('sessionId', sessionId)
                .expect(200, done)
        })
        it('GET respond with 200 ok to a real movimiento id', (done) => {
            req
                .get(`${url}/0`)
                .set('sessionId', sessionId)
                .expect(200, done)
        })
        it('GET respond with 404 not found to a non real movimiento id', (done) => {
            req
                .get(`${url}/999`)
                .set('sessionId', sessionId)
                .expect(404, done)
        })
        it('PUT respond with 200 ok to a modification on a movimiento by authenticated user', (done) => {
            req
                .put(`${url}/0`)
                .send({ esIngreso: 1, importe: 299, fecha: new Date() })
                .set('sessionId', sessionId)
                .expect(200, done)
        })
        it('PUT respond with 404 not found to a modification on a movimiento not found', (done) => {
            req
                .put(`${url}/999`)
                .send({ esIngreso: 1, importe: 299, fecha: new Date() })
                .set('sessionId', sessionId)
                .expect(404, done)
        })
        it('DELETE respond with 204 no content to a deletion on a movimiento by authenticated user', (done) => {
            req
                .delete(`${url}/0`)
                .set('sessionId', sessionId)
                .expect(204, done)
        })
        it('DELETE respond with 404 not found to a deletion on a movimiento not found', (done) => {
            req
                .delete(`${url}/999`)
                .set('sessionId', sessionId)
                .expect(404, done)
        })
        it('GET respond with 204 no content to a new authenticated user',
            (done) => {
                req
                    .get(url)
                    .set('sessionId', sessionId)
                    .expect(204, done)
            })
    })
}
