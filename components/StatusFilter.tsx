"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

//define statuses and define how we want them to be displayed
const statuses: { label: string; value?: string }[] = [
  { label: "Open / Started" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <Select
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          const params = new URLSearchParams();

          if (status) params.append("status", status);

          const query = params.size ? `?${params.toString()}` : "0";
          router.push(`./tickets${query}`);
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Status..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status) => (
              <SelectItem key={status.value || "0"} value={status.value || "0"}>
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
