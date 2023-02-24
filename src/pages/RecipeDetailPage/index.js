import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetRecipeInformationMutation } from '../../api/requestApi'
import { getRecipeDetail } from '../../store/recipeDetailSlice'

const RecipeDetailPage = () => {
  const [getRecipeInformation] = useGetRecipeInformationMutation()

  const dispatch = useDispatch()
  const params = useParams()

  const recipeDetail = useSelector(state => {
    return state.recipeDetail
  })

  const requestRecipeDetail = async () => {
    try {
      const { id } = params
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
  }, [])

  return (
    <Box>
      {Object.keys(recipeDetail).length && (
        <Grid
          container
          spacing={2}
          sx={{ border: '2px solid salmon' }}>
          <Grid
            item
            xs={4}
            sx={{ border: '1px solid green' }}>
            <img
              src={recipeDetail.image}
              alt={recipeDetail.title}
              loading='lazy'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ border: '1px solid navy' }}>
            <Typography sx={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
              {recipeDetail.title}
            </Typography>
            {recipeDetail.diets.length &&
              recipeDetail.diets.map((item, index) => (
                <Box key={index}>
                  <Box component='span'>{item}</Box>
                </Box>
              ))}
            <Box>
              <Typography>Ingredients:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
                {recipeDetail.ingredients.map((item, index) => (
                  <Box key={index}>
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
              <Typography>Instructions</Typography>
              <List disablePadding>
                {recipeDetail.instructions.map((item, index) => (
                  <ListItem
                    disablePadding
                    key={index}
                    sx={{ alignItems: 'flex-start', gap: '1rem' }}>
                    <Typography sx={{ paddingTop: '0.2rem' }}>
                      {index + 1}
                    </Typography>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default RecipeDetailPage
