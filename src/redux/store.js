import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/posts';
import userReducer from './slices/User';
import programsReducer from './slices/Programs';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    programs: programsReducer,
  },
});

export default store;
