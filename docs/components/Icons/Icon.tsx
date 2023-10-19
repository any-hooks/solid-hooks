import cn from 'classnames'
import type { ComponentProps, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

export interface IconProps extends ParentProps, ComponentProps<'span'> {}
export default function Icon(props: IconProps) {
  const [p, spanAttrs] = splitProps(props, ['class', 'children'])
  return (
    <span class={cn('icon', p.class)} {...spanAttrs}>
      {p.children}
    </span>
  )
}
