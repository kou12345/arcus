import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/server/actions/getProjects";
import Link from "next/link";

export default async function Home() {
  const projects = await getProjects();
  console.log(projects);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <p>Projects</p>
        <Link
          href="/new"
          className={`${buttonVariants({ size: "sm" })} col-start-4`}
        >
          New Project
        </Link>
      </div>
      <Table className="mt-2">
        <TableCaption>A list of your recent projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link href={`/project/${project.name}`}>{project.name}</Link>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                {project.projectUsers[0].role}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
