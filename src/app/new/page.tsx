import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newProject } from "@/server/actions/newProject";

export default async function Page() {
  return (
    <div>
      <div>New Project</div>
      <form action={newProject}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="project_name">Project Name</Label>
          <Input
            type="text"
            id="project_name"
            name="project_name"
            placeholder="Project Name"
          />
        </div>

        <Button type="submit">Create Project</Button>
      </form>
    </div>
  );
}
