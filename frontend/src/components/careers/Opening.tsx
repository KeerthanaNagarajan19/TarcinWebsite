import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CareerItem from "../../pages/Careers";

const CareersSection = ({
  careers,
  internships,
  isLoading,
  noCareersContent,
  departments,
  locations,
}: {
  careers: Career[];
  internships: Career[];
  isLoading: boolean;
  noCareersContent: React.ReactNode;
  departments: string[];
  locations: string[];
}) => {
  const [activeTab, setActiveTab] = useState<"internship" | "job">("internship");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // filter logic (you can reuse your existing)
  const filteredCareers = (activeTab === "job" ? careers : internships).filter((career) => {
    const matchSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = departmentFilter === "all" || career.department === departmentFilter;
    const matchLoc = locationFilter === "all" || career.location === locationFilter;
    return matchSearch && matchDept && matchLoc;
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Current Openings</h2>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-blue-100 rounded-full p-1">
          <Button
            variant={activeTab === "internship" ? "default" : "ghost"}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
              activeTab === "internship" ? "bg-blue-600 text-white" : "text-blue-600"
            }`}
            onClick={() => setActiveTab("internship")}
          >
            Internship Openings
          </Button>
          <Button
            variant={activeTab === "job" ? "default" : "ghost"}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
              activeTab === "job" ? "bg-blue-600 text-white" : "text-blue-600"
            }`}
            onClick={() => setActiveTab("job")}
          >
            Job Openings
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search positions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc === "all" ? "All Locations" : loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Career Listings */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                      <div className="h-6 bg-gray-200 rounded w-16" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mt-3" />
                    <div className="flex gap-4 mt-3">
                      <div className="h-4 bg-gray-200 rounded w-1/5" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 bg-gray-200 rounded" />
                  </CardContent>
                  <CardFooter className="bg-gray-50">
                    <div className="h-10 bg-gray-200 rounded w-full" />
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : filteredCareers.length > 0 ? (
            <>
              {filteredCareers.map((career: Career) => (
                <article key={career.id}>
                  <CareerItem career={career} />
                </article>
              ))}
            </>
          ) : (
            noCareersContent
          )}
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
