import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleRoute = ({ roles, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;