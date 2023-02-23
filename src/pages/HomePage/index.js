import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Pagination,
  Typography
} from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSearchRecipeMutation } from '../../api/requestApi'
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
      <Box>
        {totalResults ? (
          <>
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
          </>
        ) : (
          <p>The search result will be displayed here</p>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
