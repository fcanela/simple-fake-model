'use strict';

const FakeModel = require('../lib/fakemodel.js');
const assert = require('assert');

describe('Fake model', () => {
    let model;
    beforeEach(() => {
        model = new FakeModel();
    });

    describe('list feature', () => {
        it('should list no items when empty db', (done) => {
            model.list().then((data) => {
                assert.strictEqual(data.length, 0, 'empty db and items founds');
                done();
            }).catch(done);
        });

        it('should list present items', (done) => {
            model._db.foo = {};
            model._db.bar = {};
            model._db.foobar = {};
            model.list().then((data) => {
                assert.strictEqual(data.length, 3, 'expected three items after three additions');
                done();
            }).catch(done);
        });
    });

    describe('insert feature', () => {
        it('should include the item added', (done) => {
            model.insert({}).then(() => {
                assert.strictEqual(Object.keys(model._db).length, 1, 'expected one item after one addition');
                done();
            }).catch(done);
        });

        it('should include the item added with specific id', (done) => {
            model.insert({id: 'foo'}).then(() => {
                assert.strictEqual(Object.keys(model._db).length, 1, 'expected one item after one addition');
                const item = model._db['foo'];
                assert.strictEqual(item.id, 'foo', 'id is not foo');
                done();
            }).catch(done);
        });
    });

    describe('get by id feature', () => {
        it('should return the item', (done) => {
            model._db[13] = { id: 13, name: 'hello' };
            model._db[23] = { id: 23, name: 'foo' };
            model._db[33] = { id: 33, name: 'bar' };
            model.getById(23).then((item) => {
                assert.strictEqual(item.id, 23, 'wrong id returned');
                assert.strictEqual(item.name, 'foo', 'wrong item returned');
                done();
            }).catch(done);
        });
    });

    describe('delete by id feature', () => {
        it('should delete the item', (done) => {
            model._db[13] = { id: 13, name: 'hello' };
            model._db[23] = { id: 23, name: 'foo' };
            model._db[33] = { id: 33, name: 'bar' };
            model.deleteById(23).then(() => {
                assert.strictEqual(Object.keys(model._db).length, 2, 'incorrect number of items after deletion');

                done();
            }).catch(done);
        });
    });

    describe('update by id feature', () => {
        it('should update the item', (done) => {
            model._db[13] = { id: 13, name: 'hello' };
            model.updateById(13, { id: 13, name: 'goodbye' }).then((item) => {
                assert.strictEqual(item.id, 13, 'wrong id returned');
                assert.strictEqual(item.name, 'goodbye', 'wrong content returned');

                done();
            }).catch(done);
        });
    });
});
