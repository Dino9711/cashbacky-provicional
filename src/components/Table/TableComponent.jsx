import { ArrowDownward, ArrowUpward, Search } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export const TableComponent = ({
  columns,
  rows,
  edit,
  handleEdit,
  searchbar,
  styleProps,
  order = false,
  handleOrder,
  customCell = null,
  pagination = true,
  dense = false,
  customCellColumn = null,
  downloadFiles = false,
  fileConfig = null,
  maxHeight = 'auto',
}) => {
  const [rowData, setRowData] = useState(rows);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const numberToCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowData?.length - page * rowsPerPage);

  const filteredArray = (data) => {
    return data.filter((row) => {
      return Object.keys(row).some((key) => {
        const value = row[key];
        if (value === null || value === undefined || typeof value === Boolean)
          return false;
        return row[key].toString().toLowerCase().includes(query.toLowerCase());
      });
    });
  };

  useEffect(() => {
    if (!searchbar) return;
    if (query === '') return setRowData(rows);
    const filteredRows = filteredArray(rows);
    setRowData(filteredRows);
  }, [query]);

  useEffect(() => {
    setRowData(rows);
  }, [rows]);

  return (
    <>
      {searchbar && (
        <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', paddingBlock: 2 }}
          >
            <TextField
              label={'Buscar'}
              variant='outlined'
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search color='primary' />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '50%',
                borderRadius: '14px',
                backgroundColor: '#d6e4e7',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                },
                '&:hover .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                },
              }}
            />
          </Box>
        </>
      )}
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table size={dense ? 'small' : 'medium'} stickyHeader={true}>
          <TableHead>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.isNumber ? 'right' : 'center'}
                sx={{ width: 'auto' }}
              >
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {col.label}
                </Typography>
              </TableCell>
            ))}
            {customCellColumn !== null
              ? customCellColumn.map((col) => (
                  <>
                    <TableCell
                      key={col.id}
                      align='center'
                      sx={{ width: 'auto' }}
                    >
                      <Typography
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {col.label}
                      </Typography>
                    </TableCell>
                  </>
                ))
              : null}
            {edit && (
              <TableCell align='center' sx={{ width: 'auto' }}>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {'Editar'}
                </Typography>
              </TableCell>
            )}
          </TableHead>
          <TableBody>
            {(!pagination
              ? rowData
              : rowsPerPage > 0
              ? rowData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : rowData
            )?.map((row) => {
              return (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.isNumber ? 'right' : 'center'}
                      style={{
                        padding: '12px',
                        lineHeight: '1.2',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {row[col.id] === null || row[col.id] === undefined ? (
                        `N/A`
                      ) : typeof row[col.id] !== 'boolean' ? (
                        col.toCurrency ? (
                          numberToCurrency(row[col.id])
                        ) : col.dateToString ? (
                          new Date(row[col.id]).toLocaleString('es-MX', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })
                        ) : (
                          `${col.prefix ?? ''}${row[col.id]}`
                        )
                      ) : row[col.id] ? (
                        <Check />
                      ) : (
                        <Close />
                      )}
                    </TableCell>
                  ))}
                  {order && (
                    <TableCell align='center'>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() =>
                          handleOrder({
                            current_row: row,
                          })
                        }
                      >
                        {row.priority_order === 1 ? (
                          <ArrowDownward />
                        ) : (
                          <ArrowUpward />
                        )}
                      </Button>
                    </TableCell>
                  )}
                  {edit && (
                    <TableCell align='center'>
                      <Button
                        sx={{
                          borderRadius: 2,
                        }}
                        color='primary'
                        variant='outlined'
                        onClick={() => handleEdit(row)}
                      >
                        <Edit />
                      </Button>
                    </TableCell>
                  )}
                  {customCell !== null ? customCell(row) : null}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} align='center' />
              </TableRow>
            )}
            {pagination && rowData.length > 5 && (
              <TableRow>
                <TableCell colSpan={columns.length + (edit ? 1 : 0)}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rowData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
