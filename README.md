# Vue Composition API

## `setup` In `defineComponent`

`setup` is executed before the component is created.

Whatever `setup` returns is accessible in the component template.

`setup` has access to `props` and `context`.

`setup` does not have access to `this`, data, or computed.

### calling with props & context

```ts
export default defineComponent({
  props: {
    firstName: {
      tye: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    let greeting = `Hello there, general ${firstName}`;
    return { greeting };
  },
});
```
