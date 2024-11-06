import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthType = {
  session: Session | null;
  loding: boolean;
  profile: any;
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
  const [profile, setProfile] = useState<Session | null>(null);
  const [loding, setloding] = useState(true);
  useEffect(() => {
    async function getSession() {
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
    }
    getSession();
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