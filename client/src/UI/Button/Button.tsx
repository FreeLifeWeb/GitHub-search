import * as React from 'react';
import Button from '@mui/material/Button';
import style from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
}

export function BasicButton({ children, ...props }: IProps) {
    return (
        <Button
            type="submit"
            className={style.myButton}
            variant="contained"
            {...props}
        >
            {children}
        </Button>
    );
}
