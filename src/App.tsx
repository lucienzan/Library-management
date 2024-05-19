import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import './index.css'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

function App() {
  document.title = "LM | Dashboard"
  const location = useLocation();
  return (
    <>
      <Navbar />
      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <Outlet></Outlet>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

export default App
