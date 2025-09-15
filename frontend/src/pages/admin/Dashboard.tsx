import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../../lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import AdminLayout from "../../components/admin/AdminLayout";
import DocumentHead from "../../components/shared/DocumentHead";
import { FileText, Calendar, Briefcase, Users } from "lucide-react";

interface ContentStats {
  blogPosts: number;
  events: {
    upcoming: number;
    past: number;
  };
  careers: {
    active: number;
    total: number;
  };
  communityStories: {
    approved: number;
    pending: number;
  };
   courses: number; 
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: number | string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AdminDashboard: React.FC = () => {
  // In a real implementation, you would fetch stats from the API
  // For now, we'll use dummy stats
  const stats: ContentStats = {
    blogPosts: 0,
    events: {
      upcoming: 0,
      past: 0,
    },
    careers: {
      active: 0,
      total: 0,
    },
    communityStories: {
      approved: 0,
      pending: 0,
    },
  };
  
  // Fetch blog posts count
  const { data: blogPosts = [] } = useQuery({
    queryKey: ['/api/cms/blog'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Fetch events count
  const { data: events = [] } = useQuery({
    queryKey: ['/api/cms/events'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Fetch careers count
  const { data: careers = [] } = useQuery({
    queryKey: ['/api/cms/careers'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Fetch community stories count
  const { data: stories = [] } = useQuery({
    queryKey: ['/api/cms/community-stories'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  //fetch course count

const { data: courses = [] } = useQuery({
  queryKey: ['/api/cms/courses'],
  queryFn: getQueryFn({ on401: "returnNull" }),
});


    // Fetch blog posts count
  // const { data: blogPosts = [] } = useQuery({
  //   queryKey: ['/api/blog'],
  //   queryFn: getQueryFn({ on401: "returnNull" }),
  // });
  
  // // Fetch events count
  // const { data: events = [] } = useQuery({
  //   queryKey: ['/api/events'],
  //   queryFn: getQueryFn({ on401: "returnNull" }),
  // });
  
  // // Fetch careers count
  // const { data: careers = [] } = useQuery({
  //   queryKey: ['/api/careers'],
  //   queryFn: getQueryFn({ on401: "returnNull" }),
  // });
  
  // // Fetch community stories count
  // const { data: stories = [] } = useQuery({
  //   queryKey: ['/api/community-stories'],
  //   queryFn: getQueryFn({ on401: "returnNull" }),
  // });
  
  // Calculate stats based on API data
  const calculatedStats: ContentStats = {
    blogPosts: blogPosts.length,
    events: {
      upcoming: events.filter((event: any) => event.isUpcoming).length,
      past: events.filter((event: any) => !event.isUpcoming).length,
    },
    careers: {
      active: careers.filter((career: any) => career.isActive).length,
      total: careers.length,
    },
    communityStories: {
      approved: stories.filter((story: any) => story.approved).length,
      pending: stories.filter((story: any) => !story.approved).length,
    },
     courses: courses.length,
  };
  
  return (
    <>
      <DocumentHead
        title="Tarcin Robotic - Admin Dashboard"
        description="Content management system for Tarcin Robotic website."
      />
      
      <AdminLayout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Blog Posts"
            value={calculatedStats.blogPosts}
            description="Total published and draft posts"
            icon={FileText}
          />
          <StatCard
            title="Events"
            value={`${calculatedStats.events.upcoming} / ${calculatedStats.events.upcoming + calculatedStats.events.past}`}
            description="Upcoming out of total events"
            icon={Calendar}
          />
          <StatCard
            title="Careers"
            value={`${calculatedStats.careers.active} / ${calculatedStats.careers.total}`}
            description="Active out of total job listings"
            icon={Briefcase}
          />
          <StatCard
            title="Community Stories"
            value={`${calculatedStats.communityStories.pending} / ${calculatedStats.communityStories.approved}`}
            description="Pending approval"
            icon={Users}
          />
          <StatCard
  title="Courses"
  value={calculatedStats.courses}
  description="Total number of courses"
  icon={Briefcase}
/>

        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to the Tarcin Robotic CMS</CardTitle>
              <CardDescription>
                Manage your website content from this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Use the navigation menu on the left to manage different types of content on your website.
                You can create, edit, and delete blog posts, events, job listings, and community stories.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Quick Start</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Add new blog posts from the "Blog Posts" section</li>
                      <li>Update upcoming and past events in the "Events" section</li>
                      <li>Manage job listings in the "Careers" section</li>
                      <li>Review and approve community stories in the "Community Stories" section</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Getting Help</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>
                      For assistance with the content management system, please refer to the documentation
                      or contact the system administrator for support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;