import React from "react";
import { Input } from "./ui/input";
import { SelectDropdown } from "./SelectDropdown";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

function DataToolbar({ handleFilterChange, fetchLogs, onSearchQuery }) {
  const selectDropdowns = [
    {
      label: "level",
      options: ["info", "error", "success"],
    },
    {
      label: "source",
      options: ["all", "api1", "api2", "api3"],
    },
  ];

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          name="logString"
          placeholder="Filter tasks..."
          onChange={(event) => {
            handleFilterChange(event.target);
            onSearchQuery(event.target.value);
          }}
          className="w-[150px] lg:w-[250px]"
        />
        {selectDropdowns.map((select) => (
          <SelectDropdown
            handleFilterChange={handleFilterChange}
            label={select.label}
            options={select.options}
          />
        ))}

        <Input
          name="startTimestamp"
          placeholder="Start Timestamp"
          onChange={(event) => {
            handleFilterChange(event.target);
          }}
          className="w-[100px] lg:w-[200px]"
        />
        <Input
          name="endTimestamp"
          placeholder="End Timestamp"
          onChange={(event) => {
            handleFilterChange(event.target);
          }}
          className="w-[100px] lg:w-[200px]"
        />

        <Button onClick={fetchLogs}>
          Filter <Filter className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default DataToolbar;
