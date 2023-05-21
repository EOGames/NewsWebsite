import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name:'home',
    initialState:[],
    reducers:{
        addHomePageData(state,actions)
        {
            // state =[];.
            console.log('called ',actions.payload);
            actions.payload.map((data)=>
            {
                // console.log('data ',data);
                state.push(data);
            });
        },

        resetStateData(state,actions)
        {
            return [];
        }

    }
});
export default homeSlice;
export const {addHomePageData,resetStateData} = homeSlice.actions;