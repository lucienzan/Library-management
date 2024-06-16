import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import './index.css'

function App() {
  document.title = "LM | Dashboard"
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  )
}

export default App
