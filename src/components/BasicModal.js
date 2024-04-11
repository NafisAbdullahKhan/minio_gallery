import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MediaCard from './MediaCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

export default function BasicModal(props) {
    // const [open, setOpen] = React.useState(props.open);
    //const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box sx={style}>
                <MediaCard item={props.item} />
            </Box>
        </Modal>
    );
}
