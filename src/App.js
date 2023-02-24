import { ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import theme from './style/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route path='recipedetail'>
            <Route
              path=':id'
              element={<RecipeDetailPage />}
            />
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
