import {
  Box,
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  OutlinedInput,
  Pagination,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSearchRecipeMutation } from '../../api/requestApi'
import Main from '../../components/Main'
import { addRecipeItems } from '../../store/recipeItemsSlice'
import { getTotalResults } from '../../store/totalResultsSlice'

const HomePage = () => {
  const [searchRecipe] = useSearchRecipeMutation()

  const dispatch = useDispatch()

  const recipeItems = useSelector(state => {
    return state.recipeItems
  })

  const totalResults = useSelector(state => {
    return state.totalResults.totalResults
  })

  const [keyword, setKeyword] = useState('')
  const [count, setCount] = useState()
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const getInputValue = e => {
    setKeyword(e.target.value)
  }

  const handleEnterOrClick = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      const offset = 0
      requestSearchRecipe(offset)
    }
  }

  const requestSearchRecipe = async offset => {
    try {
      const res = await searchRecipe({ keyword, offset })
      console.log(res)
      const { results, totalResults } = res.data
      dispatch(addRecipeItems(results))
      dispatch(getTotalResults(totalResults))
    } catch (e) {
      console.log('e: ', e)
    }
  }

  useEffect(() => {
    if (totalResults) {
      const count = Math.ceil(totalResults / PER_PAGE)
      setCount(count)
    }
  }, [totalResults])

  const movePage = (e, pageNumber) => {
    setPage(pageNumber)
    const newOffset = (pageNumber - 1) * 5
    requestSearchRecipe(newOffset)
  }

  return (
    <>
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
              <Link to='/'>
                <Box sx={{ padding: '2rem' }}>
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
              </Link>
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
      <Box
        sx={{
          height: '90vh',
        }}>
        {totalResults ? (
          <Container maxWidth='lg'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Typography>
                Found {totalResults} {keyword} recipes
              </Typography>
              <ImageList
                cols={3}
                gap={20}>
                {recipeItems.map(item => (
                  <ImageListItem key={item.id}>
                    <Link to={`/recipedetail/${item.id}`}>
                      <img
                        src={item.image}
                        srcSet={item.image}
                        alt={item.title}
                        loading='lazy'
                      />
                      <ImageListItemBar
                        title={item.title}
                        sx={{
                          '.MuiImageListItemBar-title': {
                            whiteSpace: 'normal',
                          },
                        }}
                      />
                    </Link>
                  </ImageListItem>
                ))}
              </ImageList>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Pagination
                  count={count}
                  size='large'
                  page={page}
                  variant='outlined'
                  shape='rounded'
                  onChange={movePage}
                />
              </Box>
            </Box>
          </Container>
        ) : (
          <Main />
        )}
      </Box>
    </>
  )
}

export default HomePage
