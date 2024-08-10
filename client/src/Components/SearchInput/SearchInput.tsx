import React, { useState } from 'react';
import style from './styles.module.scss';
import { styled } from '@mui/material/styles';
import { Input } from '@mui/material';
import { BasicButton } from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchRepos, setSearchWord } from '../../redux/slices/repoSlice';

/**
 * Стилизованный компонент Input с кастомными стилями для поиска.
 */
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
/**
 * Компонент SearchInput предоставляет форму для поиска репозиториев.
 * Пользователь может ввести поисковый запрос, который отправляется в Redux хранилище
 * для выполнения поиска репозиториев при отправке формы.
 *
 * @returns JSX элемент, представляющий форму поиска.
 */

export function SearchInput() {
    /**
     * Состояние для хранения текущего поискового запроса.
     */
    const [searchTerm, setSearchTerm] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    /**
     * Обработчик отправки формы.
     * Предотвращает стандартное поведение отправки формы, выполняет поиск по введенному запросу
     * и сбрасывает поле ввода.
     *
     * @param e - Событие отправки формы.
     */
    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // console.log('searchTerm', searchTerm);
        dispatch(setSearchWord(searchTerm));
        dispatch(fetchRepos());
        setSearchTerm('');
    }

    /**
     * Обработчик изменения значения поля ввода.
     * Обновляет состояние с новым значением поискового запроса.
     *
     * @param e - Событие изменения значения поля ввода.
     */
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
