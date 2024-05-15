import React, { useCallback, useState } from "react";

function QueryResponse() {
  const [filters, setFilters] = useState({
    level: "",
    logString: "",
    timestamp: "",
    source: "",
  });

  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  return <div>Hello</div>;
}

export default QueryResponse;
