
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Helper function to get current session with error handling
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error("Exception in getCurrentSession:", error);
    return null;
  }
};

// Helper function to ensure a valid session exists
export const ensureSession = async () => {
  const session = await getCurrentSession();
  
  if (!session) {
    try {
      // Check if there's a cached admin login in localStorage
      const adminAuth = localStorage.getItem('adminAuth');
      
      if (adminAuth === 'true') {
        console.log("Found cached admin login but no active session");
        // Clear invalid auth state to prevent loops
        cleanupAuthState();
        
        // Redirect to login page since we need a fresh login
        toast.error("Oturum süresi doldu. Lütfen tekrar giriş yapın.");
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1500);
        return null;
      }
      
      console.log("No active session found and no admin login");
      return null;
    } catch (error) {
      console.error("Exception in ensureSession:", error);
      return null;
    }
  }
  
  return session;
};

// Helper to clean up auth state (useful when logging out)
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem('adminAuth');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Function to ensure the admin user exists in the admin_users table
export const ensureAdminUserExists = async (email: string) => {
  try {
    // Check if user exists in admin_users table
    const { data: adminUsers, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email);
    
    console.log("Database response:", { adminUsers, error });
    
    if (error) {
      console.error("Error checking admin user:", error);
      return false;
    }
    
    // If user doesn't exist, add them
    if (!adminUsers || adminUsers.length === 0) {
      console.log("User not found in database");
      
      // Get user details from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No authenticated user found");
        return false;
      }
      
      // Add the user to admin_users table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { 
            email: user.email, 
            username: user.email?.split('@')[0] || 'admin',
            password_hash: 'auth-managed' // We don't store the actual password, auth handles that
          }
        ]);
      
      if (insertError) {
        console.error("Failed to add user to admin_users table:", insertError);
        return false;
      }
      
      console.log("User added to admin_users table");
      return true;
    }
    
    console.log("User found in database:", adminUsers[0]);
    return true;
  } catch (err) {
    console.error("Exception in ensureAdminUserExists:", err);
    return false;
  }
};
