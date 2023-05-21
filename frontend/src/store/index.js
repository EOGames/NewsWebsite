import {configureStore} from '@reduxjs/toolkit';
import logoutSlice from './Slices/logoutSlice';
import newsDataSlice from './Slices/newsDataSlice';
import homeSlice from './Slices/homeSlice';

const store = configureStore({
    reducer:{
        logout:logoutSlice.reducer,
        newsData:newsDataSlice.reducer,
        homePageData:homeSlice.reducer
    }
});
export default store;