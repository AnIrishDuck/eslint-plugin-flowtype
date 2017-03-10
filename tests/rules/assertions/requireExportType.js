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
    }
  ],
  valid: [
    {
      code: 'export let foo: (number) => number = (bar) => bar * 2'
    },
    {
      code: 'export let foo: number = 2'
    }
  ]
};
