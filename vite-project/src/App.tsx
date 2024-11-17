import './App.css'
import Register from './components/registerComp/registerComp'
import MainLayout from './components/layoutComp/leyoutComp'
import Login from './components/loginComp/loginComp'
import Candidates from './components/votesComp/votesComp'
import { Routes , Route} from 'react-router-dom'
import ProtectedRoute from "./auth/protectedCandidatesRoute"
import ProtectedRouteChart from "./auth/protectedChartRoute"
import VotesChart from './components/chartComp/chartComp'
function App() {

  return (
    
      <div>
        <MainLayout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chart" element={
              <ProtectedRouteChart>
                <VotesChart />
              </ProtectedRouteChart> } />
            <Route path="/candidates" element={ 
              <ProtectedRoute>
                <Candidates/>
              </ProtectedRoute>} />
          </Routes>
        </MainLayout>

        
        
        </div>
  )
}

export default App
