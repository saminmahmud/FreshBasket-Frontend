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

		addProduct: builder.mutation({
			query: (data) => ({
				url: "/products/",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),

		editProduct: builder.mutation({
			query: ({ id, data }) => ({
				url: `/products/${id}/`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),

		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/products/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Product"],
		}),

	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductDetailsQuery,
	useAddProductMutation,
	useEditProductMutation,
	useDeleteProductMutation
} = productApi;
