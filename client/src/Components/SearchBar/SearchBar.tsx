import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { SearchInput } from '../SearchInput/SearchInput';
import style from './styles.module.scss';

export function SearchBar() {
    return (
        <AppBar position="static">
            <Toolbar className={style.toolbar}>
                <SearchInput />
            </Toolbar>
        </AppBar>
    );
}
