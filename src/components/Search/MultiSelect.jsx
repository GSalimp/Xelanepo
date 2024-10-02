import React, { useState, useEffect } from "react";
import Select from "react-select";

// Function to fetch institutions from the API based on search input
async function fetchInstitutions(searchInput = "") {
  try {
    let queryString = "";
    if (searchInput !== "") {
      queryString = `q=${searchInput.trim()}&`;
    }

    const response = await fetch(
      `https://api.openalex.org/autocomplete/institutions?${queryString}`
    );
    const data = await response.json();
    let dataToReturn = [];

    if (!data.results) {
      return dataToReturn;
    }

    data.results.forEach((item) => {
      dataToReturn.push({
        value: item.id.split("/").pop(),
        label: item.display_name,
      });
    });

    return dataToReturn;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const MultiSelect = ({ selectedOptions, setSelectedOptions }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = async (searchInput) => {
    setIsLoading(true);
    const institutions = await fetchInstitutions(searchInput);
    setOptions(institutions);
    setIsLoading(false);
  };

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      fetchOptions(newInputValue);
    }
  };

  const loadMoreOptions = async () => {
    await fetchOptions(inputValue);
  };

  useEffect(() => {
    fetchOptions("");
  }, []);

  return (
    <>
      <Select
        value={selectedOptions} // Bind value to selectedOptions state
        isMulti
        options={options}
        onInputChange={handleInputChange} // Fetch data on input change
        onChange={(item) => setSelectedOptions(item)}
        className="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={isLoading}
        isRtl={false}
        closeMenuOnSelect={false}
        onMenuScrollToBottom={loadMoreOptions} // Load more on scroll
        filterOption={null} // Disable internal filtering
      />
    </>
  );
};
