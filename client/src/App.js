import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Switch,Route, Redirect} from 'react-router';
import './App.css';
import {useSelector,useDispatch} from "react-redux"
import React from 'react';
// import { useEffect } from 'react';
// import { userActions } from './store';



function App() {
  const storeEmail = useSelector((state)=>state.userSlice.email)
  // const dispatch = useDispatch()
  console.log(storeEmail)
  // useEffect(()=>{
  //   axios.get("http://localhost:5000/api/profile", {
  //     withCredentials: true
  //   })
  //     .then((res) => {
  //       console.log("res: ", res.data);

  //       if (res.data.email) {

  //         dispatch(userActions.emailpatch(res.data.email))
  //       } else {
  //         dispatch({ type: "USER_LOGOUT" })
  //       }
  //     }).catch((e) => {
  //       dispatch({ type: "USER_LOGOUT" })
  //     })

   
    
    

  // },[dispatch])
  return (
    <React.Fragment>

      { storeEmail !== "" ?

    <Switch>
  <Route path="/" exact>
    <Home/>
    </Route>
    <Redirect   to="/" />
    </Switch>:
    <Switch>
    
      <Route path="/" exact>
        <Login/>

      </Route>
      <Route path="/signup">
        <Signup/>

      </Route>
  

    </Switch> 
    }
    </React.Fragment>
  );
}

export default App;
