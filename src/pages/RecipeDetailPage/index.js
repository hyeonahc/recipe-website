import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetRecipeInformationMutation } from '../../api/requestApi'
import {
  getRecipeDetail,
  resetRecipeDetail,
} from '../../store/recipeDetailSlice'

const RecipeDetailPage = () => {
  const [getRecipeInformation] = useGetRecipeInformationMutation()

  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  const recipeDetail = useSelector(state => {
    return state.recipeDetail
  })

  const requestRecipeDetail = async () => {
    dispatch(resetRecipeDetail())
    try {
      const res = await getRecipeInformation(id)
      const { title, image, diets, extendedIngredients, analyzedInstructions } =
        res.data
      const ingredientsName = extendedIngredients.map(item => {
        return item.name
      })
      const ingredientsMeasure = extendedIngredients.map(item => {
        return item.measures.metric
      })
      const ingredients = ingredientsName.map((item, index) => {
        return [item, ingredientsMeasure[index]]
      })
      const instructions = analyzedInstructions[0].steps.map(item => {
        return item.step
      })
      const selectedRecipeDetail = {
        title: title,
        image: image,
        diets: diets,
        ingredients: ingredients,
        instructions: instructions,
      }
      dispatch(getRecipeDetail(selectedRecipeDetail))
    } catch (e) {
      console.log('e: ', e)
    }
  }

  useEffect(() => {
    requestRecipeDetail()
  }, [id])

  return (
    <Container maxWidth='lg'>
      <Box sx={{ padding: '5rem 0' }}>
        {Object.keys(recipeDetail).length ? (
          <Grid container>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}>
              <img
                src={recipeDetail.image}
                alt={recipeDetail.title}
                loading='lazy'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Grid>
            <Grid
              item
              xs={0}
              sm={1}
              md={1}></Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}>
              <Typography
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 'bolder',
                  marginBottom: '2rem',
                }}>
                {recipeDetail.title}
              </Typography>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {recipeDetail.diets.length ? (
                  <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'>
                    {recipeDetail.diets.map((item, index) => (
                      <Chip
                        label={item}
                        key={index}
                        color='secondary'
                      />
                    ))}
                  </Stack>
                ) : null}
                <Box>
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                    }}>
                    Ingredients
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
                    {recipeDetail.ingredients.map((item, index) => (
                      <Box
                        key={index}
                        sx={{ fontWeight: 'light' }}>
                        <Box component='span'>{item[0]}</Box>
                        <Box component='span'> {item[1].amount}</Box>
                        <Box component='span'>
                          {item[1].unitShort && ` ${item[1].unitShort}`}
                        </Box>
                        <Box component='span'>
                          {recipeDetail.ingredients.length - 1 !== index && ','}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                    }}>
                    Instructions
                  </Typography>
                  <List disablePadding>
                    {recipeDetail.instructions.map((item, index) => (
                      <ListItem
                        disablePadding
                        key={index}
                        sx={{ alignItems: 'flex-start', gap: '1rem' }}>
                        <Typography
                          sx={{
                            fontSize: '2rem',
                            color: '#2079ad',
                            paddingTop: '0.2rem',
                          }}>
                          {index + 1}
                        </Typography>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 'light' }}>
                              {item}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </Container>
  )
}

export default RecipeDetailPage
