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

    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

  }),
});

export const { 
    useGetAllCategoriesQuery,
    useAddCategoryMutation
} = categoryApi;