import { useEffect, useState } from 'react';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import AuthBox from './components/AuthBox';
import { NoteProvider } from './context/NoteContext';
import NoteBox from './components/NoteBox';


export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const stored = JSON.parse(localStorage.getItem("data") || '{}');
    if(stored.email && stored.token){
      setLoggedIn(true);
      // setEmail(stored.email);
      setUser(stored);
    }
  }, []);

  function handleLoginSuccess(user){
    console.log("test");
    setLoggedIn(true);
    // setEmail(user.email);
    setUser(user)
  }
  return (
    <>
      {isLoggedIn ? (
        <div>Login successful : {user.email}
         <NoteProvider user={user}>
            <NoteBox />
          </NoteProvider>
      </div>
      ):
      (
        <AuthProvider onLogin={handleLoginSuccess}>
          <AuthBox />
        </AuthProvider>
      )}
    </>
  )
}