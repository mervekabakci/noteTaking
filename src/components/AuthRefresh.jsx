import { useEffect } from "react"

export default function AuthRefresh({ setUser, logout}){
    useEffect(() => {
        const stored = localStorage.getItem("data");
        if (!stored) return;

        const parsed = JSON.parse(stored);
        const refreshToken = parsed?.refreshToken;
        if (!refreshToken) return;

        const refresh = async () => {
            try{
                const res= await fetch('https://notes.muratakdemir.tr/Auth/refresh', {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({ refreshToken })
                })

                if(!res.ok){
                    console.warn("Refresh token failed");
                    localStorage.removeItem("data");
                    logout?.();
                    return;
                }

                const data = await res.json();

                const UpdatedUser = {
                    ...parsed,
                    token: data.accessToken,
                    resfreshToken:data.refreshToken,
                };
                localStorage.setItem("data", JSON.stringify(UpdatedUser));
                setUser?.(UpdatedUser);
                
            }catch(err){
                console.error("Error refresh token :" , err);
                localStorage.removeItem("data");
                logout?.();
            }
        }
        refresh();
    }, [setUser, logout])

    return null;
}