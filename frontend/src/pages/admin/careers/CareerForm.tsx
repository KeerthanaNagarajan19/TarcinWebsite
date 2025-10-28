// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "../../../components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../../components/ui/form";
// import { Button } from "../../../components/ui/button";
// import { Input } from "../../../components/ui/input";
// import { Textarea } from "../../../components/ui/textarea";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useToast } from "../../../hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { apiRequest, queryClient } from "../../../lib/queryClient";
// import { Switch } from "../../../components/ui/switch";
// import { Label } from "../../../components/ui/label";

// interface Career {
//   id: string;
//   title: string;
//   department: string;
//   location: string;
//   description: string;
//   requirements: string[];
//   isActive: boolean;
//   applicationLink?: string;
//   postedDate: string;
//   category: string;
// }

// interface CareerFormProps {
//   career: Career | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// // Form validation schema
// const formSchema = z.object({
//   title: z.string().min(1, "Job title is required"),
//   department: z.string().min(1, "Department is required"),
//   location: z.string().min(1, "Location is required"),
//   description: z.string().min(1, "Description is required"),
//   requirementsList: z.string().min(1, "Requirements are required").transform(val => 
//     val.split('\n').filter(line => line.trim() !== '')
//   ),
//   applicationLink: z.string().optional(),
//   isActive: z.boolean().default(true),
//   category: z.enum(["job", "internship"], { required_error: "Category is required" }),
// });

// export default function CareerForm({ career, isOpen, onClose }: CareerFormProps) {
//   const { toast } = useToast();
//   const isEditing = !!career;

//   // Create form with react-hook-form
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: career?.title || "",
//       department: career?.department || "",
//       location: career?.location || "",
//       description: career?.description || "",
//       requirementsList: career?.requirements ? career.requirements.join('\n') : "",
//       applicationLink: career?.applicationLink || "",
//       isActive: career?.isActive ?? true,
//        category: career?.category || "",
//     },
//   });

//   // Create/update mutation
//   const mutation = useMutation({
//     mutationFn: async (values: z.infer<typeof formSchema>) => {
//       // Rename requirements field for API
//       const apiData = {
//         ...values,
//         requirements: values.requirementsList,
//       };
//       delete apiData.requirementsList;
      
//       const endpoint = isEditing 
//         ? `/api/cms/careers/${career.id}`
//         : "/api/cms/careers";
      
//       const method = isEditing ? "PUT" : "POST";
      
//       return await apiRequest(endpoint, {
//         method,
//         body: JSON.stringify(apiData),
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['/api/cms/careers'] });
//       toast({
//         title: isEditing ? "Job listing updated" : "Job listing created",
//         description: `Job listing has been ${isEditing ? "updated" : "created"} successfully.`,
//       });
//       onClose();
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: `Failed to ${isEditing ? "update" : "create"} job listing: ${error.message}`,
//         variant: "destructive",
//       });
//     },
//   });

//   // Handle form submission
//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     mutation.mutate(values);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>{isEditing ? "Edit Job Listing" : "Create New Job Listing"}</DialogTitle>
//         </DialogHeader>
        
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Job Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter job title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="department"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Department</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter department" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//   control={form.control}
//   name="category"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Category</FormLabel>
//       <FormControl>
//         <select
//           {...field}
//           className="border border-gray-300 rounded-md p-2 w-full"
//         >
//           <option value="">Select category</option>
//           <option value="job">Job Opening</option>
//           <option value="internship">Internship Opening</option>
//         </select>
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />

              
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter location" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
            
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Job Description</FormLabel>
//                   <FormControl>
//                     <Textarea 
//                       placeholder="Enter detailed job description" 
//                       className="min-h-32" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
            
//             <FormField
//               control={form.control}
//               name="requirementsList"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Requirements</FormLabel>
//                   <FormControl>
//                     <Textarea 
//                       placeholder="Enter requirements (one per line)" 
//                       className="min-h-24" 
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     Enter each requirement on a new line
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
            
//             <FormField
//               control={form.control}
//               name="applicationLink"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Application Link (Optional)</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter application URL" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
            
//             <FormField
//               control={form.control}
//               name="isActive"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-base">Active Listing</FormLabel>
//                     <FormDescription>
//                       Set this job listing as active and visible on the website.
//                     </FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       aria-readonly
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
            
