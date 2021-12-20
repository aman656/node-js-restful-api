import { Link } from "react-router-dom"
import {Formik,Field,Form} from "formik"
import './Creating.css'
import * as yup from "yup"
import {useState} from 'react'
import React from "react";
import { useHistory } from "react-router";
import {useDispatch} from "react-redux"
import { userActions } from "../store";
import CircularProgess from "@material-ui/core";


  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .max(10, 'No more then 10')
      .required('Password is required')
  });

const Logging = ()=>{
    const history = useHistory()
    const dispatch = useDispatch()
    

return(
       
        <div className="from">
    
        <h2>Log     In</h2>
        <Formik
          initialValues={{
            email: '',
            password:""
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
              const email = values.email
              const password = values.password
              const response =await fetch('http://localhost:5000/api/login',{
                method:"POST",
                body:JSON.stringify({
                  email,
                  password
                }),
                headers:{"Content-Type":"application/json"}
              },{withCredentials:true})
              const data = await response.json()
              if(data.status==="Ok"){
                localStorage.setItem("token",data.user)
                dispatch(userActions.emailpatch(email))
                history.push("/")
              }
              console.log(data)
           
            
          }}
        >
          {({ errors, touched }) => (
        <Form  >
       
        <Field  placeholder="Email"  name="email" className="inp" />   {errors.email && touched.email ? (
             <div style={{color:"#e87c03"}}>{errors.email}</div>
           ) : null}
        <Field placeholder="Password"  name="password"  className="inp" />  {errors.password && touched.password ? (
             <div style={{color:"#e87c03"}}>{errors.password}</div>
           ) : null}
        <button type="submit" className="btn">
            Log in

        </button>
        <div style={{textAlign:"center",marginTop:"1.5rem"}}>
        <Link to="/signup"  className="anc">Create a new account</Link>
        </div>
    </Form> )}
</Formik>
  
    </div>

) 

}
export default Logging