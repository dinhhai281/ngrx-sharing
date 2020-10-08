module.exports = {
  name: 'kb-clone',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '@store/(.*)': '<rootDir>/src/app/store/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@environments/(.*)': '<rootDir>/src/environments/$1',
    '@components/(.*)': '<rootDir>/src/app/components/$1'
  },
  transformIgnorePatterns: [ "/node_modules/(?!ngx-binding).+\\.js$"],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ]
      }
    },
  },
  coverageDirectory: './coverage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
