import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Plus, Search, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
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

const movements = [
  {
    id: 1,
    date: '2025-06-08 14:30',
    type: 'sortie',
    material: 'Enceinte Line Array L-Acoustics K2',
    reference: 'SON-K2-001',
    quantity: 8,
    from: 'Paris Nord',
    to: 'Festival Rock en Seine',
    user: 'Jean Dupont',
    reason: 'Réservation événement',
  },
  {
    id: 2,
    date: '2025-06-08 10:15',
    type: 'entree',
    material: 'Projecteur LED PAR 64 RGBW',
    reference: 'LUM-PAR-003',
    quantity: 12,
    from: 'Fournisseur ProLight',
    to: 'Lyon Centre',
    user: 'Sophie Martin',
    reason: 'Réapprovisionnement',
  },
  {
    id: 3,
    date: '2025-06-07 16:45',
    type: 'transfert',
    material: 'Écran LED 500x500mm Pitch 3.9',
    reference: 'VID-LED-005',
    quantity: 6,
    from: 'Paris Nord',
    to: 'Marseille Sud',
    user: 'Marc Rousseau',
    reason: 'Rééquilibrage stock',
  },
  {
    id: 4,
    date: '2025-06-07 11:20',
    type: 'sortie',
    material: 'Console Mixage DiGiCo SD7',
    reference: 'SON-SD7-002',
    quantity: 2,
    from: 'Lyon Centre',
    to: 'Salon du Mariage Lyon',
    user: 'Sophie Martin',
    reason: 'Réservation événement',
  },
  {
    id: 5,
    date: '2025-06-06 15:00',
    type: 'entree',
    material: 'Lyre Spot Clay Paky Sharpy',
    reference: 'LUM-SHP-004',
    quantity: 4,
    from: 'Retour événement',
    to: 'Marseille Sud',
    user: 'Marc Rousseau',
    reason: 'Retour matériel',
  },
  {
    id: 6,
    date: '2025-06-06 09:30',
    type: 'sortie',
    material: 'Caméra Broadcast Sony PXW-Z450',
    reference: 'VID-CAM-006',
    quantity: 3,
    from: 'Lyon Centre',
    to: 'Concert Jazz Marseille',
    user: 'Claire Bernard',
    reason: 'Réservation événement',
  },
  {
    id: 7,
    date: '2025-06-05 14:10',
    type: 'transfert',
    material: 'Praticable Modulaire 2x1m',
    reference: 'SCE-PRA-007',
    quantity: 15,
    from: 'Bordeaux',
    to: 'Toulouse Ouest',
    user: 'Pierre Lefebvre',
    reason: 'Rééquilibrage stock',
  },
  {
    id: 8,
    date: '2025-06-05 10:45',
    type: 'entree',
    material: 'Structure Aluminium 290mm (1m)',
    reference: 'STR-ALU-008',
    quantity: 20,
    from: 'Fournisseur TrussMax',
    to: 'Paris Nord',
    user: 'Jean Dupont',
    reason: 'Réapprovisionnement',
  },
];

const movementTypes = ['Tous', 'entree', 'sortie', 'transfert'];

// userRole: 'staff' or 'admin'
export function StockMovements({ userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const isAdmin = userRole === 'admin';
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || movement.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'entree':
        return <ArrowDownRight className="h-4 w-4 text-green-600" />;
      case 'sortie':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'transfert':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'entree':
        return <Badge variant="default" className="bg-green-600">Entrée</Badge>;
      case 'sortie':
        return <Badge variant="default" className="bg-red-600">Sortie</Badge>;
      case 'transfert':
        return <Badge variant="default" className="bg-blue-600">Transfert</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const totalEntrees = movements.filter(m => m.type === 'entree').reduce((sum, m) => sum + m.quantity, 0);
  const totalSorties = movements.filter(m => m.type === 'sortie').reduce((sum, m) => sum + m.quantity, 0);
  const totalTransferts = movements.filter(m => m.type === 'transfert').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">Suivez tous les mouvements de votre stock</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau mouvement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Enregistrer un Mouvement</DialogTitle>
                <DialogDescription>
                  Ajoutez une entrée, sortie ou transfert de matériel
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="movement-type">Type de mouvement</Label>
                  <Select>
                    <SelectTrigger id="movement-type">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entree">Entrée</SelectItem>
                      <SelectItem value="sortie">Sortie</SelectItem>
                      <SelectItem value="transfert">Transfert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movement-date">Date et heure</Label>
                  <Input id="movement-date" type="datetime-local" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="movement-material">Matériel</Label>
                  <Select>
                    <SelectTrigger id="movement-material">
                      <SelectValue placeholder="Sélectionnez un article" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Enceinte Line Array L-Acoustics K2</SelectItem>
                      <SelectItem value="2">Console Mixage DiGiCo SD7</SelectItem>
                      <SelectItem value="3">Projecteur LED PAR 64 RGBW</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movement-qty">Quantité</Label>
                  <Input id="movement-qty" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movement-from">Provenance</Label>
                  <Input id="movement-from" placeholder="Dépôt ou fournisseur" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movement-to">Destination</Label>
                  <Input id="movement-to" placeholder="Dépôt ou événement" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="movement-reason">Raison / Notes</Label>
                  <Textarea id="movement-reason" placeholder="Raison du mouvement..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Mouvements</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{movements.length}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Entrées</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{totalEntrees}</div>
            <p className="text-xs text-muted-foreground">Articles reçus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Sorties</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{totalSorties}</div>
            <p className="text-xs text-muted-foreground">Articles sortis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Transferts</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">{totalTransferts}</div>
            <p className="text-xs text-muted-foreground">Entre dépôts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Historique des Mouvements</CardTitle>
                <CardDescription>Tous les mouvements de stock enregistrés</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {movementTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Matériel</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Provenance</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Raison</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {movement.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(movement.type)}
                      {getTypeBadge(movement.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{movement.material}</p>
                      <p className="text-xs text-muted-foreground">{movement.reference}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.quantity}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{movement.from}</TableCell>
                  <TableCell className="text-sm">{movement.to}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{movement.user}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{movement.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
