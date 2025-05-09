import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { PREFIX } from "../api/API";
import axios from "axios";

export const AUTH_PERSISTENT_STATE = 'user';

export interface UserState {
    jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserState>(AUTH_PERSISTENT_STATE)?.jwt ?? null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<{ data: string }>) => {
                state.jwt = action.payload.data;
            }
        );
    }
})

export const login = createAsyncThunk('/auth/login',
    async (params:{email: string, password: string}) => {
        const response = await axios.post(`${PREFIX}/api/v1/auth/login`, {
            email: params.email,
            password: params.password
        });
        console.log(response);
        return response;
    }
)

export const registration = createAsyncThunk('/auth/register',
    async (params:{name: string, surname:string, email:string, phone:string, password: string}) => {
        const response = await axios.post(`${PREFIX}/api/v1/user`, {
            name: params.name,
            surname: params.surname,
            email: params.email,
            phone: params.phone,
            password: params.password
        });
        return response;
    }
)

export default userSlice.reducer;
export const userActions = userSlice.actions;