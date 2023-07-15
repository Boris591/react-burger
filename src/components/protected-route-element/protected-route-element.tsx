import {useEffect, useState} from 'react';
import {getUserRequest} from "../../services/actions/auth";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/help-methods";

interface ProtectedRouteElementProps {
    element: React.ReactElement<any, any>;
    auth?: boolean;
    redirect?: string;
}
export function ProtectedRouteElement({ element, auth, redirect }: ProtectedRouteElementProps): JSX.Element | null {
    const user = useSelector((store: any) => store.auth.user);
    const tokenLoad = useSelector((store: any) => store.auth.tokenLoad);
    const dispatch: any = useDispatch();
    const [emptyTokens, setEmptyTokens] = useState(false);


    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if(accessToken && refreshToken){
            dispatch(getUserRequest())
        }else {
            setEmptyTokens(true);
        }
    }, [dispatch]);

    if(tokenLoad || emptyTokens){
        if(!auth && redirect){
            return !user ? element : <Navigate to={redirect} replace/>;
        }

        if(auth && redirect){
            return user ? element : <Navigate to={redirect} replace/>;
        }
    }

    return null;
}

