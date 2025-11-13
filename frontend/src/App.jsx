import { useState, useEffect } from 'react';
import { 
  Package, 
  Warehouse, 
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  LogOut,
  Bell
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { DepotManagement } from './components/DepotManagement';
import { MaterialManagement } from './components/MaterialManagement';
import { StockMovements } from './components/StockMovements';
import { Reservations } from './components/Reservations';
import { LoginPage } from './components/LoginPage';
import { UserManagement } from './components/UserManagement';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

import { Card, CardContent } from "./components/ui/card";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState({
    name: 'Marie Dubois',
    role: 'Gestionnaire',
    company: 'EventPro Solutions',
    email: 'marie@eventpro.com',
    phone: '+33 6 12 34 56 78',
    userRole: 'staff'
  });
  const [backendStatus, setBackendStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data))
      .catch(() => setBackendStatus({ success: false, message: 'Erreur de connexion au backend' }));
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser({
      ...userData,
      userRole: userData.userRole || 'staff'
    });
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const isAdmin = currentUser.userRole === 'admin';

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'depots', icon: Warehouse, label: 'Dépôts' },
    { id: 'material', icon: Package, label: 'Matériel' },
    { id: 'movements', icon: TrendingUp, label: 'Mouvements' },
    { id: 'reservations', icon: Calendar, label: 'Réservations' },
    ...(isAdmin ? [{ id: 'users', icon: Users, label: 'Gestion des utilisateurs' }] : []),
  ];

  const renderView = () => {
    if (currentView === 'home') {
      return (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className={isAdmin ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl" : "bg-blue-600 text-white text-2xl"}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl">Bienvenue {isAdmin ? 'M.' : 'Mme'} {currentUser.name.split(' ')[1] || currentUser.name}</h1>
            <p className="text-xl text-muted-foreground">
              {isAdmin ? 'Administrateur' : 'Gestionnaire'} - {currentUser.company}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {menuItems.map((item) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentView(item.id)}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg">{item.label}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm">Notifications importantes</p>
                <p className="text-xs text-muted-foreground">3 alertes de stock faible nécessitent votre attention</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.userRole} />;
      case 'depots':
        return <DepotManagement userRole={currentUser.userRole} />;
      case 'material':
        return <MaterialManagement userRole={currentUser.userRole} />;
      case 'movements':
        return <StockMovements userRole={currentUser.userRole} />;
      case 'reservations':
        return <Reservations userRole={currentUser.userRole} />;
      case 'users':
        return isAdmin ? <UserManagement /> : <Dashboard userRole={currentUser.userRole} />;
      default:
        return <Dashboard userRole={currentUser.userRole} />;
    }
  };

  const getPageTitle = () => {
    if (currentView === 'home') return 'Accueil';
    const item = menuItems.find(item => item.id === currentView);
    return item?.label || 'Accueil';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm">{currentUser.company}</h2>
                <p className="text-xs text-muted-foreground">Gestion de stock</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setCurrentView('home')}
                      isActive={currentView === 'home'}
                    >
                      <Package className="h-4 w-4" />
                      <span>Accueil</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setCurrentView(item.id)}
                        isActive={currentView === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <h1 className="text-lg">{getPageTitle()}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 focus:outline-none">
                      <div className="text-right">
                        <p className="text-sm">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrateur' : 'Gestionnaire'}</p>
                      </div>
                      <Avatar className="cursor-pointer">
                        <AvatarFallback className={isAdmin ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" : "bg-blue-600 text-white"}>
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="text-muted-foreground">Email</p>
                      <p>{currentUser.email}</p>
                    </div>
                    <div className="px-2 py-1.5 text-sm">
                      <p className="text-muted-foreground">Téléphone</p>
                      <p>{currentUser.phone}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Backend status indicator */}
          <div className="px-6 pt-4">
            <div className="rounded bg-white border p-4 mb-4">
              <strong>Status du Backend : </strong>
              {backendStatus ? (
                <span className={backendStatus.success ? 'text-green-600' : 'text-red-600'}>
                  {backendStatus.message}
                  {backendStatus.Timestamp && (
                    <span className="text-xs text-muted-foreground ml-2">{backendStatus.Timestamp}</span>
                  )}
                </span>
              ) : (
                <span className="text-muted-foreground">Chargement du statut du backend...</span>
              )}
            </div>
          </div>

          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
