import * as React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export function LoadingScreen({}) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    );
    }
