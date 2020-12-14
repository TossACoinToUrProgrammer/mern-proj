import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);
    const login = useCallback((jwToken, id)=> {
        setToken(jwToken);
        setUserId(id);

        localStorage.setItem('userData', JSON.stringify({token: jwToken, userId: id}));
    }, []);

    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);

        localStorage.removeItem('userData');
    }, []);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'));

        if(data && data.token){
            login(data.token, data.userId);
        }
        setReady(true);
    }, [login]);

    return { login, logout, token, userId, ready};
}