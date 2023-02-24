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
    resetTotalResults: state => {
      state.totalResults = 0
    },
  },
})

export default totalResultsSlice

export const { getTotalResults, resetTotalResults } = totalResultsSlice.actions
