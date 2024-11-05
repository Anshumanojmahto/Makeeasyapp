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
};
const AuthContext = createContext<AuthType>({
  session: null,
  loding: true,
});

function AuthCOntextProvider({ children }: PropsWithChildren) {
  const [session, setsession] = useState<Session | null>(null);
  const [loding, setloding] = useState(true);
  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setsession(data.session);
      setloding(false);
    }
    getSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setsession(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session, loding }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthCOntextProvider;

export const useAuth = () => useContext(AuthContext);
