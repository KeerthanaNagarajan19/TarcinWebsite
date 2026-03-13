// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useMutation } from '@tanstack/react-query';
// import { apiRequest } from '../../lib/queryClient';
// import { useAdminAuth } from '../../hooks/use-admin-auth';
// import AdminLayout from '../../components/admin/AdminLayout';
// import DocumentHead from '../../components/shared/DocumentHead';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../../components/ui/form';
// import { Input } from '../../components/ui/input';
// import { Textarea } from '../../components/ui/textarea';
// import { Button } from '../../components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
// import { Separator } from '../../components/ui/separator';
// import { useToast } from '../../hooks/use-toast';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
// import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

// // Schema for site settings form
// const siteSettingsSchema = z.object({
//   siteTitle: z.string().min(3, 'Site title must be at least 3 characters'),
//   siteDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   contactEmail: z.string().email('Please enter a valid email address'),
//   socialTwitter: z.string().optional(),
//   socialLinkedIn: z.string().optional(),
//   socialFacebook: z.string().optional(),
// });

// // Schema for profile settings form
// const profileSettingsSchema = z.object({
//   username: z.string().min(3, 'Username must be at least 3 characters'),
//   currentPassword: z.string().min(1, 'Current password is required'),
//   newPassword: z.string()
//     .min(8, 'Password must be at least 8 characters')
//     .optional()
//     .or(z.literal('')),
//   confirmPassword: z.string().optional().or(z.literal('')),
// }).refine(data => !data.newPassword || data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// const AdminSettings: React.FC = () => {
//   const { user } = useAdminAuth();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState('site');

//   // Site settings form
//   const siteForm = useForm<z.infer<typeof siteSettingsSchema>>({
//     resolver: zodResolver(siteSettingsSchema),
//     defaultValues: {
//       siteTitle: 'Tarcin Robotic',
//       siteDescription: 'Empowering the future through robotics, AI, and IoT education.',
//       contactEmail: 'contact@tarcinrobotic.com',
//       socialTwitter: 'https://twitter.com/tarcinrobotic',
//       socialLinkedIn: 'https://linkedin.com/company/tarcinrobotic',
//       socialFacebook: 'https://facebook.com/tarcinrobotic',
//     },
//   });

//   // Profile settings form
//   const profileForm = useForm<z.infer<typeof profileSettingsSchema>>({
//     resolver: zodResolver(profileSettingsSchema),
//     defaultValues: {
//       username: user?.username || '',
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//   });

//   // Site settings mutation
//   const siteMutation = useMutation({
//     mutationFn: async (values: z.infer<typeof siteSettingsSchema>) => {
//       // This would normally be a real API request
//       // Since we don't have a real endpoint for this, we'll just simulate a success
//       await new Promise(resolve => setTimeout(resolve, 500));
//       return { success: true };
//     },
//     onSuccess: () => {
//       toast({
//         title: 'Settings Updated',
//         description: 'Site settings have been successfully updated.',
//       });
//     },
//     onError: (error: any) => {
//       toast({
//         title: 'Error',
//         description: error.message || 'Failed to update settings.',
//         variant: 'destructive',
//       });
//     },
//   });

//   // Profile mutation
//   // const profileMutation = useMutation({
//   //   mutationFn: (values: z.infer<typeof profileSettingsSchema>) =>
//   //     apiRequest('/api/auth/profile', {
//   //       method: 'PUT',
//   //       body: JSON.stringify(values),
//   //     }),
//   //   onSuccess: () => {
//   //     toast({
//   //       title: 'Profile Updated',
//   //       description: 'Your profile has been successfully updated.',
//   //     });
//   //     // Reset password fields
//   //     profileForm.reset({
//   //       ...profileForm.getValues(),
//   //       currentPassword: '',
//   //       newPassword: '',
//   //       confirmPassword: '',
//   //     });
//   //   },
//   //   onError: (error: any) => {
//   //     toast({
//   //       title: 'Error',
//   //       description: error.message || 'Failed to update profile.',
//   //       variant: 'destructive',
//   //     });
//   //   },
//   // });

//   // Profile mutation
// const profileMutation = useMutation({
//   mutationFn: (values: z.infer<typeof profileSettingsSchema>) =>
//     apiRequest('/api/auth/profile', {
//       method: 'PUT',
//       body: JSON.stringify({
//         username: values.username,
//         currentPassword: values.currentPassword,
//         newPassword: values.newPassword || undefined,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }),
//   onSuccess: () => {
//     toast({
//       title: 'Profile Updated',
//       description: 'Your profile has been successfully updated.',
//     });
//     profileForm.reset({
//       ...profileForm.getValues(),
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//   },
//   onError: (error: any) => {
//     toast({
//       title: 'Error',
//       description: error.message || 'Failed to update profile.',
//       variant: 'destructive',
//     });
//   },
// });


