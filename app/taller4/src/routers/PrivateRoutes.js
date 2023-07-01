import { Navigate, Outlet } from 'react-router-dom';
import context from '../context/UserContext';

const PrivateRoutes = () => {
    let auth = {'token':false}
    if (context.getToken() == null) {
        auth.token = false;
    }else{
        auth.token = true;
    }
    
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
}
export default PrivateRoutes;