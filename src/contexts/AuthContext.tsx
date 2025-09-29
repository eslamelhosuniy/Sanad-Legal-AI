import { createContext, useContext, useState, ReactNode } from "react";
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
  updateUser: (updated: Partial<User>) => void; // ✅ نضيف updateUser
  addConversation: (conv: any) => void; // ✅ نضيف addConversation
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "https://sanad-backend-production-cbbc.up.railway.app/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem("user");
      }
    }
    return null;
  });

  const addConversation = (conv: any) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newUser = {
        ...prev,
        conversations: [...(prev.conversations || []), conv],
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(
      "https://sanad-backend-production-cbbc.up.railway.app/api/Auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    console.log("status:", res.status);
    console.log("response:", data);

    if (!res.ok) {
      if (data?.raw) {
        throw new Error(data.raw);
      }
      if (data?.errors) {
        // ناخد أول error ونرميه
        const messages = Object.values(data.errors).flat();
        throw new Error(messages.join(" | "));
      }
      if (data?.message) {
        throw new Error(data.message);
      }
      throw new Error("Register failed");
    }

    return data;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Login failed");

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

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    const res = await fetch(`${API_BASE}/Users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Failed to update user");

    // ندمج التعديلات مع الداتا القديمة
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, addConversation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
