import { createSlice } from "@reduxjs/toolkit";

const newsDataSlice = createSlice({
    name:'newsList',
    initialState:[],
    reducers:{
        addNewsdata(state,actions)
        {
            // console.log('payload',actions.payload);
            state.push (actions.payload);   
                     
        },

        getNewsData(state,actions)
        {
            return state;
        }
    }
});
export default newsDataSlice;
export const {addNewsdata,getNewsData} = newsDataSlice.actions;