//   // Form submission handlers
//   const onSiteSubmit = (values: z.infer<typeof siteSettingsSchema>) => {
//     siteMutation.mutate(values);
//   };

//   const onProfileSubmit = (values: z.infer<typeof profileSettingsSchema>) => {
//     profileMutation.mutate(values);
//   };

//   const profilePictureMutation = useMutation({
//     mutationFn: (file: File) => {
//       const formData = new FormData();
//       formData.append('profilePicture', file);
//       return apiRequest('/api/auth/profile/picture', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': undefined, // Let the browser set the content type for FormData
//         },
//       });
//     },
//     onSuccess: () => {
//       toast({
//         title: 'Profile Picture Updated',
//         description: 'Your profile picture has been successfully updated.',
//       });
//       // Here you might want to refetch the user data to update the avatar
//     },
//     onError: (error: any) => {
//       toast({
//         title: 'Error',
//         description: error.message || 'Failed to update profile picture.',
//         variant: 'destructive',
//       });
//     },
//   });

//   const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       profilePictureMutation.mutate(file);
//     }
//   };

//   return (
//     <>
//       <DocumentHead
//         title="Tarcin Robotic - Admin Settings"
//         description="Configure your site settings and profile information."
//       />

//       <AdminLayout title="Settings">
//         <div className="space-y-6">
//           <Tabs defaultValue="site" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList className="grid w-full max-w-md grid-cols-2">
//               <TabsTrigger value="site">Site Settings</TabsTrigger>
//               <TabsTrigger value="profile">Profile</TabsTrigger>
//             </TabsList>

//             <TabsContent value="site" className="space-y-4 mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Site Settings</CardTitle>
//                   <CardDescription>
//                     Manage your site's basic information and social media profiles.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Form {...siteForm}>
//                     <form onSubmit={siteForm.handleSubmit(onSiteSubmit)} className="space-y-6">
//                       <div className="grid gap-4 md:grid-cols-2">
//                         <FormField
//                           control={siteForm.control}
//                           name="siteTitle"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Site Title</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter site title" {...field} />
//                               </FormControl>
//                               <FormDescription>
//                                 This will appear in browser tabs and at the top of your site.
//                               </FormDescription>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />

//                         <FormField
//                           control={siteForm.control}
//                           name="contactEmail"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Contact Email</FormLabel>
//                               <FormControl>
//                                 <Input placeholder="Enter contact email" {...field} />
//                               </FormControl>
//                               <FormDescription>
//                                 Used for contact forms and admin notifications.
//                               </FormDescription>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>

//                       <FormField
//                         control={siteForm.control}
//                         name="siteDescription"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Site Description</FormLabel>
//                             <FormControl>
//                               <Textarea 
//                                 placeholder="Enter a brief description of your site" 
//                                 className="min-h-[80px]"
//                                 {...field} 
//                               />
//                             </FormControl>
//                             <FormDescription>
//                               This will appear in search engine results.
//                             </FormDescription>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <Separator className="my-4" />

//                       <div className="space-y-4">
//                         <h3 className="text-lg font-medium">Social Media Links</h3>

//                         <div className="grid gap-4 md:grid-cols-2">
//                           <FormField
//                             control={siteForm.control}
//                             name="socialTwitter"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Twitter</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="https://twitter.com/username" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           <FormField
//                             control={siteForm.control}
//                             name="socialLinkedIn"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>LinkedIn</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="https://linkedin.com/company/name" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           <FormField
//                             control={siteForm.control}
//                             name="socialFacebook"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Facebook</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder="https://facebook.com/pagename" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex justify-end">
//                         <Button 
//                           type="submit" 
//                           className="bg-blue-600 hover:bg-blue-700"
//                           disabled={siteMutation.isPending}
//                         >
//                           {siteMutation.isPending ? 'Saving...' : 'Save Settings'}
//                         </Button>
//                       </div>
//                     </form>
//                   </Form>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* <TabsContent value="profile" className="space-y-4 mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Profile Settings</CardTitle>
//                   <CardDescription>
//                     Update your profile information and password.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4 mb-6">
//                     <Avatar className="h-24 w-24">
//   <AvatarImage
//     src={user?.profilePicture ? `api/${user.profilePicture}` : undefined}
//     alt={user?.username}
//   />
//   <AvatarFallback className="text-2xl bg-blue-700">
//     {user?.username?.charAt(0).toUpperCase() || 'A'}
//   </AvatarFallback>
// </Avatar>
//                     <div>
//                       <h3 className="text-xl font-medium">{user?.username || 'Admin'}</h3>
//                       <p className="text-sm text-gray-500">{user?.role || 'Administrator'}</p>
//                       <Input type="file" onChange={handleProfilePictureChange} className="mt-2" />
//                     </div>
//                   </div>

