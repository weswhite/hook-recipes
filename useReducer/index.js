import React from "react";
import ReactDOM from "react-dom";

function fetchReducer (state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loading: true
    }
  } else if (action.type === 'success') {
    return {
      data: action.data,
      error: null,
      loading: false
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: 'Error fetching data. Try again',
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

function useFetch (url) {
  const [state, dispatch] = React.useReducer(
    fetchReducer, 
    { data: null, error: null, loading: true }
  )

  React.useEffect(() => {
    dispatch({ type: 'fetch' })

    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'success', data }))
      .catch((e) => {
        console.warn(e.message)
        dispatch({ type: 'error' })
      })
  }, [url])

  return {
    loading: state.loading, 
    data: state.data,
    error: state.error
  }
}

const postIds = [1,2,3,4,5,6,7,8]

function App() {
  const [index, setIndex] = React.useState(0)

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )

  const incrementIndex = () => {
    setIndex((i) => 
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 
        ? <p>No more posts</p>
        : <button onClick={incrementIndex}>
            Next Post
          </button>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
