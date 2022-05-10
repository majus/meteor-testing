/* eslint-disable no-underscore-dangle */
import { LocalCollection } from 'meteor/minimongo';
import { sinon } from '@majus/testing';

class CustomLocalCollection extends LocalCollection {

  _ensureIndex = sinon.stub();
  createIndex = sinon.stub();

}

export const StubCollections = {
  sandbox: sinon.createSandbox(),
  collections: [],
  stub(...collections) {
    for (const collection of collections) {
      if (!this.collections.includes(collection)) {
        const replacement = new CustomLocalCollection(collection._name);
        this.sandbox.stub(collection, '_collection').value(replacement);
        this.sandbox.stub(collection, '_connection').value();
        this.collections.push(collection);
      }
    }
  },
  restore() {
    this.collections.length = 0;
    this.sandbox.restore();
  },
};
