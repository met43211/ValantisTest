import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function LoadingBar() {
    return ( 
        <Box sx={{ width: '100%' }}>
            <LinearProgress sx={{ color: 'rgb(0, 101, 252)' }} />
        </Box>
     );
}

export default LoadingBar;