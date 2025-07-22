import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, onLogin }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        console.log(formObj)

        fetch('https://notes.muratakdemir.tr/Auth/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formObj.email,
                password: formObj.password,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if(data.accessToken){
                onLogin({ email: data.email });
                console.log(data.accessToken);
            }
        })
        // email: 'admin@admin.com',
        // password: 'Admin123!',
    }

    return(
        <AuthContext.Provider value={{ email, handleSubmit }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;