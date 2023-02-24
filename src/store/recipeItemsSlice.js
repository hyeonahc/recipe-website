import { createSlice } from '@reduxjs/toolkit'

const recipeItemsSlice = createSlice({
  name: 'recipeItemsSlice',
  initialState: [],
  reducers: {
    addRecipeItems: (state, action) => {
      return [...action.payload]
    },
    resetRecipeItems: () => {
      return []
    },
  },
})

export default recipeItemsSlice

export const { addRecipeItems, resetRecipeItems } = recipeItemsSlice.actions
