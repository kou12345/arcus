import { CommentForm } from "@/components/CommentForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { postComment } from "@/server/actions/postComment";
import { db } from "@/server/db";

export default async function Page({
  params,
}: {
  params: { id: string; taskId: string };
}) {
  const postCommentByTaskId = postComment.bind(null, params.taskId);

  const comments = await getCommentsByTaskId(params.taskId);

  return (
    <div>
      <div>{params.id}</div>
      <div>{params.taskId}</div>

      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <p>userName</p>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}

      <CommentForm formAction={postCommentByTaskId} />
    </div>
  );
}

const getCommentsByTaskId = async (taskId: string) => {
  try {
    const comments = await db.taskComment.findMany({
      where: {
        taskId,
      },
    });

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to get comments");
  }
};
