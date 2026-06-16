

const Pagination = ({ totalPages, productsData, page, setPage }) => {
	return (
		<>
			<div
				id="pagination"
				className="flex items-center justify-center gap-2 mt-10 "
			>
				<button disabled={page===1} onClick={()=>setPage(page-1)} className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
					Previous
				</button>
				{/* <button className="px-3 py-1.5 rounded-md border border-green-800 bg-green-800 text-sm text-white">
					1
				</button> */}
				{
					Array.from(
						{length: totalPages},
						(_, index)=>(
							<button
								key={index}
								onClick={()=>setPage(index+1)}
								className={
									page===index+1
									? "bg-green-800 text-white px-3 py-2 rounded"
									: "border px-3 py-2 rounded"
								}
							>
								{index+1}
							</button>
						)
					)
				}
				<button disabled={!productsData?.next} onClick={()=>setPage(page+1)} className="px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
					Next
				</button>
			</div>
		</>
	);
};

export default Pagination;
