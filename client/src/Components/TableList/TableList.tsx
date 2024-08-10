import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TableItem } from '../TableItem/TableItem';
import style from './styles.module.scss';
import { Repo } from '../../types';
import { TableHeadComponent } from '../TableHead/TableHead';
import { TablePagination } from '../TablePagination/TablePagination';

// Определение интерфейса для пропсов компонента
interface IProps {
    data: Repo[]; // Массив репозиториев для отображения в таблице
    setSelectData: (repo: Repo) => void; // Функция для обработки выбора репозитория при клике на строку
}

/**
 * Компонент TableList отображает таблицу с данными о репозиториях.
 *
 * @param {IProps} props - Пропсы компонента, включающие данные репозиториев и функцию выбора.
 * @returns {JSX.Element} - JSX элемент, представляющий таблицу с данными.
 */
export function TableList({ data, setSelectData }: IProps) {
    return (
        <div className={style.container}>
            <div className={style.tableContent}>
                <h2 className={style.title}>Результаты поиска</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHeadComponent />
                        <TableBody>
                            <TableItem
                                data={data}
                                setSelectData={setSelectData}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination />
            </div>
        </div>
    );
}
