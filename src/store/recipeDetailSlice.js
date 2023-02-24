import { createSlice } from '@reduxjs/toolkit'

const recipeDetailSlice = createSlice({
  name: 'recipeDetailSlice',
  initialState: {},
  reducers: {
    getRecipeDetail: (state, action) => {
      return { ...action.payload }
    },
    resetRecipeDetail: (state, action) => {
      return {}
    },
  },
})

export default recipeDetailSlice

export const { getRecipeDetail, resetRecipeDetail } = recipeDetailSlice.actions
