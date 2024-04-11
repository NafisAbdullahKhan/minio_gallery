import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchField(props) {
    const [userID, setUserID] = useState("");
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Search User ID" variant="outlined" onChange={(e) => setUserID(e.target.value)} />
            <Button variant="contained" onClick={() => props.onClick(userID)}>Search</Button>
        </Box>
    );
}