import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <Content />
    </div>
  );
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');

  const prefersDarkMode = usePrefersDarkMode();

  const enabled =
    typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;

  useEffect(
    () => {
      const className = 'dark-mode';
      const element = window.document.body;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] 
  );

  return [enabled, setEnabledState];
}
function usePrefersDarkMode() {
  return useMedia(['(prefers-color-scheme: dark)'], [true], false);
}
