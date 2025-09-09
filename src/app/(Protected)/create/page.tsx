"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/app/api/root";
import { toast } from "sonner";

type FormInput = {
  RepoUrl: string;
  Projectname: string;
  GithubToken?: string;
};

const Createpage = () => {
  const { register, handleSubmit } = useForm<FormInput>();

  async function onsubmit(data: FormInput) {
    const trpc = createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    });

    try {
      await trpc.project.createProject.mutate({
        name: data.Projectname,
        GithubURl: data.RepoUrl,
        GithubToken: data.GithubToken,
      });
      toast("project created succesfully");
    } catch (error) {
      toast(`${error}`);
    }
  }
  return (
    <div className="flex items-center  justify-center h-screen">
      <div>
        <div className="">
          <h1 className="font-semibold text-2xl">
            {" "}
            Link your github Repository{" "}
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URl of Repository
          </p>
        </div>
        <div className="h-2"> </div>
        <div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Input
              {...register("Projectname", { required: true })}
              placeholder="Project Name"
              required
            />
            <div className="h-2"></div>
            <Input
              {...register("RepoUrl", { required: true })}
              placeholder="Repository Link"
              required
            />
            <div className="h-2"> </div>
            <Input
              {...register("GithubToken", { required: true })}
              placeholder="GitHub Token (optional)"
              required
            />
            <div className="h-2"></div>
            <Button type="submit">Create Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createpage;
