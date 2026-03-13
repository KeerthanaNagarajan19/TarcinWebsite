

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
            <h3 className="text-xl font-heading font-black text-black mb-1">{story.name}</h3>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              {story.role}
              {story.institution && ` at ${story.institution}`}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6 flex-grow">
        <div className="relative">
          <Quote className="h-10 w-10 text-blue-100/50 absolute -top-2 -left-3" />
          <p className="text-slate-500 font-medium text-sm md:text-base italic relative z-10 pl-8 leading-relaxed">
            "{story.story}"
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t border-slate-50 p-6 flex items-center justify-between">
        <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Calendar className="h-3.5 w-3.5 mr-2 text-blue-500" />
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

      {/* ── Hero ── */}
      <header>
        <section
          className="mt-20 pt-32 pb-20 md:pt-40 md:pb-24 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)" }}
        >
          <div className="absolute inset-0 opacity-15 animate-wave pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="s2p-wave" width="120" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 0 25 Q 30 5, 60 25 T 120 25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#s2p-wave)" />
            </svg>
          </div>
          <style>{`
            @keyframes waveMove { 0%{transform:translateX(0)} 100%{transform:translateX(-120px)} }
            .animate-wave svg { animation: waveMove 6s linear infinite; }
          `}</style>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
                initial="hidden" animate="visible" variants={fadeUpVariants} custom={1}
              >
                S2P Community
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed"
                initial="hidden" animate="visible" variants={fadeUpVariants} custom={2}
              >
                Student to Professional (S2P) is our community of innovators, researchers, and practitioners
                who are transforming ideas into real-world solutions. Share your journey and inspire others.
              </motion.p>
            </div>
          </div>
        </section>
      </header>

      {/* ── Join Community ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl shadow-blue-900/5 p-12 md:p-16 text-center">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-6">
              Community Access
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6 tracking-tight">Join Our Community</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
              The Student to Professional (S2P) community brings together academics, industry professionals, and enthusiasts
              who are passionate about turning scientific research into practical applications. Share your success story
              and be part of this growing network.
            </p>
            <button
              onClick={() => setIsSubmitDialogOpen(true)}
              className="inline-flex items-center gap-3 bg-black hover:bg-slate-900 text-white font-bold text-[11px] px-10 py-5 rounded-2xl transition-all shadow-xl shadow-black/20 uppercase tracking-[0.2em] hover:-translate-y-1 font-heading"
            >
              <User className="w-4 h-4" />
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      <BenefitsSection />
      {/* <SuccessStories /> */}
      <TopContributors />



      {/* ── Community Stories ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-6">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-8 tracking-tight">Community Stories</h2>
            <p className="text-slate-500 font-medium max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Read inspiring stories from our community members who have successfully implemented
              Tarcin Robotic's technologies or collaborated with our team on innovative projects.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="flex gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (stories as CommunityStory[]).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(stories as CommunityStory[]).map((story: CommunityStory) => (
                <article key={story.id}>
                  <StoryCard story={story} />
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-xl shadow-blue-900/5 p-12 md:p-20 text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Quote className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-black mb-4 tracking-tight leading-tight">Be the first to share your story</h3>
              <p className="text-slate-500 font-medium mb-10 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                No stories have been shared yet. Share your experience with Tarcin Robotic's
                technologies and inspire others in the community.
              </p>
              <button
                onClick={() => setIsSubmitDialogOpen(true)}
                className="inline-flex items-center gap-3 bg-black hover:bg-slate-900 text-white font-bold text-[11px] px-10 py-5 rounded-2xl transition-all shadow-xl shadow-black/20 uppercase tracking-[0.2em] hover:-translate-y-1 font-heading"
              >
                Share Your Story
              </button>
            </div>
          )}
        </div>
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

