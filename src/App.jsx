import { useEffect, useState } from 'react';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import AuthBox from './components/AuthBox';


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() =>{
    const stored = JSON.parse(localStorage.data || '{}');
    if(stored.email){
      setLoggedIn(true);
      setEmail(stored.email);
    }
  })
  function handleLoginSuccess(user){
    console.log("test");
    setLoggedIn(true);
    setEmail(user.email);
  }
  return (
    <>
      {isLoggedIn ? (
        <div>Login successful : {email}</div>
      ):
      (
        <AuthProvider onLogin={handleLoginSuccess}>
          <AuthBox />
        </AuthProvider>
      )}
    </>
  )
}