//                   <Form {...profileForm}>
//                     <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
//                       <FormField
//                         control={profileForm.control}
//                         name="username"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                               <Input placeholder="Enter your username" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       <Separator className="my-4" />

//                       <div className="space-y-4">
//                         <h3 className="text-lg font-medium">Change Password</h3>

//                         <FormField
//                           control={profileForm.control}
//                           name="currentPassword"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Current Password</FormLabel>
//                               <FormControl>
//                                 <Input type="password" placeholder="Enter your current password" {...field} />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         <div className="grid gap-4 md:grid-cols-2">
//                           <FormField
//                             control={profileForm.control}
//                             name="newPassword"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>New Password</FormLabel>
//                                 <FormControl>
//                                   <Input type="password" placeholder="Enter new password" {...field} />
//                                 </FormControl>
//                                 <FormDescription>
//                                   Leave blank to keep current password.
//                                 </FormDescription>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           <FormField
//                             control={profileForm.control}
//                             name="confirmPassword"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Confirm New Password</FormLabel>
//                                 <FormControl>
//                                   <Input type="password" placeholder="Confirm new password" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       </div>

//                       <div className="flex justify-end">
//                         <Button 
//                           type="submit" 
//                           className="bg-blue-600 hover:bg-blue-700"
//                           disabled={profileMutation.isPending}
//                         >
//                           {profileMutation.isPending ? 'Saving...' : 'Update Profile'}
//                         </Button>
//                       </div>
//                     </form>
//                   </Form>
//                 </CardContent>
//               </Card>
//             </TabsContent> */}

//             <TabsContent value="profile" className="space-y-4 mt-6">
//   <Card>
//     <CardHeader>
//       <CardTitle>Profile Settings</CardTitle>
//       <CardDescription>
//         Update your profile information, password, and profile picture.
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex items-center space-x-4 mb-6">
//         <Avatar className="h-24 w-24">
//           <AvatarImage
//             src={
//               user?.profilePicture
//                 ? `http://localhost:5000/${user.profilePicture}` // ✅ absolute backend path
//                 : undefined
//             }
//             alt={user?.username}
//           />
//           <AvatarFallback className="text-2xl bg-blue-700">
//             {user?.username?.charAt(0).toUpperCase() || "A"}
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <h3 className="text-xl font-medium">
//             {user?.username || "Admin"}
//           </h3>
//           <p className="text-sm text-gray-500">
//             {user?.role || "Administrator"}
//           </p>

