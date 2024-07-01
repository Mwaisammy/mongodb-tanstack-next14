"use client";

import { onAddUserName } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {};

function UserInput({}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const {
    mutate: createUserName,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: onAddUserName,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUserName(
      { username: values.username },
      {
        onSuccess(data) {
          if (data.success) {
            toast.success(`Username of id ${data.success} was added`);
          }
        },

        onError(error) {
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <div>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-7 w-[510px] rounded-md "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Todo Form MongoDB</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a todo..."
                    {...field}
                    disabled={isPending || isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending || isLoading}
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UserInput;
