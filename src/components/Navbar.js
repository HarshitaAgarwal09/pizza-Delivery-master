import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

class Navbar extends React.Component {
  render(){
    return(
        <div>
        <header className="App-header">
          <nav className="navbar navbar-expand-md navbar-dark mx-5">
            <a className="navbar-brand" href="/menu"> Logo </a>
            
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> 
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarCollapse" >
              <ul className="navbar-nav mr-auto"> 
                <li className="nav-item ">   
                  <NavLink to="/menu" className="nav-link" exact>Menu</NavLink>
                </li>
                <li className="nav-item">   
                  <NavLink to="/feedback" className="nav-link">Write Feedback</NavLink>
                </li>
                <li className="nav-item">   
                  <NavLink to="/track" className="nav-link">Track Order</NavLink>
                </li>
                
                <li className="nav-item">   
                  <NavLink to="/cart" className="nav-link"><i className="fas fa-shopping-cart"></i> Cart</NavLink>
                </li>
              </ul>
             
              <div className="dropdown">
                
                <a className="dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" >
                <i className="fas fa-user-circle fa-2x"></i></a>
              
                <div style={{width:'100%'}} className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a href="/dashboard" className="dropdown-item">My Dashboard</a>
                  <a href="/changepassword" className="dropdown-item">Change Password</a>
                  <div className="dropdown-divider"></div>
                  <a href="/" className="dropdown-item" onClick={()=>this.props.dispatch({type:'LOGOUT'})}>Logout</a>
                </div> 

              </div>
            </div>
          </nav>
        </header>
        </div>
      )
  }
}



export default connect()(Navbar);