import { createSlice } from '@reduxjs/toolkit'

const recipeDetailSlice = createSlice({
  name: 'recipeDetailSlice',
  initialState: {
    title: '',
    image: '',
    dairyFree: null,
    diets: '',
    ingredients: [],
    instructions: [],
  },
  reducers: {
    getRecipeDetail: (state, action) => {
      return { ...action.payload }
    },
  },
})

export default recipeDetailSlice

export const { getRecipeDetail } = recipeDetailSlice.actions
