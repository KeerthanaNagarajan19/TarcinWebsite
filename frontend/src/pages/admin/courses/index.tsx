// import React, { useState } from "react";
// import AdminLayout from "../../../components/admin/AdminLayout";
// import { Button } from "../../../components/ui/button";
// import { DataTable, DataColumn } from "../../../components/admin/DataTable";
// import { Plus } from "lucide-react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
// import { useToast } from "../../../hooks/use-toast";
// import CourseForm from "./CourseForm"; // create this like CareerForm
// import DocumentHead from "../../../components/DocumentHead";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   duration: string;
//   price: string;
//   isActive: boolean;
//   createdAt: string;
// }

// export default function AdminCourses() {
//   const { toast } = useToast();
//   const [formOpen, setFormOpen] = useState(false);
//   const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

//   const { data: courses = [], isLoading } = useQuery<Course[]>({
//     queryKey: ["/api/cms/courses"],
//     queryFn: getQueryFn({ on401: "throw" }),
//     select: (rawData: any[]) =>
//       Array.isArray(rawData) ? rawData.map((c) => ({ ...c, id: c._id })) : [],
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (id: string) => {
//       await apiRequest(`/api/cms/courses/${id}`, { method: "DELETE" });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/cms/courses"] });
//       toast({
//         title: "Course deleted",
//         description: "The course has been deleted successfully.",
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error",
//         description: `Failed to delete course: ${error.message}`,
//         variant: "destructive",
//       });
//     },
//   });

//   const columns: DataColumn[] = [
//     { key: "title", title: "Title" },
//     { key: "instructor", title: "Instructor", width: "150px" },
//     { key: "duration", title: "Duration", width: "100px" },
//     { key: "price", title: "Price", width: "100px" },
//     { key: "createdAt", title: "Created", type: "date", width: "150px" },
//     {
//       key: "isActive",
//       title: "Status",
//       width: "100px",
//       formatFn: (value) =>
//         value ? (
//           <span className="text-green-600">Active</span>
//         ) : (
//           <span className="text-gray-500">Inactive</span>
//         ),
//     },
//   ];

//   const handleCreate = () => {
//     setCurrentCourse(null);
//     setFormOpen(true);
//   };

//   const handleEdit = (course: Course) => {
//     setCurrentCourse(course);
//     setFormOpen(true);
//   };

//   const handleDelete = (course: Course) => {
//     deleteMutation.mutate(course.id);
//   };

//   return (
//     <>
//       <DocumentHead title="Courses Management - Tarcin Admin" />

//       <AdminLayout title="Courses">
//         <div className="mb-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-semibold">Manage Courses</h1>
//             <p className="text-muted-foreground">
//               Add, edit, and remove courses from the platform.
//             </p>
//           </div>
//           <Button onClick={handleCreate}>
//             <Plus className="mr-2 h-4 w-4" /> New Course
//           </Button>
//         </div>

//         <DataTable
//           data={courses}
//           columns={columns}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           isLoading={isLoading}
//         />

//         {formOpen && (
//           <CourseForm
//             course={currentCourse}
//             isOpen={formOpen}
//             onClose={() => setFormOpen(false)}
//           />
//         )}
//       </AdminLayout>
//     </>
//   );
// }


// ✅ Admin Course Management Page (index.tsx)
import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import CourseForm from "./CourseForm";
import DocumentHead from "../../../components/DocumentHead";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCourses() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/cms/courses"],
    queryFn: getQueryFn({ on401: "throw" }),
    select: (rawData: any[]) =>
      Array.isArray(rawData) ? rawData.map((c) => ({ ...c, id: c._id })) : [],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/cms/courses/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/courses"] });
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete course: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const columns: DataColumn[] = [
    { key: "title", title: "Title" },
    { key: "duration", title: "Duration", width: "100px" },
    { key: "price", title: "Price", width: "100px" },
    { key: "createdAt", title: "Created", type: "date", width: "150px" },
    {
      key: "isActive",
      title: "Status",
      width: "100px",
      formatFn: (value) =>
        value ? (
          <span className="text-green-600">Active</span>
        ) : (
          <span className="text-gray-500">Inactive</span>
        ),
    },
  ];

  const handleCreate = () => {
    setCurrentCourse(null);
    setFormOpen(true);
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setFormOpen(true);
  };

  const handleDelete = (course: Course) => {
    deleteMutation.mutate(course.id);
  };

  return (
    <>
      <DocumentHead title="Courses Management - Tarcin Admin" />
      <AdminLayout title="Courses">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Manage Courses</h1>
            <p className="text-muted-foreground">
              Add, edit, and remove courses from the platform.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
        </div>

        <DataTable
          data={courses}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {formOpen && (
          <CourseForm
            course={currentCourse}
            isOpen={formOpen}
            onClose={() => setFormOpen(false)}
          />
        )}
      </AdminLayout>
    </>
  );
}
