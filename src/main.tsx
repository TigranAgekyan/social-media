import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Shop from './pages/Shop.tsx'
import Cart from './pages/Cart.tsx'
import About from './pages/About.tsx'
import CheckOut from './pages/CheckOut.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/checkout' element={<CheckOut/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
