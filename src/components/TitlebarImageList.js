import * as React from 'react';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
import BasicModal from './BasicModal';

export default function TitlebarImageList(props) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setItem] = useState(null);
    const [items, setItems] = useState([]);
    const config = window.config;

    const captureThumbnail = (videoUrl) => {
        console.log(videoUrl);
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.crossOrigin = '*';
            video.src = videoUrl;
            video.currentTime = 1; // set time to capture thumbnail
            video.onloadeddata = () => {
                const canvas = document.createElement('canvas');
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL('image/png');
                //console.log(thumbnail);
                resolve(thumbnail);
            };
            video.onerror = () => {
                reject('Unable to load video');
            };
        });
    };

    React.useEffect(() => {
        // Replace this with your actual data fetching logic
        const fetchItems = async () => {
            let itms = [];
            for (const item of props.items) {
                //console.log(item.Key);
                item.Key = config.baseUrl + config.bucket + "/" + item.Key;
                if (new RegExp("^.+\\.(avi|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4|ogg|mp3|oga|aac|mpeg|webm)$", "i").test(item.Key))
                    item.thumbnail = await captureThumbnail(item.Key);
                itms.push(item);
            }
            // const itms = await Promise.all(props.items.map(async (item) => {

            // }));
            return itms;
        };

        fetchItems().then((itms) => setItems(itms));
    }, [props.items]);

    return (
        <div>
            {props.userID !== "" && <ListSubheader component="div"><Typography variant="h3" component="h3">UserID: {props.userID}</Typography></ListSubheader>}

            <ImageList cols={props.size}>
                {items.map((item) => (
                    <ImageListItem key={item.Key}>
                        <img
                            onClick={() => {
                                setItem(item);
                                setOpen(true);
                            }}
                            srcSet={encodeURI(item.thumbnail !== undefined ? item.thumbnail : `${item.Key}?w=248&fit=crop&auto=format&dpr=2 2x`)}
                            src={`${item.Key}?w=248&fit=crop&auto=format`}
                            //alt={item.title}
                            loading="lazy"
                        />
                        {/* <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    /> */}
                    </ImageListItem>
                ))}
                <BasicModal open={open} handleClose={() => setOpen(false)} item={selectedItem} />
            </ImageList>
        </div>
    );
}
