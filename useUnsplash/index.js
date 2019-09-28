require("babel-core/register");
require("babel-polyfill");

import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useDebounce } from 'use-debounce';

import './styles.scss';
import Toggle from './components/Toggle'
import useDarkMode from './hooks/use-dark-mode';
import useMedia from './hooks/use-media';

function App() {
  const [query, setQuery] = useState('ocean')
  const [debouncedQuery] = useDebounce(query, 1000);
  const [photos, setPhotos] = useState([])
  const [darkMode, setDarkMode] = useDarkMode()
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2
  );
  const updateQuery = (e) => {
    setQuery(e.target.value)
  }

  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);

  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []);

  photos.forEach(item => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });

  useEffect(() => {
    try {
      const fetchPhotos = async() => { 
        const response = await fetch(`http://localhost:3000/photos?query=${debouncedQuery}&page=1&size=50`, {
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
  }, [debouncedQuery])

  return (
    <>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className="navbar">
        <input type="text" onChange={updateQuery}></input>
      </div>
      {photos ? 
        <div className="columns is-mobile">
        {columns.map((column, i) => (
          <div className="column" key={i}>
            {column.map((item, a) => (
              <div
                className="image-container"
                style={{
                  paddingTop: (item.height / item.width) * 100 + '%'
                }} key={a}>
                <img src={item.urls.regular} alt={item.alt_description} />
              </div>
            ))}
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

