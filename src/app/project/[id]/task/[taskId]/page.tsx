import { CommentForm } from "@/components/CommentForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { postComment } from "@/server/actions/postComment";
import { db } from "@/server/db";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Page({
  params,
}: {
  params: { id: string; taskId: string };
}) {
  const postCommentByTaskId = postComment.bind(null, params.taskId);

  const task = await getTaskById(params.taskId);
  const comments = await getCommentsByTaskId(params.taskId);

  return (
    <div>
      <div className=" h-40">
        <p className=" text-xl">{task.name}</p>
      </div>

      <hr />

      {comments.map((comment) => (
        <Card key={comment.id} className="my-2">
          <CardHeader>
            <div className="flex justify-between">
              <div className="w-32 flex items-center justify-between">
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={comment.imageUrl} />
                </Avatar>
                <p>{comment.userName}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {comment.updatedAt.toISOString()}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{comment.content}</p>
          </CardContent>
        </Card>
      ))}

      <CommentForm formAction={postCommentByTaskId} />
    </div>
  );
}

const getTaskById = async (id: string) => {
  try {
    const task = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to get task");
  }
};

const getCommentsByTaskId = async (taskId: string) => {
  try {
    const comments = await db.taskComment.findMany({
      where: {
        taskId,
      },
    });

    const user = await clerkClient.users.getUser(comments[0].userId);
    if (!user) {
      throw new Error("User not found");
    }

    const commentsWithUser = comments.map((comment) => ({
      ...comment,
      userName: user.username,
      imageUrl: user.imageUrl,
    }));

    return commentsWithUser;
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: Failed to get comments");
  }
};
