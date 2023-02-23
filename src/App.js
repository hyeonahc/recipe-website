import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'

function App() {
  return (
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
  )
}

export default App
