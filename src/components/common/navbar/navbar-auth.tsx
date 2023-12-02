"use client";

import { Button } from "@/components/ui/button";
import { useSupabaseContext } from "@/contexts/auth.context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function NavbarAuth() {
  const { supabase, currentUser, isLoading } = useSupabaseContext();

  const onLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const onLogout = () => {
    supabase.auth.signOut();
  };

  if (isLoading) return null;

  return (
    <li>
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={currentUser.avatar_url}
                alt={currentUser.name}
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={onLogin}>Login</Button>
      )}
    </li>
  );
}
