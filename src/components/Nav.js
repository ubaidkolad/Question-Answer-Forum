import React from 'react'
import { Link , Redirect, withRouter} from 'react-router-dom'
import firebase from '../firebase'

const Nav = ({history}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" className="navbar-brand">
          Islam786
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collaspse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-2">
            <li className="nav-item active">
              <Link to="/haj" className="nav-link">
                Haj
              </Link>
            </li>
            <li className="nav-item active">
              <button onClick={ () => {
                firebase.auth().signOut()
                history.push('/')
              }} className="btn btn-danger nav-link">Sign out</button>
            </li>
            <li className="nav-item active">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Nav)
