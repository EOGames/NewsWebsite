import {configureStore} from '@reduxjs/toolkit';
import logoutSlice from './Slices/logoutSlice';
import newsDataSlice from './Slices/newsDataSlice';

const store = configureStore({
    reducer:{
        logout:logoutSlice.reducer,
        newsData:newsDataSlice.reducer
    }
});
export default store;