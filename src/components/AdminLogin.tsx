
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from './ui/alert';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  
  const { login } = useAuth();

  // Rate limiting: Max 5 attempts per session
  const MAX_ATTEMPTS = 5;
  const isBlocked = attempts >= MAX_ATTEMPTS;

  const validateInput = () => {
    if (!email || !password) {
      setError('E-posta ve şifre gereklidir');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin');
      return false;
    }
    
    // Minimum password length
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast.error('Çok fazla başarısız deneme. Lütfen sayfayı yenileyip tekrar deneyin.');
      return;
    }
    
    setError('');
    
    if (!validateInput()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Giriş başarılı! Yönlendiriliyorsunuz...');
        // Reset attempts on success
        setAttempts(0);
      } else {
        throw new Error('Giriş başarısız');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Increment failed attempts
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Determine error message based on error type
      let errorMessage = 'Giriş başarısız oldu';
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Geçersiz e-posta veya şifre';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'E-posta adresinizi doğrulayın';
      } else if (err.message?.includes('Too many requests')) {
        errorMessage = 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin';
      } else if (err.message?.includes('Network')) {
        errorMessage = 'Bağlantı hatası. İnternet bağlantınızı kontrol edin';
      }
      
      setError(errorMessage);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        toast.error('Çok fazla başarısız deneme. Hesabınız geçici olarak engellendi.');
      } else {
        toast.error(`${errorMessage}. Kalan deneme: ${MAX_ATTEMPTS - newAttempts}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Girişi</CardTitle>
          <CardDescription className="text-center">
            Yönetim paneline erişim için giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isBlocked && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Güvenlik nedeniyle erişim engellendi. Sayfayı yenileyip tekrar deneyin.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isBlocked}
                required
                autoComplete="username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isBlocked}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isBlocked}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || isBlocked}
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Güvenlik Notu:</strong> Bu panel yalnızca yetkili kullanıcılar içindir. 
              Giriş yapmak için geçerli bir Supabase hesabına sahip olmanız gerekmektedir.
            </p>
          </div>
          
          {attempts > 0 && attempts < MAX_ATTEMPTS && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Başarısız deneme: {attempts}/{MAX_ATTEMPTS}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
