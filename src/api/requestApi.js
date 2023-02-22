import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: builder => ({
    searchRecipe: builder.mutation({
      query: keyword => ({
        url: `/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${keyword}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useSearchRecipeMutation } = requestApi
