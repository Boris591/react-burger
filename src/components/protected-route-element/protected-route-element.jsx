import {useEffect, useState} from 'react';
import {getTokenRequest} from "../../services/actions/auth";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/help-methods";

export function ProtectedRouteElement({ element, auth, redirect }) {
    const user = useSelector(store => store.auth.user);
    const tokenLoad = useSelector(store => store.auth.tokenLoad);
    const dispatch = useDispatch();
    const [emptyTokens, setEmptyTokens] = useState(false);


    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if(accessToken && refreshToken){
            dispatch(getTokenRequest())
        }else {
            setEmptyTokens(true);
        }
    }, [dispatch]);

    if(tokenLoad || emptyTokens){
        if(!auth){
            return !user ? element : <Navigate to={redirect} replace/>;
        }

        if(auth){
            return user ? element : <Navigate to={redirect} replace/>;
        }
    }
}
