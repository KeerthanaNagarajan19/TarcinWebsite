import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants, slideInLeftVariants, slideInRightVariants } from "../../lib/animations";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useToast } from "../../hooks/use-toast";
import { MapPin, Phone, Mail, Linkedin, Instagram, Youtube } from "lucide-react";
import {Link} from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  privacy: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy."
  }),
});

type FormValues = z.infer<typeof formSchema>;

const locations = [
  {
    id: "head",
    label: "Head Office",
    title: "Head Office",
    coords: "9.935544967851508,78.14878259226196",
    address: [
      "176, E 6th Street,",
      "K K Nagar, Madurai - 625020",
      "India",
    ],
  },
  {
    id: "tce",
    label: "TCE TBI",
    title: "TCE - Technology Business Incubator",
    coords: "9.886315991098286, 78.07632099573392",
    address: [
      "Thiagarajar College of Engineering,",
      "Thiagarajar Advance Research Centre,",
      "Technology Business Incubator,",
      "TCE Road, Madurai, Tamil Nadu 625015",
    ],
  },
  {
    id: "aaa",
    label: "AAA College",
    title: "AAA College of Engineering & Technology",
    coords: "9.569666468646876, 77.8702011602845",
    address: [
      "Kamarajar Educational Road,",
      "Amathur, Sivakasi, Tamil Nadu 626123",
    ],
  },
  {
    id: "chunchanagiri",
    label: "Chunchanagiri",
    title: "Sri Adi Chunchanagiri Women's College",
    coords: "9.710682655398003, 77.26735401107666",
    address: [
      "P768+5WM, NH183,",
      "Cumbum, Tamil Nadu 625516",
    ],
  },
];


const ContactSection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTab, setSelectedTab] = useState("head");
const activeLocation = locations.find((l) => l.id === selectedTab);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call an API
      await fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
});

      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

// const onSubmit = async (data: FormValues) => {
//   setIsSubmitting(true);

//   try {
//     const response = await fetch("/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data),
//     });

//     console.log("Raw response:", response); // ✅ See status etc.

//     const result = await response.json();

//     console.log("Parsed response:", result); // ✅ Check returned keys

//     if (response.ok && result.success) {
//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you as soon as possible.",
//       });
//       form.reset();
//     } else {
//       throw new Error(result.error + " Submission failed ");
//     }
//   } catch (error) {
//     toast({
//       title: "Error sending message",
//       description: "There was a problem sending your message. Please try again.",
//       variant: "destructive",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };


  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Have questions about our products, services, or want to discuss a potential collaboration? We're here to help.
          </motion.p>
        </div>

        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Contact Form */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8"
          >
            <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            type="email"
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your company name" 
                          {...field} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="sales">Sales & Pricing</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                            <SelectItem value="careers">Careers & Recruitment</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          {...field}
                          rows={4} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 text-blue-600 rounded border-gray-300 dark:border-gray-700 focus:ring-blue-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                          I agree to the <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors wave-btn"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Map and Info */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Map Placeholder */}
        <div className="space-y-6 mb-8">
  <Tabs value={selectedTab} onValueChange={setSelectedTab}>
    <TabsList className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
      {locations.map((loc) => (
        <TabsTrigger
          key={loc.id}
          value={loc.id}
          className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
        >
          {loc.label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>

  <div className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-64">
    <iframe
      key={selectedTab}
      className="w-full h-full border-0"
      src={`https://maps.google.com/maps?q=${activeLocation?.coords}&z=15&output=embed`}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>


            
            {/* Contact Information */}
            <address className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8 not-italic">
              <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MapPin className="h-5 w-5" />
                  </div>
              <div className="flex items-start">

  <div className="ml-4">
    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{activeLocation?.title}</h4>
    <p className="text-gray-600 dark:text-gray-300 mt-1">
      {activeLocation?.address.map((line, idx) => (
        <span key={idx}>{line}<br /></span>
      ))}
    </p>
  </div>
</div>

                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      +91 98846 75586 <br />
                      +91 80723 55711 <br/>
                      Monday - Friday, 9am - 6pm 
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      contact@tarcinrobotic.in<br />
                      hr@tarcinrobotic.in
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connect With Us</h4>
                  <nav className="flex space-x-4" aria-label="Social media">
                    <a href="https://www.linkedin.com/company/tarcin-robotic-llp/" target="_blank" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    {/* <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a> */}
                    <a href="https://www.instagram.com/tarcin_robotic/" target="_blank" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="https://www.youtube.com/@TarcinRobotic" target="_blank" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  </nav>
                </div>
              </div>
            </address>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
