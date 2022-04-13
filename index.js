export * from '@majus/testing';

if ('mongo' in Package) {
  export { StubCollections } from './collections';
}
