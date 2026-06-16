import FetchError from "../../reusable/FetchError"
import Loader from "../../reusable/loader"


const BrowseCategories = ({ categoriesData, categoryLoading, categoryError }) => {
  return (
    <>
    <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Browse Categories</h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">Find exactly what you need</p>
    </div>

    
    {
        categoryLoading ? (
            <Loader />
        ) : categoryError ? (
            <FetchError />
        ) : categoriesData.length === 0 ? (
            <div id="emptyState" className="hidden text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <p className="text-gray-600 font-bold text-xl">
                    No categories found
                </p>
            </div>
          ) : (
            <div className="overflow-x-hidden">
                <div
                    className="flex gap-3 sm:gap-4 overflow-x-auto pb-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categoriesData.map((category) => (
                        <div
                            key={category.id}
                            className="group mt-1 flex-shrink-0 w-[90px] sm:w-[110px] md:w-[130px] bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col items-center gap-1.5 sm:gap-2 border border-gray-100 hover:border-green-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl overflow-hidden">
                                <img
                                    src={category.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    alt={category.name}
                                />
                            </div>
                            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 text-center leading-tight">
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    </>
  )
}

export default BrowseCategories
