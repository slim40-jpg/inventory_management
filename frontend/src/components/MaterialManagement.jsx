import { useState } from 'react';
import { Package, Plus, Search, Edit, Trash2, AlertTriangle, Eye, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

// Material object structure for reference
// const materials = [ ... ]
const materials = [
  {
    id: 1,
    name: 'Enceinte Line Array L-Acoustics K2',
    category: 'Son',
    depot: 'Paris Nord',
    quantity: 12,
    minStock: 5,
    reference: 'SON-K2-001',
    status: 'disponible',
    value: 45000,
    lastModified: '05/11/2025',
    description: 'Enceinte line array professionnelle haut de gamme pour grands événements',
  },
  {
    id: 2,
    name: 'Console Mixage DiGiCo SD7',
    category: 'Son',
    depot: 'Lyon Centre',
    quantity: 3,
    minStock: 2,
    reference: 'SON-SD7-002',
    status: 'disponible',
    value: 95000,
    lastModified: '03/11/2025',
    description: 'Console de mixage numérique professionnelle pour grands spectacles',
  },
  {
    id: 3,
    name: 'Projecteur LED PAR 64 RGBW',
    category: 'Lumière',
    depot: 'Paris Nord',
    quantity: 8,
    minStock: 15,
    reference: 'LUM-PAR-003',
    status: 'stock faible',
    value: 450,
    lastModified: '07/11/2025',
    description: 'Projecteur LED à couleurs variables pour éclairage scénique',
  },
  {
    id: 4,
    name: 'Lyre Spot Clay Paky Sharpy',
    category: 'Lumière',
    depot: 'Marseille Sud',
    quantity: 24,
    minStock: 10,
    reference: 'LUM-SHP-004',
    status: 'disponible',
    value: 3500,
    lastModified: '02/11/2025',
    description: 'Lyre automatique ultra-puissante pour effets spectaculaires',
  },
  {
    id: 5,
    name: 'Écran LED 500x500mm',
    category: 'Vidéo',
    depot: 'Paris Nord',
    quantity: 4,
    minStock: 10,
    reference: 'VID-LED-005',
    status: 'stock faible',
    value: 1200,
    lastModified: '06/11/2025',
    description: 'Dalles LED modulaires pour construction d\'écrans géants',
  },
  {
    id: 6,
    name: 'Caméra Broadcast Sony',
    category: 'Vidéo',
    depot: 'Lyon Centre',
    quantity: 5,
    minStock: 3,
    reference: 'VID-CAM-006',
    status: 'disponible',
    value: 28000,
    lastModified: '01/11/2025',
    description: 'Caméra professionnelle 4K pour captation événementielle',
  },
  {
    id: 7,
    name: 'Praticable 2x1m',
    category: 'Scènes',
    depot: 'Toulouse Ouest',
    quantity: 12,
    minStock: 20,
    reference: 'SCE-PRA-007',
    status: 'stock faible',
    value: 180,
    lastModified: '08/11/2025',
    description: 'Praticable modulaire pour construction de scènes et podiums',
  },
  {
    id: 8,
    name: 'Structure Aluminium 290mm',
    category: 'Structures',
    depot: 'Marseille Sud',
    quantity: 45,
    minStock: 30,
    reference: 'STR-ALU-008',
    status: 'disponible',
    value: 85,
    lastModified: '28/10/2025',
    description: 'Structure aluminium pour suspensions et montages aériens',
  },
];

const categories = ['Toutes', 'Son', 'Lumière', 'Vidéo', 'Scènes', 'Structures'];
const statusOptions = ['Tous', 'disponible', 'stock faible'];

// userRole: 'staff' or 'admin'
export function MaterialManagement({ userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  const isAdmin = userRole === 'admin';

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || material.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Tous' || material.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disponible':
        return <Badge variant="default" className="bg-green-600">Disponible</Badge>;
      case 'stock faible':
        return <Badge variant="secondary" className="bg-amber-600 text-white">Stock faible</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewDetails = (material) => {
    setSelectedMaterial(material);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher du matériel..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajouter du matériel</DialogTitle>
                <DialogDescription>
                  Créez un nouvel article dans l'inventaire
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="material-name">Nom</Label>
                  <Input id="material-name" placeholder="ex: Enceinte..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material-ref">Référence</Label>
                  <Input id="material-ref" placeholder="SON-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material-category">Catégorie</Label>
                  <Select>
                    <SelectTrigger id="material-category">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="son">Son</SelectItem>
                      <SelectItem value="lumiere">Lumière</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                      <SelectItem value="scenes">Scènes</SelectItem>
                      <SelectItem value="structures">Structures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material-depot">Dépôt</Label>
                  <Select>
                    <SelectTrigger id="material-depot">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Paris Nord</SelectItem>
                      <SelectItem value="lyon">Lyon Centre</SelectItem>
                      <SelectItem value="marseille">Marseille Sud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material-qty">Quantité</Label>
                  <Input id="material-qty" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material-value">Valeur (€)</Label>
                  <Input id="material-value" type="number" placeholder="0" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="material-desc">Description</Label>
                  <Textarea id="material-desc" placeholder="Description..." />
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du matériel</DialogTitle>
          </DialogHeader>
          {selectedMaterial && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg">{selectedMaterial.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMaterial.reference}</p>
                </div>
                {getStatusBadge(selectedMaterial.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Quantité</p>
                      <p className="text-2xl">{selectedMaterial.quantity}</p>
                      <p className="text-xs text-muted-foreground">Min: {selectedMaterial.minStock}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Valeur unitaire</p>
                      <p className="text-2xl">{selectedMaterial.value.toLocaleString('fr-FR')} €</p>
                      <p className="text-xs text-muted-foreground">
                        Total: {(selectedMaterial.value * selectedMaterial.quantity).toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Catégorie</p>
                  <p>{selectedMaterial.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dépôt</p>
                  <p>{selectedMaterial.depot}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dernière modification</p>
                  <p>{selectedMaterial.lastModified}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm p-3 bg-gray-50 rounded-lg">{selectedMaterial.description}</p>
              </div>
              
              {isAdmin && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails(material)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{material.name}</CardTitle>
                  <CardDescription className="text-xs">{material.reference}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{material.category}</Badge>
                {getStatusBadge(material.status)}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantité</span>
                  <span className={material.quantity < material.minStock ? 'text-amber-600' : ''}>
                    {material.quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valeur</span>
                  <span>{material.value.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dépôt</span>
                  <span className="truncate ml-2">{material.depot}</span>
                </div>
              </div>

              {material.quantity < material.minStock && (
                <div className="flex items-center gap-1 text-xs text-amber-600 pt-2 border-t">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Stock faible</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun matériel trouvé</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
