import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = profileSlice.actions;

export default profileSlice.reducer;

