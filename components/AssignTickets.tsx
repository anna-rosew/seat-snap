"use client";
import React from "react";

import { Ticket, User } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AssignTickets = ({
  ticket,
  users,
}: {
  ticket: Ticket;
  users: User[];
}) => {
  const [isAssigning, setIsAssigining] = useState(false);
  const [error, setError] = useState("");

  const assignTicket = async (userId: string) => {
    setError("");
    setIsAssigining(true);
    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : userId,
      })
      .catch(() => {
        setError("Unable to Assign Ticket");
      });
    setIsAssigining(false);
  };
  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select User..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default AssignTickets;
