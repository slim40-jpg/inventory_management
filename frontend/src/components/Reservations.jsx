import { useState } from 'react';
import { Calendar, Plus, Search, MoreVertical, Edit, Trash2, Check, X, Clock } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
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

const reservations = [
  {
    id: 1,
    eventName: 'Festival Rock en Seine',
    client: 'Rock en Seine Productions',
    startDate: '2025-06-15',
    endDate: '2025-06-20',
    depot: 'Paris Nord',
    itemCount: 45,
    status: 'confirmé',
    items: [
      { name: 'Enceinte Line Array', qty: 12 },
      { name: 'Console DiGiCo', qty: 2 },
      { name: 'Projecteur LED', qty: 24 },
    ],
  },
  {
    id: 2,
    eventName: 'Salon du Mariage Lyon',
    client: 'Mariage Expo',
    startDate: '2025-06-22',
    endDate: '2025-06-23',
    depot: 'Lyon Centre',
    itemCount: 28,
    status: 'en cours',
    items: [
      { name: 'Projecteur LED PAR', qty: 20 },
      { name: 'Écran LED', qty: 4 },
      { name: 'Structure Alu', qty: 8 },
    ],
  },
  {
    id: 3,
    eventName: 'Concert Jazz Marseille',
    client: 'Jazz Club Méditerranée',
    startDate: '2025-06-28',
    endDate: '2025-06-28',
    depot: 'Marseille Sud',
    itemCount: 15,
    status: 'confirmé',
    items: [
      { name: 'Console mixage', qty: 1 },
      { name: 'Microphones', qty: 8 },
      { name: 'Enceintes monitoring', qty: 6 },
    ],
  },
  {
    id: 4,
    eventName: 'Conférence TechDay',
    client: 'Tech Events SARL',
    startDate: '2025-07-05',
    endDate: '2025-07-05',
    depot: 'Paris Nord',
    itemCount: 32,
    status: 'en attente',
    items: [
      { name: 'Écran LED', qty: 10 },
      { name: 'Caméra broadcast', qty: 3 },
      { name: 'Projecteur', qty: 12 },
    ],
  },
  {
    id: 5,
    eventName: 'Mariage Château de Versailles',
    client: 'Deluxe Events',
    startDate: '2025-07-12',
    endDate: '2025-07-13',
    depot: 'Paris Nord',
    itemCount: 18,
    status: 'confirmé',
    items: [
      { name: 'Projecteur LED PAR', qty: 16 },
      { name: 'Console lumière', qty: 1 },
      { name: 'Enceintes', qty: 4 },
    ],
  },
  {
    id: 6,
    eventName: 'Festival Électro Toulouse',
    client: 'Electro Prod',
    startDate: '2025-07-20',
    endDate: '2025-07-22',
    depot: 'Toulouse Ouest',
    itemCount: 52,
    status: 'en cours',
    items: [
      { name: 'Line Array', qty: 16 },
      { name: 'Lyre spot', qty: 24 },
      { name: 'Console SD7', qty: 2 },
    ],
  },
];

const statusOptions = ['Tous', 'en attente', 'en cours', 'confirmé', 'annulé'];

// userRole: 'staff' or 'admin'
export function Reservations({ userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const isAdmin = userRole === 'admin';
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Tous' || reservation.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmé':
        return <Badge variant="default" className="bg-green-600">Confirmé</Badge>;
      case 'en cours':
        return <Badge variant="secondary" className="bg-blue-600 text-white">En cours</Badge>;
      case 'en attente':
        return <Badge variant="outline">En attente</Badge>;
      case 'annulé':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmé':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'en cours':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'annulé':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const confirmedCount = reservations.filter(r => r.status === 'confirmé').length;
  const pendingCount = reservations.filter(r => r.status === 'en attente').length;
  const inProgressCount = reservations.filter(r => r.status === 'en cours').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">Gérez les réservations de matériel pour vos événements</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle réservation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle Réservation</DialogTitle>
              <DialogDescription>
                Créez une réservation de matériel pour un événement
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="event-name">Nom de l'événement</Label>
                <Input id="event-name" placeholder="ex: Festival Rock..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-name">Client</Label>
                <Input id="client-name" placeholder="Nom du client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depot">Dépôt</Label>
                <Select>
                  <SelectTrigger id="depot">
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris Nord</SelectItem>
                    <SelectItem value="lyon">Lyon Centre</SelectItem>
                    <SelectItem value="marseille">Marseille Sud</SelectItem>
                    <SelectItem value="toulouse">Toulouse Ouest</SelectItem>
                    <SelectItem value="bordeaux">Bordeaux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Date de début</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">Date de fin</Label>
                <Input id="end-date" type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Notes / Instructions</Label>
                <Textarea id="notes" placeholder="Détails de la réservation..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Créer la réservation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Réservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{reservations.length}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Confirmées</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{confirmedCount}</div>
            <p className="text-xs text-muted-foreground">Validées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">En Cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">En préparation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Réservations</CardTitle>
                <CardDescription>Toutes les réservations d'événements</CardDescription>
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
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
                <TableHead>Événement</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Dépôt</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow 
                  key={reservation.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedReservation(reservation)}
                >
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{reservation.eventName}</p>
                      <p className="text-xs text-muted-foreground">ID: RES-{reservation.id.toString().padStart(4, '0')}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{reservation.client}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(reservation.startDate).toLocaleDateString('fr-FR')}
                      </div>
                      {reservation.startDate !== reservation.endDate && (
                        <p className="text-xs text-muted-foreground">
                          au {new Date(reservation.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{reservation.depot}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{reservation.itemCount} articles</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reservation.status)}
                      {getStatusBadge(reservation.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Check className="h-4 w-4 mr-2" />
                          Confirmer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Annuler
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedReservation && (
        <Dialog open={!!selectedReservation} onOpenChange={() => setSelectedReservation(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedReservation.eventName}</DialogTitle>
              <DialogDescription>
                Détails de la réservation RES-{selectedReservation.id.toString().padStart(4, '0')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <p className="text-sm">{selectedReservation.client}</p>
                </div>
                <div className="space-y-2">
                  <Label>Dépôt</Label>
                  <p className="text-sm">{selectedReservation.depot}</p>
                </div>
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <p className="text-sm">{new Date(selectedReservation.startDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="space-y-2">
                  <Label>Date de fin</Label>
                  <p className="text-sm">{new Date(selectedReservation.endDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <div>{getStatusBadge(selectedReservation.status)}</div>
                </div>
                <div className="space-y-2">
                  <Label>Total articles</Label>
                  <p className="text-sm">{selectedReservation.itemCount} articles</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Matériel réservé</Label>
                <div className="border rounded-lg p-4 space-y-2">
                  {selectedReservation.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="outline">Qté: {item.qty}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedReservation(null)}>
                Fermer
              </Button>
              <Button>
                Modifier la réservation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
