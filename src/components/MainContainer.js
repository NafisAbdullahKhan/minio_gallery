import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import S3Init from "../S3Init";
import SearchField from "./SearchField";
import TitlebarImageList from "./TitlebarImageList";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TablePaginationCustom from "./TablePaginationCustom";
import ThumbnailSize from "./ThumbnailSize";

function MainContainer() {
    const [items, setItems] = useState([]);
    const [userID, setUserID] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [startKeys, setStartKeys] = useState([]);
    const [url, setUrl] = useState("");
    const [count, setCount] = useState(0);
    const [thumbSize, setThumbSize] = useState(4);
    const [s3, setS3] = useState(null);
    const config = window.config;

    useEffect(() => setS3(S3Init()), []);

    return (
        <Container>
            <SearchField onClick={async (id) => {
                // const input = {};
                // const command = new ListBucketsCommand(input);
                // const response = await s3.send(command);
                // console.log(response);
                const urll = id + "/gallery/";
                setUrl(urll);
                const params = {
                    Bucket: config.bucket,
                    Prefix: urll, // add the trailing slash
                    MaxKeys: rowsPerPage
                };

                const command = new ListObjectsV2Command(params);
                const response = await s3.send(command);
                console.log(response);

                setUserID(response.Contents ? id : "");
                setItems(response.Contents || []);
                setPage(0);
                setStartKeys(response.Contents ? [response.Contents[response.Contents.length - 1].Key] : []);
                if (response.KeyCount < rowsPerPage) setCount(response.KeyCount);
                else if (count === 0 && response.KeyCount !== 0) setCount(rowsPerPage * 2);
            }} />
            <ThumbnailSize size={thumbSize} setSize={setThumbSize} />
            {count !== 0 && <TablePaginationCustom count={count} page={page} url={url} startKeys={startKeys} setItems={(pg, rowsPerPg, cnt, itms) => {
                setPage(pg);
                setRowsPerPage(rowsPerPg);
                setItems(itms);
                setCount(cnt);
                if (rowsPerPage !== rowsPerPg) setStartKeys(itms.length > 0 ? [itms[itms.length - 1].Key] : []);
                if (pg > page) setStartKeys(itms.length > 0 ? [...startKeys, itms[itms.length - 1].Key] : []);
            }} />}
            <TitlebarImageList size={thumbSize} userID={userID} items={items} />
        </Container>
    );
}

export default MainContainer;
