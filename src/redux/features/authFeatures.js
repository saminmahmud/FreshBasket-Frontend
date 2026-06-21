import baseApi from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/users/me/",
      keepUnusedDataFor: 0,
      providesTags: ["GetMe"],
    }),

    updateMyImage: builder.mutation({
      query: (data) => ({
        url: "/users/me/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetMe"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",  
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["GetMe"], 
    }),

    getAddress: builder.query({
      query: () => "/address/",
      transformResponse: (res) => res?.[0],
      providesTags: ["GetAddress"],
    }),

    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/address/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetAddress"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["GetMe"],
    }),

    getDeliveryPartners: builder.query({
      query: () => "/users?role=delivery_partner",
    }),

  }),
});

export const { useGetMeQuery, useLoginMutation, useGetAddressQuery, useUpdateAddressMutation, useUpdateMyImageMutation, useLazyGetAddressQuery, useLogoutMutation, useGetDeliveryPartnersQuery } = authApi;