import {useEffect, useState} from 'react';
import {getUserRequest} from "../../services/actions/auth";
import {Navigate} from "react-router-dom";
import {useSelector} from "../../services/types/hooks";
import {useDispatch} from "../../services/types/hooks";
import {getCookie} from "../../utils/help-methods";
import {RootState} from "../../services/types";

interface ProtectedRouteElementProps {
    element: React.ReactElement<any, any>;
    auth?: boolean;
    redirect?: string;
}
export function ProtectedRouteElement({ element, auth, redirect }: ProtectedRouteElementProps): JSX.Element | null {
    const user = useSelector((store: RootState) => store.auth.user);
    const tokenLoad = useSelector((store: RootState) => store.auth.tokenLoad);
    const dispatch = useDispatch();
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

