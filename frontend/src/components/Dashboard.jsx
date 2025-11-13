import { Package, Warehouse, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const lowStockItems = [
  { id: 1, name: 'Enceinte Line Array L-Acoustics', depot: 'Paris Nord', stock: 2, min: 5, category: 'Son' },
  { id: 2, name: 'Projecteur LED PAR 64', depot: 'Lyon Centre', stock: 8, min: 15, category: 'Lumière' },
  { id: 3, name: 'Écran LED 500x500mm', depot: 'Marseille Sud', stock: 4, min: 10, category: 'Vidéo' },
  { id: 4, name: 'Praticable 2x1m', depot: 'Toulouse Ouest', stock: 12, min: 20, category: 'Scènes' },
];

const recentReservations = [
  { id: 1, event: 'Festival Rock en Seine', date: '15-20 Juin 2025', items: 45, status: 'confirmé' },
  { id: 2, event: 'Salon du Mariage Lyon', date: '22-23 Juin 2025', items: 28, status: 'en cours' },
  { id: 3, event: 'Concert Jazz Marseille', date: '28 Juin 2025', items: 15, status: 'confirmé' },
  { id: 4, event: 'Conférence TechDay', date: '5 Juillet 2025', items: 32, status: 'en attente' },
];

const topDepots = [
  { name: 'Paris Nord', stock: 450, capacity: 600 },
  { name: 'Lyon Centre', stock: 320, capacity: 400 },
  { name: 'Marseille Sud', stock: 280, capacity: 350 },
  { name: 'Toulouse Ouest', stock: 190, capacity: 300 },
];

// userRole: 'staff' or 'admin'
export function Dashboard({ userRole }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Matériel</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,390</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Dépôts Actifs</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-muted-foreground mt-1">
              Répartis en France
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Mouvements (Mois)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">430</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Alertes Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-600">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Articles sous le seuil
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dépôts principaux</CardTitle>
            <CardDescription>Capacité de stockage par dépôt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDepots.map((depot) => (
                <div key={depot.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{depot.name}</span>
                    <span className="text-muted-foreground">
                      {depot.stock} / {depot.capacity}
                    </span>
                  </div>
                  <Progress value={(depot.stock / depot.capacity) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Stock Faible</CardTitle>
            <CardDescription>Articles nécessitant un réapprovisionnement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        <span className="text-xs text-muted-foreground">{item.depot}</span>
                      </div>
                    </div>
                    <Badge variant="destructive" className="text-xs ml-2">{item.stock}/{item.min}</Badge>
                  </div>
                  <Progress value={(item.stock / item.min) * 100} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Réservations à venir</CardTitle>
          <CardDescription>Prochains événements programmés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <p className="text-sm">{reservation.event}</p>
                  <p className="text-xs text-muted-foreground">{reservation.date} • {reservation.items} articles</p>
                </div>
                <Badge 
                  variant={
                    reservation.status === 'confirmé' ? 'default' : 
                    reservation.status === 'en cours' ? 'secondary' : 
                    'outline'
                  }
                >
                  {reservation.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
