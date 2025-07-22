import { useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function AuthBox(){
    const { email, password, handleSubmit } = useContext(AuthContext);
    return(
        <form onSubmit={handleSubmit} autoComplete='off'>
            <input type="email" name='email' placeholder='E-mail adresi' />
            <br /><br />
            <input type="password" name='password' placeholder='Password' />
            <br /><br />
            <button>Login</button>
        </form>
    )
}