const Home = () => {
  // useTitle("Home");

  // const [sCategory, setSCategory] = useState("");
  // const [sSort, setSSort] = useState("");
  // const [sSearch, setSSearch] = useState("");
  // const [sPage, setSPage] = useState(1);

  // const {
  //   data: question,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetPaginationQuestionQuery({
  //   category: sCategory,
  //   sort: sSort,
  //   search: sSearch,
  //   page: sPage,
  // });

  // const {category} = useGetCategoriesQuery("categoryList", {
  //   selectFromResult: ({data}) => ({
  //     category: data?.ids.map((id: any) => data?.entities[id]),
  //   }),
  // });

  // const {primaryColor} = usePrimaryColor();

  // if (!category?.length) {
  //   return <Loading />;
  // }

  // if (isLoading) {
  //   return <Loading />;
  // }

  // const handleCategory = (e: ChangeEvent<any>) => {
  //   setSCategory(e.target.value);
  //   setSSearch("");
  // };

  // let content;

  // if (isError) {
  //   content = (
  //     <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
  //   );
  // }

  // if (isSuccess) {
  //   const {ids} = question;
  //   const tableContent =
  //     ids?.length &&
  //     ids.map((questionId: string) => (
  //       <Question key={questionId} questionId={questionId} />
  //     ));

  //   content = (
  //     <div className="container mx-auto shadow-xl rounded-xl my-10 p-5 text-black dark:text-white">
  //       <h1 className="mb-5 text-2xl font-bold">All Questions</h1>
  //       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
  //         {tableContent}
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <>
  //     <section
  //       className={`max-w-5xl p-6 mx-auto my-20 shadow-md rounded-md bg-${primaryColor}-700 text-black dark:text-white`}
  //     >
  //       <h2 className="text-3xl font-bold capitalize mb-10">Search Question</h2>
  //       <div className="flex items-center justify-between flex-wrap">
  //         <div className="flex-1 w-1/4 mt-5 mx-5">
  //           <span className="mr-3 text-xl">Filters: </span>
  //           <select
  //             name="category"
  //             value={sCategory}
  //             onChange={handleCategory}
  //             className="p-2 w-full text-black"
  //           >
  //             <option value="">All Questions</option>
  //             {category.map((category: {_id: string; name: string}) => (
  //               <option value={"category=" + category._id} key={category._id}>
  //                 {category.name}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //         <div className="flex-1 w-1/4 md:w-2/5 lg:w-4/5 mt-5 mx-5">
  //           <span className="mr-3 text-xl">Search: </span>
  //           <input
  //             type="text"
  //             value={sSearch}
  //             placeholder="Enter your search!"
  //             onChange={(e) => setSSearch(e.target.value.toLowerCase())}
  //             className="p-2 w-full text-black"
  //           />
  //         </div>
  //         <div className="flex-1 w-1/4 md:w-2/5 lg:w-4/5 mt-5 mx-5">
  //           <span className="mr-3 text-xl">Sort By: </span>
  //           <select
  //             value={sSort}
  //             onChange={(e) => setSSort(e.target.value)}
  //             className="p-2 w-full text-black"
  //           >
  //             <option value="">Newest</option>
  //             <option value="sort=oldest">Oldest</option>
  //             <option value="sort=-sold">Best sales</option>
  //             <option value="sort=-price">Price: Hight-Low</option>
  //             <option value="sort=price">Price: Low-Hight</option>
  //           </select>
  //         </div>
  //       </div>
  //     </section>
  //     {content}
  //     <div className="my-5 flex align-center justify-center">
  //       <button
  //         className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
  //         onClick={() => setSPage(sPage + 1)}
  //       >
  //         Load More
  //       </button>
  //     </div>
  //   </>
  // );
  return <></>;
};

export default Home;
