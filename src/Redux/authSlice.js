import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";

const initialState = {
    user: [],
    token: '',
    isLoading: false,
    isError: false
};

export const UserLogin = createAsyncThunk( 'user',async (config) => {
    return axios(config)
    .then((response)=> {
        console.log('response  >>>>>>>>>>>>>', response.data);
        if(response.data.success === false){
            Toast.show({
                type: 'error',
                text1: response.data.message
            });
        } return response.data
    })
    .catch(function (error) {
        showToast('error', error.data.message);
        console.log(error)
    })
})

const showToast = (type, msg) =>{
    Toast.show({
        type: type,
        text1: msg
    })
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SignIn: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.token = "", 
            state.user = [];
        },
        updateUser: (state,  action) => {
            state.user = action.payload
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(UserLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data;
            state.token = action.payload.token
        })
    }
});

export const {SignIn, setToken,logOut, updateUser} = authSlice.actions;
export default authSlice.reducer;