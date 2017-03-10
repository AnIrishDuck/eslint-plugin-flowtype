export default {
  invalid: [
    {
      code: 'export let foo = (bar) => bar * 2',
      errors: [
        {
          message: 'Missing "foo" export type annotation.'
        }
      ]
    },
    {
      code: 'export let foo = 2',
      errors: [
        {
          message: 'Missing "foo" export type annotation.'
        }
      ]
    },
    {
      code: 'export function foo (n, s) { return n * 2 }',
      errors: [
        {
          message: 'Missing return type annotation on exported function.'
        },
        {
          message: 'Missing "n" parameter type annotation on exported function.'
        },
        {
          message: 'Missing "s" parameter type annotation on exported function.'
        }
      ]
    },
    {
      code: 'export function foo (n, v: string): number { return n * 2 }',
      errors: [
        {
          message: 'Missing "n" parameter type annotation on exported function.'
        }
      ]
    },
    {
      code: 'export function foo (n: number) { return n * 2 }',
      errors: [
        {
          message: 'Missing return type annotation on exported function.'
        }
      ]
    }
  ],
  valid: [
    {
      code: 'export let foo: (number) => number = (bar) => bar * 2'
    },
    {
      code: 'export let foo: number = 2'
    },
    {
      code: 'function foo (n, v) { return n * 2 }'
    },
    {
      code: 'function foo (_n): number { return n * 2 }',
      options: [
        {
          excludeParameterMatch: '^_'
        }
      ]
    }
  ]
};
