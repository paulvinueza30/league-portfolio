import { fallbackProjects } from "./fallbackProjects";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  demo_url?: string;
  source_url: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch("/api/projects");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();
    const data: Project[] = rawData.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch projects from API, using fallback:", error);
    return fallbackProjects;
  }
};
