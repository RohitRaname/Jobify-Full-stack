import React from "react";
import { useAppContext } from "../context/AppContext";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    jobTypeOptions,
    statusOptions,
    sortOptions,
    searchText,
    searchJobStatus,
    searchJobType,
    searchSort,
    handleChange,

    isLoading,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    const { name, value } = e.target;

    // i dont want to allow search when result are being fetched
    if (isLoading) return;

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Search Form</h3>
        <div className="form-center">
          <FormRow
            name="searchText"
            labelText="search"
            type="text"
            value={searchText}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="searchJobStatus"
            labelText="status"
            value={searchJobStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            name="searchJobType"
            labelText="type"
            value={searchJobType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="searchSort"
            labelText="sort"
            value={searchSort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={clearFilters}
            disabled={isLoading}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
