// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import MainAppBar from './components/MainAppBar';
import MainContainer from './components/MainContainer';
import Config from './Config';

function App() {
  const [config, setConfig] = useState(null);
  useEffect(() => {
    (async () => {
      window.config = await Config();
      setConfig(window.config);
    })();
  }, []);
  return (<div>
    <MainAppBar />
    {config && <MainContainer />}
  </div>
  );
}

export default App;
