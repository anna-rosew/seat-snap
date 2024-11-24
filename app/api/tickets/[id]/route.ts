import { ticketSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the data using the schema
    const validation = ticketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Parse the `id` from params
    const ticketId = parseInt(params.id, 10);

    if (isNaN(ticketId)) {
      return NextResponse.json({ error: "Invalid Ticket ID" }, { status: 400 });
    }

    // Find the ticket by ID
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
    }

    // Update the ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
