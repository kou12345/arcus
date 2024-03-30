"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { newProjectRequest } from "@/types/type";

type Props = {
  setIsSubmitEnabled: (value: boolean) => void;
};

export const ProjectNameInput = (props: Props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(new Date());
    const validation = newProjectRequest.safeParse({
      projectName: e.target.value,
    });

    if (validation.success) {
      setError(false);
      props.setIsSubmitEnabled(true);
    } else {
      setError(true);
      props.setIsSubmitEnabled(false);
    }

    setValue(e.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        id="project_name"
        name="project_name"
        placeholder="Project Name"
        defaultValue={value}
        onChange={onChangeInput}
      />
      {error ? (
        <p className="text-sm py-2 text-red-500">
          {newProjectRequest.shape.projectName._def.checks[2].message}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground py-2">
          {newProjectRequest.shape.projectName._def.checks[2].message}
        </p>
      )}
    </div>
  );
};
