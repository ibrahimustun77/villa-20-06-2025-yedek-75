
import { supabase } from "@/integrations/supabase/client";
import { getCurrentSession, ensureSession, cleanupAuthState } from "../auth/authUtils";

// Export the supabase client and auth utils for direct use when needed
export { supabase, getCurrentSession, ensureSession, cleanupAuthState };

// Helper function for handling toast notifications
export const handleError = (error: any, errorMessage: string) => {
  console.error(`Error: ${errorMessage}`, error);
  return error;
};
