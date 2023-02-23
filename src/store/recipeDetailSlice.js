import { createSlice } from '@reduxjs/toolkit'

const recipeDetailSlice = createSlice({
  name: 'recipeDetailSlice',
  initialState: {},
  reducers: {
    getRecipeDetail: (state, action) => {
      return { ...action.payload }
    },
  },
})

export default recipeDetailSlice

export const { getRecipeDetail } = recipeDetailSlice.actions
