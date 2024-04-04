import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface User {
  id:number 
image:string
description:string
name:string
err?: string;
}

export type UserState = {
  user: User[]
   isLoading: boolean
    error: string | null;
};

export const initialState: UserState = {
  user:[],
   isLoading: false,
    error: null
  
}

export const getUsers = createAsyncThunk('users/getUsers', async (_,thunkAPI) => {
 try {
       const res = await axios.get('http://localhost:3001/users')
  return res.data
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
 
})
export const createUsers = createAsyncThunk(
  'users/createUsers',
  async (userData:{}, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:3001/users', userData);
      return res.data;
    } catch (err) {
       console.error(err); 
      return thunkAPI.rejectWithValue(err); 
    }
  }
);


// export const updateUsers = createAsyncThunk('users/updateUsers', async (_, thunkAPI) => {
//  try {
//        const res = await axios.put('http://localhost:3001/users')
//   return res.data
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
 
// })
export const updateUsers = createAsyncThunk(
  'users/updateUsers',
  async (userData:User,{rejectWithValue}) => {
    try {
      const {name,description,image} = userData
      const response = await axios.put(`http://localhost:3001/users/${userData.id}`,{
        description,name,image
      });
      return response.data;
    } catch (error) {
      console.log('fr')
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);
export const deleteUsers = createAsyncThunk(
  'users/deleteUsers',
  async (id:number, thunkAPI) => {
    try {
       const res = await axios.delete(`http://localhost:3001/users/${id}`);
      return res.data;
    } catch (err) {
      console.error(err); 
      return thunkAPI.rejectWithValue(err); 
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   
    builder.addCase(getUsers.pending, (state) => {
     state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
     state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    })
     .addCase(deleteUsers.fulfilled, (state,action) => {
        state.isLoading = false;
  state.user = state.user.filter(user => user.id !== action.meta.arg) })

    .addCase(createUsers.fulfilled, (state, action) => {
 state.user = [...state.user, action.payload];
        state.isLoading = false;
})
 
    .addCase(updateUsers.fulfilled, (state, action) => {
     
      state.user = action.payload;
      state.error = null;
    })
    

  
  },
})

export default userSlice.reducer
