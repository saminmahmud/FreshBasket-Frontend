import { useEffect } from "react";
import { useGetMeQuery } from "../redux/features/authFeatures";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

const Auth = () => {
    const dispatch = useDispatch();
    const { data, isSuccess, isError } = useGetMeQuery();
    
    useEffect(() => {
        console.log("Auth useEffect called");
        if (isSuccess && data) {
            dispatch(setUser(data));
        }
        if (isError) {
			dispatch(setUser(null));
		}
    }, [data, isSuccess, isError, dispatch]);

    console.log("Cookie: ", document.cookie);
    
    return null;
}

export default Auth
