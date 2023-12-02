"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useRef,
} from "react";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";
import type { Session, UserMetadata } from "@/types/supabase";
import { supabase as supaseClient } from "@/supabase";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  currentUser?: UserMetadata;
  isLoading: boolean;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export const useSupabaseContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

export default function SupabaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [supabase] = useState(() => supaseClient);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (isRenderedRef.current) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_, userSession) => {
        setIsLoading(false);
        setSession(userSession as Session);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      isRenderedRef.current = true;
    }
  }, [supabase]);

  const value = useMemo(
    () => ({
      supabase,
      session,
      currentUser: session
        ? {
            ...session.user.user_metadata,
            id: session.user.id,
          }
        : undefined,
      isLoading,
    }),
    [supabase, session, isLoading]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
