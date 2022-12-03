import React from 'react'
import { NavLink } from 'react-router-dom'
import { supabase } from "../supabaseClient";
import { useState, useEffect } from 'react'



function Nav({session, setSession}) {
    const loginSubmit = async ()=>{
        // Todo - Add logic to login via Github Oauth
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: 'github',
            })
            setSession("Setting Something as session")

    }

    const logoutSubmit = async ()=>{
        // Todo - Add logic to logout
       const { error } = await supabase.auth.signOut()

       setSession(null);
    }

    if (session != null){
        return ( <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li>
        {/* <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/add">Add request</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/list">List requests</NavLink></li>
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/chart">Visualize requests</NavLink></li>  */}
        <li className="nav-item"><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/map">Map </NavLink></li>   
        <li className="nav-item ms-auto"><button className="btn btn-primary m-1" id='logoutSubmit' onClick={()=>logoutSubmit()}>Logout</button></li>       
    </ul>)
    }
    else {
    return ( 
    <ul className="nav nav-pills navbar-expand navbar-light bg-light">
        <li className="nav-item "><NavLink className={({ isActive }) => "nav-link " + (isActive ? " active" : "")}
            to="/" end>Home</NavLink></li> 
            <div className="ms-auto" style={{display:"flex"}}>
               <li className="nav-item ms-auto"><button className="btn btn-primary m-1" id='loginSubmit' onClick={()=>loginSubmit()}>Login</button></li>
            </div>              
    </ul>)
    }
}

export default Nav;