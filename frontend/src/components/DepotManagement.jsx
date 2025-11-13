import { useState } from 'react';
import { MapPin, Package, Users, Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';

const depots = [
  {
    id: 1,
    name: 'Paris Nord',
    address: '45 Rue de la République, 75018 Paris',
    region: 'Île-de-France',
    manager: 'Jean Dupont',
    stock: 450,
    capacity: 600,
    status: 'actif',
  },
  {
    id: 2,
    name: 'Lyon Centre',
    address: '12 Avenue des Lumières, 69002 Lyon',
    region: 'Auvergne-Rhône-Alpes',
    manager: 'Sophie Martin',
    stock: 320,
    capacity: 400,
    status: 'actif',
  },
  {
    id: 3,
    name: 'Marseille Sud',
    address: '78 Boulevard Méditerranée, 13008 Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    manager: 'Marc Rousseau',
    stock: 280,
    capacity: 350,
    status: 'actif',
  },
  {
    id: 4,
    name: 'Toulouse Ouest',
    address: '34 Rue Occitanie, 31000 Toulouse',
    region: 'Occitanie',
    manager: 'Claire Bernard',
    stock: 190,
    capacity: 300,
    status: 'actif',
  },
  {
    id: 5,
    name: 'Bordeaux',
    address: '56 Quai des Chartrons, 33000 Bordeaux',
    region: 'Nouvelle-Aquitaine',
    manager: 'Pierre Lefebvre',
    stock: 150,
    capacity: 250,
    status: 'maintenance',
  },
];

// userRole: 'staff' or 'admin'
export function DepotManagement({ userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const isAdmin = userRole === 'admin';

  const filteredDepots = depots.filter(depot => 
    depot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    depot.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un dépôt ou une région..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau dépôt
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un dépôt</DialogTitle>
                <DialogDescription>
                  Créez un nouveau dépôt de stockage
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="depot-name">Nom du dépôt</Label>
                  <Input id="depot-name" placeholder="ex: Paris Nord" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depot-address">Adresse</Label>
                  <Input id="depot-address" placeholder="45 Rue..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depot-region">Région</Label>
                  <Select>
                    <SelectTrigger id="depot-region">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idf">Île-de-France</SelectItem>
                      <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
                      <SelectItem value="paca">Provence-Alpes-Côte d'Azur</SelectItem>
                      <SelectItem value="occ">Occitanie</SelectItem>
                      <SelectItem value="na">Nouvelle-Aquitaine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depot-manager">Responsable</Label>
                  <Input id="depot-manager" placeholder="Nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depot-capacity">Capacité maximale</Label>
                  <Input id="depot-capacity" type="number" placeholder="500" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Créer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepots.map((depot) => (
          <Card key={depot.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{depot.name}</CardTitle>
                    <CardDescription className="text-xs">{depot.region}</CardDescription>
                  </div>
                </div>
                <Badge variant={depot.status === 'actif' ? 'default' : 'secondary'}>
                  {depot.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{depot.address}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{depot.manager}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>Capacité</span>
                  </div>
                  <span className={depot.stock / depot.capacity > 0.8 ? 'text-amber-600' : ''}>
                    {depot.stock} / {depot.capacity}
                  </span>
                </div>
                <Progress value={(depot.stock / depot.capacity) * 100} />
                {depot.stock / depot.capacity > 0.8 && (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <AlertCircle className="h-3 w-3" />
                    <span>Capacité élevée</span>
                  </div>
                )}
              </div>

              {isAdmin && (
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDepots.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun dépôt trouvé</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
