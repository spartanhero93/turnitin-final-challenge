import { useEffect, useState } from 'react'
import styled from 'styled-components'


const Card = styled.div`
  height: 200px;
  width: 200px;
  margin: 0 20px 20px;

  @media only screen and (max-width: 500px){
    height: 100px;
    width: auto;
  }

  a {
    font-size: 24px;
    text-transform: capitalize;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 500px){
    justify-content: center;
  }
`

export default function MultipleDogLinks () {
  const [dogLinks, getDogLinks] = useState([])

  

  useEffect(() => {
    async function getMultiple () {
      const promises = []
      for (let i = 0; i < 10; i++) {
        promises.push(await fetch('https://dog.ceo/api/breeds/image/random'))
      }
      // create an array of promises to be resolved
      const links = await Promise.all(promises.map(request => request.json()))
      // Map through each item, and add a breed prop, swap the - for spaces
      links.map(i => (i.breed = i.message.split('/')[4].replace('-', ' ')))
      console.log(links)
      getDogLinks(links)
    }
    getMultiple()
  }, [])


  return (
    <div>
      {dogLinks.length ? (
        <Container>
          {dogLinks.map(i => (
            <Card key={i.breed}>
              <a href={i.message}>{i.breed}</a>
            </Card>
          ))}
          </Container>
      ) : (
        ''
      )}
    </div>
  )
}
