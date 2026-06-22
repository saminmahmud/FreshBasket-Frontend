import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./slices/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const isGetMe = typeof args === "string"
      ? args.includes("/users/me/")
      : args?.url?.includes("/users/me/");

    if (isGetMe) {
      return { data: null }; // ✅ error না, শুধু null return
    }
    
    const refreshResult = await baseQuery(
      {
        url: "/auth/token/refresh/",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }


  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Category", "Product", "GetMe", "GetAddress", "MyOrders", "GetDeliveryPartners"],
  endpoints: () => ({}),
});

export default baseApi;
