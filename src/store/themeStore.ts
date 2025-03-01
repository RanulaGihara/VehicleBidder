import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: localStorage.getItem("theme") === "dark",
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");

      document.documentElement.classList.toggle("dark", this.isDark);
    },
    setInitialTheme() {
      const isDark = localStorage.getItem("theme") === "dark";
      this.isDark = isDark;
      document.documentElement.classList.toggle("dark", isDark);
    },
  },
});
