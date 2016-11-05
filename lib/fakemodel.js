'use strict';

function FakeModel() {
    this._db = {};
    this._lastIndex = 0;
}

module.exports = FakeModel;

const proto = FakeModel.prototype;

proto.list = function modelList() {
    const output = [];
    Object.keys(this._db).forEach((key) => {
        output.push(this._db[key]);
    });
    return Promise.resolve(output);
};

proto.insert = function modelInsert(originalItem) {
    const item = JSON.parse(JSON.stringify(originalItem));
    item.id = item.id || this._lastIndex++;
    this._db[item.id] = item;
    return Promise.resolve(item);
};

proto.getById = function modelGet(id) {
    return Promise.resolve(this._db[id]);
};

proto.deleteById = function modelDelete(id) {
    delete this._db[id];
    return Promise.resolve();
};

proto.updateById = function modelUpdate(id, item) {
    item.id = id;
    this._db[id] = item;
    return Promise.resolve(item);
};
