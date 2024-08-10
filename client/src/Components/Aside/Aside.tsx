import React from 'react';
import style from './styles.module.scss';
import { AsideContent } from '../AsideContent/AsideContent';
import { Repo } from '../../types';

/**
 * Интерфейс, определяющий типы пропсов для компонента Aside.
 * @property selectData - выбранный репозиторий или null, если репозиторий не выбран.
 */
interface IProps {
    selectData: Repo | null;
}

/**
 * Компонент Aside отображает боковую панель с информацией о выбранном репозитории.
 * Если репозиторий не выбран, отображается сообщение с предложением выбрать репозиторий.
 *
 * @param {IProps} props - Пропсы компонента.
 * @returns JSX элемент, представляющий боковую панель.
 */
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
