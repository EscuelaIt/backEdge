'use strict'
module.exports.test = (request) => {
    describe('/api/pub/maestros', () => {
        it('GET respond with 200 ok to maestros ', (done) =>request.get('/api/pub/maestros').expect(200, done))
    })
}