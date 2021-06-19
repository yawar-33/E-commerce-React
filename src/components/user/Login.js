import React, { useState } from 'react'
import POST from '../../utilities/postApiCall'
import isNull from '../../utilities/nullChecking'
import login from '../../actions/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
function Login(props) {
 

  let initLoginModel = {
    email: '',
    password: '',
  }

  let initValidateModel = {
    valEmail: '',
    valPassword: '',
    isvalid: false,
  }

  const [loginModel, setloginModel] = useState(initLoginModel)
  const [validateModel, setvalidateModel] = useState(initValidateModel)
  const handleChange = (e) => {
    const { name, value } = e.target
    let model = { ...loginModel }
    model[name] = name === 'email' ? value.toUpperCase() : value
    setloginModel(model)
  }

  const handleKeys = (e) => {
    if (e.code === 'Enter') {
      loginUser()
    }
  }
  const validateLogin = () => {
    let model = { ...loginModel }
    let validationModel = { ...validateModel }
    if (isNull(model.email)) {
      validationModel.valEmail = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Please Enter Email
        </div>
      )
      validationModel.valPassword = ''
      validationModel.isvalid = true
      setvalidateModel(validationModel)
      return true
    } else if (isNull(model.password)) {
      validationModel.valPassword = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Please Enter Password
        </div>
      )
      validationModel.valEmail = ''
      validationModel.isvalid = true
      setvalidateModel(validationModel)
      return true
    } else {
      validationModel.valEmail = ''
      validateModel.valPassword = ''
      validateModel.isvalid = false
      setvalidateModel(validationModel)
      return false
    }
  }
  const loginUser = () => {
    let validationResponse = validateLogin()

    if (validationResponse) {
      return
    } else {
      POST('user/login', loginModel)
        .then((res) => {
          props.login(res.data.token)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div id="login">
      <h3 className="text-center text-white pt-5">Login form</h3>
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" action="" method="post">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="email" className="text-info">
                    Username:
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginModel.email}
                    className="form-control"
                    onChange={handleChange}
                  />
                  {validateModel.valEmail}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    value={loginModel.password}
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    onKeyPress={handleKeys}
                  />
                  {validateModel.valPassword}
                </div>
                <br />
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <input
                        type="button"
                        className="btn btn-info btn-md"
                        onClick={loginUser}
                        value="Login"
                      />
                    </div>
                    <div className="col">
                      <a href="./" className="text-info">
                        Register here
                      </a>
                    </div>
                  </div>

                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default connect(null, matchDispatchToProps)(Login)
