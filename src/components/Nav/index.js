import { Box, Button, FormControl, Grid, OutlinedInput } from '@mui/material'
import { Container } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSearchRecipeMutation } from '../../api/requestApi'
import { addRecipeItems, resetRecipeItems } from '../../store/recipeItemsSlice'
import { addSearchWord, resetSearchWord } from '../../store/searchWordSlice'
import {
  getTotalResults,
  resetTotalResults,
} from '../../store/totalResultsSlice'

const Nav = () => {
  const [searchRecipe] = useSearchRecipeMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchWord = useSelector(state => {
    return state.searchWord.searchWord
  })

  const goBackToMain = () => {
    navigate('/')
    dispatch(resetSearchWord())
    dispatch(resetRecipeItems())
    dispatch(resetTotalResults())
  }

  const getInputValue = e => {
    dispatch(addSearchWord(e.target.value))
  }

  const handleEnterOrClick = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      navigate('/')
      const offset = 0
      requestSearchRecipe(offset)
    }
  }

  const requestSearchRecipe = async offset => {
    try {
      const res = await searchRecipe({ searchWord, offset })
      // console.log(res)
      const { results, totalResults } = res.data
      dispatch(addRecipeItems(results))
      dispatch(getTotalResults(totalResults))
    } catch (e) {
      console.log('e: ', e)
    }
  }

  return (
    <Box sx={{ backgroundColor: '#2079ad' }}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid
            item
            xs={2}
            sx={{
              height: '10vh',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                padding: '2rem',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={goBackToMain}>
              <img
                src='https://user-images.githubusercontent.com/83247825/221061838-cfe1822b-e346-4cb0-98ed-6082c85a11b2.png'
                alt='logo'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
            <FormControl
              size='small'
              sx={{ width: '100%', backgroundColor: '#fff' }}>
              <OutlinedInput
                placeholder='Search your favourite food to get the recipe!'
                autoFocus={true}
                value={searchWord}
                onChange={getInputValue}
                onKeyPress={handleEnterOrClick}
              />
            </FormControl>
            <Button
              variant='contained'
              size='medium'
              onClick={handleEnterOrClick}
              sx={{
                fontWeight: 'bold',
                boxShadow: 'none',
                backgroundColor: '#f9a849',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#f9a849',
                },
              }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Nav
