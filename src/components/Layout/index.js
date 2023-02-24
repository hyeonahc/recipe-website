import { Box } from '@mui/material'
import Nav from '../Nav'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: {
          xs: 'unset',
          sm: '100vh',
        },
      }}>
      <Nav />
      <Box>{children}</Box>
    </Box>
  )
}

export default Layout
