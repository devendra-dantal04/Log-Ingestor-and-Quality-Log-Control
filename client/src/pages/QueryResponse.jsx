import React, { useCallback, useEffect, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import DataToolbar from "@/components/DataToolbar";
import { useToast } from "@/components/ui/use-toast";
import RequestToolbar from "@/components/RequestToolbar";

const logColumns = [
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "log_string",
    header: "Log String",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "metadata.source",
    header: "Source",
  },
];

function QueryResponse() {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    level: "",
    logString: "",
    startTimestamp: "",
    endTimestamp: "",
    source: "all",
  });

  const handleFilterChange = useCallback((event) => {
    const { name, value } = event;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  const [logsData, setLogsData] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const onSearchQuery = (query) => {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(escapedQuery, "i");

    const filteredLogs = logsData.filter((log) => regex.test(log.log_string));

    setFilteredLogs(filteredLogs);
  };

  const fetchLogs = async () => {
    try {
      const logs = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/logs?level=${filters.level}&q=${
          filters.logString
        }&source=${filters.source}&startTime=${
          filters.startTimestamp
        }&endTime=${filters.endTimestamp}`
      );

      const res = await logs.json();

      if (res.response == "ok") {
        toast({
          title: "Request Successful",
          description: "Successfully fetched the logs for given query",
        });

        setLogsData(res.logs.reverse());
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Unable fetched the logs for given query",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <>
      <RequestToolbar />
      <DataToolbar
        handleFilterChange={handleFilterChange}
        fetchLogs={fetchLogs}
        onSearchQuery={onSearchQuery}
      />
      <DataTable
        data={filters.logString === "" ? logsData : filteredLogs}
        columns={logColumns}
      />
    </>
  );
}

export default QueryResponse;
