import './App.css'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Hompage from './Components/Hompage'
import Movies from './Components/Movies/Movies'
import Admin from './Components/Admin/Admin'
import Auth from './Components/Auth/Auth'

function App() {


  return (
    <>
      <Header/>
      <section>
        <Routes>
          
          <Route path='/' element={ <Hompage/> } />
          <Route path='/movie' element={ <Movies/> } />
          <Route path='/admin' element={ <Admin/> } />
          <Route path='/auth' element={ <Auth/> } />

        </Routes>
      </section>
    </>
  )
}

export default App
