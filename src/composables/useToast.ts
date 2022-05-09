import { inject } from "vue";

type Toast = (message: string, options?: object) => void;

export function useToast() {
  const toast = inject("WKToast") as Toast;

  function successToast(message: string) {
    toast(message);
  }

  function errorToast(message: string) {
    toast(message, { type: "error" });
  }

  return { toast, errorToast, successToast };
}
