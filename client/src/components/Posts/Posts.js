import useStyles from './styles'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { fetchingPosts } from '../../store'
import Post from "./Post/Post"
import {CircularProgress,Grid} from  "@material-ui/core"

const Posts = ({currentId,setcurrentId})=>{
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.postSlice.list)
    console.log(posts)
    const classes = useStyles()
  
    useEffect(()=>{
        dispatch(fetchingPosts())

    },[dispatch])
    return(
        !posts?<CircularProgress/>:(<Grid className={classes.container} container alignItems="stretch" spacing = {3}>
            {posts.map((post)=>(
                <Grid key = {post._id} item xs={12} sm={6}>
                    <Post post={post} setcurrentId = {setcurrentId} />

                </Grid>
            ))}

        </Grid>
    ))
}

export default Posts