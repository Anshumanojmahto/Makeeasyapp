import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ProfileType = Tables<"profiles"> | null;

type AuthType = {
  session: Session | null;
  loding: boolean; // Keeping the original typo here
  profile: ProfileType;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthType>({
  session: null,
  loding: true, // Keeping the original typo here
  profile: null,
  isAdmin: false,
});

function AuthCOntextProvider({ children }: PropsWithChildren) {
  const [session, setsession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileType>(null);
  const [loding, setloding] = useState(true); // Keeping the original typo here

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setsession(session);

      if (session) {
        // Fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }

      setloding(false); // Keeping the original typo here
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session);
      setsession(session);
    });
  }, []); // Empty array ensures fetchSession only runs once

  return (
    <AuthContext.Provider
      value={{
        session,
        loding,
        profile,
        isAdmin: profile?.group === "ADMIN", // Safe access to profile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthCOntextProvider;

export const useAuth = () => useContext(AuthContext);
