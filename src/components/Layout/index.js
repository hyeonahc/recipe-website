import { Box } from '@mui/material'
import Nav from '../Nav'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}>
      <Nav />
      <Box>{children}</Box>
    </Box>
  )
}

export default Layout
