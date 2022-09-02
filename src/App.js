import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <Form/>
      <ToastContainer/>
    </div>
  );
}

export default App;
