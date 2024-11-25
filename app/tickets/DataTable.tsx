import { Ticket } from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const DataTable = async ({ tickets, searchParams }: Props) => {
  // Await searchParams
  const { orderBy, status, page } = await searchParams;

  const buildQuery = (newOrderBy: string) => {
    const queryParams = new URLSearchParams();
    queryParams.set("orderBy", newOrderBy);

    if (status) {
      queryParams.set("status", status);
    }

    queryParams.set("page", String(page));

    return queryParams.toString(); // Converts the query to a string that can be used in the Link
  };

  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={`./tickets?${buildQuery("title")}`}>Title</Link>
                {orderBy === "title" && <ArrowDown className="inline p-1" />}
              </TableHead>
              <TableHead>
                <Link href={`./tickets?${buildQuery("status")}`}>Status</Link>
                {orderBy === "status" && <ArrowDown className="inline p-1" />}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={`./tickets?${buildQuery("priority")}`}>
                    Priority
                  </Link>
                  {orderBy === "priority" && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <Link href={`./tickets?${buildQuery("createdAT")}`}>
                  Created at
                </Link>
                {orderBy === "createdAT" && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} data-href="/">
                <TableCell>
                  <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </TableCell>
                <TableCell className="justify-center">
                  <TicketStatusBadge status={ticket.status} />
                </TableCell>
                <TableCell className="justify-center">
                  <TicketPriority priority={ticket.priority} />
                </TableCell>
                <TableCell>
                  {dayjs(ticket.createdAT).format("DD/MM/YY hh:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
