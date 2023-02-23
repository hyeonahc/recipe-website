import { createSlice } from '@reduxjs/toolkit'

const recipeItemsSlice = createSlice({
  name: 'recipeItemsSlice',
  initialState: [],
  reducers: {
    addRecipeItems: (state, action) => {
      return [...action.payload]
    },
  },
})

export default recipeItemsSlice

export const { addRecipeItems } = recipeItemsSlice.actions
