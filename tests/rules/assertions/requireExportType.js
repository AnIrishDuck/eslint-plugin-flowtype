export default {
  invalid: [
    {
      code: 'export let foo = (bar) => bar * 2',
      errors: [
        {
          message: 'Missing "foo" type annotation on export.'
        }
      ]
    },
    {
      code: 'export let foo = 2',
      errors: [
        {
          message: 'Missing "foo" type annotation on export.'
        }
      ]
    },
    {
      code: 'export const foo = 2',
      errors: [
        {
          message: 'Missing "foo" type annotation on export.'
        }
      ]
    },
    {
      code: 'export let foo: number = 3, bar = \'baz\'',
      errors: [
        {
          message: 'Missing "bar" type annotation on export.'
        }
      ]
    },
    {
      code: 'export function foo (n, s) { return n * 2 }',
      errors: [
        {
          message: 'Missing return type annotation on export.'
        },
        {
          message: 'Missing "n" parameter type annotation on export.'
        },
        {
          message: 'Missing "s" parameter type annotation on export.'
        }
      ]
    },
    {
      code: 'export function foo (n, v: string): number { return n * 2 }',
      errors: [
        {
          message: 'Missing "n" parameter type annotation on export.'
        }
      ]
    },
    {
      code: 'export default function foo (n, v: string): number { return n * 2 }',
      errors: [
        {
          message: 'Missing "n" parameter type annotation on export.'
        }
      ]
    },
    {
      code: 'export function foo (n: number) { return n * 2 }',
      errors: [
        {
          message: 'Missing return type annotation on export.'
        }
      ]
    },
    {
      code: 'let foo = 10\nexport { foo }',
      errors: [
        {
          line: 1,
          message: 'Missing "foo" type annotation, required by export below.'
        },
        {
          line: 2,
          message: 'Missing or incomplete type annotation on prior "foo" declaration at line 1.'
        }
      ]
    },
    {
      code: 'let foo = 10\nexport { foo as baz }',
      errors: [
        {
          line: 1,
          message: 'Missing "foo" type annotation, required by export below.'
        },
        {
          line: 2,
          message: 'Missing or incomplete type annotation on prior "foo" declaration at line 1.'
        }
      ]
    },
    {
      code: 'function foo (n) { return n * 2 }\nlet bar = 10\nexport { foo }',
      errors: [
        {
          line: 1,
          message: 'Missing return type annotation, required by export below.'
        },
        {
          line: 1,
          message: 'Missing "n" parameter type annotation, required by export below.'
        },
        {
          line: 3,
          message: 'Missing or incomplete type annotation on prior "foo" declaration at line 1.'
        }
      ]
    },
    {
      code: 'export default 20',
      errors: [
        {
          message: 'Missing type annotation on default export.'
        }
      ]
    }
  ],
  valid: [
    {
      code: 'export * from \'./test\''
    },
    {
      code: 'export { foo, bar } from \'./test\''
    },
    {
      code: 'export let foo: (number) => number = (bar) => bar * 2'
    },
    {
      code: 'export let foo: number = 2'
    },
    {
      code: 'export let foo: number = 3, bar: string = \'baz\''
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
    },
    {
      code: 'let foo: number = 10\nlet bar = 20\nexport { foo }'
    },
    {
      code: 'function foo (n: number): number { return n * 2 }\nlet bar = 10\nexport { foo }'
    },
    {
      code: 'export default (20: number)'
    }
  ]
};
