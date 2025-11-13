import { useState } from 'react';
import { Users, Plus, Search, Trash2, Mail, Shield, Send, Eye, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';


const mockUsers = [
  {
    id: 1,
    username: 'Marie Dubois',
    email: 'marie@eventpro.com',
    entreprise: 'EventPro Solutions',
    phoneNumber: '+33 6 12 34 56 78',
    role: 'admin',
    status: 'active',
    lastLogin: '08/11/2025 10:30',
    actionsCount: 245,
    recentActivity: []
  },
  {
    id: 2,
    username: 'Jean Martin',
    email: 'jean.martin@eventpro.com',
    entreprise: 'EventPro Solutions',
    phoneNumber: '+33 6 23 45 67 89',
    role: 'staff',
    status: 'active',
    lastLogin: '08/11/2025 09:15',
    actionsCount: 128,
    recentActivity: [
      { action: 'Consultation', date: '08/11/2025', details: 'Consulté l\'inventaire matériel Son' },
      { action: 'Consultation', date: '07/11/2025', details: 'Vérifié stock dépôt Paris Nord' },
      { action: 'Consultation', date: '07/11/2025', details: 'Consulté réservations du mois' }
    ]
  },
  {
    id: 3,
    username: 'Sophie Bernard',
    email: 'sophie.bernard@eventpro.com',
    entreprise: 'EventPro Solutions',
    phoneNumber: '+33 6 34 56 78 90',
    role: 'staff',
    status: 'active',
    lastLogin: '07/11/2025 16:45',
    actionsCount: 94,
    recentActivity: [
      { action: 'Consultation', date: '07/11/2025', details: 'Consulté catalogue Lumière' },
      { action: 'Consultation', date: '06/11/2025', details: 'Vérifié mouvements de stock' },
      { action: 'Consultation', date: '06/11/2025', details: 'Consulté dépôt Lyon Centre' }
    ]
  },
  {
    id: 4,
    username: 'Pierre Leroy',
    email: 'pierre.leroy@eventpro.com',
    entreprise: 'EventPro Solutions',
    phoneNumber: '+33 6 45 67 89 01',
    role: 'staff',
    status: 'active',
    lastLogin: '07/11/2025 14:20',
    actionsCount: 156,
    recentActivity: [
      { action: 'Consultation', date: '07/11/2025', details: 'Consulté tableau de bord' },
      { action: 'Consultation', date: '06/11/2025', details: 'Vérifié réservations à venir' },
      { action: 'Consultation', date: '05/11/2025', details: 'Consulté stock Vidéo' }
    ]
  },
  {
    id: 5,
    username: 'Claire Moreau',
    email: 'claire.moreau@eventpro.com',
    entreprise: 'EventPro Solutions',
    phoneNumber: '+33 6 56 78 90 12',
    role: 'staff',
    status: 'inactive',
    lastLogin: '25/10/2025 11:30',
    actionsCount: 67,
    recentActivity: [
      { action: 'Consultation', date: '25/10/2025', details: 'Dernière connexion' }
    ]
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('staff');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === 'admin') {
      toast.error('Impossible de supprimer un administrateur');
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
    toast.success('Utilisateur supprimé avec succès');
  };

  const handleInviteUser = () => {
    toast.success(`Invitation envoyée à ${newUserEmail}`);
    setIsInviteDialogOpen(false);
    setNewUserEmail('');
    setNewUserRole('staff');
  };

  const handleViewActivity = (user) => {
    setSelectedUser(user);
    setIsActivityDialogOpen(true);
  };

  const staffUsers = users.filter(u => u.role === 'staff');
  const activeCount = users.filter(u => u.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre de l'équipe..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Inviter un staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inviter un nouveau membre</DialogTitle>
              <DialogDescription>
                Envoyez une invitation par email pour rejoindre l'équipe
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email</Label>
                <Input 
                  id="invite-email" 
                  type="email" 
                  placeholder="utilisateur@email.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Rôle</Label>
                <Select value={newUserRole} onValueChange={(value) => setNewUserRole(value)}>
                  <SelectTrigger id="invite-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff (Consultation seulement)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Note: Un seul administrateur par entreprise
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleInviteUser}>
                Envoyer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activité de {selectedUser?.username}</DialogTitle>
            <DialogDescription>
              Consultez l'historique d'activité de ce membre
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {selectedUser.username.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p>{selectedUser.username}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <Badge variant={selectedUser.status === 'active' ? 'default' : 'outline'}>
                  {selectedUser.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Actions totales</p>
                      <p className="text-2xl">{selectedUser.actionsCount}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Dernière connexion</p>
                      <p className="text-sm">{selectedUser.lastLogin}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm mb-3">Activité récente</h3>
                <div className="space-y-2">
                  {selectedUser.recentActivity.length > 0 ? (
                    selectedUser.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{activity.details}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Aucune activité récente
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total membres</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{users.length}</div>
            <p className="text-xs text-muted-foreground">{activeCount} actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{staffUsers.length}</div>
            <p className="text-xs text-muted-foreground">Membres de l'équipe</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Administrateur</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1</div>
            <p className="text-xs text-muted-foreground">Un par entreprise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Invitations</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className={user.role === 'admin' ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : 'bg-blue-600 text-white'}>
                      {user.username.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{user.username}</CardTitle>
                    <CardDescription className="text-xs">{user.email}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                {user.role === 'admin' ? (
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Shield className="h-3 w-3 mr-1" />
                    Administrateur
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Staff
                  </Badge>
                )}
                <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Téléphone</span>
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dernière connexion</span>
                  <span className="text-xs">{user.lastLogin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Actions</span>
                  <span>{user.actionsCount}</span>
                </div>
              </div>

              {user.role === 'staff' && (
                <div className="flex gap-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewActivity(user)}
                  >
                    <Eye className="h-3 w-3 mr-2" />
                    Activité
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-600"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {user.role === 'admin' && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-center text-muted-foreground">
                    Compte administrateur
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
