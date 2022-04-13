Package.describe({
  name: 'majus:testing',
  version: '0.0.1',
  summary: 'Common API used for an automated testing in Meteor',
  git: 'https://github.com/majus/meteor-testing.git',
  documentation: 'README.md',
});

Npm.depends({
  '@majus/testing': '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('2.5');
  api.use('ecmascript');
  api.use('minimongo', { weak: true });
  api.mainModule('index.js');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'mongo',
    'minimongo',
    'meteortesting:mocha@2.0.3',
  ]);
  api.use('majus:testing');
  api.addFiles([
    'collections.test.js',
  ]);
});
