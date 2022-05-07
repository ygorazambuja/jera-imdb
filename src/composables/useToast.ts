import { inject } from "vue";

type Toast = (message: string) => void;

export function useToast() {
  const toast = inject("WKToast") as Toast;

  return { toast };
}
