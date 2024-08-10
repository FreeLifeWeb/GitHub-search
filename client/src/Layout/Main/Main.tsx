import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import style from './styles.module.scss';
import { TableList } from '../../Components/TableList/TableList';
import { Aside } from '../../Components/Aside/Aside';
import { Repo } from '../../types';

/**
 * Главный компонент приложения, который отображает таблицу результатов поиска,
 * информацию о выбранном репозитории и индикаторы состояния загрузки.
 *
 * @returns {JSX.Element} - JSX элемент главной страницы приложения.
 */
export const Main = () => {
    const status = useSelector((state: RootState) => state.repos.status);
    const data = useSelector((state: RootState) => state.repos.repos);
    const [selectData, setSelectData] = useState<Repo | null>(null);

    return (
        <main>
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    {status === 'idle' && (
                        <div className={style.contentBlock}>
                            <p className={style.welcome}>Добро пожаловать</p>
                        </div>
                    )}
                    {status === 'loading' && (
                        <div className={style.contentBlock}>
                            <CircularProgress />
                        </div>
                    )}
                    {status === 'succeeded' && (
                        <>
                            <TableList
                                data={data}
                                setSelectData={setSelectData}
                            />
                            <Aside selectData={selectData} />
                        </>
                    )}
                    {status === 'failed' && (
                        <div className={style.contentBlock}>
                            <p className={style.error}>
                                Не удалось загрузить данные!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
