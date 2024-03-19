"use client";

import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/types/type";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  tasks: Task[];
  projectId: string;
};

export const TaskTable = (props: Props) => {
  const router = useRouter();

  const [date, setDate] = useState<Date>();

  const onClick = (taskId: string) => {
    router.push(`/project/${props.projectId}/task/${taskId}`);
  };

  return (
    <Table className="mt-2">
      <TableCaption>A list of your recent projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead className="text-right">Deadline</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell
              className="font-medium cursor-pointer"
              onClick={() => onClick(task.id)}
            >
              <Link href={`/project/${props.projectId}/task/${task.id}`}>
                {task.name}
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  {task.dueDate
                    ? formatDate(task.dueDate, "M/d")
                    : "No deadline"}
                </PopoverTrigger>
                <PopoverContent>
                  <DatePickerWithPresets date={date} setDate={setDate} />
                </PopoverContent>
              </Popover>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
