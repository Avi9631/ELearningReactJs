import React, { Component } from 'react'
import './App.css';
import { Link } from 'react-router-dom'
import Login from './LoginModal'

class Header extends Component {
  render() {

    var disableVar = ((localStorage.getItem("key") == undefined || localStorage.getItem("key") == null));

    return (
      <div>
        <header className="header">
          <div className="continer-fluid ">
            <div className="header-top">
              <div className="container">
                <div className="row col-det">
                  <div className="col-lg-6 d-none d-lg-block">
                    <ul className="ulleft">
                      {(localStorage.getItem("key") == undefined || localStorage.getItem("key") == null) ?
                        <li data-toggle="modal"
                          data-target="#admin-ticket-modal">
                          <i className="far fa-envelope" />
                          <span>|</span>
                        </li> :
                        null
                      }

                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <ul className="ulright">
                      {(localStorage.getItem("key") == undefined || localStorage.getItem("key") == null) ?
                        <li data-toggle="modal"
                          data-target="#login-ticket-modal">
                          <i className="fas fa-user" />
                          Login
                        </li> :
                        <li onClick={() => {
                          localStorage.removeItem("key");
                          localStorage.removeItem("user_id");
                          localStorage.removeItem("user_role");
                          window.location = '/'
                        }}>
                          <i className="fas fa-user" />
                          Log Out
                        </li>
                      }

                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="menu-jk" className="header-bottom">
              <div className="container">
                <div className="row nav-row">
                  <div className="col-md-3 logo">
                    <img src="assets/images/logo.jpg" alt="" />
                  </div>
                  <div className="col-md-9 nav-col">
                    <nav className="navbar navbar-expand-lg navbar-light">
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <a className="nav-link">
                              <Link to="/">Home</Link>
                            </a>
                          </li>

                          {localStorage.getItem("user_role") === "[ROLE_ADMIN]" ?
                            <li className="nav-item">
                              <a className="nav-link">
                                {disableVar ? <Link to="/Admin" onClick={() => alert("You are not Logged In")}>Admin</Link> : <Link to="/Admin">Admin</Link>}
                              </a>
                            </li> : null}

                          {localStorage.getItem("user_role") === "[ROLE_PROF]" ?
                            <li className="nav-item">
                              <a className="nav-link">
                                {disableVar ? <Link to="/Admin" onClick={() => alert("You are not Logged In")}>Prof Control</Link> : <Link to="/profcontrol">Prof Control</Link>}
                              </a>
                            </li> : null}

                          <li className="nav-item">
                            <a className="nav-link">
                              {disableVar ? <Link to="/" onClick={() => alert("You are not Logged In")}>Courses</Link> : <Link to="/course">Courses</Link>}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">
                              {disableVar ? <Link to="/" onClick={() => alert("You are not Logged In")}>Professors</Link> : <Link to="/prof">Professors</Link>}
                            </a>
                          </li>
                          <li className="nav-item" id="my_profile">
                            <a className="nav-link" >
                              {disableVar ? <Link to="/" onClick={() => alert("You are not Logged In")}>My Profile</Link> : <Link to="/profile">My Profile</Link>}
                            </a>
                          </li>


                          <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Login />
      </div>
    );
  }
}

export default Header
