import React from 'react'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

const RecipePagination = ({ totalPages, setPage }) => {
    return (<Stack spacing={2} sx={{ mt: 4 }} direction="row" justifyContent="center">
        <Pagination count={totalPages} onChange={(event, value) => {
            setPage(value)
        }} />
    </Stack>)
}

export default RecipePagination
