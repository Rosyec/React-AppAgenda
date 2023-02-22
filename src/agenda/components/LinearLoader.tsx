import { Box, LinearProgress } from '@mui/material'

export const CircularLoader = ( { hidden }:Props ) => {
  return (
    <Box className="animate__animated animate__fadeIn" sx={{ width: '100%', display: (hidden) ? 'block' : 'none', marginTop: '16px', }}>
      <LinearProgress/>
    </Box>
  )
}

interface Props {
  hidden: boolean
}
