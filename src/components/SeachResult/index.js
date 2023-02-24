import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSearchRecipeMutation } from '../../api/requestApi'
import { addRecipeItems } from '../../store/recipeItemsSlice'
import { getTotalResults } from '../../store/totalResultsSlice'

const SearchResult = () => {
  const matchesXs = useMediaQuery('(min-width:600px)')
  const matchesSm = useMediaQuery('(min-width:900px)')

  const [searchRecipe] = useSearchRecipeMutation()

  const dispatch = useDispatch()

  const searchWord = useSelector(state => {
    return state.searchWord.searchWord
  })

  const recipeItems = useSelector(state => {
    return state.recipeItems
  })

  const totalResults = useSelector(state => {
    return state.totalResults.totalResults
  })

  const [count, setCount] = useState()
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const requestSearchRecipe = async offset => {
    try {
      const res = await searchRecipe({ searchWord, offset })
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
    <Container maxWidth='lg'>
      <Box
        sx={{
          padding: '5rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Typography sx={{ marginBottom: '2rem' }}>
          Found{' '}
          <Box
            component='span'
            sx={{ color: '#f9a849' }}>
            {totalResults.toLocaleString('en-US')}
          </Box>{' '}
          recipes
        </Typography>
        <ImageList
          cols={matchesXs ? 3 : 1}
          gap={20}
          sx={{
            width: {
              xs: '31.2rem',
              sm: 'auto',
            },
            margin: {
              xs: '0 auto',
              sm: 'auto',
            },
          }}>
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
            color='secondary'
            onChange={movePage}
            sx={{ marginTop: '3rem' }}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default SearchResult
