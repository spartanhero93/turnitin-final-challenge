import {useState} from 'react'
import './App.css';

function App() {
  const [dogImg, getDogImg] = useState({})
  const [dogLinks, getDogLinks] = useState([])

  async function fetchDogImg() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json()
    getDogImg(data)
  }
  async function getMultiple() {
    const promises = []
    for(let i = 0; i < 10; i++){
      promises.push(await fetch('https://dog.ceo/api/breeds/image/random'))
    }
    const links = await Promise.all(promises.map(request => request.json()))
    getDogLinks(links)
  }
  function getBreedInfo(arrayOfLinks){
    
  }
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={() => fetchDogImg()}>Fetch that data</button>
      <button onClick={() => getMultiple()}>log the state</button>

      
        {dogImg.status === 'success' ? 
          <div>
            <img src={dogImg.message} alt='dogs.message'></img>
            <h3>Cute Doggo</h3>
          </div>
          : <h2>Loading....</h2>
        }
        <div>
          {dogLinks.length ? 
          <ul>
            {dogLinks.map(i => <li><a href={i.message}>test</a></li>)}
          </ul>  
          : ''
        }
      </div>
    </div>
  );
}

export default App;
