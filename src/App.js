import { Box, Button, FormControl, OutlinedInput } from '@mui/material'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FormControl
              size='small'
              sx={{ width: '100%' }}>
              <OutlinedInput
                autoFocus={true}
                placeholder='Search your favourite food to get the recipe!'
              />
            </FormControl>
            <Button
              variant='contained'
              size='medium'
              sx={{
                boxShadow: 'none',
                backgroundColor: '#2079ad',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#2079ad',
                },
              }}>
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default App
