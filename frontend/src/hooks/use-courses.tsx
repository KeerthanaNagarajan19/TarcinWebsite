import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Course = {
  _id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  price: string;
  duration: string;
  level: string;
  students: number;
  rating: number;
  category: string;
  modules?: string[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
};

const fetchCourses = async (): Promise<Course[]> => {
  const res = await axios.get("/api/cms/courses");
  return res.data;
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
