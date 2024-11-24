import { Ticket } from "@prisma/client";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-col-4">
      <div>
        <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
          <CardHeader>
            <div className="flex justify-between mb-3">
              <TicketStatusBadge status={ticket.status} />
              <TicketPriority priority={ticket.priority} />
            </div>
            <CardTitle>{ticket.title}</CardTitle>
            <CardDescription>
              Created: {dayjs(ticket.createdAT).format("DD/MM/YY hh:mm A")}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <ReactMarkdown>{ticket.description}</ReactMarkdown>
          </CardContent>
          <CardFooter>
            Updated: {dayjs(ticket.updatedAT).format("DD/MM/YY hh:mm A")}
          </CardFooter>
        </Card>
        <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
          <Link
            href={`/tickets/edit/${ticket.id}`}
            className={`${buttonVariants({ variant: "default" })}`}
          >
            Edit Ticket
          </Link>
          <DeleteButton ticketId={ticket.id} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
