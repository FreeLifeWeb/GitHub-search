import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { SearchInput } from '../SearchInput/SearchInput';
import style from './styles.module.scss';
/**
 * Компонент SearchBar представляет собой строку поиска, расположенную в верхней части приложения.
 * Использует Material-UI для отображения полосы приложения (AppBar) и панели инструментов (Toolbar).
 * Внутри компонента размещается элемент поиска (SearchInput).
 *
 * @returns JSX элемент, представляющий строку поиска в верхней части приложения.
 */
export function SearchBar() {
    return (
        <AppBar position="static">
            <Toolbar className={style.toolbar}>
                <SearchInput />
            </Toolbar>
        </AppBar>
    );
}
