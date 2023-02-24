import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/system'

const Main = () => {
  const serviceCopy = [
    {
      title: '🔎 Search it',
      body: 'Do you want to know how to cook your favourite cuisine? Search any cuisine to discover recipes!',
    },
    {
      title: '💡 Learn it',
      body: 'We provide health information(vegan, dairy-free and more), a list of ingredients with measurements and the best cooking instruction!',
    },
    {
      title: '🧑‍🍳 Cook it',
      body: "After reading the recipe, it's time to cook now! Enjoy your cooking!",
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
            height: {
              xs: 'unset',
              sm: '60vh',
            },
            alignItems: 'center',
            alignContent: {
              xs: 'center',
              sm: 'unset',
            },
            padding: {
              xs: '10rem 0',
              sm: 0,
            },
          }}>
          <Grid
            item
            xs={12}
            sm={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: {
                  xs: '15rem',
                  sm: '100%',
                },
                margin: {
                  xs: '0 auto',
                },
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
            xs={12}
            sm={6}>
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                },
              }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: '3rem',
                    sm: '5rem',
                  },
                  fontWeight: 'bold',
                  lineHeight: '1.2',
                  marginBottom: '0.25em',
                }}>
                Welcome to
                <br />
                Recipe World
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2rem',
                  },
                  fontWeight: 'light',
                }}>
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
              height: {
                xs: 'unset',
                sm: '30vh',
              },
              alignItems: 'center',
              padding: {
                xs: '3rem 0',
                sm: 0,
              },
            }}>
            {serviceCopy.map((copy, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={index}
                sx={{
                  padding: '0 1rem',
                  marginBottom: {
                    xs: serviceCopy.length - 1 !== index && '3rem',
                    sm: 0,
                  },
                }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '1.8rem',
                      sm: '2.5rem',
                    },
                    fontWeight: 'light',
                    marginBottom: {
                      xs: '0.5rem',
                      sm: '1rem',
                    },
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
