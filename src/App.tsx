import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'

function App() {
  return (
    <ReduxProvider store={store}>
      <h1>home</h1>
    </ReduxProvider>
  )
}

export default App
