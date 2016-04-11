'use strict'
const url = '/api/priv/saldos'
const urlS = '/api/pub/sesiones'
let sessionId
module.exports.test = (req) => {
    describe(url, () => {
        before((done) => {
            req
                .post(urlS)
                .send({ email: 'a@b.c', password: '1234' })
                .end((err, res) => {
                    if(err) return done(err)
                    sessionId = res.body
                    return done()
                })
        })
        it('GET respond with 401 unauthorized to non authenticated users', (done) => req.get(url).expect(401, done))
        it('GET respond with 200 ok to an authenticated user', (done) => {
            req
                .get(url)
                .set('sessionId', sessionId)
                .expect(200, done)
        })
    })
}