import axios from "axios";
import { create } from "zustand";

const useLawyerStore = create((set, get) => ({
  lawyers: [],

  // Avukatları sunucudan çekme fonksiyonu
  fetchLawyers: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lawyers");
      console.log("Fetched lawyers:", response.data); // Gelen veriyi kontrol et
      set({ lawyers: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Avukatları çekerken hata oluştu:", error.message);
      set({ lawyers: [] }); // Hata durumunda boş array olarak set et
    }
  },
// avukat ekleme
  addLawyer: async (lawyer) => {
    try {
      const response = await axios.post("http://localhost:5000/api/lawyers", lawyer);
      // Yeni eklenen avukatı mevcut listeye ekleyin
      set((state) => ({
        lawyers: [...state.lawyers, response.data],
      }));
    } catch (error) {
      console.error("Error adding lawyer:", error.message);
    }
  },
  
  // Avukat silme fonksiyonu
  removeLawyer: async (nationalId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lawyers/${nationalId}`);
      set((state) => ({
        lawyers: state.lawyers.filter(
          (lawyer) => lawyer.nationalId !== nationalId
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
