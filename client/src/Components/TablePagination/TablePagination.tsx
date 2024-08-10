import React from 'react';
import style from './styles.module.scss';
import { fetchRepos, setPage, setPerPage } from '../../redux/slices/repoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

/**
 * Компонент TablePagination отвечает за постраничную навигацию и управление количеством строк на странице.
 *
 * @returns {JSX.Element} - JSX элемент для отображения постраничной навигации.
 */
export const TablePagination = () => {
    const dispatch: AppDispatch = useDispatch();
    const page = useSelector((state: RootState) => state.repos.page);
    const perPage = useSelector((state: RootState) => state.repos.perPage);
    const totalCount = useSelector(
        (state: RootState) => state.repos.totalCount
    );
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(totalCount / perPage);

    // Функция для обработки перехода на предыдущую страницу
    const handlePrevPage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1));
            dispatch(fetchRepos());
        }
    };

    // Функция для обработки перехода на следующую страницу
    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(setPage(page + 1));
            dispatch(fetchRepos());
        }
    };

    // Функция для изменения количества строк на странице
    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = Number(e.target.value);
        dispatch(setPerPage(newPerPage));
        dispatch(fetchRepos());
    };

    return (
        <div className={style.pagination}>
            <div className={style.perPage}>
                <span className={style.rows}>Rows per page:</span>
                <select
                    className={style.perPageSelect}
                    value={perPage}
                    onChange={handlePerPageChange}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
                <span
                    className={style.pageCount}
                >{`${page}-${totalPages} of ${totalPages}`}</span>
                <span onClick={handlePrevPage} className={style.angleRight}>
                    <svg
                        role="presentation"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.70504 1.41L6.29504 0L0.295044 6L6.29504 12L7.70504 10.59L3.12504 6L7.70504 1.41Z"
                            fill="black"
                            fillOpacity="0.56"
                        />
                    </svg>
                </span>
                <span onClick={handleNextPage} className={style.angleLeft}>
                    <svg
                        role="presentation"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.70504 0L0.295044 1.41L4.87504 6L0.295044 10.59L1.70504 12L7.70504 6L1.70504 0Z"
                            fill="black"
                            fillOpacity="0.56"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
};
