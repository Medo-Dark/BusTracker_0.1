import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userName:"",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    gotUser:false,
    errorMessage: "",
    userId:null,
    targetedUser:null
  }


  
  
  
  export const signupUser = createAsyncThunk(
    'user/signupUser',
    async ({ userName,email, password }, thunkAPI) => {
      try {
        console.log("sign up",email,password)
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXjLG9cbFEGaVf-wrgxCbenpKIFsHk0EI',
          {
            method: 'POST', 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              returnSecureToken:true
            }),
          }
        );
        let data = await response.json();
        console.log('data local id ', data.localId);
        

        if (response.status === 200) {
          
          return { ...data,name:userName };
          
        } else {
          
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
    );
    
    export const CreateUser = createAsyncThunk(
      'user/createUser',
      async({userName , email , userId }, thunkAPI )=>{
        console.log('userId createUser',userId)
        try {
          const response = await fetch(
            'https://strategic-kite-348606-default-rtdb.firebaseio.com/users/'+userId+'.json',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                email,
                userName,
                returnSecureToken:true,
                role:'User',
                location:{"None":null} 
              }),
            }
          );
          console.log('its in pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')
          let data = await response.json();
         // console.log('create user data', data);
          
          if (response.status === 200) {
            return data;
          } else {
            return thunkAPI.rejectWithValue(data);
          }
  
        } catch (e) {
          console.log('Error', e.response.data);
          thunkAPI.rejectWithValue(e.response.data);
        }
      }
    )
 
    const storeData = async (userId) => {
      console.log('StoreData',userId);
      try {
        const jsonValue = JSON.stringify(
          {
            userId:userId,
          }
        )
        await AsyncStorage.setItem('UserData', jsonValue)
      } catch (e) {
       Alert.alert('Coudnt Store UserData');
      }
    }


  
  export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXjLG9cbFEGaVf-wrgxCbenpKIFsHk0EI',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              returnSecureToken:true
            }),
          }
        );
        let data = await response.json();
        console.log(' Data login', data);
        
        if (response.status === 200) {
         // const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000)
          storeData(data.localId);
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }

      } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );




  export const fetchUserByuserId = createAsyncThunk(
    'user/fetchUserByuserId',
    async (userId , thunkAPI) => {
      try {
        console.log("Fetch Func => userId: ", userId)
        const response = await fetch(
          `https://strategic-kite-348606-default-rtdb.firebaseio.com/users/${userId}.json`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        let data = await response.json();

        console.log('data GET USER', data);
        if (response.status === 200) {
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }

      } catch (e) {
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    backToOldDays:()=>{
      
      return initialState;
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
       return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
        console.log('SiGN IN DoNE');
        console.log(payload.localId)
        state.isFetching = false;
        state.isSuccess = true;
        state.userId = payload.localId;
      },
      [signupUser.pending]: (state) => {
        state.isFetching = true;
      },
      [signupUser.rejected]: (state, { payload }) => {
        console.log('REJECTED', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.error.message;
      },
      [loginUser.fulfilled]: (state, { payload }) => {
        state.userId = payload.localId;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      },
      [loginUser.rejected]: (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.error.message;
      },
      [loginUser.pending]: (state) => {
        state.isFetching = true;
      },
      [fetchUserByuserId.pending]: (state) => {
        state.isFetching = true;
        state.gotUser = false;
      },
      [fetchUserByuserId.fulfilled]: (state, { payload }) => {
       try {
         const uid = Object.keys(payload);
         console.log('----------------------------------------------',payload[uid]);
         state.targetedUser={...payload[uid],uid:uid[0]};
      } catch (error) {
        Alert.alert('there is no data about this user')
      }
        state.userId = null;
        state.gotUser=true;
        state.isFetching = false;
      },
      [fetchUserByuserId.rejected]: (state , {payload} ) => {
        console.log('fetchUserBytoken ReJected',payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage='coudnt get user data'
      },
      [CreateUser.pending]: (state) => {
        state.isFetching = true;
      },
      [CreateUser.fulfilled]: (state, { payload }) => {
        console.log("Created user",payload);
        state.isFetching = false;
        state.userId = null;
      },
      [CreateUser.rejected]: (state) => {
        console.log('REJECTED CREATE USER');
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.error.message;
      }
  },
})

export const { clearState , backToOldDays } = userSlice.actions;
export const userSelector = state => state.user;