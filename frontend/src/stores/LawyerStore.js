import { create } from "zustand";

const useLawyerStore = create((set, get) => ({
  lawyers: [],

  // Avukat ekleme fonksiyonu
  addLawyer: (lawyer) =>
    set((state) => ({
      lawyers: [...state.lawyers, lawyer],
    })),

  // Avukat silme fonksiyonu
  removeLawyer: (tcKimlikNo) =>
    set((state) => ({
      lawyers: state.lawyers.filter(
        (lawyer) => lawyer.tcKimlikNo !== tcKimlikNo
      ),
    })),

  // Avukat güncelleme fonksiyonu
  updateLawyer: (tcKimlikNo, updatedLawyer) =>
    set((state) => ({
      lawyers: state.lawyers.map((lawyer) =>
        lawyer.tcKimlikNo === tcKimlikNo ? { ...lawyer, ...updatedLawyer } : lawyer
      ),
    })),

  // Avukat bilgilerini getirme fonksiyonu
  getLawyer: (tcKimlikNo) => {
    const { lawyers } = get();
    return lawyers.find((lawyer) => lawyer.tcKimlikNo === tcKimlikNo) || null;
  },
}));

export default useLawyerStore;
