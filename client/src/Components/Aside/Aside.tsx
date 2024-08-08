import React from 'react';
import style from './styles.module.scss';
import { AsideContent } from '../AsideContent/AsideContent';
import { Repo } from '../../types';

interface IProps {
    selectData: Repo | null;
}
export function Aside({ selectData }: IProps) {
    return (
        <div className={style.container}>
            <div className={style.asideContent}>
                {selectData ? (
                    <AsideContent description={selectData} />
                ) : (
                    <div className={style.chooseRepo}>
                        <p>Выберите репозитарий</p>
                    </div>
                )}
            </div>
        </div>
    );
}
