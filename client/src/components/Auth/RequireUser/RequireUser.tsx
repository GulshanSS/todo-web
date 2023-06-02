import { useCookies } from "react-cookie";
import { userApi } from "../../../redux/api/userApi";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireUser = () => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getUser.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getUser.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  if (loading) {
    return (
      <>
        <div className="w-screen h-screen flex justify-center items-center">
          <h1>Loading</h1>
        </div>
      </>
    );
  }

  return (
    <>
      {cookies.logged_in || user ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireUser;
