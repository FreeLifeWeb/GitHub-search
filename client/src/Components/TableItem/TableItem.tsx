import React from 'react';
import { Repo } from '../../types';
import { TableCell, TableRow } from '@mui/material';
import style from './styles.module.scss';

interface IProps {
    data: Repo[];
    setSelectData: (repo: Repo) => void;
}
export function TableItem({ data, setSelectData }: IProps) {
    return (
        <>
            {data.map((row) => (
                <TableRow
                    className={style.tableRow}
                    key={row.id}
                    onClick={() => setSelectData(row)}
                    sx={{
                        '&:last-child td, &:last-child th': {
                            border: 0,
                        },
                    }}
                >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.language}</TableCell>
                    <TableCell align="right">{row.forks_count}</TableCell>
                    <TableCell align="right">{row.stargazers_count}</TableCell>
                    <TableCell align="right">
                        {new Date(row.updated_at).toLocaleDateString()}
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
