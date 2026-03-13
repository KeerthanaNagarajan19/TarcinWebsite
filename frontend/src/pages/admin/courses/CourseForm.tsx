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
import { queryClient } from "../../../lib/queryClient";

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
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  image: z.any().optional(),
  syllabus: z.any().optional(),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
  students: z.coerce.number().nonnegative(),
  rating: z.coerce.number().min(0).max(5),
  category: z.string().min(1, "Category is required"),
  highlights: z.array(z.string()).optional(),
  modules: z
    .array(
      z.object({
        title: z.string(),
        lessons: z.array(z.string()),
      })
    )
    .optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
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
      price: course?.price || "Contact for Price",
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
    mutationFn: async (formData: FormData) => {
      const endpoint = isEditing
        ? `/api/cms/courses/${course?.id}`
        : "/api/cms/courses";
      const method = isEditing ? "PUT" : "POST";

      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(endpoint, {
        method,
        headers,
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save course");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/courses"] });
      toast({
        title: isEditing ? "Course updated" : "Course created",
        description: `The course has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    // Add simple fields
    Object.entries(values).forEach(([key, value]) => {
      if (['highlights', 'modules', 'faqs', 'image', 'syllabus'].includes(key)) return;
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Add complex fields as JSON strings (filter out empty strings if desired, but here we just pass them)
    formData.append("highlights", JSON.stringify(values.highlights || []));
    formData.append("modules", JSON.stringify(values.modules || []));
    formData.append("faqs", JSON.stringify(values.faqs || []));

    // Add files or strings
    if (values.image instanceof File) {
      formData.append("image", values.image);
    } else if (typeof values.image === 'string') {
      formData.append("image", values.image);
    }

    if (values.syllabus instanceof File) {
      formData.append("syllabus", values.syllabus);
    } else if (typeof values.syllabus === 'string') {
      formData.append("syllabus", values.syllabus);
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Course" : "Create New Course"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log("Validation Errors:", err))} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["title", "price", "duration", "level", "category"].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName[0].toUpperCase() + fieldName.slice(1)}</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {["description", "fullDescription"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName === 'fullDescription' ? 'Full Detailed Description' : 'Short Description'}</FormLabel>
                    <FormControl><Textarea {...field} className="min-h-[100px]" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Course Image (JPG/PNG/WEBP)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormDescription>Official course thumbnail</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="syllabus"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Syllabus Document (PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormDescription>Detailed course curriculum PDF</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
            </div>

            {/* Highlights */}
            <div className="space-y-4">
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
