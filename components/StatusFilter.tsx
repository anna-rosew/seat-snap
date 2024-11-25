"use client"; // Ensure this file is treated as a client component

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing

const statuses: { label: string; value: string }[] = [
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const selectedStatus = searchParams.get("status") || "";

  const handleChange = (status: string) => {
    searchParams.set("status", status);
    router.push(`/tickets?${searchParams.toString()}`);
  };

  return (
    <div>
      <Select
        value={selectedStatus} // Control the select input with the selected status
        onValueChange={handleChange} // Update the URL when the value changes
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Status..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;
