declare module '*.md' {
  import { JSX, ParentProps } from 'solid-js'

  interface Props extends ParentProps {
    toc?: boolean
  }

  const com: (props: Props) => JSX.Element
  const frontmatter: Record<string, any>

  export default com

  export { frontmatter }
}
