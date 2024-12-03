import prisma from "@/prisma/db";
import TicketDetail from "./TicketDetail";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  try {
    // Validate and parse `params.id`
    const ticketId = parseInt(params.id, 10);
    if (isNaN(ticketId)) {
      console.error("Invalid Ticket ID:", params.id);
      return <p className="text-destructive">Invalid Ticket ID</p>;
    }

    // Fetch the ticket from the database
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    const users = await prisma.user.findMany();

    if (!ticket) {
      console.error("Ticket not found for ID:", ticketId);
      return <p className="text-destructive">Ticket Not Found!</p>;
    }

    return (
      <div>
        <TicketDetail ticket={ticket} users={users} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return (
      <p className="text-destructive">
        An error occurred while fetching the ticket.
      </p>
    );
  }
};

export default ViewTicket;
