'use strict'

var expect = require('chai').expect
    , server = require('../index')
    , io = require('socket.io-client')
    , ioOptions = {
        transports: ['websocket']
        , forceNew: true
        , reconnection: false
    }
    , testMsg = `["tableName", "create", {
        "component": "CF1",
        "southAlign": true
    }]`
    , sender
    , receiver



describe('Chat Events', function () {
    beforeEach(function (done) {

        // start the io server
        //server.start()
        // connect two io clients
        sender = io('http://localhost:3000/', ioOptions)
        receiver = io('http://localhost:3000/', ioOptions)

        // finish beforeEach setup
        done()
    })
    afterEach(function (done) {

        // disconnect io clients after each test
        sender.disconnect()
        receiver.disconnect()
        done()
    })

    describe('Message Events', function () {
        it('Clients should receive a message when the `message` event is emited.', function (done) {
            sender.emit('message', testMsg)

            receiver.on('message', function (msg) {
                console.log('msg: ',msg)
                expect(msg).to.equal(testMsg)
                done()
            })
        })
    })
})
/*
var request = require('supertest');

var app = require('../server').app;

describe('Calculator unit tests', function(){
    it("happy case add", function(done){
        request(app)
            .get("/calculator/add?first=1.2&second=3.4")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {result : 4.6})
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("happy case sub", function(done){
        request(app)
            .get("/calculator/sub?first=1.2&second=3.4")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {result :(1.2 - 3.4)})
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("happy case multiply", function(done){
        request(app)
            .get("/calculator/mul?first=1.2&second=3.4")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {result : (1.2 * 3.4)})
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("happy case divide", function(done){
        request(app)
            .get("/calculator/div?first=1.2&second=3.4")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {result : (1.2 / 3.4)})
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("missing parameter 'first'", function (done) {
        request(app)
            .get("/calculator/add?second=3.4")
            .expect('Content-Type', /text/)
            .expect(400, "Missing required parameter 'first'")
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("missing parameter 'second'", function (done) {
        request(app)
            .get("/calculator/add?first=1.2")
            .expect('Content-Type', /text/)
            .expect(400, "Missing required parameter 'second'")
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("wrong parameter 'first'", function (done) {
        request(app)
            .get("/calculator/add?first=hello&second=3.4")
            .expect('Content-Type', /text/)
            .expect(400, "The parameter 'first' is not a number")
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("wrong parameter 'second'", function (done) {
        request(app)
            .get("/calculator/add?first=1.2&second=world")
            .expect('Content-Type', /text/)
            .expect(400, "The parameter 'second' is not a number")
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });

    it("dividing by zero'", function (done) {
        request(app)
            .get("/calculator/div?first=1.2&second=0")
            .expect('Content-Type', /text/)
            .expect(400, "Dividing by zero is not allowed")
            .end(function (err) {
                if(err) {
                    return done(err);
                }
                return done();
            })
    });
});

*/