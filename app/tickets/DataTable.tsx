import { Ticket } from "@prisma/client";
import TicketStatusBadge from "@/Components/TicketStatusBadge";
import TicketPriority from "@/Components/TicketPriority";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/Components/ui/table";

interface Props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader className="flex justify-center">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} data-href="/">
                    <TableCell>{ticket.title}</TableCell>
                    <div className="flex justify-center">
                      <TableCell>
                        <TicketStatusBadge status={ticket.status} />
                      </TableCell>
                    </div>
                    <div className="flex justify-center">
                      <TableCell>
                        <TicketPriority priority={ticket.priority} />
                      </TableCell>
                    </div>
                    <TableCell>
                      {ticket.createdAT.toLocaleDateString("en-GB", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
