import './asserts/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './asserts/fontawesome-free-5.15.3-web/css/all.css'
import Login from './components/user/Login'
import Dashboard from './components/dashboard/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import ProtectedRoute from '../src/components/protectedRoutes/ProtectedRoutes'
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="dashboard" />
          </Route>
          <Route path="*">
            <Redirect from="/" to="dashboard" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
