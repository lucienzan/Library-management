import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { ThemeContextProvider } from './contexts/themeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeContextProvider>
        <RouterProvider router={router} />
    </ThemeContextProvider>
)
