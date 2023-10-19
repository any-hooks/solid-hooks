import { useMatch, useNavigate } from '@solidjs/router'
import { createMemo } from 'solid-js'

export interface NavLinkProps {
  link: string
  text: string
  active?: boolean
  match?: string
}

export default function NavLink(props: NavLinkProps) {
  const navigate = useNavigate()
  const match = useMatch(() => props.match || props.link)
  const isMatched = createMemo(() => Boolean(match()))

  const onClick = () => navigate(props.link)
  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <p
      class="cursor-pointer ml-10"
      classList={{
        'text-brand': isMatched(),
      }}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {props.text}
    </p>
  )
}
