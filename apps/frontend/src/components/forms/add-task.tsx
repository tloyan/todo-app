import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TagInput } from "./tag-input";

const formSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(500).optional(),
  categories: z.array(z.string().min(1).max(12)).optional(),
});

const AddTaskForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ title: string; description?: string | undefined }>;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="eat one apple" {...field} />
              </FormControl>
              <FormDescription>This is your task name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="Add tags..."
                  onTagsChange={(categories) =>
                    form.setValue("categories", categories)
                  }
                />
              </FormControl>
              <FormDescription>This is your task name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[200px]"
                  placeholder="take the apple with the left hand ..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your optional detailled task
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">add new task</Button>
      </form>
    </Form>
  );
};

export { AddTaskForm };
