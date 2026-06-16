import baseApi from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories/",
        }),
        providesTags: ["Category"],
    }),

  }),
});

export const { 
    useGetAllCategoriesQuery 
} = categoryApi;