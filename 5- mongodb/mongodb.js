'use strict'
const client = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/backedge'


module.exports = {
    connecting: connecting,
    collectionConnecting: collectionConnecting,
    collectionConnectingXtrem: colName => new Promise((resolve, reject) => client.connect(url, (err, db) => err ? reject(err) : resolve(db.collection(colName)))),
    finding: finding,
    findingXtrem: {},
    inserting:inserting,
    updating: updating,
    deleting:deleting
}


function connecting() {
    let ejecutor = function(resolve, reject) {
        client.connect(url, (err, db) => err ? reject(err) : resolve(db))
    }
    return new Promise(ejecutor)
}

function collectionConnecting(colName) {
    return new Promise((resolve, reject) => {
        client.connect(url, (err, db) => err ? reject(err) : resolve(db.collection(colName)))
    })
}

function finding(colName, query) {
    return new Promise((resolve, reject) => {
        this.collectionConnecting(colName)
            .then(colDb => colDb.find(query).toArray((err, result) => err ? reject(err) : resolve(result)))
            .catch(err => reject(err))
    })
}

function inserting(colName, document) {
    return new Promise((resolve, reject) => {
        this.collectionConnecting(colName)
            .then(colDb => colDb.insert(document), (err, result) => err ? reject(err) : resolve(result))
            .catch(err => reject(err))
    })
}

function updating(colName, query, document) {
    return new Promise((resolve, reject) => {
        this.collectionConnecting(colName)
            .then(colDb => colDb.update(query,document,(err, result) => err ? reject(err) : resolve(result)))
            .catch(err => reject(err))
    })
}

function deleting(colName, query) {
    return new Promise((resolve, reject) => {
        this.collectionConnecting(colName)
            .then(colDb => colDb.deleteOne(query,(err, result) => err ? reject(err) : resolve(result)))
            .catch(err => reject(err))
    })
}