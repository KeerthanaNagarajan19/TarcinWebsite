import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../../../lib/queryClient";

interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  syllabus: string;
  price: string;
  duration: string;
  level: string;
  students: number;
  rating: number;
  category: string;
  highlights: string[];
  modules: { title: string; lessons: string[] }[];
  faqs: { question: string; answer: string }[];
}

interface CourseFormProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  fullDescription: z.string().min(1),
  image: z.string().url(),
  syllabus: z.string().url(),
  price: z.string().min(1),
  duration: z.string().min(1),
  level: z.string().min(1),
  students: z.coerce.number().nonnegative(),
  rating: z.coerce.number().min(0).max(5),
  category: z.string().min(1),
  highlights: z.array(z.string().min(1)).optional(),
  modules: z
    .array(
      z.object({
        title: z.string().min(1),
        lessons: z.array(z.string().min(1)),
      })
    )
    .optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    )
    .optional(),
});

export default function CourseForm({ course, isOpen, onClose }: CourseFormProps) {
  const { toast } = useToast();
  const isEditing = !!course;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      fullDescription: course?.fullDescription || "",
      image: course?.image || "",
      syllabus: course?.syllabus || "",
      price: course?.price || "",
      duration: course?.duration || "",
      level: course?.level || "",
      students: course?.students || 0,
      rating: course?.rating || 0,
      category: course?.category || "",
      highlights: course?.highlights || [""],
      modules: course?.modules || [{ title: "", lessons: [""] }],
      faqs: course?.faqs || [{ question: "", answer: "" }],
    },
  });

  const { fields: highlightFields, append: addHighlight, remove: removeHighlight } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const { fields: moduleFields, append: addModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const { fields: faqFields, append: addFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const endpoint = isEditing
        ? `/api/cms/courses/${course?.id}`
        : "/api/cms/courses";
      const method = isEditing ? "PUT" : "POST";
      return await apiRequest(endpoint, {
        method,
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/courses"] });
      toast({
        title: isEditing ? "Course updated" : "Course created",
        description: `The course has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} course: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Course" : "Create New Course"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {["title", "description", "fullDescription", "image", "syllabus", "price", "duration", "level", "category"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName[0].toUpperCase() + fieldName.slice(1)}</FormLabel>
                    <FormControl>
                      {fieldName.includes("description") ? (
                        <Textarea {...field} />
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Students</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (0 to 5)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" max={5} min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Highlights */}
            <div>
              <FormLabel>Highlights</FormLabel>
              {highlightFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <Input {...form.register(`highlights.${index}`)} />
                  <Button type="button" variant="destructive" onClick={() => removeHighlight(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={() => addHighlight("")}>Add Highlight</Button>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              <FormLabel>Modules</FormLabel>
              {moduleFields.map((module, index) => (
                <div key={module.id} className="border p-4 rounded-md space-y-2">
                  <Input placeholder="Module Title" {...form.register(`modules.${index}.title`)} />
                  {module.lessons?.map((_, lessonIndex) => (
                    <Input key={lessonIndex} placeholder="Lesson" {...form.register(`modules.${index}.lessons.${lessonIndex}`)} className="mt-2" />
                  ))}
                  <Button type="button" onClick={() => form.setValue(`modules.${index}.lessons`, [...(form.getValues(`modules.${index}.lessons`) || []), ""])}>Add Lesson</Button>
                  <Button type="button" variant="destructive" onClick={() => removeModule(index)}>Remove Module</Button>
                </div>
              ))}
              <Button type="button" onClick={() => addModule({ title: "", lessons: [""] })}>Add Module</Button>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <FormLabel>FAQs</FormLabel>
              {faqFields.map((faq, index) => (
                <div key={faq.id} className="border p-4 rounded-md space-y-2">
                  <Input placeholder="Question" {...form.register(`faqs.${index}.question`)} />
                  <Textarea placeholder="Answer" {...form.register(`faqs.${index}.answer`)} />
                  <Button type="button" variant="destructive" onClick={() => removeFaq(index)}>Remove FAQ</Button>
                </div>
              ))}
              <Button type="button" onClick={() => addFaq({ question: "", answer: "" })}>Add FAQ</Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
