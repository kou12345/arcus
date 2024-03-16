"use client";

import { useFormState } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { DatePickerWithPresets } from "./DatePickerWithPresets";

type Props = {
  formAction: (
    _prevState: any,
    formData: FormData
  ) => Promise<{
    done: boolean;
  }>;
};

export const NewTaskForm = (props: Props) => {
  const [state, formAction] = useFormState(props.formAction, { done: false });
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState<Date>();

  const formActionWithDueDate = (formData: FormData) => {
    if (date) {
      formData.set("due_date", date.toISOString());
    }
    return formAction(formData);
  };

  useEffect(() => {
    if (state.done) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="col-start-4">
          New task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>
        <form action={formActionWithDueDate}>
          <div className="mb-4">
            <Label htmlFor="task_name">Task name</Label>
            <Input
              type="text"
              id="task_name"
              name="task_name"
              placeholder="Task name"
              className="my-2"
              required
            />
            <Label htmlFor="due_date">Due date</Label>
            <DatePickerWithPresets date={date} setDate={setDate} />
          </div>
          <DialogFooter>
            <Button type="submit">Create task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
