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

  useEffect(() => {
    console.log(recipeDetail)
  }, [recipeDetail])

  return <div>RecipeDetailPage</div>
}

export default RecipeDetailPage
