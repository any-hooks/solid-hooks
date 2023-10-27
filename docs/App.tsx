import { Router } from '@solidjs/router'
import { Suspense, onMount } from 'solid-js'
import { AppContextProvider } from './AppContext'
import Loading from './components/Loading'
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
            <Suspense fallback={<Loading />}>
              <Routes />
            </Suspense>
          </div>
        </main>
      </AppContextProvider>
    </Router>
  )
}
