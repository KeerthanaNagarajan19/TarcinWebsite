import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Event = {
    _id: string;
    title: string;
    description: string;
    date: string;
    endDate?: string;
    location: string;
    registrationLink?: string;
    image?: string;
    isUpcoming: boolean;
};

const fetchEvents = async (): Promise<Event[]> => {
    const res = await axios.get("/api/cms/events");
    return res.data;
};

export const useEvents = () => {
    return useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });
};
