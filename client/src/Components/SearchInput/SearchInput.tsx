import React, { useState } from 'react';
import style from './styles.module.scss';
import { styled } from '@mui/material/styles';
import { Input } from '@mui/material';
import { BasicButton } from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchRepos } from '../../redux/slices/repoSlice';

const CustomInput = styled(Input)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: 0,
    },
    '&:before, &:after': {
        borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
        borderBottom: 'none',
    },
}));

export function SearchInput() {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch: AppDispatch = useDispatch();

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(fetchRepos(searchTerm));
        setSearchTerm('');
    }

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    return (
        <form className={style.form} onSubmit={(e) => submitHandler(e)}>
            <CustomInput
                className={style.search}
                type="search"
                value={searchTerm}
                placeholder="Введите поисковый запрос"
                onChange={changeHandler}
            />
            <BasicButton>Искать</BasicButton>
        </form>
    );
}
