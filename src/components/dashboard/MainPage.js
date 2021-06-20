import React, { useState } from 'react'
import login from '../../actions/login'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { Switch, Route, Link, withRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import Category from '../category/Category'
function MainPage(props) {
  const { match } = { ...props }
  const [isToggle, setisToggle] = useState(true)

  const userInfo = useSelector((state) =>
    state.login ? state.login.token.userInfo : null,
  )

  const handleLogout = (e) => {
    e.preventDefault()
    props.login(null)
  }

  const toggleLeftMenu = (e) => {
    e.preventDefault()
    setisToggle(!isToggle)
  }
  return (
    <>
      <div
        className={
          isToggle
            ? 'page-wrapper chiller-theme toggled'
            : 'page-wrapper chiller-theme'
        }
      >
        <a
          id="show-sidebar"
          className="btn btn-sm btn-dark"
          href="./"
          onClick={toggleLeftMenu}
        >
          <i className="fas fa-bars" onClick={toggleLeftMenu}></i>
        </a>

        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <a href="./">Ecommerce Admin</a>
              <div id="close-sidebar" onClick={toggleLeftMenu}>
                <i className="fas fa-times" onClick={toggleLeftMenu}></i>
              </div>
            </div>
            <div className="sidebar-header">
              <div className="user-pic">
                <img
                  className="img-responsive img-rounded"
                  src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                  alt="User picture"
                />
              </div>
              <div className="user-info">
                <span className="user-name">
                  {userInfo.firstName + ' ' + userInfo.lastName}
                </span>
                <span className="user-role">Administrator</span>
                <span className="user-status">
                  <i className="fa fa-circle"></i>
                  <span>Online</span>
                </span>
              </div>
            </div>

            <div className="sidebar-menu">
              <ul>
                <li className="">
                  <Link to={`${match.path}/dashboard`}>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="">
                  <Link to={`${match.path}/category`}>
                    <span>Category</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="sidebar-footer">
            <a href="./">
              <i className="fa fa-bell"></i>
              <span className="badge badge-pill badge-warning notification">
                3
              </span>
            </a>
            <a href="./">
              <i className="fa fa-envelope"></i>
              <span className="badge badge-pill badge-success notification">
                7
              </span>
            </a>
            <a href="./">
              <i className="fa fa-cog"></i>
              <span className="badge-sonar"></span>
            </a>
            <a href="./" onClick={handleLogout}>
              <i onClick={handleLogout} className="fa fa-power-off"></i>
            </a>
          </div>
        </nav>

        <main className="page-content">
          <Switch>
            <Route path={`${match.path}`}>
              <Dashboard />
            </Route>
            <Route path={`${match.path}/category`}>
              <Category />
            </Route>
            <Route path={`${match.path}/dashboard`}>
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </div>
    </>
  )
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login: login,
    },
    dispatch,
  )
}
export default withRouter(connect(null, matchDispatchToProps)(MainPage))
