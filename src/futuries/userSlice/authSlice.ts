import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  name: string;
  id: number;
 email:string
 password : number | string
 access_token: string
 data:[]
}





export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
   
  endpoints: (builder) => ({
    getUser: builder.query<User[],void>({
  query: () => "users",
  
}),
    createUser: builder.mutation<User[], Partial<User>>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body:body,
      }),
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body:body,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          const token = data.access_token;
          localStorage.setItem('token', token);
         
        } catch (error) {
          console.error('Error during login:', error);
        }
      },
    }),
    updateUser: builder.mutation<User, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});


export const { useCreateUserMutation, useLoginUserMutation, useUpdateUserMutation,useGetUserQuery } = userApi;

