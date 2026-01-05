import { CircularProgress, Box, Typography } from '@mui/material';

export function LoadingState() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  );
}
