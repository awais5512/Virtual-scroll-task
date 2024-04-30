import { create } from "zustand";

async function fetchUniversities(): Promise<University[]> {
  const response = await fetch("http://universities.hipolabs.com/search?country=United+Kingdom");
  const data = await response.json();

  return data;
}

export interface University {
  id?: number,
  web_pages: string[],
  alpha_two_code: string,
  domains: string[],
  name: string,
  country: string,
}

interface UniversitiesStoreProps {
  error: string | null,
  loading: boolean,
  universities: University[];
  fetchUniversities: () => void;
}

export const useUniversitiesStore = create<UniversitiesStoreProps>((set) => ({
  error: null,
  loading: false,
  universities: [],
  fetchUniversities: async () => {
    set({ loading: true, universities: [], error: null });

    try {
      const fetchedUniversities = await fetchUniversities();

      set({ universities: fetchedUniversities });
    } catch (error) {
      set({ error: (error as Error).message || "Error fetching universities" });
    } finally {
      set({ loading: false });
    }
  },
}));