//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={mutation.isPending}>
//                 {mutation.isPending ? (
//                   <>
//                     <span className="animate-spin mr-2">⊚</span>
//                     {isEditing ? "Updating..." : "Creating..."}
//                   </>
//                 ) : (
//                   <>{isEditing ? "Update" : "Create"}</>
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }


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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Switch } from "../../../components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../../../lib/queryClient";

// Type definitions
interface Career {
  id?: string;
  _id?: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  applicationLink?: string;
  postedDate?: string;
  category: "job" | "internship";
}

interface CareerFormProps {
  career: Career | null;
  isOpen: boolean;
  onClose: () => void;
}

// Validation Schema
const formSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  requirementsList: z.string().min(1, "Requirements are required"),
  applicationLink: z.string().optional(),
  isActive: z.boolean().default(true),
  category: z.enum(["job", "internship"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CareerForm({ career, isOpen, onClose }: CareerFormProps) {
  const { toast } = useToast();
  const isEditing = !!career;

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: career?.title || "",
      department: career?.department || "",
      location: career?.location || "",
      description: career?.description || "",
      requirementsList: career?.requirements?.join("\n") || "",
      applicationLink: career?.applicationLink || "",
      isActive: career?.isActive ?? true,
      category: career?.category || "job",
    },
  });

  // Create or Update mutation
  // const mutation = useMutation({
  //   mutationFn: async (values: FormValues) => {
  //     // Split requirements by newline
  //     const requirements = values.requirementsList
  //       .split("\n")
  //       .map((r) => r.trim())
  //       .filter(Boolean);

  //     const apiData = {
  //       title: values.title,
  //       department: values.department,
  //       location: values.location,
  //       description: values.description,
  //       requirements,
  //       applicationLink: values.applicationLink,
  //       isActive: values.isActive,
  //       category: values.category,
  //     };

  //     const id = career?._id || career?.id;
  //     const method = isEditing ? "PUT" : "POST";
  //     const endpoint = isEditing ? `/api/cms/careers/${id}` : `/api/cms/careers`;

  //     const res = await apiRequest(endpoint, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(apiData),
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData?.message || "Failed to save career");
  //     }

  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["/api/cms/careers"] });
  //     toast({
  //       title: isEditing ? "Career updated" : "Career created",
  //       description: `The career has been ${isEditing ? "updated" : "created"} successfully.`,
  //     });
  //     onClose();
  //   },
  //   onError: (error: any) => {
  //     toast({
  //       title: "Error",
  //       description: `Failed to save career: ${error?.message || "Unexpected error"}`,
  //       variant: "destructive",
  //     });
  //   },
  // });

const mutation = useMutation({
  mutationFn: async (values: FormValues) => {
    const requirements = values.requirementsList
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const apiData = {
      title: values.title,
      department: values.department,
      location: values.location,
      description: values.description,
      requirements,
      applicationLink: values.applicationLink,
      isActive: values.isActive,
      category: values.category,
    };

    const id = career?._id || career?.id;
    const method = isEditing ? "PUT" : "POST";
    const endpoint = isEditing ? `/api/cms/careers/${id}` : `/api/cms/careers`;

    const res = await apiRequest(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });

    // ✅ Fix: Don’t call res.json() here
    if (res?.ok === false) {
      throw new Error(res?.message || "Failed to save career");
    }

    return res; // ✅ Return parsed result (already JSON)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["/api/cms/careers"] });
    toast({
      title: isEditing ? "Career updated" : "Career created",
      description: `The career has been ${isEditing ? "updated" : "created"} successfully.`,
    });
    onClose();
  },
  onError: (error: any) => {
    toast({
      title: "Error",
      description: `Failed to save career: ${error?.message || "Unexpected error"}`,
      variant: "destructive",
    });
  },
});


  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Career" : "Add New Career"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select {...field} className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="job">Job Opening</option>
                        <option value="internship">Internship</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chennai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter detailed description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirementsList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea placeholder="One requirement per line" {...field} />
                  </FormControl>
                  <FormDescription>
                    Example: React.js, Node.js, MongoDB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Link */}
            <FormField
              control={form.control}
              name="applicationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Switch */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Listing</FormLabel>
                    <FormDescription>
                      Show this career on the website
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={Boolean(field.value)}
                      onCheckedChange={(val) => field.onChange(Boolean(val))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
