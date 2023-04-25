import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, TextField, InputAdornment, Typography, ToggleButtonGroup, ToggleButton, Divider, IconButton, Menu, MenuItem, Button, Modal } from '@mui/material';
import { Delete, Edit, MoreVert, Search, Visibility } from '@mui/icons-material';
import { ModalStyle } from '../../pages/admin/Tenant/TenantDetailPage';

const TableData = ({
    columns,
    data = [],
    searchField = [],
    title
}) => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const [activeSearchField, setActiveSearchField] = useState(searchField?.[0]?.id);
    const handleChangeSearchField = (element, newSearchField) => {
        if (newSearchField !== null) {
            setActiveSearchField(newSearchField);
            filterData(search, newSearchField)
        }
    };

    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState(data)
    const handleSearchChange = (event) => {
        const value = event.target.value
        setSearch(value)
        filterData(value)
    }

    const filterData = (searchValue, searchField = activeSearchField) => {
        setPage(0)
        setSearchData(data?.filter((item) => {
            return item[searchField]?.toLowerCase().includes(searchValue.toLowerCase())
        }))
    }

    const [anchorEl, setAnchorEl] = useState();
    const [activeMenu, setActiveMenu] = useState()
    const handleMenuClick = (index) => (event) => {
        setAnchorEl(event.currentTarget)
        setActiveMenu(index)
    };
    const handleMenuClose = () => {
        setAnchorEl(undefined)
        setActiveMenu(undefined)
    };

    const [modalDeleteProps, setModalDeleteProps] = useState({
        open: false,
        handleDelete: undefined,
    })

    const handleDelete = (deleteFunction) => {
        setModalDeleteProps({
            open: true,
            handleDelete: deleteFunction
        })
    }

    return (
        <>
            {useMemo(() => (
                <>
                    {title && (
                        <>
                            <Box sx={{ columnGap: 1, mb: 1 }}>
                                <Typography component={"h2"} variant="p" >{title}</Typography>
                                <Typography component={"p"} variant="p" >Total: ({data?.length}) data</Typography>
                            </Box>
                            <Divider />
                        </>
                    )}
                    {searchField.length > 0 && (
                        <Box sx={{ display: "flex", alignItems: "end", columnGap: 5, my: 1 }}>
                            <TextField
                                variant='standard'
                                label='Search'
                                disabled={activeSearchField === null}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                                <Typography component={"p"} variant="p" >Search by:</Typography>
                                <ToggleButtonGroup
                                    value={activeSearchField}
                                    onChange={handleChangeSearchField}
                                    exclusive
                                    size='small'
                                >
                                    {searchField.map((field, id) => (
                                        <ToggleButton sx={{ textTransform: "capitalize" }} key={id} value={field?.id}>
                                            {field?.label}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Box>
                        </Box>
                    )}
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
                                {(search?.length > 0 ? searchData : data)?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No data
                                        </TableCell>
                                    </TableRow>
                                )}
                                {(search?.length > 0 ? searchData : data)?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowId) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={rowId}>
                                        {columns.map((column, columnId) => {
                                            const value = row[column.id];
                                            return (column.id === 'action' ? (
                                                <TableCell key={columnId}>
                                                    <IconButton
                                                        onClick={handleMenuClick(rowId)}
                                                    >
                                                        <MoreVert />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl) && activeMenu === rowId}
                                                        onClose={handleMenuClose}
                                                    >
                                                        {value?.hasOwnProperty("handleDetail") && (
                                                            <MenuItem onClick={() => {
                                                                handleMenuClose()
                                                                value?.handleDetail(row?.id)
                                                            }}>
                                                                See Detail &nbsp; <Visibility />
                                                            </MenuItem>
                                                        )}
                                                        {value?.hasOwnProperty("handleEdit") && (
                                                            <MenuItem onClick={() => {
                                                                handleMenuClose()
                                                                value?.handleEdit(row?.id)
                                                            }}>
                                                                Edit Item &nbsp; <Edit />
                                                            </MenuItem>
                                                        )}
                                                        {value?.hasOwnProperty("handleDelete") && (
                                                            <MenuItem color='danger' onClick={() => {
                                                                handleMenuClose()
                                                                handleDelete(() => value?.handleDelete(row?.id))
                                                            }}>
                                                                Delete Item &nbsp; <Delete />
                                                            </MenuItem>
                                                        )}
                                                    </Menu>
                                                </TableCell>
                                            ) : (
                                                <TableCell key={columnId} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={(search?.length > 0 ? searchData : data)?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                        />
                    </TableContainer>
                </>
                // eslint-disable-next-line react-hooks/exhaustive-deps
            ), [data, search, activeSearchField, page, activeMenu])}
            
            <ModalDelete
                open={modalDeleteProps.open}
                handleClose={() => setModalDeleteProps({ open: false, handleDelete: undefined })}
                submitDelete={modalDeleteProps.handleDelete}
            />
        </>
    )
};

export default TableData;

const ModalDelete = ({ open, handleClose, submitDelete }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={ModalStyle}>
                <Typography id="modal-modal-title" variant="h5" fontWeight={500} component="h2">
                    Delete Data
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure want to delete this data?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                        submitDelete()
                    }
                    }>Delete</Button>
                </Box>
            </Box>
        </Modal>
    )
}
