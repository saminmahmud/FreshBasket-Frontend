import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../redux/features/authFeatures";
import PageLoader from "../components/reusable/PageLoader";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { data: user, isLoading, isFetching } = useGetMeQuery();

  if (isLoading || isFetching) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;