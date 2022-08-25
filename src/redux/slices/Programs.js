import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async (filter) => {
  const { data } = await axios.get(`/programs/${filter}`);
  return data;
});

const initialState = {
  programs: null,
  status: 'loading',
  filter: '',
};

const ProgramsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    setIsFilter(state, action) {
      state.filter = action.payload;
    },
    setPrograms(state, action) {
      state.programs = action.payload;
    },
  },
  extraReducers: {
    [fetchPrograms.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPrograms.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.programs = action.payload;
    },
    [fetchPrograms.rejected]: (state) => {
      state.status = 'error';
      state.programs = [];
    },
  },
});

export const { setIsFilter, setPrograms } = ProgramsSlice.actions;

export default ProgramsSlice.reducer;
