import baseApi from "../baseApi";

const productApi = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: ({page = 1, category = "", min_price = "", max_price = "", ordering = "", search = ""}) => ({
				url: "/products/",
				params: { page, category, min_price, max_price, ordering, search },
			}),
			providesTags: ["Product"],
		}),
		getProductDetails: builder.query({
			query: (id) => ({
				url: `/products/${id}/`,
			}),
			providesTags: ["Product"],
		}),

	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductDetailsQuery,
} = productApi;
