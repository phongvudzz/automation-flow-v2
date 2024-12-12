import prisma from "@/lib/prisma";
import NotFoundPage from "@/app/not-found";
import { auth } from "@clerk/nextjs/server";
import Editor from "@/app/workflow/_components/Editor";

async function EditorPage({ params }: { params: { workflowId: string } }) {
  const { userId } = auth();
  const workflowId = params.workflowId;

  if (!userId) throw new Error("Unauthorized");

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return (
      <div className="h-full w-full">
        <NotFoundPage />
      </div>
    );
  }
  return <Editor workflow={workflow} />;
}

export default EditorPage;
