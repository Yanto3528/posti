import SupabaseProvider from "@/contexts/auth.context";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <SupabaseProvider>{children}</SupabaseProvider>;
}
