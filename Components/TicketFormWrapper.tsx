"use client";

import { Ticket } from "@prisma/client";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

export default function TicketFormWrapper({ ticket }: { ticket: Ticket }) {
  return <TicketForm ticket={ticket} />;
}
