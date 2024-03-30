"use client";

import { CustomLabel } from "@/components/CustomLabel";
import { ProjectNameInput } from "@/components/ProjectNameInput";
import { Button } from "@/components/ui/button";
import { useBooleanState } from "@/hooks/useBooleanState";
import { newProject } from "@/server/actions/newProject";
import { useFormState } from "react-dom";

export default function Page() {
  const [state, formAction] = useFormState(newProject, {});
  // submitを押せるかどうかの判定
  const [isSubmitEnabled, setIsSubmitEnabled] = useBooleanState(false);

  return (
    <div>
      <p className="mb-4">New Project</p>
      <form action={formAction}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <CustomLabel htmlFor="project_name" required />
          <ProjectNameInput setIsSubmitEnabled={setIsSubmitEnabled} />
        </div>

        <Button type="submit" disabled={!isSubmitEnabled}>
          Create Project
        </Button>
      </form>
      {state.error && <p className="text-red-600">{state.error}</p>}
    </div>
  );
}
