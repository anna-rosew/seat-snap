"use client";
import Link from "next/link";

const MainNavLinks = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <Link href="/users">User</Link>
    </div>
  );
};

export default MainNavLinks;
