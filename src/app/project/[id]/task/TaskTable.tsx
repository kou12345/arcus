"use client";

import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";
import { Button } from "@/components/ui/button";
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
import { saveDeadline } from "@/server/actions/saveDeadline";
import { Task } from "@/types/type";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type Props = {
  tasks: Task[];
  projectId: string;
};

export const TaskTable = (props: Props) => {
  const router = useRouter();

  const [date, setDate] = useState<Date>(); // deadline
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const sortedTasks = useMemo(() => {
    return [...props.tasks].sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      } else {
        return 0;
      }
    });
  }, [props.tasks]);

  const onClick = useCallback(
    (taskId: string) => {
      router.push(`/project/${props.projectId}/task/${taskId}`);
    },
    [router, props.projectId]
  );

  const onOpenChange = useCallback(
    (open: boolean, taskId: string) => {
      setOpenPopoverId(open ? taskId : null);
      if (open) {
        const selectedTask = props.tasks.find((task) => task.id === taskId);
        if (selectedTask && selectedTask.dueDate) {
          setDate(new Date(selectedTask.dueDate));
        } else {
          setDate(undefined);
        }
      } else {
        setDate(undefined);
      }
    },
    [props.tasks]
  );

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
        {sortedTasks.map((task) => (
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
              <Popover
                open={openPopoverId === task.id}
                onOpenChange={(open) => onOpenChange(open, task.id)}
              >
                <PopoverTrigger>
                  {task.dueDate
                    ? formatDate(task.dueDate, "M/d")
                    : "No deadline"}
                </PopoverTrigger>
                <PopoverContent className="flex items-center">
                  <DatePickerWithPresets date={date} setDate={setDate} />
                  <Button
                    size="sm"
                    className="ml-4"
                    onClick={async () => {
                      await saveDeadline(task.id, date as Date);
                      setOpenPopoverId(null);
                    }}
                  >
                    Save
                  </Button>
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
