import React, { useEffect, useState } from 'react';

export default function FilterBar({ className, config, valuesCallback, ...props }) {
  const [apiData, setApiData] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({})

  useEffect(() => {
    config && config.map((item) => {
        makeApisCallForData(item);
    });
  }, [config]);

  useEffect(() => {
    valuesCallback(selectedFilters);
  }, [selectedFilters]);
  
  const makeApisCallForData = (filterObj) => {
    if(filterObj?.endpoint) {
        axios.get(filterObj.endpoint).then(response => {
            if (response?.data?.status && response?.data?.status == 'success') {
                const api = response?.data?.data.map(item => {
                    return item;
                })
                setApiData({...apiData, [filterObj.id]: api});
            }
        })
    };
  };
  const updateFilterValues = (key, value) => {
    setSelectedFilters({...selectedFilters, [key]: value})
    valuesCallback(selectedFilters);
  }
  const renderInput = (obj) => {
    switch (obj.type) {
        case 'select':
          return (
            <div key={obj.id} className="flex items-center px-2 space-x-2">
              <label htmlFor={obj.label} className="text-sm font-bold text-gray-600">{obj.label}</label>
              <select
                id={obj.id}
                value={selectedFilters[obj.id]}
                onChange={(e) => {
                  updateFilterValues(obj.id, e.target.value);
                }}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ` + obj.className}
              >
                <option key='all' value="all">All</option>
                
                {/* Dynamically populate the options. */}
                {apiData && (
                  apiData[obj.id]?.map(x => {
                    return <option key={x.value} value={x.value}>{x.label}</option>;
                  })
                )}
              </select>
            </div>
          );
        case 'text':
          return (
            <div key={obj.id} className="flex items-center px-2 space-x-2">
              <label htmlFor={obj.label} className="text-sm font-bold text-gray-600">{obj.label}</label>
              <input
                type="text"
                id={obj.id}
                placeholder={obj.placeholder || null}
                name={obj?.name || obj.id}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ` + obj.className}
                onChange={(e) => {
                  updateFilterValues(obj.id, e.target.value);
                }}
              />
            </div>
          );
        case 'date':
          return (
            <div key={obj.id} className="flex items-center px-2 space-x-2">
              <label htmlFor={obj.label} className="text-sm font-bold text-gray-600">{obj.label}</label>
              <input
                type="text"
                id={obj.id}
                placeholder={obj.placeholder || null}
                name={obj?.name || obj.id}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ` + obj.className}
                onChange={(e) => {
                  updateFilterValues(obj.id, e.target.value);
                }}
              />
            </div>
          );
        case 'checkbox':
          return (
            <div key={obj.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={obj.id}
                checked={selectedFilters[obj.id] || false}
                onChange={(e) => {
                  updateFilterValues(obj.id, e.target.checked);
                }}
                className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor={obj.id} className="text-sm font-medium text-gray-600">{obj.label}</label>
            </div>
          );
        default:
          break;
    }
  }
  // Handle changes
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleAvailableChange = () => setAvailable(!available);
  const handleDateRangeChange = (e) => setDateRange(e.target.value);

  return (
    <div className={`w-full flex flex-wrap items-center p-4 bg-white mr-auto rounded-lg shadow-md ` + className}>
      {/* <div className="flex items-center space-x-2">
        <label htmlFor="search" className="text-sm font-medium text-gray-600">Search</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="available"
          checked={available}
          onChange={handleAvailableChange}
          className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="available" className="text-sm font-medium text-gray-600">Available Only</label>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="dateRange" className="text-sm font-medium text-gray-600">Date Range</label>
        <input
          type="text"
          id="dateRange"
          value={dateRange}
          onChange={handleDateRangeChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="MM/DD/YYYY - MM/DD/YYYY"
        />
      </div> */}
      {config && config.map((c) => renderInput(c))}
      {/* Apply Filters Button */}
      <div className="inline-flex mt-4 ml-auto space-x-4 sm:mt-0">
        <button className="justify-end px-6 py-2 ml-auto text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Apply Filters
        </button>
      </div>
    </div>
  );
};
