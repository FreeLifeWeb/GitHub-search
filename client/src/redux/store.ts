import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './slices/repoSlice';

export const store = configureStore({
    reducer: {
        repos: repoReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
