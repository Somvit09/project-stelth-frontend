import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './Components/SignInPage/SignInPage';
import LayoutPage  from './Components/Layout/LayoutPage';

function App() {
  return (
    // <div
    //   style={{
    //     width: '100vw',
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Sidenav />
    // </div>
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/merchant' element={<LayoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
