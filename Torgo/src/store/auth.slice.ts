import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { PREFIX } from "../api/API";
import axios, { AxiosError } from "axios";

export const AUTH_PERSISTENT_STATE = 'user';

export interface UserState {
    jwt: string | null;
    registrationError?: string;
    registrationSuccess: boolean;
}

const initialState: UserState = {
    jwt: loadState<UserState>(AUTH_PERSISTENT_STATE)?.jwt ?? null,
    registrationSuccess: false
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
        },
        resetRegistrationStatus: (state) => {
            state.registrationSuccess = false;
            state.registrationError = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state) => {
                state.registrationError = undefined;
            })
            .addCase(registration.rejected, (state, action) => {
                state.registrationError = action.error.message || 'Помилка реєстрації';
            });
    }
});

export const registration = createAsyncThunk('/auth/register',
    async (params: {name: string; surname: string; email: string; phone: string; password: string;
    }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${PREFIX}/api/v1/user`, params);
        return response.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 400) {
            return rejectWithValue("Даний Email вже використовується");
          }
          if (e.response) {
            return rejectWithValue(`Помилка сервера: ${e.response.status}`);
          }
          return rejectWithValue('Помилка підключення до сервера');
        }
        return rejectWithValue('Невідома помилка під час реєстрації');
      }
    }
  );
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

export default userSlice.reducer;
export const userActions = userSlice.actions;