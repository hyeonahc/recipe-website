import { createSlice } from '@reduxjs/toolkit'

const totalResultsSlice = createSlice({
  name: 'totalResultsSlice',
  initialState: {
    totalResults: 0,
  },
  reducers: {
    getTotalResults: (state, action) => {
      state.totalResults = action.payload
    },
  },
})

export default totalResultsSlice

export const { getTotalResults } = totalResultsSlice.actions
