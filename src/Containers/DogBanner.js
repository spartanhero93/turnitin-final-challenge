import { useEffect, useState } from 'react'

export default function DogBanner() {
  const [dogImg, getDogImg] = useState({})

  useEffect(() => {
    async function fetchDogImg() {
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await res.json()
      getDogImg(data)
    }
    fetchDogImg()
  }, [])

  return(
    <div>
      {dogImg.status === 'success' ? 
          <div>
            <img src={dogImg.message} alt={dogImg.message}></img>
            <h2>Cute Dog links</h2>
          </div>
          : <h2>Loading....</h2>
        }
    </div>
  )
}