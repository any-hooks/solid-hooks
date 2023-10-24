# useCssVar

Manipulate CSS variables

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [variable, setVariable] = useCssVar(
  prop: string,
  target?: Target,
  options?: Options
)
```

### Params

| Property | Description       | Type      | Default |
| -------- | ----------------- | --------- | ------- |
| prop     | CSS variable name | `string`  | -       |
| target   | target element    | `Target`  | -       |
| options  | options           | `Options` | -       |

### Options

| Property     | Description                | Type      | Default |
| ------------ | -------------------------- | --------- | ------- |
| initialValue | CSS variable default value | `string`  | -       |
| observer     | Is to observe              | `boolean` | `false` |

### Results

| Property    | Description        | Type                      | 
| ----------- | ------------------ | ------------------------- |
| variable    | CSS variable value | `Accessor<string>`        |
| setVariable | Set CSS variable   | `(value: string) => void` |
