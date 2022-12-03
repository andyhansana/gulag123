import React from "react";
import "./App.css";
import Nav from './components/Navbar'
import Landing from './components/Landing'
import { AddRequestForm, RequestList } from './components/ServiceRequest'
import RequestChart from "./components/Chart";
import Map from "./components/Map";
import {
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Todos from "./components/Todos/Todos";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withTheme } from "./components/Theme/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


function App() {

  const [session, setSession] = useState(null);
  const [requests, setRequests] = useState([]);


    // TO DO - Create setup for managing sessions. Check out the supabase quickstart guides to get idea about this. 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])



  // TO DO - Setup listener for supabase realtime API for updates to the service requests 
  // For example , if any of the service request is completed then this should invoke this realtime API which inturn should update the list of requests

  const addRequest = async (element) => {
    console.log(element)
    const newRequests = [...requests, element];
    // TO DO 
    // Call the supabase API to add the new service request (initially the accept_reject should be 'false' to indicate the service request is yet to completed by an admin).
      // When you will insert the a service request record you will also have to provide the "user_id". This is a field which maps which user created the service request.
      // For getting this you can make use of supabase.auth.getSession(). The will return a json containing information about the authenticated user
    // If this API call succeeds add the element to the list of requests with setRequests  
    setRequests(newRequests);
  };

  const completeRequest = async (index, serviceId = 0) => {
    const newRequests = [...requests];
    // TO DO
    // Call the supabase API to update the service request as completed (i.e. the accept_reject flag database column will become 'true' now).
    // If this API call succeeds update the element to the list of requests with setRequests  
    newRequests[index].isCompleted = true;
    setRequests(newRequests);
  };

  const removeRequest = async (index, serviceId = 0) => {
    const newRequests = [...requests];
    // TO DO
    // Call the supabase API to remove / delete the service request .
    // If this API call succeeds remove the element from the list of requests with setRequests  
    newRequests.splice(index, 1);
    setRequests(newRequests);
  };

  return (
    <>
      <Nav session={session} setSession={setSession}/>
      <Routes>
        {/* Allow only authenticated user to proceed to RequestList, AddRequestForm, RequestChart else Navigate to landing component */}
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Map  />} />
      </Routes>
    </>
  );
}

export default App;