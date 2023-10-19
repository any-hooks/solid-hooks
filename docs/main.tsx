import '@unocss/reset/normalize.css'
import 'uno.css'
import '~/styles'
import { render } from 'solid-js/web'
import App from './App'
import './routes'

const app = document.getElementById('app')

if (app) {
  render(() => <App />, app)
}
