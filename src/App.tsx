import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Dashboard } from './components/layouts/dashboard'
import { store } from './store'

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route index element={<h1>Home</h1>} />
            <Route path="/users" element={<h1>Users</h1>} />
          </Routes>
        </Dashboard>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
