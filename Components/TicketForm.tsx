"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Ticket } from "@prisma/client";
import dayjs from "dayjs";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const formattedDate = ticket
    ? dayjs(ticket.createdAT).format("DD/MM/YY hh:mm A")
    : null;

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: ticket?.title || "",
      description: ticket?.description || "",
      status: ticket?.status || "OPEN",
      priority: ticket?.priority || "LOW",
    },
  });

  async function onSubmit(values: TicketFormData) {
    try {
      setIsSubmitting(true);
      setError("");

      if (ticket) {
        await axios.patch(`/api/tickets/${ticket.id}`, values);
      } else {
        await axios.post("/api/tickets", values);
      }

      router.push("/tickets");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Unknown Error Occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Title..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
      {formattedDate && (
        <p className="text-sm text-muted">Created at: {formattedDate}</p>
      )}
    </div>
  );
};

export default TicketForm;
