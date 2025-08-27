import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, onLogin }){
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(null)
  
    async function apiRequest(endpoint, body){
        try{
            setLoading(true);
            const res = await fetch(`https://notes.muratakdemir.tr/Auth/${endpoint}`,{
                method: 'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(body),
            });

            if(!res.ok){
                throw new Error(`HPPT error! status ${res.status}`);
            }

            const text = await res.text();
            return text ? JSON.parse(text) : {};
            // return await res.json();
        }
        catch (err){
            console.error("API Error:", err);
            return{error:err.message}
        } finally {
            setLoading(false);
        }
    }
    async function handleLogin(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        console.log(formObj)
        const data = await apiRequest("login",{
            email:formObj.email,
            password:formObj.password,
        });

        if(data.accessToken){
            onLogin({ email: formObj.email, token:data.accessToken });
            localStorage.data = JSON.stringify({email:formObj.email, token:data.accessToken})
            
            console.log(data.accessToken);

            setDialog("Login successfull!")
        } else if(data.error){
            setDialog("Login failed :" + data.error);
        }
      
        // email: 'admin@admin.com',
        // password: 'Admin123!',
    }

    async function handleRegister(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        const data = await apiRequest("register", {
            email:formObj.email,
            password:formObj.password
        });
        
        console.log("register:", data);
        if(data.error){
            setDialog("register failed :" + data.error)
        }else{
            setDialog("Register successful! You can now log in.");
        }
    }
    async function handleReset(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        const data = apiRequest("register", formObj)
        console.log("reset : " , data);
    }
    async function handleForgot(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);

        const data = apiRequest("forgot", {
            email:formObj.email
        });
        console.log("forgot password : " , data);
    }


    return(
        <AuthContext.Provider value={{ handleLogin, handleRegister, handleForgot, handleReset, loading, dialog, setDialog }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;