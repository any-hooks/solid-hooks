
# useCookie

A Hook that store state into Cookie.

## Examples

### Store state into Cookie

>>> ./demo/demo1.tsx

### SetState can receive function

>>> ./demo/demo2.tsx

### Use the option property to configure Cookie

>>> ./demo/demo3.tsx

## API

```typescript
type State = string | undefined;

type SetState = (
  newValue?: State | ((prevState?: State) => State),
  options?: Cookies.CookieAttributes,
) => void;

const [state, setState]: [Accessor<State>, SetState] = useCookie(
  cookieKey: string,
  options?: Options,
);
```

If you want to delete this record from document.cookie, use `setState()` or `setState(undefined)`.

### Params

| Property  | Description                    | Type      | Default |
| --------- | ------------------------------ | --------- | ------- |
| cookieKey | The key of Cookie              | `string`  | -       |
| options   | Optional. Cookie configuration | `Options` | -       |

### Result

| Property | Description         | Type                    |
| -------- | ------------------- | ----------------------- |
| state    | Local Cookie value  | `Accessor<string \| undefined>` |
| setState | Update Cookie value | `SetState`              |

setState can update cookie options, which will be merged with the options set by `useCookieState`.

`const targetOptions = { ...options, ...updateOptions }`

### Options

| Property     | Description                                                                                | Type                                                       | Default     |
| ------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| defaultValue | Optional. Default value, but not store to Cookie                                           | `string` \| `undefined` \| `(() => (string \| undefined))` | `undefined` |
| expires      | Optional. Set Cookie expiration time                                                       | `number` \| `Date`                                         | -           |
| path         | Optional. Specify available paths                                                          | `string`                                                   | `/`         |
| domain       | Optional. Specify available domain. Default creation domain                                | `string`                                                   | -           |
| secure       | Optional. Specify whether the Cookie can only be transmitted over secure protocol as https | `boolean`                                                  | `false`     |
| sameSite     | Optional. Specify whether the browser can send this Cookie along with cross-site requests  | `strict` \| `lax` \| `none`                                | -           |

Options is same as [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes).
