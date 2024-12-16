import axios from "axios";
import { create } from "zustand";

const useApplicationStore = create((set, get) => ({
  applications: [],

  // Başvuruları sunucudan çekme fonksiyonu
  fetchApplications: async () => {
    try {
      const response = await axios.get("/api/applications");
      set({ applications: response.data });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  },

  // Yeni başvuru ekleme fonksiyonu
  addApplication: async (application) => {
    try {
      const response = await axios.post("/api/applications", application);
      set((state) => ({ applications: [...state.applications, response.data] }));
    } catch (error) {
      console.error("Error adding application:", error);
    }
  },

  // Başvuru silme fonksiyonu
  removeApplication: async (tcKimlikNo) => {
    try {
      await axios.delete(`/api/applications/${tcKimlikNo}`);
      set((state) => ({
        applications: state.applications.filter(
          (app) => app.tcKimlikNo !== tcKimlikNo
        ),
      }));
    } catch (error) {
      console.error("Error removing application:", error);
    }
  },

  // Başvuru güncelleme fonksiyonu
  updateApplication: async (tcKimlikNo, updatedApplication) => {
    try {
      const response = await axios.put(
        `/api/applications/${tcKimlikNo}`,
        updatedApplication
      );
      set((state) => ({
        applications: state.applications.map((app) =>
          app.tcKimlikNo === tcKimlikNo ? { ...app, ...response.data } : app
        ),
      }));
    } catch (error) {
      console.error("Error updating application:", error);
    }
  },
}));

export default useApplicationStore;
