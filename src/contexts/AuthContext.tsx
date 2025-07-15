
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from "sonner";
import { Session } from '@supabase/supabase-js';
import { cleanupAuthState, ensureAdminUserExists } from '../services/auth/authUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    console.log("AuthProvider initialized - checking session");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, "Session:", !!newSession);
        setSession(newSession);
        setIsAuthenticated(!!newSession);
        
        if (event === 'SIGNED_IN' && newSession) {
          localStorage.setItem('adminAuth', 'true');
          
          // When user signs in, ensure they exist in admin_users table
          if (newSession.user?.email) {
            ensureAdminUserExists(newSession.user.email)
              .then(success => {
                if (success) {
                  toast.success("Giriş başarılı");
                } else {
                  toast.error("Admin hesabı oluşturulurken bir sorun oluştu");
                }
              });
          }
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('adminAuth');
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", !!currentSession);
      setSession(currentSession);
      setIsAuthenticated(!!currentSession);
      
      // For backward compatibility with old auth system
      if (currentSession) {
        localStorage.setItem('adminAuth', 'true');
        
        // Ensure current user exists in admin_users table
        if (currentSession.user?.email) {
          ensureAdminUserExists(currentSession.user.email);
        }
      }
    });
    
    // For backward compatibility, also check localStorage
    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = () => {
    const authStatus = localStorage.getItem('adminAuth');
    const isAuth = authStatus === 'true';
    console.log("Checking authentication status (localStorage):", isAuth);
    
    // Only set if not already set from session
    if (!session && isAuth) {
      setIsAuthenticated(isAuth);
    }
    
    return isAuth;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with email:", email);
      
      // Clean up any existing auth state to prevent conflicts
      cleanupAuthState();
      
      // First try to sign out globally to ensure clean state
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (e) {
        console.log("Global sign out failed, continuing anyway:", e);
      }
      
      // Sign in with email and password using Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email, 
        password: password
      });
      
      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      if (data?.session) {
        console.log("Login successful with Supabase auth");
        setSession(data.session);
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        
        // Ensure user exists in admin_users table
        const adminUserExists = await ensureAdminUserExists(email);
        if (!adminUserExists) {
          console.warn("User authenticated but could not be added to admin_users table");
          // Still return true as auth was successful
        }
        
        return true;
      } else {
        console.log("No session returned after login");
        toast.error("Giriş sırasında bir hata oluştu");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err; // Rethrow to let the component handle it
    }
  };

  const logout = () => {
    console.log("Logging out");
    cleanupAuthState();
    
    // Sign out from Supabase
    supabase.auth.signOut({ scope: 'global' }).then(() => {
      setIsAuthenticated(false);
      setSession(null);
      toast.success("Çıkış yapıldı");
    }).catch(err => {
      console.error("Error during sign out:", err);
      // Force logout anyway
      setIsAuthenticated(false);
      setSession(null);
      toast.success("Çıkış yapıldı");
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
