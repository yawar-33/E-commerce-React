import './asserts/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './asserts/fontawesome-free-5.15.3-web/css/all.css'
import Login from './components/user/Login'
import MainPage from './components/dashboard/MainPage'
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
          <ProtectedRoute path="/ecommerce-admin">
            <MainPage />
          </ProtectedRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="ecommerce-admin" />
          </Route>
          <Route path="*">
            <Redirect from="/" to="/login" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
