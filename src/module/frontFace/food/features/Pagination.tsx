import React from "react";

const Pagination = ({
  count,
  itemsPerPage,
  activePage,
  setActivePage,
  setItemsPerPage,
  isFieldEmpty,
}) => {
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i);

  const handleItemPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setActivePage(0);
  };

  return (
    pages.length > 0 &&
    isFieldEmpty && (
      <div className="flex flex-wrap justify-center pt-9 gap-3 items-center">
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${
              activePage === page
                ? "bg-primaryColor focus-within:outline-none border-none text-[white]"
                : ""
            }`}
            onClick={() => setActivePage(page)}
          >
            {page + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleItemPerPage} className="p-3">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="19">All</option>
        </select>
      </div>
    )
  );
};

export default Pagination;
