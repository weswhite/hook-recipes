import React, { useEffect } from "react"
import ReactDOM from "react-dom"

const styles = {
  paddingTop: "50px",
  fontFamily: "sans-serif",
  textAlign: "center"
}

function useWindowDimensions() {
  const [width, setWidth] = React.useState(window.innerWidth)
  const [height, setHeight] = React.useState(window.innerHeight)

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", listener)

    return () => {
      window.removeEventListener("resize", listener)
    }
  }, [])

  return {
    width,
    height
  }
}


function App() {
  const { width, height } = useWindowDimensions()

  return (
    <div style={styles}>
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
