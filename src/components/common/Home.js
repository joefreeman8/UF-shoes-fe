import { Button, CardActions } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import '../../styles/Home.scss'

function Home() {
  const navigate = useNavigate()
  const goToIndex = () => navigate('/shop')


  return (
    <section className='home'>
      <div className='welcome'>
        <h1>Welcome to !ezis clothing</h1>
        <p>Your favourite streetwear retailer</p>
        <CardActions>
          <Button
            size="large"
            onClick={goToIndex}
            sx={{
              color: 'black'
            }}
          >
            enter
          </Button>
        </CardActions>
      </div>
    </section>
  )
}

export default Home