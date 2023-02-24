import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import Main from '../../components/Main'
import SearchResult from '../../components/SeachResult'

const HomePage = () => {
  const totalResults = useSelector(state => {
    return state.totalResults.totalResults
  })

  return (
    <>
      <Box
        sx={{
          height: {
            xs: 'unset',
            sm: '90vh',
          },
        }}>
        {!totalResults ? <Main /> : <SearchResult />}
      </Box>
    </>
  )
}

export default HomePage
