import { NewTaskForm } from "@/components/NewTaskForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjectById } from "@/server/actions/getProject";
import { newTask } from "@/server/actions/newTask";
import { db } from "@/server/db";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  const newTaskWithProjectId = newTask.bind(null, params.id);

  const tasks = await getTasksByProjectId(params.id);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div>{project.name}</div>

        <NewTaskForm formAction={newTaskWithProjectId} />
      </div>

      <Table className="mt-2">
        <TableCaption>A list of your recent projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-right">Deadline</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">
                <Link href={`/project/${params.id}/task/${task.id}`}>
                  {task.name}
                </Link>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                {task.dueDate ? task.dueDate.toISOString() : "No deadline"}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const getTasksByProjectId = async (projectId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        projectId,
      },
    });

    return tasks;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to get tasks by project id");
  }
};
