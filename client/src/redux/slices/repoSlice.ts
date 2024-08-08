import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repo } from '../../types';

// Интерфейсы для типизации данных

interface RepoState {
    repos: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    totalCount: number;
    page: number;
}

// Начальное состояние
const initialState: RepoState = {
    repos: [],
    status: 'idle',
    error: null,
    totalCount: 0,
    page: 1,
};

const URL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_TOKEN;

// Асинхронный thunk для получения репозиториев с GitHub
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async (searchTerm: string, { getState }) => {
        const state = getState() as { repos: RepoState };
        const response = await axios.get(`${URL}`, {
            params: {
                q: searchTerm,
                sort: 'stars',
                order: 'desc',
                per_page: 10,
                page: state.repos.page,
            },
            headers: {
                Authorization: `token ${TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        console.log('response.data.store: ', response.data);

        return response.data;
    }
);

// Slice для управления состоянием репозиториев
const repoSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        // Редюсер для установки текущей страницы
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Обработка состояний асинхронного thunk fetchRepos
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repos = action.payload.items;
                state.totalCount = action.payload.total_count;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.status = 'failed';
                state.error =
                    action.error.message || 'Failed to fetch repositories';
            });
    },
});

// Экспорт действий и редюсера
export const { setPage } = repoSlice.actions;
export default repoSlice.reducer;
