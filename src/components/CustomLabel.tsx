import React from "react";
import { Label } from "./ui/label";

type Props = {
  htmlFor: string;
  required?: boolean;
};

export const CustomLabel = (props: Props) => {
  return (
    <Label htmlFor={props.htmlFor}>
      Project Name
      {props.required && <span className="text-red-600">*</span>}
    </Label>
  );
};
