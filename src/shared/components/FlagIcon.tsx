import { Box } from '@mui/material';

export function BrazilFlag() {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 480"
      sx={{ width: 20, height: 14, borderRadius: '2px', display: 'block' }}
    >
      <rect width="720" height="480" fill="#009b3a" />
      <path fill="#fedf00" d="M360 25L660 240L360 455L60 240z" />
      <circle cx="360" cy="240" r="105" fill="#002776" />
    </Box>
  );
}

export function USAFlag() {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 741 390"
      sx={{ width: 20, height: 14, borderRadius: '2px', display: 'block' }}
    >
      <rect width="741" height="390" fill="#3c3b6e" />
      <path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#fff" strokeWidth="30" />
      <path d="M0 60h741M0 120h741M0 180h741M0 240h741M0 300h741M0 360h741" stroke="#b22234" strokeWidth="30" />
      <rect width="296" height="210" fill="#3c3b6e" />
      {/* Simplified stars representation */}
      <circle cx="30" cy="30" r="5" fill="#fff" />
      <circle cx="70" cy="30" r="5" fill="#fff" />
      <circle cx="110" cy="30" r="5" fill="#fff" />
      <circle cx="150" cy="30" r="5" fill="#fff" />
      <circle cx="190" cy="30" r="5" fill="#fff" />
      <circle cx="230" cy="30" r="5" fill="#fff" />
      <circle cx="30" cy="70" r="5" fill="#fff" />
      <circle cx="70" cy="70" r="5" fill="#fff" />
      <circle cx="110" cy="70" r="5" fill="#fff" />
      <circle cx="150" cy="70" r="5" fill="#fff" />
      <circle cx="190" cy="70" r="5" fill="#fff" />
      <circle cx="230" cy="70" r="5" fill="#fff" />
    </Box>
  );
}
