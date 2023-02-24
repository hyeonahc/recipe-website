import { Box } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}>
      <Box>{children}</Box>
    </Box>
  )
}

export default Layout
