import FetchError from "../../reusable/FetchError"
import Loader from "../../reusable/loader"


const CategoryList = ({ categoriesData, categoryLoading, categoryError, selectedCategory, setSelectedCategory }) => {
  return (
    <div 
    id="categoryList"
    className="space-y-1 overflow-y-auto max-h-60 px-1 h-full"
    >
      {
        categoryLoading ? (
            <Loader w={8} />
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
            <>
            {categoriesData.map((category) => (
                <button 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name === selectedCategory ? "" : category.name)}
                    // className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors px-2 py-1"
                     className={`w-full text-left px-2 py-1 rounded-lg transition
                      ${
                        selectedCategory === category.name
                          ? "bg-green-800 text-white"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                >
                    {category.name}
                </button>
            ))}
          </>
        )
    }
    </div>
  )
}

export default CategoryList
