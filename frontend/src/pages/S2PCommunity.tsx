

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "../lib/queryClient";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { toast } from "../hooks/use-toast";
import { Calendar, Quote, User } from "lucide-react";
import DocumentHead from "../components/shared/DocumentHead";
import { format, parseISO } from "date-fns";
import BenefitsSection from "@/components/s2pcommunity/BenefitsSection";

import SuccessStories from '@/components/s2pcommunity/SuccessStories';
import TopContributors from '@/components/s2pcommunity/TopContributors';



interface CommunityStory {
  id: string;
  name: string;
  role: string;
  institution?: string;
  story: string;
  image?: string;
  approved: boolean;
  submissionDate: string;
}

const storyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  institution: z.string().optional(),
  story: z.string().min(20, "Your story must be at least 20 characters"),
  image: z.string().optional(),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

const StoryCard: React.FC<{ story: CommunityStory }> = ({ story }) => {
  const formattedDate = format(parseISO(story.submissionDate), "MMM d, yyyy");
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {story.image ? (
              <img 
                src={story.image} 
                alt={story.name} 
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xl">
                {story.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold">{story.name}</h3>
            <div className="text-sm text-gray-600">
              {story.role}
              {story.institution && ` at ${story.institution}`}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="relative">
          <Quote className="h-8 w-8 text-blue-100 absolute -top-1 -left-2 opacity-50" />
          <p className="text-gray-600 italic relative z-10 pl-6">
            "{story.story}"
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Shared on {formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

const S2PCommunity: React.FC = () => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      name: "",
      role: "",
      institution: "",
      story: "",
      image: "",
    },
  });

  const { data: stories = [], isLoading } = useQuery({ 
    queryKey: ['/api/cms/community-stories'],
    queryFn: getQueryFn({ on401: "returnNull" })
  });

  const onSubmit = async (values: StoryFormValues) => {
    setIsSubmitting(true);

    try {
      await apiRequest('/api/cms/community-stories/submit', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      toast({
        title: "Story submitted successfully",
        description: "Thank you for sharing your story! It will be reviewed by our team.",
      });

      form.reset();
      setIsSubmitDialogOpen(false);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

  return (
    <>
      <DocumentHead
        title="S2P Community - Share Your Success Story"
        description="Join the S2P (Student to Professional) Community at Tarcin Robotic. Share your success story and learn from others in the field of robotics, IoT, and AI."
      />

      {/* Hero Section */}
      <header>
      <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-blue-900 text-white relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-20 animate-wave pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-lines"
              width="100"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="translate(0, 0)"
            >
              <path
                d="M 0 20 Q 25 0, 50 20 T 100 20"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#wave-lines)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        .animate-wave svg {
          animation: waveMove 5s linear infinite;
        }
      `}</style>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            S2P Community
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-white/90 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={1}
          >
            Student to Professional (S2P) is our community of innovators, researchers, and practitioners
            who are transforming ideas into real-world solutions. Share your journey and inspire others.
          </motion.p>
        </div>
      </div>
    </section>
    </header>

      {/* Join Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Join Our Community</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            The Student to Professional (S2P) community brings together academics, industry professionals, and enthusiasts
            who are passionate about turning scientific research into practical applications. Share your success story
            and be part of this growing network.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-700 hover:bg-blue-800"
            onClick={() => setIsSubmitDialogOpen(true)}
          >
            <User className="mr-2 h-5 w-5" />
            Share Your Story
          </Button>
        </div>
      </section>

        <BenefitsSection /> 
      {/* <SuccessStories /> */}
      <TopContributors />
    


      {/* Stories Display Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Community Stories</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Read inspiring stories from our community members who have successfully implemented
            Tarcin Robotic's technologies or collaborated with our team on innovative projects.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
              <Card key={i} className="h-[300px] animate-pulse">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gray-200" />
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-40" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {stories.map((story: CommunityStory) => (
              <article key={story.id}>
                <StoryCard story={story} />
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Quote className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Be the first to share your story</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              No stories have been shared yet. Share your experience with Tarcin Robotic's
              technologies and inspire others in the community.
            </p>
            <Button 
              onClick={() => setIsSubmitDialogOpen(true)}
              className="bg-blue-700 hover:bg-blue-800"
            >
              Share Your Story
            </Button>
          </div>
        )}
      </section>

      {/* Share Your Story Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-900">Share Your Story</DialogTitle>
            <DialogDescription>
              Tell us about your experience with Tarcin Robotic's technologies and how they've
              helped you achieve your goals. Your story will be reviewed before being published.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role/Profession*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Research Scientist, Engineer, Student" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution/Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Where you work or study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Story*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share how you've used our technologies and what results you achieved..." 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="url" 
                        placeholder="https://example.com/your-image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSubmitDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  {isSubmitting ? "Submitting..." : "Submit Story"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default S2PCommunity;

