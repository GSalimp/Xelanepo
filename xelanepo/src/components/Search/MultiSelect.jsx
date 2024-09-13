import React, { useState, useEffect } from "react";
import Select from "react-select";

// Function to fetch institutions from the API based on search input
async function fetchInstitutions(searchInput = "", page = 1) {
  try {
    let queryString = "";
    if (searchInput !== "") {
      queryString = `q=${searchInput.trim()}&`;
    }
    const response = await fetch(
      `https://api.openalex.org/institutions?${queryString}page=${page}`
    );
    const data = await response.json();
    let dataToReturn = [];

    if (!data.results) {
      return dataToReturn;
    }

    data.results.forEach((item) => {
      dataToReturn.push({ value: item.id, label: item.display_name });
    });

    return dataToReturn;
  } 
  catch (error) {
    console.error(error);
    return [];
  }
}

export const MultiSelect = ({ selectedOptions, setSelectedOptions }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = async (searchInput, page) => {
    setIsLoading(true);
    const institutions = await fetchInstitutions(searchInput, page);
    console.log(institutions);
    setOptions((prevOptions) => {
      return page === 1 ? institutions : [...prevOptions, ...institutions];
    });
    setIsLoading(false);
  };

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      fetchOptions(newInputValue, 1);
    }
  };

  const loadMoreOptions = async () => {
    const newPage = page + 1;
    setPage(newPage);
    await fetchOptions(inputValue, newPage);
  };

  useEffect(() => {
    fetchOptions("", 1);
  }, []);

  return (
    <>
      <Select
        defaultValue={[]}
        isMulti
        options={options}
        onInputChange={handleInputChange} 
        onChange={(item) => setSelectedOptions(item)}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={isLoading}
        isRtl={false}
        closeMenuOnSelect={false}
        onMenuScrollToBottom={loadMoreOptions}
      />
    </>
  );
};
