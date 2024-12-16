// src/stores/ApplicationStore.js

import { create } from "zustand";

const useApplicationStore = create((set, get) => ({
  // Başvuruların listesi
  applications: [],

  // Başvuru ekleme fonksiyonu
  addApplication: (application) =>
    set((state) => ({
      applications: [
        ...state.applications,
        { ...application, status: "Bekliyor" }, // Varsayılan durum "Bekliyor"
      ],
    })),

  // Başvuru silme fonksiyonu
  removeApplication: (tcKimlikNo) =>
    set((state) => ({
      applications: state.applications.filter(
        (app) => app.tcKimlikNo !== tcKimlikNo
      ),
    })),

  // Başvuru güncelleme fonksiyonu
  updateApplication: (tcKimlikNo, updatedApplication) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.tcKimlikNo === tcKimlikNo ? { ...app, ...updatedApplication } : app
      ),
    })),

  // Başvuru durumunu güncelleme fonksiyonu
  updateApplicationStatus: (tcKimlikNo, newStatus) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.tcKimlikNo === tcKimlikNo ? { ...app, status: newStatus } : app
      ),
    })),

  // Başvuru detaylarını alma fonksiyonu
  getApplicationDetails: (tcKimlikNo) => {
    const { applications } = get(); // Mevcut state'i al
    return applications.find((app) => app.tcKimlikNo === tcKimlikNo) || null;
  },
}));

export default useApplicationStore;
