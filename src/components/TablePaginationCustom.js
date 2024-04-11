import * as React from 'react';
import { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import S3Init from "../S3Init";

export default function TablePaginationCustom(props) {
    const [page, setPage] = useState(props.page);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(props.count);
    const [s3, setS3] = useState(null);
    const config = window.config;

    useEffect(() => setS3(S3Init()), []);

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        console.log(props.startKeys);
        const params = {
            Bucket: config.bucket,
            Prefix: props.url, // add the trailing slash
            StartAfter: props.startKeys[newPage - 1],
            MaxKeys: rowsPerPage
        };

        const command = new ListObjectsV2Command(params);
        const response = await s3.send(command);
        console.log(response);
        if (response.KeyCount < rowsPerPage) setCount(newPage * rowsPerPage + response.KeyCount);
        props.setItems(newPage, rowsPerPage, response.KeyCount < rowsPerPage ? newPage * rowsPerPage + response.KeyCount : count, response.Contents || []);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        const params = {
            Bucket: config.bucket,
            Prefix: props.url, // add the trailing slash
            MaxKeys: parseInt(event.target.value, 10)
        };

        const command = new ListObjectsV2Command(params);
        const response = await s3.send(command);
        console.log(response);
        if (response.KeyCount < parseInt(event.target.value, 10)) setCount(response.KeyCount);
        props.setItems(0, parseInt(event.target.value, 10), response.KeyCount < parseInt(event.target.value, 10) ? response.KeyCount : count, response.Contents || []);
    };

    useEffect(() => setCount(props.count), [props.count]);
    useEffect(() => setPage(props.page), [props.page]);

    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Items per page:"
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
