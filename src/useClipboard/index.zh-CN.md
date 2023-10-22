# useClipboard

响应式剪贴板API。提供响应剪贴板命令(剪切、复制和粘贴)以及异步读取和写入系统剪贴板的能力。
对剪贴板内容的访问是在Permissions API后面进行控制的。
未经用户许可，不会阅读或修改剪贴板内容。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶使用

<code src="./demo/demo2.tsx" />

## API

```typescript
const { copy, copied, text, isSupported } = useClipboard(options?: Options);
```

### Result

| 参数    | 说明             | 类型                              |
| ------- | ---------------- | --------------------------------- |
| copy    | 复制文本         | `(text: string) => Promise<void>` |
| copied  | 是否复制成功     | `Accessor<boolean>`               |
| text    | 复制的文本       | `Accessor<string \| undefined>`   |
| isSupported | 是否支持复制 | `Accessor<boolean>`               |

### Options

| 参数         | 说明            | 类型       | 默认值   |
| ------------ | -------------    | --------- | -------- |
| source       | 默认文本         | `string`  | -        |
| read         | 是否侦听剪切板   | `boolean` | `false`  |
| legacy       | 是否使用旧版 API | `boolean` | `false`  |
| copiedDuring | 复制状态持续时间 | `number`  | `1500`   |

### 备注

设置 `legacy: true` 以保留剪贴板API不可用时的复制能力。
它将使用execCommand作为回退处理复制。
