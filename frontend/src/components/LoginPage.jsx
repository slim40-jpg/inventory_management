import { useState } from 'react';
import { Package, Lock, Mail, User, Building2, Phone, Shield, AlertCircle, Warehouse, BarChart3, Users, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// onLogin: function to handle login
export function LoginPage({ onLogin }) {
  const [view, setView] = useState('welcome');
  
  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupEntreprise, setSignupEntreprise] = useState('');
  const [signupPhoneNumber, setSignupPhoneNumber] = useState('');
  const [signupRole, setSignupRole] = useState('staff');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  
  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Get users from localStorage
    const usersJson = localStorage.getItem('stockManagementUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Find user
    const user = users.find(
      u => u.username === loginUsername && 
           u.email === loginEmail && 
           u.password === loginPassword
    );

    if (user) {
      // Successful login
      onLogin({
        name: user.username,
        role: user.role === 'admin' ? 'Administrateur' : 'Gestionnaire',
        company: user.entreprise,
        email: user.email,
        phone: user.phoneNumber,
        userRole: user.role,
      });
    } else {
      setLoginError('invalid credentials');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');

    // Check if passwords match
    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Les mots de passe ne correspondent pas');
      return;
    }

    // Get existing users from localStorage
    const usersJson = localStorage.getItem('stockManagementUsers');
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if user already exists
    const existingUser = users.find(
      u => u.username === signupUsername || u.email === signupEmail
    );

    if (existingUser) {
      setSignupError('Un utilisateur avec ce nom ou cet email existe déjà');
      return;
    }

    // Create new user
    const newUser = {
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
      entreprise: signupEntreprise,
      phoneNumber: signupPhoneNumber,
      role: signupRole,
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('stockManagementUsers', JSON.stringify(users));

    // Show success message and redirect to login
    setSignupSuccess(true);
    setTimeout(() => {
      setSignupSuccess(false);
      setView('login');
      setLoginUsername(signupUsername);
      setLoginEmail(signupEmail);
    }, 2000);
  };

  if (view === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                <Package className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl mb-4">Plateforme de Gestion de Stock</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solution complète pour gérer votre matériel événementiel à travers plusieurs entrepôts et régions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Warehouse className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Multi-Entrepôts</CardTitle>
                <CardDescription>
                  Gérez plusieurs dépôts répartis dans différentes régions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Tableaux de Bord</CardTitle>
                <CardDescription>
                  Visualisez vos stocks et mouvements en temps réel
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">Multi-Utilisateurs</CardTitle>
                <CardDescription>
                  Gestion des rôles et permissions pour votre équipe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => setView('login')}
            >
              Se connecter
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8"
              onClick={() => setView('signup')}
            >
              Créer un compte
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Créer un compte</CardTitle>
              <CardDescription>
                Rejoignez la plateforme de gestion de stock
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {signupSuccess && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Compte créé avec succès ! Redirection vers la connexion...
                </AlertDescription>
              </Alert>
            )}

            {signupError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{signupError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Nom d'utilisateur</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="johndoe"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showSignupPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm-password"
                    type={showSignupConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showSignupConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-entreprise">Entreprise</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-entreprise"
                    type="text"
                    placeholder="Nom de votre entreprise"
                    value={signupEntreprise}
                    onChange={(e) => setSignupEntreprise(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-phone">Numéro de téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={signupPhoneNumber}
                    onChange={(e) => setSignupPhoneNumber(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-role">Rôle</Label>
                <Select value={signupRole} onValueChange={(value) => setSignupRole(value)}>
                  <SelectTrigger id="signup-role">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff (Gestionnaire)</SelectItem>
                    <SelectItem value="admin">Admin (Administrateur)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Créer mon compte
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-blue-600 hover:underline"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Login view
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Accédez à votre plateforme de gestion
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-username">Nom d'utilisateur</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-username"
                  type="text"
                  placeholder="johndoe"
                  value={loginUsername}
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                    setLoginError('');
                  }}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="votre@email.com"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setLoginError('');
                  }}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError('');
                  }}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showLoginPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas de compte ?{' '}
              <button
                type="button"
                onClick={() => setView('signup')}
                className="text-blue-600 hover:underline"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
