import React from 'react';
import style from './styles.module.scss';
import { Repo } from '../../types';

interface IProps {
    description: Repo;
}
export const AsideContent = ({ description }: IProps) => {
    return (
        <>
            <h2 className={style.title}>Название репозитария</h2>
            <div className={style.repoBlock}>
                <ul className={style.topBlock}>
                    <li className={style.lang}>{description.name}</li>
                    <li className={style.star}>
                        <svg
                            role="presentation"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 15.77L16.18 19.5L14.54 12.47L20 7.74L12.81 7.13L10 0.5L7.19 7.13L0 7.74L5.46 12.47L3.82 19.5L10 15.77Z"
                                fill="#FFB400"
                            />
                        </svg>
                        <p>{description.stargazers_count}</p>
                    </li>
                </ul>

                <div className={style.bottomBlock}>
                    <ul className={style.bottomDescription}>
                        <li className={style.descriptionItem}>
                            {description.description}
                        </li>
                    </ul>
                </div>
                <div className={style.license}>
                    <p>{description.license?.name}</p>
                </div>
            </div>
        </>
    );
};
