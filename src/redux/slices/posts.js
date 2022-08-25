import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

function compareViewsCount(a, b) {
  if (a.viewsCount < b.viewsCount) {
    return 1;
  }
  if (a.viewsCount > b.viewsCount) {
    return -1;
  } else {
    return 0;
  }
}

function compareCreatedAt(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
}

export const fetchPosts = createAsyncThunk('posts/fetchPost', async ({ tags, sortBy }) => {
  const { data } = await axios.get(`/posts/${tags}`);

  return data.sort(sortBy === 0 ? compareCreatedAt : compareViewsCount);
});

export const fetchLastTags = createAsyncThunk('tags/fetchLastTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  axios.delete(`/posts/${id}`);
});

const initialState = {
  post: {
    items: [],
    status: '',
  },
  tags: {
    items: [],
    status: '',
  },
  activeTag: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setActiveTag(state, action) {
      state.activeTag = action.payload;
    },
    setPosts(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.post.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.post.status = 'loaded';
      state.post.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.post.status = 'error';
      state.post.items = [];
    },
    [fetchLastTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchLastTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    },
    [fetchLastTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.post.items = state.post.items.filter((item) => item._id !== action.meta.arg);
    },
  },
});

export const { setActiveTag, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
