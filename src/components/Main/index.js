import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/system'

const Main = () => {
  const serviceCopy = [
    {
      title: '🔎 Search it',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at justo mattis, faucibus mi id, tempus dui.',
    },
    {
      title: '💡 Find it',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at justo mattis, faucibus mi id, tempus dui.',
    },
    {
      title: '🧑‍🍳 Cook it',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at justo mattis, faucibus mi id, tempus dui.',
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Container maxWidth='lg'>
        <Grid
          container
          sx={{
            height: '60vh',
            alignItems: 'center',
          }}>
          <Grid
            item
            xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <img
                src='https://user-images.githubusercontent.com/83247825/221052155-06f40bb4-e115-44e6-b496-32468528a063.png'
                alt='brand character'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: '25rem',
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}>
            <Box>
              <Typography
                sx={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginBottom: '0.25em',
                }}>
                Welcome to
                <br />
                Recipe World
              </Typography>
              <Typography sx={{ fontSize: '2rem', fontWeight: 'light' }}>
                Making healthier food choices is key
                <br />
                to a heart-healthy lifestyle
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ backgroundColor: '#efefef' }}>
        <Container maxWidth='lg'>
          <Grid
            container
            sx={{
              height: '30vh',
              alignItems: 'center',
            }}>
            {serviceCopy.map((copy, index) => (
              <Grid
                item
                xs={4}
                key={index}
                sx={{ padding: '0 1rem' }}>
                <Typography
                  sx={{
                    fontSize: '2.5rem',
                    fontWeight: 'light',
                    marginBottom: '1rem',
                  }}>
                  {copy.title}
                </Typography>
                <Typography sx={{ fontWeight: 'light' }}>
                  {copy.body}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Main
