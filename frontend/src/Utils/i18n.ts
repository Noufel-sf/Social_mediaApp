import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { create } from "zustand";

// Your translations
const resources = {
  en: {
    translation: {
      // TopBar
      social: "Social",
      search: "Search...",
      login: "Login",
      signup: "Signup",
      
      // Navigation
      home: "Home",
      messages: "Messages",
      friends: "Friends",
      profile: "Profile",
      settings: "Settings",
      
      // Messages section
      messagesTitle: "Messages",
      searchMessages: "Search messages",
      requests: "Requests",
      
      // Friend requests
      requestsTitle: "Requests",
      suggestionsTitle: "Suggestions",
      loadingRequests: "Loading requests...",
      errorLoadingRequests: "Error loading requests, showing default.",
      
      // Posts
      whatOnMind: "What's on your mind?",
      like: "Like",
      comment: "Comment",
      share: "Share",
      
      // Buttons
      send: "Send",
      accept: "Accept",
      confirm: "Confirm",
      reject: "Reject",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      
      // Status
      online: "Online",
      offline: "Offline",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      createPost: "Create Post",
    },
  },
  ar: {
    translation: {
      // TopBar
      social: "التواصل الاجتماعي",
      search: "البحث...",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      
      // Navigation
      home: "الرئيسية",
      messages: "الرسائل",
      friends: "الأصدقاء",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      
      // Messages section
      messagesTitle: "الرسائل",
      searchMessages: "البحث في الرسائل",
      requests: "الطلبات",
      suggestions: "اقتراحات",
      
      // Friend requests
      requestsTitle: "الطلبات",
      loadingRequests: "جاري تحميل الطلبات...",
      errorLoadingRequests: "خطأ في تحميل الطلبات، عرض الافتراضي.",
      
      // Posts
      whatOnMind: "ما الذي تفكر فيه؟",
      like: "إعجاب",
      comment: "تعليق",
      share: "مشاركة",
      
      // Buttons
      send: "إرسال",
      accept: "قبول",
      confirm: "تأكيد",
      reject: "رفض",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      
      // Status
      online: "متصل",
      offline: "غير متصل",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
        createPost: "إنشاء منشور",
    },
  },
};

i18n
  .use(LanguageDetector) // detect user language from browser/localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // default language
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
