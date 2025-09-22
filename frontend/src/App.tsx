import './App.css'
import { ThemeProvider } from './Contexts/DarkModeContext'
import Layout from "./Layout"


function App() {

  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

export default App
