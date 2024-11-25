import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

// Interface for search params coming from the URL
export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  // Await searchParams to access its properties properly
  const searchParamsResolved = await searchParams;

  // Destructure after resolving searchParams
  const {
    page = "1",
    status = "OPEN", // Default to OPEN if no status is passed
    orderBy = "createdAT", // Default to createdAT if no orderBy is passed
  } = searchParamsResolved || {};

  const pageSize = 10;
  const pageNum = parseInt(page, 10);

  // Handle invalid status (fallback to OPEN if not valid)
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : "OPEN"; // Fallback to OPEN if invalid

  // Set the filter conditions for the query
  let where = {};
  if (validStatus) {
    where = { status: validStatus };
  } else {
    where = { NOT: [{ status: "CLOSED" as Status }] };
  }

  // Count the tickets for pagination
  const ticketCount = await prisma.ticket.count({ where });

  // Fetch the tickets based on the pagination and filters
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (pageNum - 1) * pageSize,
    orderBy: orderBy ? { [orderBy]: "asc" } : undefined, // Optional order by query
  });

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/tickets/New"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
        {/* Render StatusFilter here */}
        <StatusFilter />
      </div>

      {/* Pass tickets and resolved searchParams to DataTable */}
      <DataTable tickets={tickets} searchParams={searchParamsResolved} />

      {/* Pagination component to navigate through pages */}
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={pageNum}
      />
    </div>
  );
};

export default Tickets;
