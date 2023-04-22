import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box } from '@mui/material';

const TableData = ({
    columns,
    data = []
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Box}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, id) => (
                            <TableCell key={id} align={column.align} style={{ minWidth: column.minWidth }}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.length === 0 && ( 
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, id) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                            {columns.map((column, id) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={id} align={column.align}>
                                        {value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TableData;