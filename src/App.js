import './asserts/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/user/Login'
import Dashboard from './components/dashboard/Dashboard'
import { useSelector } from 'react-redux'
import isNull from './utilities/nullChecking'
function App() {
  const token = useSelector((state) => (state.login ? state.login.token : null))
  console.log('TOKEN', token)

  return <>{isNull(token) ? <Login /> : <Dashboard />}</>
}

export default App
