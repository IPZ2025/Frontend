import { configureStore } from "@reduxjs/toolkit";
import  userSlice, { AUTH_PERSISTENT_STATE }  from "./auth.slice";
import alertReducer from './message.slice';
import { saveState } from "./storage";


export const store = configureStore({
	reducer: {
		user: userSlice,
	    alert: alertReducer,

	}
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, AUTH_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch;