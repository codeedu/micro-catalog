module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none', // none - do not check arguments
        /*
         * The following is a workaround to the issue that parameter decorators
         * are treated as `unused-vars`.
         *
         * See https://github.com/typescript-eslint/typescript-eslint/issues/571
         *
         * @example
         * ```ts
         * import {inject} from '@loopback/context';
         * class MyController {
         *   constructor(@inject('foo') foo: string) {}
         * }
         * ```
         */
        varsIgnorePattern: 'inject|config|(\\w+)Bindings',
        ignoreRestSiblings: false,
      },
    ], // tslint:no-unused-variable
  },
};
