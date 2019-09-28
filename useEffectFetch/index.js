import React from "react";
import ReactDOM from "react-dom";

//https://www.robinwieruch.de/react-hooks-fetch-data

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
}

function App() {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [post, setPost] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)

    fetchPost(postIds[index])
      .then((post) => {
        setPost(post)
        setError(null)
        setLoading(false)
      })
      .catch((e) => {
        console.warn(e.message)
        setError('Error fetching data. Try again.')
        setLoading(false)
      })
  }, [index])

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
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }


  return (
    <div style={{textAlign: "center"}}> 
      <h1>{post.title}</h1>
      <p>{post.body}</p>
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
