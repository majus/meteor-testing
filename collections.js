/* eslint-disable no-underscore-dangle */
import { LocalCollection } from 'meteor/minimongo';
import { sinon } from '@majus/testing';

export const StubCollections = {
  sandbox: sinon.createSandbox(),
  collections: [],
  stub(...collections) {
    for (const collection of collections) {
      if (!this.collections.includes(collection)) {
        const replacement = new LocalCollection(collection._name);
        this.sandbox.stub(collection, '_collection').value(replacement);
        this.collections.push(collection);
      }
    }
  },
  restore() {
    this.collections.length = 0;
    this.sandbox.restore();
  },
};
