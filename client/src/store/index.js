import {createSlice,configureStore} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{email:""},
    reducers:{
        emailpatch(state,action){
            state.email=action.payload
        }

    }
})

const postSlice = createSlice({
    name:"posts",
    initialState:{list:[]},
    reducers:{
        listingposts(state,action){
            state.list = action.payload
        }
       
        
    }
})

export const fetchingPosts = ()=>{
    return async(dispatch)=>{
            const response = await fetch('http://localhost:5000/api/posts',{
                method:"GET"
            })
            const data  = await response.json()
            dispatch(postActions.listingposts(data))


    }
}



const store = configureStore({
    reducer:{userSlice:userSlice.reducer,postSlice:postSlice.reducer}

})
export const userActions = userSlice.actions
export const postActions = postSlice.actions

export default store