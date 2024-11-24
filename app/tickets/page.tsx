import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();
  console.log(tickets);

  return (
    <div>
      <Link
        href="/tickets/New"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination itemCount={26} pageSize={10} currentPage={1} />
    </div>
  );
};

export default Tickets;
