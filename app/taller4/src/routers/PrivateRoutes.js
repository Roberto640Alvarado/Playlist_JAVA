import { Navigate, Route } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function PrivateRoute({ path, element }) {
  const { isUserLogged } = useContext(UserContext) || {};

  if (isUserLogged) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
