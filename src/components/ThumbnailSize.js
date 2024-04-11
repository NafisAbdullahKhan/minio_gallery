import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ThumbnailSize(props) {
    const handleChange = (event, newSize) => {
        props.setSize(newSize);
    };

    const children = [
        <ToggleButton value={8} key={8}>
            Small
        </ToggleButton>,
        <ToggleButton value={6} key={6}>
            Medium
        </ToggleButton>,
        <ToggleButton value={4} key={4}>
            Large
        </ToggleButton>,
        <ToggleButton value={2} key={2}>
            Extra Large
        </ToggleButton>,
    ];

    return (
        <ToggleButtonGroup color='primary' size="small" value={props.size} onChange={handleChange}
            exclusive>
            {children}
        </ToggleButtonGroup>
    );
}