import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

function App() {
  const columnCount = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );
  let columnHeights = new Array(columnCount).fill(0);
  let columns = new Array(columnCount).fill().map(() => []);

  data.forEach(item => {
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortColumnIndex].push(item);
    columnHeights[shortColumnIndex] += item.height;
  });

  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map(column => (
          <div className="column">
            {column.map(item => (
              <div
                className="image-container"
                style={{
                  // Size image container to aspect ratio of image
                  paddingTop: (item.height / item.width) * 100 + '%'
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

function useMedia(queries, values, defaultValue) {
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [] 
  );

  return value;
}