import { Router } from '@solidjs/router'
import { AppContextProvider } from './AppContext'
import Layout from './components/Layout'
import Routes from './routes'

export default function App() {
  return (
    <Router>
      <AppContextProvider>
        <Layout>
          <Routes />
        </Layout>
      </AppContextProvider>
    </Router>
  )
}
