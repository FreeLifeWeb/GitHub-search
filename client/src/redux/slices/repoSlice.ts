import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repo } from '../../types';
import { RootState } from '../store';

/**
 * Интерфейс, описывающий состояние репозиториев в Redux.
 * Содержит данные, связанные с репозиториями, статус загрузки,
 * возможные ошибки, параметры пагинации, поиска и сортировки.
 */
interface RepoState {
    repos: Repo[]; // Массив репозиториев, загруженных из API.
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Статус загрузки данных.
    error: string | null; // Возможное сообщение об ошибке.
    totalCount: number; // Общее количество репозиториев, доступных для поиска.
    page: number; // Текущая страница пагинации.
    perPage: number; // Количество репозиториев на одной странице.
    searchTerm: string; // Текущий поисковый запрос.
    order: 'asc' | 'desc'; // Порядок сортировки (по возрастанию или убыванию).
    sortBy: string; // Поле, по которому выполняется сортировка.
}

/**
 * Начальное состояние, соответствующее интерфейсу RepoState.
 * Задает начальные значения всех параметров.
 */
const initialState: RepoState = {
    repos: [],
    status: 'idle',
    error: null,
    totalCount: 0,
    page: 1,
    perPage: 10,
    searchTerm: '',
    order: 'asc',
    sortBy: 'stars',
};

// URL и токен для доступа к GitHub API, получаемые из переменных окружения.
// токен будет действителен 30 дней начиная с 10 августа 2024
const URL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_TOKEN;

/**
 * Асинхронное действие для получения списка репозиториев с GitHub API.
 * Использует параметры из состояния для формирования запроса.
 * Возвращает массив репозиториев и общее количество доступных репозиториев.
 */
export const fetchRepos = createAsyncThunk<
    { items: Repo[]; total_count: number }, // Тип возвращаемого значения.
    void, // Тип параметра действия (в данном случае ничего не передается).
    { state: RootState } // Тип объекта состояния, доступного в thunk.
>('repos/fetchRepos', async (_, { getState }) => {
    const state = getState();
    const { searchTerm, page, perPage, order, sortBy } = state.repos;

    const response = await axios.get(`${URL}`, {
        params: {
            q: searchTerm,
            sort: sortBy,
            order: order,
            per_page: perPage,
            page: page,
        },
        headers: {
            Authorization: `token ${TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });

    return response.data;
});

/**
 * Redux slice для управления состоянием репозиториев.
 * Включает синхронные действия для управления состоянием (reducers)
 * и обработку асинхронных действий (extraReducers).
 */
const repoSlice = createSlice({
    name: 'repos', // Имя slice.
    initialState, // Начальное состояние.
    reducers: {
        /**
         * Действие для установки текущей страницы пагинации.
         * @param state - Текущее состояние.
         * @param action - Объект действия, содержащий номер страницы.
         */
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        /**
         * Действие для установки количества репозиториев на странице.
         * @param state - Текущее состояние.
         * @param action - Объект действия, содержащий количество элементов на странице.
         */
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
        },
        /**
         * Действие для установки поискового запроса.
         * @param state - Текущее состояние.
         * @param action - Объект действия, содержащий строку поиска.
         */
        setSearchWord(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        /**
         * Действие для установки порядка сортировки (asc/desc).
         * @param state - Текущее состояние.
         * @param action - Объект действия, содержащий порядок сортировки.
         */
        setOrder(state, action: PayloadAction<'asc' | 'desc'>) {
            state.order = action.payload;
        },
        /**
         * Действие для установки поля сортировки (например, 'stars', 'forks').
         * @param state - Текущее состояние.
         * @param action - Объект действия, содержащий поле сортировки.
         */
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
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

// Экспорт синхронных действий для изменения состояния.
export const { setPage, setPerPage, setSearchWord, setOrder, setSortBy } =
    repoSlice.actions;

// Экспорт редьюсера для включения в store.
export default repoSlice.reducer;
