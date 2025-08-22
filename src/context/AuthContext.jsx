import { createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, onLogin }){
    async function handleLogin(e){
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
                onLogin({ email: data.email, token:data.accessToken });
                localStorage.data = JSON.stringify({email:formObj.email, token:data.accessToken})
                
                console.log(data.accessToken);
            }
        })
        // email: 'admin@admin.com',
        // password: 'Admin123!',
    }

    async function handleRegister(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        const res = await fetch('https://notes.muratakdemir.tr/Auth/register',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formObj),
        });
        const data = await res.json();
        console.log("register:", data);
    }
    async function handleReset(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        const res = await fetch('https://notes.muratakdemir.tr/Auth/resetPassword', {
            method:"POST",
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(formObj),
        });
        const data = await res.json();
        console.log("reset : " , data);
    }
    async function handleForgot(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        const res = await fetch('https://notes.muratakdemir.tr/Auth/forgotPassword', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formObj),
        });

        const data = res.json(formObj);
        console.log("forgot password : " , data);
    }


    return(
        <AuthContext.Provider value={{ handleLogin, handleRegister, handleForgot, handleReset }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;