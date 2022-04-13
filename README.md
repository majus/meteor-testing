# Overview

Common API used for an automated testing in Meteor.

# Exports

- Common testing API from `@majus/testing` Node [package](https://www.npmjs.com/package/@majus/testing) tossed through: `sinon`, `chai`, etc.

- Refactored `StubCollections` API: with support for models from `jagi:astronomy` Meteor [package](https://atmospherejs.com/jagi/astronomy)

# Installation

```
meteor add majus:testing
```

# StubCollections API

Inspired by `hwillson:stub-collections` Meteor [package](https://github.com/hwillson/meteor-stub-collections/):

> Easily stub out Meteor collections with in-memory local collections. The idea here is to allow the use of things like Factories for unit tests and styleguides without having to restrict ourselves to making components "pure". So a component (ie. a template) can still call Widgets.findOne(widgetId), it's just that we will have stubbed out Widgets to point to a local collection that we can completely control in our test.

- `StubCollections.stub(collection1, collection2, ...)` – stub a specific list of collections
- `StubCollections.restore()` – undo stubbing (call at the end of tests, on routing away, etc.)

# Usage examples 

```js
import { expect, sinon, StubCollections } from 'meteor/majus:testing';
import { MyModel, MyCollection, myFunction } from './source';

describe('My tests', () => {

  beforeEach(() => {
    StubCollections.stub(MyCollection, MyModel.getCollection());
  });

  afterEach(() => {
    StubCollections.restore();
    sinon.restore();
  });

  test('myFunction returns current user id', () => {
    const itemId = MyCollection.insert({});
    sinon.stub(Meteor, 'userId').returns('xxx');
    const result = myFunction(itemId);
    expect(result).to.be.equal('xxx');
  });
  
});
```
