import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  conversations: object[];
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE =
  "https://sanad-backend-production-cbbc.up.railway.app/api/Auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("user");
      }
    }
  }, []);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);

        // ✅ لو اليوزر موجود يروح علطول للداشبورد
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("user");
      }
    }
  }, [user, navigate]);

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => ({}));
    console.log("REGISTER response:", data);

    if (!res.ok) {
      // هنا بناخد أوضح رسالة من السيرفر
      const errorMsg =
        data?.errors?.Password?.[0] ||
        data?.errors?.Email?.[0] ||
        data?.errors?.Name?.[0] ||
        data?.message ||
        "Register failed";

      throw new Error(errorMsg);
    }

    navigate("/waiting_verify_email");
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    console.log("LOGIN response:", data);

    if (!res.ok) {
      const errorMsg =
        data?.errors?.Password?.[0] ||
        data?.errors?.Email?.[0] ||
        data?.message ||
        "Login failed";

      throw new Error(errorMsg);
    }

    const userObj: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      conversations: data.conversations,
    };
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  console.log(ctx);
  return ctx;
};
