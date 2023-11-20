declare module '*.md' {
  import { Component } from 'solid-js'
  
  const com: Component
  const frontmatter: Record<string, any>

  export default com

  export { frontmatter }
}
