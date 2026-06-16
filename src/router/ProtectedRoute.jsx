import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../redux/features/authFeatures";
import PageLoader from "../components/reusable/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, isFetching } = useGetMeQuery();

  if (isLoading || isFetching) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;