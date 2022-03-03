import {
  createSlice,
  createAsncThunk,
  createAsyncThunk
} from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log(user)
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {}
})

export default authSlice.reducer
