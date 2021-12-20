import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import {useState} from 'react'


const Form = ()=>{
  const [postData,setPostData] = useState({creator:"",title:"",tags:"",message:"",selectedFile:""})
  const submitHandler = (event)=>{
    event.preventDefault()
    async function submitting(){
      const response = await fetch('http://localhost:5000/api/posts',{
        method:"POST",
        body:JSON.stringify(postData),
        headers:{"Content-Type":"application/json",   'Accept': 'application/json'}
      })
      const data = await  response.json()
      console.log(data)


    }try{
      submitting()
    }catch(err){
      console.log(err)
    }

  }
    const classes = useStyles()
    return(
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler} >
          <Typography variant="h6">Create a post</Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth  value={postData.creator}  onChange={(e) => setPostData({ ...postData, creator: e.target.value })}  />
          <TextField name="title" variant="outlined" label="Title" fullWidth  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}  />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4}  value = {postData.message}   onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value = {postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}  />
          <div className={classes.fileInput}><FileBase type="file" multiple = {false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small"  fullWidth>Clear</Button>
        </form>
      </Paper>
    )
}

export default Form