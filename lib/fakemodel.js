'use strict';

function FakeModel() {
    this._db = [];
    this._lastIndex = 0;
};

module.exports = FakeModel;

const proto = FakeModel.prototype;

proto.list = function modelList() {
    return Promise.resolve(this._db);
};

proto.insert = function modelInsert(originalItem) {
    const item = JSON.parse(JSON.stringify(originalItem));
    item.id = this._lastIndex++;
    this._db.push(item);
    return Promise.resolve(item);
};

proto.getById = function modelGet(id) {
    const item = this._db.find((item) => {
        return item.id === id;
    });

    return Promise.resolve(item);
};

proto.deleteById = function modelDelete(id) {
    const index = this._db.findIndex((item) => {
        return item.id === id;
    });
    this._db.splice(index, 1);
    return Promise.resolve();
};
