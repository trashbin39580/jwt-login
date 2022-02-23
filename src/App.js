import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/profile'
import Signup from './components/signup'
import Login from './components/login'
import { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const token = localStorage.getItem('token');
  const {decodedToken, isExpired} = useJwt(String(token));
  
  useEffect(() => {
    if(decodedToken){
      const {_id} = decodedToken;
      const fetchUser = async () => {
        const URL = `https://aymane-jwt-auth.herokuapp.com/api/users/${_id}`;
        const res = await axios.get(URL);
        setUser(res.data.user);
      }

      //Checking if the token still holds
      if(isExpired){
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
      else {
        setIsAuthenticated(true);
        fetchUser();
      }
    }
  }, [decodedToken, isExpired])

  return (
    <Routes>
      <Route path='/' exact element={ isAuthenticated ? <Main user = {user}/> : <Login /> } />
      <Route path='/signup' exact element={ <Signup /> }/>
      <Route path='/login' exact element={ isAuthenticated ? <Main user = {user}/> : <Login /> }/>
      {/* <Route path='/' exact element={}/> */}
    </Routes>
  )
}
export default App;
