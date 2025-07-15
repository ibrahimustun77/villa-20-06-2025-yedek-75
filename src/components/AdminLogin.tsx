
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from "sonner";
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    
    if (!email || !password) {
      setLoginError("Email ve şifre alanları boş olamaz");
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("Attempting login with email:", email);
      const success = await login(email, password);
      
      if (!success) {
        setLoginError("Giriş başarısız. Lütfen email ve şifrenizi kontrol edin.");
        toast.error("Giriş başarısız", {
          description: "Email veya şifre hatalı olabilir"
        });
      } else {
        toast.success("Giriş başarılı");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific error messages
      if (error.message && error.message.includes("Email not confirmed")) {
        setLoginError("Email adresiniz henüz onaylanmamış. Lütfen gelen kutunuzu kontrol edin veya Supabase'de email onayını devre dışı bırakın.");
        toast.error("Email onaylanmamış", {
          description: "Lütfen gelen kutunuzu kontrol edin veya Supabase'de email onayını devre dışı bırakın"
        });
      } else {
        setLoginError(`Giriş sırasında bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
        toast.error("Giriş hatası", {
          description: error.message || 'Bilinmeyen bir hata oluştu'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card max-w-md mx-auto p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Yönetici Girişi</h2>

      {loginError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-6 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            {loginError}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="ornek@therma.com"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Şifre</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button 
          type="submit" 
          className="button-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Giriş yapabilmek için Supabase Authentication üzerinde hesap oluşturmanız gerekmektedir.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
