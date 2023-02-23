import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: builder => ({
    searchRecipe: builder.mutation({
      query: ({ keyword, offset }) => ({
        url: `/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${keyword}&offset=${offset}&number=5`,
        method: 'GET',
      }),
    }),
    getRecipeInformation: builder.mutation({
      query: id => ({
        url: `/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useSearchRecipeMutation, useGetRecipeInformationMutation } =
  requestApi
