# Repeter

[![Netlify Status](https://api.netlify.com/api/v1/badges/b767c221-cd26-410b-962f-bd8cd14b81a8/deploy-status)](https://app.netlify.com/sites/angry-shockley-3f0900/deploys)

A simple todo tracker that unchecks each task at the start of a new day. Maintains your tasks in local browser storage.

See it live at [repeter.gerardbentley.com](https://repeter.gerardbentley.com)

# Running Locally

```bash
# Clone
git clone git@github.com:gerardrbentley/repeter.git repeter
cd repeter

# Install and Run dev
yarn
yarn dev
# OR
npm install
npm run dev

# Build static bundle in /dist/
yarn build
# OR
npm run build
```

# Vue Composition API

## `setup` In `defineComponent`

`setup` is executed before the component is created.

Whatever `setup` returns is accessible in the component template.

`setup` has access to `props`, `attrs`, `slots`, `emit` and `context`.

`setup` does not have access to `this`, `data`, `computed`, or `methods`.

### calling with props & context

```ts
export default defineComponent({
  props: {
    firstName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    let greeting = `Hello there, general ${props.firstName}`;
    return { greeting };
  },
});
```
