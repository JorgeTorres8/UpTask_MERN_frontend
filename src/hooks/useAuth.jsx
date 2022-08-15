import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => { //428
    return useContext(AuthContext);
}

export default useAuth;