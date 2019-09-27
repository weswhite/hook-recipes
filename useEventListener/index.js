import React , { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

function App(){
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  
  const handler = useCallback(
    ({ clientX, clientY }) => {
      setCoords({ x: clientX, y: clientY })
    },
    [setCoords]
  )
  
  useEventListener('mousemove', handler)
  
  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  )
}

function useEventListener(eventName, handler, element = window){
  const savedHandler = useRef()
  
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return
      const eventListener = event => savedHandler.current(event)
      element.addEventListener(eventName, eventListener)
      return () => {
        element.removeEventListener(eventName, eventListener)
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)