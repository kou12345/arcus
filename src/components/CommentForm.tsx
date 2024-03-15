"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { State } from "@/server/actions/postComment";
import { useFormState } from "react-dom";

type Props = {
  formAction: (_prevState: State, formData: FormData) => Promise<State>;
};

export const CommentForm = (props: Props) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const [state, formAction] = useFormState(props.formAction, { done: false });

  return (
    <Card>
      <form
        action={(formData) => {
          formAction(formData);
          setComment("");
        }}
      >
        <CardContent className="mt-4">
          <Textarea
            ref={textareaRef}
            placeholder="Leave a comment..."
            className="resize-none overflow-hidden"
            value={comment}
            onChange={handleChange}
            required
            name="comment"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" variant="secondary" size="xs">
            Comment
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
