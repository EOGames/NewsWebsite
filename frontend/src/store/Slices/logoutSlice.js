import {createSlice} from '@reduxjs/toolkit';

const logoutSlice = createSlice({
name:'user',
initialState:[] ,
reducers:{
    logOut(state,actions)
    {
        localStorage.removeItem('localSession');
        localStorage.removeItem('access');
         window.location.href ='/login';
    },
}
});

export const {logOut} = logoutSlice.actions;
export default logoutSlice;