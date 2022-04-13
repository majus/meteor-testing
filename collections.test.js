/* eslint-disable no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LocalCollection } from 'meteor/minimongo';
import { expect } from '@majus/testing';
import { StubCollections } from './collections';

describe('StubCollections', () => {

  const collection1 = new Mongo.Collection('test.StubCollections.collection1');
  const collection2 = new Mongo.Collection('test.StubCollections.collection2');

  beforeEach(() => {
    if (Meteor.isServer) {
      expect(collection1._collection).not.to.be.instanceOf(LocalCollection);
      expect(collection2._collection).not.to.be.instanceOf(LocalCollection);
    }
  });

  afterEach(() => {
    StubCollections.restore();
  });

  it('stubs a single collection', () => {
    StubCollections.stub(collection1);
    expect(collection1._collection).to.be.instanceOf(LocalCollection);
  });

  it('stubs multiple collections with a single call', () => {
    StubCollections.stub(collection1, collection2);
    expect(collection1._collection).to.be.instanceOf(LocalCollection);
    expect(collection2._collection).to.be.instanceOf(LocalCollection);
  });

  it('stubs multiple collections with multple calls', () => {
    StubCollections.stub(collection1);
    StubCollections.stub(collection2);
    expect(collection1._collection).to.be.instanceOf(LocalCollection);
    expect(collection2._collection).to.be.instanceOf(LocalCollection);
  });

  it('silently skips already stubbed collections', () => {
    StubCollections.stub(collection1);
    const old = collection1._collection;
    expect(() => StubCollections.stub(collection1)).to.not.throw();
    expect(collection1._collection).to.be.equal(old);
  });

  it('does not alter original collection', () => {
    expect(collection1.find({}).count()).to.be.equal(0);
    StubCollections.stub(collection1);
    collection1.insert({});
    expect(collection1.find({}).count()).to.be.equal(1);
    StubCollections.restore();
    expect(collection1.find({}).count()).to.be.equal(0);
  });

});
