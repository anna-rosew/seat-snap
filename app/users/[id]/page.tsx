import prisma from "@/prisma/db";
import React from "react";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
    },
  });
  return <div>EditUser</div>;
};

export default EditUser;
