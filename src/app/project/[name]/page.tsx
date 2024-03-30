import { NewTaskForm } from "@/components/NewTaskForm";
import { newTask } from "@/server/actions/newTask";
import { db } from "@/server/db";
import { Task } from "@/types/type";
import { TaskTable } from "./task/TaskTable";
import { getProjectByName } from "@/server/actions/getProject";

export default async function Page({ params }: { params: { name: string } }) {
  const project = await getProjectByName(decodeURIComponent(params.name));

  const newTaskWithProjectId = newTask.bind(null, params.name);

  const tasks = await getTasksByProjectName(params.name);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div>{project.name}</div>

        <NewTaskForm formAction={newTaskWithProjectId} />
      </div>

      <TaskTable tasks={tasks} projectName={params.name} />
    </div>
  );
}

const getTasksByProjectName = async (projectName: string): Promise<Task[]> => {
  try {
    const tasks = await db.task.findMany({
      include: {
        project: true,
      },
      where: {
        project: {
          name: projectName,
        },
      },
    });

    return tasks;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to get tasks by project name");
  }
};
