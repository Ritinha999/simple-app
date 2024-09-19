import { Typography, Box } from '@mui/material';
import { ListAlt as ListAltIcon } from '@mui/icons-material';

export const Ueberschrift = ({ title }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main', // Primärfarbe aus dem Theme
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        mb: 3, // Margin-Bottom
      }}
    >
      <ListAltIcon sx={{ fontSize: 40, mr: 2 }} />  {/* Icon vor dem Text */}
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );
};