"use client";
import { onDeleteUser } from "@/actions";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  item: {
    _id: string;
    username: string;
    createdAt: number;
  };
};

function UserName({ item }: Props) {
  const [isPending, startTransition] = useTransition();

  const deleteUser = () => {
    startTransition(() => {
      onDeleteUser(item._id).then((data) => {
        if (data.success) {
          toast.success("User deleted successfully");
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-between mt-5 space-x-3 bg-orange-400 text-white p-5 w-full max-w-lg rounded-md">
      <h3>{item.username}</h3>

      <div className="flex space-x-3 items-center">
        <Button>Edit</Button>
        <Button disabled={isPending} onClick={deleteUser}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default UserName;
