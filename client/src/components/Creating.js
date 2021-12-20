import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { Formik,Field,Form } from 'formik';
import { useState } from 'react';
import './Creating.css'
import { useHistory } from 'react-router';
import  { CircularProgress } from "@material-ui/core";

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

const Creating = ()=>{

    const [isloading,setisLoading] = useState(false)
    const history = useHistory()
    

    

return(
       
        <div className="from">
    
        <h2>Sign Up</h2>
        <Formik
          initialValues={{
            email: '',
            password:""
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
              const email = values.email;
              const password = values.password
              setisLoading(true)
              const response =await fetch('http://localhost:5000/api/signup',{
                method:"POST",
                body:JSON.stringify({
                  email,
                  password
                }),
                headers:{"Content-Type":'application/json'}

            
              })
              setisLoading(false)
              const data = await response.json()
              if(data.status==="Ok"){
                history.push('/')
                console.log(data)
              }else{
                alert(data.error)
              }
           
          }}
        >
          {({ errors, touched }) => (
        <Form  >
       
        <Field  placeholder="Email"  name="email" className="inp" />   {errors.email && touched.email ? (
             <div style={{color:"#e87c03"}}>{errors.email}</div>
           ) : null}
        <Field placeholder="Password"  name="password" className="inp" />  {errors.password && touched.password ? (
             <div style={{color:"#e87c03"}}>{errors.password}</div>
           ) : null}
        {!isloading?<button type="submit" className="btn">Sign Up</button>: <CircularProgress style={{display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",margin:"1rem auto"}} />}
         

      
        <div style={{textAlign:"center",marginTop:"1.5rem"}}>
        <Link to="/"  className="anc">Login with existing account</Link>
        </div>
    </Form> )}
</Formik>
  
    </div>

) 

}
export default Creating;