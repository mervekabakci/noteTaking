import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"

export default function AuthBox(){
    const { handleLogin, handleRegister, handleForgot, handleReset, loading, dialog, setDialog } = useContext(AuthContext);
    const [mode, setMode] = useState("login");

    function handleSubmit(e){
        if(mode === "login") handleLogin(e);
        if(mode === "register") handleRegister(e);
        if(mode === "forgot") handleForgot(e);
        if(mode === "reset") handleReset(e);
    }
    
    return(
        <div className="authContainer">
            {loading && <div className="loading">Loading ...</div>}

            {dialog && (
                <dialog open>
                    <div>uyarı icon</div>
                    <p>{dialog}</p>
                    <button onClick={() => 
                        {setDialog(null);
                        setMode("login");}
                        }>OK</button>
                </dialog>
            )}
            
            <div className="authHead">
                <div className="logo">Note Logo</div>
                <div className="title">
                    {
                        (mode === "login") && ("Welcome to Note") ||
                        (mode === "register") && ("Create Your Account") ||
                        (mode === "forgot") && ("Forgotten your password?") ||
                        (mode === "reset") && ("Reset Your Password")
                    }
                </div>
                <div className="text">
                    {
                        (mode === "login") && ('Please log in to continue') ||
                        (mode === "register") && ('Sign up to start organizing your notes and boost your productivity.') ||
                        (mode === "forgot") && ('Enter your email below, and we’ll send you a link to reset it.') ||
                        (mode === "reset") && ("Choose a new password to secure your account.")
                    }
                    

                </div>
            </div>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <div className="inputColumn">
                    {mode !== "reset" &&
                        <>
                            <label>Email Address</label>
                            <br />
                            <input type="email" name='email' placeholder='E-mail adresi' />
                        </>
                    }
                </div>
                <br />
                {(mode === "login" || mode === "register" || mode === "reset") && (
                    <>
                        <div className="inputColumn">
                            <div>
                                <label>{mode === "reset" ? "New Password" : "Password"}</label>
                                {mode === "login" && (<a onClick={() => setMode("forgot")}>Forgot</a>)}
                            </div>
                            <br />
                            <input type="password" name='password' placeholder='Password' />
                        </div> 
                    </>
                )}
                {mode === "reset" && (
                    <>
                        <label>Confirm Password</label>
                        <br />
                        <input type="password" name='confirmPassword' placeholder='Confirm' />
                    </>
                )}
                <br />
                <button>
                    {mode === "login" ? "Login" : mode === "register" ? "Sign Up" : mode === "forgot" ? "Send Reset Link" : "Reset Password" }
                </button>

                <br />
                <br />

                {(mode === "login" || mode === "register") && (
                    <>
                        <span>Or log in with</span>
                        <br />
                        <a href="#">Google</a>
                    </>
                )}

                <br />
                <br />

                {/* Login moddayken kayıt ol butonu gozukur */}
                {mode === "login" && (
                    <>
                        <div className=""><span>No account yet?</span><button type="button" onClick={() => setMode("register")}>Sign Up</button></div>
                    </>
                )}
                {/* kayıt ol moddayken login butonu gozukur */}
                {mode === "register" && (
                    <>
                        <div className=""><span>Already have an account?</span><button type="button" onClick={() => setMode("login")}>Login</button></div>
                    </>
                )}
            </form>
        </div>
    )
}