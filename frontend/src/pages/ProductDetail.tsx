import React from "react";
import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Check, Zap, Package, Shield, Star, 
  MessageCircle, Download, FileText, Clock
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import DocumentHead from "../components/shared/DocumentHead";
import CTASection from "../components/home/CTASection";
import Newsletter from "../components/home/Newsletter";
import { fadeUpVariants, staggerContainerVariants } from "../lib/animations";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { productsData } from "../data/productData";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Features", value: "features" },
  { label: "Specifications", value: "specs" },
  { label: "Case Studies", value: "case-studies" },
  { label: "FAQ", value: "faq" },
];

const ProductDetail: React.FC = () => {
  const [, params] = useRoute<{ id: string }>("/products/:id");
  const productId = params?.id || "";
  const product = productsData[productId as keyof typeof productsData];
  const { elementRef, isVisible } = useScrollAnimation();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const [selectedTab, setSelectedTab] = useState('overview');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(e.target.value);
  };
  
  // If product doesn't exist, show a message
  if (!product) {
    return (
      <>
        <DocumentHead
          title="Product Not Found | Tarcin Robotic LLP"
          description="The requested product could not be found."
        />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or may have been removed.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </>
    );
  }
  
  return (
    <>
      <DocumentHead
        title={`${product.title} | Tarcin Robotic LLP`}
        description={product.description}
      />
      
      <article>
        {/* Hero Section */}
        <header>
          <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-start mb-8">
                <Link href="/products">
                  <Button variant="ghost"
                    className="inline-flex items-center bg-white text-blue-600 font-semibold px-5 py-2 rounded-2xl shadow border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 gap-2 mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        product.category === "Robotics"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                          : product.category === "IoT Devices"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : product.category === "Software"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                      }`}
                    >
                      {product.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.tier}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
                    {product.title}
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-justify">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-6">
                    {/* <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Request Demo
                    </Button>

                    <Button variant="outline" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white">
                      Download Brochure
                    </Button> */}
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </header>

        {/* Main Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="w-full bg-white border-blue-500">
              {/* <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 mb-8">
                <TabsTrigger value="overview" className="text-blue-700 data-[state=active]:text-purple-700">Overview</TabsTrigger>
                <TabsTrigger value="features" className="text-blue-700 data-[state=active]:text-purple-700">Features</TabsTrigger>
                <TabsTrigger value="specs" className="text-blue-700 data-[state=active]:text-purple-700">Specifications</TabsTrigger>
                <TabsTrigger value="case-studies" className="text-blue-700 data-[state=active]:text-purple-700">Case Studies</TabsTrigger>
                <TabsTrigger value="faq" className="text-blue-700 data-[state=active]:text-purple-700 hidden md:block">FAQ</TabsTrigger>
              </TabsList> */}




        {/* Desktop Tabs */}
        <div className="hidden md:grid w-full grid-cols-4 md:grid-cols-5 mb-4 gap-2">
          {TABS.map((tab) => (
            <button
              id={`${tab.value}-tab`}
              key={tab.value}
              className={`py-2 px-4 text-blue-700 border-b-2 ${
                selectedTab === tab.value
                  ? "text-purple-700 border-purple-700"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedTab(tab.value)}
              aria-controls={`${tab.value}-panel`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden mb-4">
          <select
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {TABS.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Content */}
        {/* <div className="mt-4">
          {selectedTab === "overview" && <div> Overview content here</div>}
          {selectedTab === "features" && <div> Features content here</div>}
          {selectedTab === "specs" && <div>Specifications content here</div>}
          {selectedTab === "case-studies" && <div> Case Studies content here</div>}
          {selectedTab === "faq" && <div>FAQ content here</div>}
        </div> */}



              {/* Overview Tab */}
               {selectedTab === "overview" &&
              // <TabsContent value="overview">
                <section id="overview-panel" aria-labelledby="overview-tab">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div
                        className="prose prose-blue max-w-none dark:prose-invert mb-8 text-justify"
                        dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mt-1 mr-3" />
                            <span className="text-gray-700 dark:text-gray-300 text-justify">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
                          What Our Customers Say
                        </h3>

                        <div className="space-y-6">
                          {product.testimonials.map((testimonial, index) => (
                            <div key={index} className="relative">
                              <div className="absolute -left-3 top-0 text-blue-500 text-4xl opacity-30">"</div>
                              <div className="pl-4">
                                <p className="italic text-gray-700 dark:text-gray-300 mb-3">{testimonial.quote}</p>
                                <div className="font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <aside className="lg:col-span-1">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md sticky top-24">
                        <div className="mb-6">
                          <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                            Product Information
                          </h3>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {product.price}
                          </div>

                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Category</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Tier</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{product.tier}</span>
                            </div>
                          </div>
                        </div>

                        {/* <Button className="w-full mb-4 text-white bg-blue-600 hover:bg-blue-700">
                          Request Demo
                        </Button>

                        <Button variant="outline" className="w-full mb-6  text-white bg-blue-600 hover:bg-blue-700 hover:text-white">
                          Download Brochure
                        </Button> */}

                        <hr className="my-6 border-gray-200 dark:border-gray-700" />

                        <div className="text-center">
                          <p className="text-gray-600 dark:text-gray-400 mb-4">Need more information?</p>
                          <Link href="/contact">
                            <Button  className="w-full mb-4 text-white bg-blue-600 hover:bg-blue-700 hover:text-white">
                              Contact Us
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </section>
              // </TabsContent>
                      }
              
              {/* Features Tab */}
               {selectedTab === "features" &&
              // <TabsContent value="features">
                <section id="features-panel" aria-labelledby="features-tab">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-800 dark:text-blue-300 mb-4">
                          {index % 3 === 0 && <Zap className="h-6 w-6" />}
                          {index % 3 === 1 && <Shield className="h-6 w-6" />}
                          {index % 3 === 2 && <Star className="h-6 w-6" />}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                           {feature}
                        </h3>
                        {/* <p className="text-gray-600 dark:text-gray-300 text-justify">
                          {feature}
                        </p> */}
                      </motion.div>
                    ))}
                  </div>
                </section>
              // </TabsContent>
                }

              {/* Specifications Tab */}
               {selectedTab === "specs" &&
              // <TabsContent value="specs">
                <section id="specs-panel" aria-labelledby="specs-tab">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                        Technical Specifications
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Detailed specifications for {product.title}
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
                        {Object.entries(product.technicalSpecs).map(([key, value]) => (
                          <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-0">
                            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              // </TabsContent>
                    }
              
              {/* Case Studies Tab */}
              {selectedTab === "case-studies" && <section id="case-studies-panel" aria-labelledby="case-studies-tab">
              {/* // <TabsContent value="case-studies"> */}
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Success Stories
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.caseStudies.map((caseStudy, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white text-justify">
                            {caseStudy.title}
                          </h3>
                          <span className="text-justify bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm text-justify">
                            {caseStudy.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-justify">
                          {caseStudy.description}
                        </p>
                        {/* <Button variant="outline" size="sm" className="mt-2">
                          Read Full Case Study
                        </Button> */}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 text-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Discuss Your Requirements
                    </Button>
                  </Link>
                </div>
                </section>}
              {/* // </TabsContent> */}


              {/* FAQ Tab */}
               {selectedTab === "faq" &&
              // <TabsContent value="faq">
                <section id="faq-panel" aria-labelledby="faq-tab">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
          {product.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center"
              >
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <i
                  className={`ri-arrow-${openIndex === index ? "up" : "down"}-s-line text-xl text-gray-500 dark:text-gray-400`}
                ></i>
              </button>

              {openIndex === index && (
                <div className="p-5">
                  <div className="flex items-start">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      A
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

                    <div className="mt-10 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center">
                      <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                        Still have questions?
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our technical team is happy to answer any questions you might have about this product.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <MessageCircle className="h-4 w-4 mr-2" /> Contact Us
                          </Button>
                        </Link>
                        {/* <Button variant="outline">
                          Download Product Guide
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </section>
              // </TabsContent>
      }
            </Tabs>
          </div>
        </section>
      </article>
      
      <CTASection />
      <Newsletter />
    </>
  );
};

export default ProductDetail;