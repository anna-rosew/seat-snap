"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel} from "./ui/form";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers";
import SimpleMDE from "react-simplemde-editor";

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = () => {
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
			<FormField control={form.control} name="title" render={({field}) => (
					<FormItem>
							<FormLabel>Ticket Title</FormLabel>
							<FormControl>
										<Input placeholder="Ticket Title..." {...field} />
							</FormControl>
					</FormItem>
)}/>
<Controller name="description" control={form.control} render={({field}) => (
		<SimpleMDE placeholder="Description" {...field}/>
)}/>
<div className="flex w-full space-x-4">
		<FormField control={form.control} name="status" render={({field}) => (
<FormItem>
							<FormLabel>Ticket Title</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
												<SelectValue placeholder="Status..."/>
											</SelectTrigger>
									</FormControl>
										<SelectContent>
												 <SelectItem value="OPEN">Open</SelectItem>
                         <SelectItem value="STARTED">Started</SelectItem>
												<SelectItem value="CLSOED">Closed</SelectItem>
											</SelectContent>
							</Select>
					</FormItem>
)}>
</div>
</form>
</Form> 
    </div>
  );
};

export default TicketForm;