//           {/* ✅ Upload profile picture */}
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={async (e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;

//               const formData = new FormData();
//               formData.append("profilePicture", file);

//               try {
//                 const res = await fetch("http://localhost:5000/api/auth/profile/picture", {
//                   method: "POST",
//                   headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                   },
//                   body: formData,
//                 });

//                 if (!res.ok) throw new Error("Upload failed");
//                 const data = await res.json();

//                 // ✅ Refresh user object so Avatar updates instantly
//                 if (data.profilePicture) {
//                   window.location.reload(); // easiest refresh
//                 }
//               } catch (err) {
//                 console.error("Error uploading image", err);
//               }
//             }}
//             className="mt-2"
//           />
//         </div>
//       </div>

//       <Form {...profileForm}>
//         <form
//           onSubmit={profileForm.handleSubmit(onProfileSubmit)}
//           className="space-y-6"
//         >
//           <FormField
//             control={profileForm.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter your username"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Separator className="my-4" />

//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">Change Password</h3>

//             <FormField
//               control={profileForm.control}
//               name="currentPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Current Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your current password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid gap-4 md:grid-cols-2">
//               <FormField
//                 control={profileForm.control}
//                 name="newPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Enter new password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormDescription>
//                       Leave blank to keep current password.
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={profileForm.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm New Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="Confirm new password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700"
//               disabled={profileMutation.isPending}
//             >
//               {profileMutation.isPending
//                 ? "Saving..."
//                 : "Update Profile"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </CardContent>
//   </Card>
// </TabsContent>

//           </Tabs>
//         </div>
//       </AdminLayout>
//     </>
//   );
// };

// export default AdminSettings;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';
import { useAdminAuth } from '../../hooks/use-admin-auth';
import AdminLayout from '../../components/admin/AdminLayout';
import DocumentHead from '../../components/shared/DocumentHead';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { useToast } from '../../hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import ProfileAvatar from './profile';

// Schema for site settings form
const siteSettingsSchema = z.object({
  siteTitle: z.string().min(3, 'Site title must be at least 3 characters'),
  siteDescription: z.string().min(10, 'Description must be at least 10 characters'),
  contactEmail: z.string().email('Please enter a valid email address'),
  socialTwitter: z.string().optional(),
  socialLinkedIn: z.string().optional(),
  socialFacebook: z.string().optional(),
});

// Schema for profile settings form
const profileSettingsSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const AdminSettings: React.FC = () => {
  const { user, setUser } = useAdminAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('site');

  // Site settings form
  const siteForm = useForm<z.infer<typeof siteSettingsSchema>>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteTitle: 'Tarcin Robotic',
      siteDescription: 'Empowering the future through robotics, AI, and IoT education.',
      contactEmail: 'contact@tarcinrobotic.com',
      socialTwitter: 'https://twitter.com/tarcinrobotic',
      socialLinkedIn: 'https://linkedin.com/company/tarcinrobotic',
      socialFacebook: 'https://facebook.com/tarcinrobotic',
    },
  });

  // Profile settings form
  const profileForm = useForm<z.infer<typeof profileSettingsSchema>>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      username: user?.username || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Site settings mutation
  const siteMutation = useMutation({
    mutationFn: async (_values: z.infer<typeof siteSettingsSchema>) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: 'Settings Updated',
        description: 'Site settings have been successfully updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update settings.',
        variant: 'destructive',
      });
    },
  });

  // Profile mutation
  const profileMutation = useMutation({
    mutationFn: (values: z.infer<typeof profileSettingsSchema>) =>
      apiRequest('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({
          username: values.username,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword || undefined,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: (data) => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }
      if (data.user) {
        setUser(data.user);
      }
      profileForm.reset({
        ...profileForm.getValues(),
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    },
  });

  // Handle profile picture upload
  const handleProfilePictureUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(`/api/auth/profile/picture`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUser((prev) => (prev ? { ...prev, profilePicture: data.profilePicture } : null));
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const handleUsernameUpdate = async (newUsername: string) => {
    try {
      const res = await fetch("/api/auth/profile/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (!res.ok) throw new Error("Username update failed");

      await res.json();
      toast({
        title: "Success",
        description: "Username updated successfully",
      });

      // reload so avatar + username refresh
      window.location.reload();
    } catch (err) {
      console.error("Error updating username", err);
      toast({
        title: "Error",
        description: "Failed to update username",
        variant: "destructive",
      });
    }
  };



  const onSiteSubmit = (values: z.infer<typeof siteSettingsSchema>) => {
    siteMutation.mutate(values);
  };

  const onProfileSubmit = (values: z.infer<typeof profileSettingsSchema>) => {
    profileMutation.mutate(values);
  };

  return (
    <>
      <DocumentHead
        title="Tarcin Robotic - Admin Settings"
        description="Configure your site settings and profile information."
      />
      <AdminLayout title="Settings">
        <div className="space-y-6">
          <Tabs defaultValue="site" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="site">Site Settings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Site Settings */}
            <TabsContent value="site" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>
                    Manage your site's basic information and social media profiles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...siteForm}>
                    <form onSubmit={siteForm.handleSubmit(onSiteSubmit)} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={siteForm.control}
                          name="siteTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter site title" {...field} />
                              </FormControl>
                              <FormDescription>
                                This will appear in browser tabs and at the top of your site.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={siteForm.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter contact email" {...field} />
                              </FormControl>
                              <FormDescription>Used for contact forms and admin notifications.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={siteForm.control}
                        name="siteDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter a brief description of your site" className="min-h-[80px]" {...field} />
                            </FormControl>
                            <FormDescription>This will appear in search engine results.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Social Media Links</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={siteForm.control}
                            name="socialTwitter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://twitter.com/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={siteForm.control}
                            name="socialLinkedIn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://linkedin.com/company/name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={siteForm.control}
                            name="socialFacebook"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Facebook</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://facebook.com/pagename" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={siteMutation.isPending}>
                          {siteMutation.isPending ? 'Saving...' : 'Save Settings'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your profile information, password, and profile picture.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={user?.profilePicture ? `/` + user.profilePicture : undefined}
                        alt={user?.username}
                      />
                      <AvatarFallback className="text-2xl bg-blue-700">
                        {user?.username?.charAt(0).toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium">{user?.username || 'Admin'}</h3>
                      <p className="text-sm text-gray-500">{user?.role || 'Administrator'}</p>
                      <Input type="file" accept="image/*" onChange={handleProfilePictureChange} className="mt-2" />
                    </div>
                  </div> */}
                  <ProfileAvatar user={user}
                    onUpload={(file) => handleProfilePictureUpload(file)}
                    onUpdateUsername={(newUsername) => handleUsernameUpdate(newUsername)} />

                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      {/* <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <FormField
                          control={profileForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter your current password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={profileForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Enter new password" {...field} />
                                </FormControl>
                                <FormDescription>Leave blank to keep current password.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Confirm new password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={profileMutation.isPending}>
                          {profileMutation.isPending ? 'Saving...' : 'Update Profile'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminSettings;
