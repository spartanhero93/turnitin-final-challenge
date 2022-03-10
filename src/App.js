import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [dogImg, getDogImg] = useState({})
  const [dogLinks, getDogLinks] = useState([])

  useEffect(() => {
    async function fetchDogImg() {
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await res.json()
      getDogImg(data)
    }
    fetchDogImg()

    async function getMultiple() {
      const promises = []
      for(let i = 0; i < 10; i++){
        promises.push(await fetch('https://dog.ceo/api/breeds/image/random'))
      }
      // create an array of promises to be resolved
      const links = await Promise.all(
        promises.map(request => request.json())
      )
      // Map through each item, and add a breed prop, swap the - for spaces
      links.map(i => i.breed = i.message.split('/')[4].replace('-', ' '))
      console.log(links)
      getDogLinks(links)
    }
    getMultiple()
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
        {dogImg.status === 'success' ? 
          <div>
            <img src={dogImg.message} alt={dogImg.message}></img>
            <h3>Cute Doggo</h3>
          </div>
          : <h2>Loading....</h2>
        }
        <div>
          {dogLinks.length ? 
          <ul>
            {dogLinks.map(i => 
              <li key={i.breed}>
                <a href={i.message}>{i.message}</a>
                <p>{i.breed}</p>
              </li>)}
          </ul>  
          : ''
        }
      </div>
    </div>
  );
}

export default App;
