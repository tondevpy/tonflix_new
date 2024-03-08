import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Home from './components/Home'
import Filmes from "./components/Filmes"
import NotFoundPage from "./components/NotFoundPage"
import PageFilme from './components/PageFilme'

function Rotas() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/filmes" element={<Filmes/>}/>
      <Route path="/pageFilme/:id" element={<PageFilme/>}/>

      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Rotas