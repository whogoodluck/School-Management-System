import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import CreateSchool from './pages/CreateSchool'
import EditSchool from './pages/EditSchool'
import Home from './pages/Home'
import SchoolDetails from './pages/SchoolDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/schools/create' element={<CreateSchool />} />
        <Route path='/schools/:id' element={<SchoolDetails />} />
        <Route path='/schools/:id/edit' element={<EditSchool />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
