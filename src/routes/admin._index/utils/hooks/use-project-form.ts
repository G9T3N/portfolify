import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSaveProjectMutation } from "../../queries";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  full_content: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  thumbnail_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  live_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  code_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  embed_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  tech_stack: z.array(z.string()).default([]),
  display_order: z.coerce.number().int().default(0),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

const getInitialFormData = (project?: Record<string, unknown>): ProjectFormValues => ({
  title: (project?.title as string) || "",
  description: (project?.description as string) || "",
  full_content: (project?.full_content as string) || "",
  category: (project?.category as string) || "web",
  status: (project?.status as string) || "draft",
  thumbnail_url: (project?.thumbnail_url as string) || "",
  live_url: (project?.live_url as string) || "",
  code_url: (project?.code_url as string) || "",
  embed_url: (project?.embed_url as string) || "",
  tech_stack: (project?.tech_stack as string[]) || [],
  display_order: (project?.display_order as number) || 0,
});

export function useProjectForm(project?: Record<string, unknown>, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: "onTouched",
    delayError: 500,
    defaultValues: getInitialFormData(project),
  });

  // Reset form when project prop changes (e.g., opening a different project)
  useEffect(() => {
    form.reset(getInitialFormData(project));
  }, [project, form]);

  const addTech = () => {
    const currentStack = form.getValues("tech_stack") || [];
    if (techInput.trim() && !currentStack.includes(techInput.trim())) {
      form.setValue("tech_stack", [...currentStack, techInput.trim()], {
        shouldValidate: true,
        shouldDirty: true,
      });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    const currentStack = form.getValues("tech_stack") || [];
    form.setValue(
      "tech_stack",
      currentStack.filter((t) => t !== tech),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  const saveMutation = useSaveProjectMutation(
    () => {
      toast.success(project ? "Project updated successfully" : "Project created successfully");
      onSuccess?.();
    },
    (error) => {
      toast.error("Failed to save project", { description: String(error) });
    },
  );

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    await saveMutation.mutateAsync({ ...data, id: project?.id as string | undefined });
    setIsSubmitting(false);
  };

  const setThumbnailUrl = (url: string) => {
    form.setValue("thumbnail_url", url, { shouldValidate: true, shouldDirty: true });
  };

  return {
    form,
    techInput,
    isSubmitting,
    setTechInput,
    addTech,
    removeTech,
    handleTechKeyDown,
    onSubmit: form.handleSubmit(onSubmit),
    setThumbnailUrl,
  };
}
