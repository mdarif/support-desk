import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get ticket notes
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
export const getNotes = createAsyncThunk(
  'tickets/getAll',
  async (ticketId, thunkAPI) => {
    /**
     * thunkAPI: an object containing all of the parameters
     * that are normally passed to a Redux thunk function,
     * as well as additional options: https://redux-toolkit.js.org/api/createAsyncThunk
     */
    try {
      // Token is required for authentication
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
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

// Creata ticket note
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
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    /**
     * thunkAPI: an object containing all of the parameters
     * that are normally passed to a Redux thunk function,
     * as well as additional options: https://redux-toolkit.js.org/api/createAsyncThunk
     */
    try {
      // Token is required for authentication
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
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

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getNotes.pending, state => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.pending, state => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
