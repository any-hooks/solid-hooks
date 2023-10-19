import { Router } from '@solidjs/router'
import { onMount } from 'solid-js'
import { AppContextProvider } from './AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useCopyCode } from './hooks/copyCode'
import Routes from './routes'

export default function App() {
  onMount(() => useCopyCode())
  return (
    <Router>
      <AppContextProvider>
        <main class="app min-h-100% pt-navbar pl-sidebar">
          <Navbar />
          <Sidebar />
          <div class="px-10 py-4">
            <Routes />
          </div>
        </main>
      </AppContextProvider>
    </Router>
  )
}
