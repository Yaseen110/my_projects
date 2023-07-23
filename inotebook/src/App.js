import { Provider } from 'react-redux';
import './App.css';
import Bank from './components/Bank';
import Navbar from './components/Navbar';
import { store } from './state/store';
function App() {
  return (
    <>
    <Provider store={store}>
      <Navbar/>
      <Bank/>
    </Provider>
    </>
  );
}

export default App;
