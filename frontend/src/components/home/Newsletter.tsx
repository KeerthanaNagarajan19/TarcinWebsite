import React, { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";
// import { apiRequest } from "../../lib/queryClient";


const Newsletter: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Handle non-JSON or non-2xx safely
      const text = await res.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch { /* ignore parse errors */ }

      if (!res.ok) {
        const msg = data?.message || "Subscription failed";
        throw new Error(msg);
      }

      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error?.message || "There was an error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 lg:p-10"
        >
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] dark:text-white mb-6">
              Stay Updated
            </h3>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Subscribe to our newsletter for the latest updates on robotics, AI, and educational technology.
            </p>
          </motion.div>

          <motion.form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-[48px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors wave-btn whitespace-nowrap min-h-[48px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </motion.form>

          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={2}
          >
            By subscribing, you agree to our <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>. You can unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
