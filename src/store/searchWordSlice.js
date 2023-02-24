import { createSlice } from '@reduxjs/toolkit'

const searchWordSlice = createSlice({
  name: 'searchWordSlice',
  initialState: {
    searchWord: '',
  },
  reducers: {
    addSearchWord: (state, action) => {
      state.searchWord = action.payload
    },
    resetSearchWord: state => {
      state.searchWord = ''
    },
  },
})

export default searchWordSlice

export const { addSearchWord, resetSearchWord } = searchWordSlice.actions
