import { useState } from 'react';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import AuthBox from './components/AuthBox';

const stored = JSON.parse(localStorage.data || '{}');

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  function handleLoginSuccess(user){
    console.log("test");
    setLoggedIn(true);
    setEmail(user.email);

    localStorage.data = JSON.stringify(user)
  }
  return (
    <>
      {isLoggedIn ? (
        <div>Login</div>
      ):
      (
        <AuthProvider onLogin={handleLoginSuccess}>
          <AuthBox />
        </AuthProvider>
      )}
    </>
  )
}