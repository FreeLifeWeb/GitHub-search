import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import style from './styles.module.scss';
import { TableList } from '../../Components/TableList/TableList';
import { Aside } from '../../Components/Aside/Aside';
import { Repo } from '../../types';

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
                        <TableList data={data} setSelectData={setSelectData} />
                    )}
                    {status === 'failed' && (
                        <div className={style.contentBlock}>
                            <p className={style.error}>
                                Не удалось загрузить данные!
                            </p>
                        </div>
                    )}
                    <Aside selectData={selectData} />
                </div>
            </div>
        </main>
    );
};
