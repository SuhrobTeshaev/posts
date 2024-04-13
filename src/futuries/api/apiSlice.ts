import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  image: string;
  description: string;
  name: string;
  data:[]

  
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/',
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[],void>({
      query: () => "posts",
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "posts",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<void, { id: number; body: Partial<User> }>({
      query: ({ id, body }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = postApi;
