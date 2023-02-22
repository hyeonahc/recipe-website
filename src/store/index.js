import { configureStore } from '@reduxjs/toolkit'
import { requestApi } from '../api/requestApi'

const store = configureStore({
  reducer: {
    [requestApi.reducerPath]: requestApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(requestApi.middleware),
})

export default store
