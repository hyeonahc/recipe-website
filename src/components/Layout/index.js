import { Box } from '@mui/material'
import { Container } from '@mui/system'

const Layout = ({ children }) => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: '100vh',
        padding: 0,
      }}>
      <Box>{children}</Box>
    </Container>
  )
}

export default Layout
