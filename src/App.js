import {useState} from 'react'
import './App.css';

function App() {
  const [dogs, getDogs] = useState({})

  async function fetchDogImg() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await res.json()
    getDogs(data)
  }
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={() => fetchDogImg()}>Fetch that data</button>
      <button onClick={() => console.log(dogs)}>log the state</button>

      <div>
        {dogs.status === 'success' ? 
          <div>
            <img src={dogs.message} alt='dogs.message'></img>
            <h3>Cute Doggo</h3>
          </div>
          : <h2>Loading....</h2>
        }
      </div>
    </div>
  );
}

export default App;
