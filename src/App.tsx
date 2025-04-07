import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main className='main'>
        <Outlet /> {}
      </main>
    </>
  );
}

export default App;
