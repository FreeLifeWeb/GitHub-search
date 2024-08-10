import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import style from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchRepos, setOrder, setSortBy } from '../../redux/slices/repoSlice';

/**
 * Стилизованный компонент TableCell с жирным шрифтом.
 */
const CustomTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 800,
}));

/**
 * Компонент TableHeadComponent отображает заголовки таблицы и элементы управления для сортировки данных.
 *
 * @returns JSX элемент, представляющий заголовок таблицы с выпадающими списками для сортировки.
 */
export const TableHeadComponent = () => {
    /**
     * Извлечение текущего порядка сортировки и критерия сортировки из Redux хранилища.
     */
    const order = useSelector((state: RootState) => state.repos.order);
    const sortBy = useSelector((state: RootState) => state.repos.sortBy);

    /**
     * Хук для получения функции dispatch из Redux хранилища.
     */
    const dispatch: AppDispatch = useDispatch();

    /**
     * Обработчик изменения сортировки. Функция возвращает обработчик для конкретного столбца.
     * Обновляет сортировку по выбранному столбцу и порядку (возрастание/убывание), затем запрашивает данные.
     *
     * @param cell - Критерий сортировки (название столбца).
     * @returns Функция-обработчик изменения значения в выпадающем списке.
     */
    const handleSetDesc =
        (cell: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newOrder = e.target.value;
            // Установка критерия сортировки и порядка сортировки в Redux хранилище
            dispatch(setSortBy(cell));
            dispatch(setOrder(newOrder as 'desc' | 'asc'));
            // Запрос данных с новым критерием сортировки и порядком
            dispatch(fetchRepos());
        };

    return (
        <TableHead>
            <TableRow>
                <CustomTableCell>Название</CustomTableCell>
                <CustomTableCell align="right">Язык</CustomTableCell>
                <CustomTableCell align="right">
                    Число форков
                    <select
                        className={style.perPageSelect}
                        // Установка значения выпадающего списка в зависимости от текущего критерия сортировки
                        value={sortBy === 'forks' ? order : 'desc'}
                        onChange={handleSetDesc('forks')}
                    >
                        <option value={'desc'}>desc</option>
                        <option value={'asc'}>asc</option>
                    </select>
                </CustomTableCell>
                <CustomTableCell align="right">
                    Число звезд
                    <select
                        className={style.perPageSelect}
                        // Установка значения выпадающего списка в зависимости от текущего критерия сортировки
                        value={sortBy === 'stars' ? order : 'desc'}
                        onChange={handleSetDesc('stars')}
                    >
                        <option value={'desc'}>desc</option>
                        <option value={'asc'}>asc</option>
                    </select>
                </CustomTableCell>
                <CustomTableCell align="right">
                    Дата обновления
                    <select
                        className={style.perPageSelect}
                        // Установка значения выпадающего списка в зависимости от текущего критерия сортировки
                        value={sortBy === 'updated' ? order : 'desc'}
                        onChange={handleSetDesc('updated')}
                    >
                        <option value={'desc'}>desc</option>
                        <option value={'asc'}>asc</option>
                    </select>
                </CustomTableCell>
            </TableRow>
        </TableHead>
    );
};
