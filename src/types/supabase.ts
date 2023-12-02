import {
  User as AuthUser,
  Session as AuthSession,
} from "@supabase/supabase-js";

export interface UserMetadata {
  id: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  name: string;
  avatar_url: string;
  provider_id: string;
  sub: string;
  user_name: string;
}

export interface User extends AuthUser {
  user_metadata: UserMetadata;
}

export interface Session extends AuthSession {
  user: User;
}
