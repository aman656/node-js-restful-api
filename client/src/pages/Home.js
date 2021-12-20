import {Container,AppBar,Typography,Grid,Grow} from "@material-ui/core"
import useStyles from './styles'
import Form from './Form/Form'
import { useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import { fetchingPosts } from "../store"
import Posts from "../components/Posts/Posts"


const Home = ()=>{
  const dispatch =  useDispatch()
  const allposts = useSelector((state)=>state.postSlice.reducer)
  useEffect(()=>{
    dispatch(fetchingPosts())
    // async function gettingPosts(){
    //   const response = await fetch("http://localhost:5000/api/posts",{
    //     method:"GET",
    //     headers:{'x-access-token':localStorage.getItem("token")}
    //   })
    //   const data = await response.json()
    //   console.log(data)

    // }try{
    //   gettingPosts()

    // }catch(err){
    //   console.log(err)
    // }
  })
    const classes = useStyles()
    return (<Container maxWidth="lg">
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">POSTS</Typography>
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts/> 
          </Grid>
          <Grid item xs={12} sm={4}>
             <Form  /> 
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>
)
}
export default Home