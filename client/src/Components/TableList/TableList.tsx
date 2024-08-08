import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableItem } from '../TableItem/TableItem';
import style from './styles.module.scss';
import { Repo } from '../../types';

interface IProps {
    data: Repo[];
    setSelectData: (repo: Repo) => void;
}
export function TableList({ data, setSelectData }: IProps) {
    return (
        <div className={style.container}>
            <div className={style.tableContent}>
                <h2 className={style.title}>Результаты поиска</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="right">Язык</TableCell>
                                <TableCell align="right">
                                    Число форков
                                </TableCell>
                                <TableCell align="right">Число звезд</TableCell>
                                <TableCell align="right">
                                    Дата обновления
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableItem
                                data={data}
                                setSelectData={setSelectData}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
