import { configureStore } from '@reduxjs/toolkit'
import { requestApi } from '../api/requestApi'
import recipeDetail from './recipeDetailSlice'
import recipeItems from './recipeItemsSlice'
import totalResults from './totalResultsSlice'

const store = configureStore({
  reducer: {
    [requestApi.reducerPath]: requestApi.reducer,
    recipeItems: recipeItems.reducer,
    totalResults: totalResults.reducer,
    recipeDetail: recipeDetail.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(requestApi.middleware),
})

export default store
