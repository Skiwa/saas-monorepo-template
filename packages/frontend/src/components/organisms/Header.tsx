import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            variant="text"
            sx={{
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/notes"
            color="inherit"
            variant="text"
            sx={{
              fontWeight: location.pathname === '/notes' ? 'bold' : 'normal',
            }}
          >
            Notes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
