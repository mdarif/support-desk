import { createSlice, createAsncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {}
})

export default authSlice.reducer
