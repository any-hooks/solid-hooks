# useKeyPress

监听键盘按键，支持组合键，支持按键别名。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

### 监听组合按键

>>> ./demo/demo6.tsx

### 精确匹配

>>> ./demo/demo7.tsx

### 监听多个按键

>>> ./demo/demo3.tsx

### 获取触发的按键

>>> ./demo/demo8.tsx

### 自定义监听方式

>>> ./demo/demo4.tsx

### 自定义 DOM

>>> ./demo/demo5.tsx

## API

```typescript
type KeyType = number | string;
type KeyFilter = KeyType | KeyType[] | ((event: KeyboardEvent) => boolean);

useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: (event: KeyboardEvent, key: KeyType) => void,
  options?: Options
);
```

### Params

| 参数         | 说明                                         | 类型                                                            | 默认值 |
| ------------ | -------------------------------------------- | --------------------------------------------------------------- | ------ |
| keyFilter    | 支持 keyCode、别名、组合键、数组、自定义函数 | `KeyType` \| `KeyType[]` \| `(event: KeyboardEvent) => boolean` | -      |
| eventHandler | 回调函数                                     | `(event: KeyboardEvent, key: KeyType) => void`                  | -      |
| options      | 可选配置项                                   | `Options`                                                       | -      |

### Options

| 参数       | 说明                                                                                        | 类型                                                        | 默认值        |
| ---------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| events     | 触发事件                                                                                    | `('keydown' \| 'keyup')[]`                                  | `['keydown']` |
| target     | DOM 节点或者 ref                                                                            | `() => Element` \| `Element`  | -             |
| exactMatch | 精确匹配。如果开启，则只有在按键完全匹配的情况下触发事件。比如按键 [shift + c] 不会触发 [c] | `boolean`                                                   | `false`       |
| useCapture | 是否阻止事件冒泡                                                                           | `boolean`                                                   | `false`       |

## Remarks

1. 按键别名见 [代码](https://github.com/any-hooks/solid-hooks/blob/main/src/useKeyPress/index.ts#L24)

2. 修饰键

```text
ctrl
alt
shift
meta
```
