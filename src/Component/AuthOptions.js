import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";

function AuthOptions () {
    const { isUserValid, setIsUserValid } = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push("/signup");
    const login = () => history.push("/signin");
    const home = () => history.push("/home");

    const logout = () => {
        setIsUserValid(false);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        history.push("/");

    };

    return (
        <nav className="auth-options">
            {isUserValid? (
                <>
                <button className="btn btn-dark mr-2" onClick={logout}>Logout</button>
                <button className="btn btn-dark mr-2" onClick={home}>Home</button>
                </>

            ) : (
                <>
                <button className="btn btn-dark mr-2" onClick={register}>Sign Up</button>
                <button className="btn btn-dark mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;