require("babel-core/register");
require("babel-polyfill");

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './styles.scss';

function App() {
  const query = 'forest'
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    try {
      const fetchPhotos = async() => { 
        const response = await fetch(`http://localhost:3000/photos?query=${query}&page=1&size=50`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json();
        setPhotos(json.results)
      }
      fetchPhotos()
    } catch (error) {
      console.error('Error:', error);
    }
  }, [])

  return (
    <>
      { photos ? 
        <div>
          {photos.map((item) => (
            <div>
              <img src={item.urls.regular} alt={item.alt_description} />
            </div>
          ))}
        </div>
        : <div>Loading</div> 
      }
    </>
  )
}
App.propTypes = {

}
export default App
const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement)

