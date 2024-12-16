import axios from "axios";
import { create } from "zustand";

const useLawyerStore = create((set, get) => ({
  lawyers: [],

  // Avukatları sunucudan çekme fonksiyonu
  fetchLawyers: async () => {
    try {
      const response = await axios.get("/api/lawyers");
      set({ lawyers: response.data });
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  },

  // Yeni avukat ekleme fonksiyonu
  addLawyer: async (lawyer) => {
    try {
      const response = await axios.post("/api/lawyers", lawyer);
      set((state) => ({ lawyers: [...state.lawyers, response.data] }));
    } catch (error) {
      console.error("Error adding lawyer:", error);
    }
  },

  // Avukat silme fonksiyonu
  removeLawyer: async (tcKimlikNo) => {
    try {
      await axios.delete(`/api/lawyers/${tcKimlikNo}`);
      set((state) => ({
        lawyers: state.lawyers.filter(
          (lawyer) => lawyer.tcKimlikNo !== tcKimlikNo
        ),
      }));
    } catch (error) {
      console.error("Error removing lawyer:", error);
    }
  },

  // Avukat güncelleme fonksiyonu
  updateLawyer: async (tcKimlikNo, updatedLawyer) => {
    try {
      const response = await axios.put(
        `/api/lawyers/${tcKimlikNo}`,
        updatedLawyer
      );
      set((state) => ({
        lawyers: state.lawyers.map((lawyer) =>
          lawyer.tcKimlikNo === tcKimlikNo ? { ...lawyer, ...response.data } : lawyer
        ),
      }));
    } catch (error) {
      console.error("Error updating lawyer:", error);
    }
  },
}));

export default useLawyerStore;
