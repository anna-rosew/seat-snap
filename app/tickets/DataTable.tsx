import { Ticket } from "@prisma/client";
import dayjs from "dayjs";
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
          <TableHeader>
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
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
