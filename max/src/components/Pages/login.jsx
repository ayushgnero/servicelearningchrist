import React,{Component} from 'react';
// import '../Bootstrap/bootstrap.min.css';
// import '../Bootstrap/login.css';
import {ReactSession }from 'react-client-session';
import {BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import "../Pagecss/login0.css";
import axios from "axios";
class login extends React.Component{
   state = {
      regno: "",
      password: "",
      error: "",
    };
    handleSubmit = (e) => {
      e.preventDefault();
      const user = { 
        regno:this.state.regno,
        password: this.state.password
      }
      // console.log(this.state.regno+"\t"+this.state.password);
      axios.post('http://localhost:4000/Login',user)
      .then((res) => {
        if (res.data.flag)
        {
          sessionStorage.setItem("flag", JSON.stringify(res.data.flag));
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          console.log(JSON.parse(sessionStorage.getItem("user")));

          if (res.data.user.role === "Admin")
          {
            this.props.history.push("/DashboardAdmin")
          }
          else if (res.data.user.role === "Teacher")
          {
            this.props.history.push("/DashboardTeacher")
          }
          else
          {
            this.props.history.push("/Dashboard")
          }
        }
        
        })
      
      this.setState({
        regno:"",
        password: ""
        })
    };
    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value,
      });
    };
    render(){
document.body.style.overflow = "hidden"
return(
    <>
      <div>
        <div class="flex-container">
          <div class="column"></div>
          <div class="column1"></div>
          <div class = "div-front">
            <div class="flex-container1">
              <div class="leftlogin"></div>
                <div class="logo"></div>
                <h1 class="schoolname">Adarsh Public School</h1>
                <div class="line-1"></div>
                <h1 class="cityname">Kurawar</h1>
                <h1 class="statename">Madhya Pardesh</h1>
              <div class="rightlogin"></div>
                <form onSubmit={this.handleSubmit} to="/Dashboard">
                  <p class="para">Please enter your Email and Password to login</p>
                  <input required onChange={this.handleChange} type="text" name="regno" placeholder="Registration Number" className="formlogin" id="regno" style={{ cursor: "text" }} />
                  <input required onChange={this.handleChange} type="password" name="password" placeholder="Password" className="formlogin1" id="password" style={{ cursor: "text" }} />
                  <button type="submit" class="login">Login</button>
                </form>
                <a class = 'fgtpass' href = "/forgotpassword"> Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}}

export default login ;
