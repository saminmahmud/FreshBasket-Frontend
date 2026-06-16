import baseApi from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllDeliveryCharges: builder.query({
      query: () => ({
        url: "/delivery-charges/",
        }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/",
      }),
      providesTags: ["MyOrders"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MyOrders"],
    }),

    getOrderTrack: builder.query({
      query: (trackingId) => ({
        url: `/orders/tracking/${trackingId}/`,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["MyOrders"],
    }),



  }),
});

export const { 
    useGetAllDeliveryChargesQuery,
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderTrackQuery
} = orderApi;