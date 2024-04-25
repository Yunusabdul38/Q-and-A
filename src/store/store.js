import { combineReducers, configureStore,createSlice } from '@reduxjs/toolkit'

const initialUserState ={
    user:null,
    loading:true,
} 

const userSlice = createSlice({
    name:"user",
    initialState:initialUserState,
    reducers:{
        "signIn":(state,action)=>{
            state.user = action.payload
            state.loading = false
        },
        "logOut":(state)=>{
            state.user = null
        }
    },
})
const userReducer = userSlice.reducer
const rootReducer  = combineReducers({userReducer})
export const store = configureStore({reducer:rootReducer})

export const {logOut,signIn} = userSlice.actions