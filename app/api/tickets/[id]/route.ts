import prisma from "@/prisma/db";
import { ticketPatchSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();
  console.log("🚀 ~ PATCH ~ body:", body);
  const validation = ticketPatchSchema.safeParse(body);
  console.log("🚀 ~ PATCH ~ validation:", validation);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  if (body?.assignedToUserId === "") {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: parseInt(id) },
    data: { ...body },
  });

  return NextResponse.json(updateTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  await prisma.ticket.delete({
    where: { id: ticket.id },
  });

  return NextResponse.json({ message: "Ticket deleted" });
}
