import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ProfileType = {
  avatar_url: string | null;
  full_name: string | null;
  group: string;
  id: string;
  updated_at: string | null;
  username: string | null;
  website: string | null;
} | null;

type AuthType = {
  session: Session | null;
  loding: boolean;
  profile: ProfileType;
  isAdmin: boolean;
};
const AuthContext = createContext<AuthType>({
  session: null,
  loding: true,
  profile: null,
  isAdmin: false,
});

function AuthCOntextProvider({ children }: PropsWithChildren) {
  const [session, setsession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileType>(null);
  const [loding, setloding] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setsession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }

      setloding(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setsession(session);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ session, loding, profile, isAdmin: profile?.group === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthCOntextProvider;

export const useAuth = () => useContext(AuthContext);
