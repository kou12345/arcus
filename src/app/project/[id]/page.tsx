import { NewTaskForm } from "@/components/NewTaskForm";
import { getProjectById } from "@/server/actions/getProject";
import { newTask } from "@/server/actions/newTask";
import { db } from "@/server/db";
import { Task } from "@/types/type";
import { TaskTable } from "./task/TaskTable";

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

      <TaskTable tasks={tasks} projectId={params.id} />
    </div>
  );
}

const getTasksByProjectId = async (projectId: string): Promise<Task[]> => {
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
