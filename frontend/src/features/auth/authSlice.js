import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get logged in user info from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

// Register new user
/**
 * createAsyncThunk: A function that accepts a Redux action type string and
 * a callback function that should return a promise.
 * It generates promise lifecycle action types based
 * on the action type prefix that you pass in,
 * and returns a thunk action creator that will
 * run the promise callback and dispatch the
 * lifecycle actions based on the returned promise.
 * This abstracts the standard recommended approach for handling async request lifecycles.
 */
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

/**
 * A function that accepts an initial state, an object of reducer functions,
 * and a "slice name", and automatically generates action creators and
 * action types that correspond to the reducers and state.
 */
export const authSlice = createSlice({
  // A name, used in action types
  name: 'auth',
  // The initial state for the reducer
  initialState,
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    reset: state => {
      state.user = null
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    }
  },
  /**
   * extraReducers: One of the key concepts of Redux is that each slice reducer "owns"
   * its slice of state, and that many slice reducers can independently
   * respond to the same action type. extraReducers allows createSlice
   * to respond to other action types besides the types it has generated.
   * */
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
