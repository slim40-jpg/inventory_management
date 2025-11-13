import { DollarSign, TrendingUp, TrendingDown, Calendar, Package, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const monthlyRevenue = [
  { month: 'Jan', revenue: 45000, costs: 28000, profit: 17000 },
  { month: 'Fév', revenue: 52000, costs: 31000, profit: 21000 },
  { month: 'Mar', revenue: 68000, costs: 38000, profit: 30000 },
  { month: 'Avr', revenue: 71000, costs: 42000, profit: 29000 },
  { month: 'Mai', revenue: 85000, costs: 48000, profit: 37000 },
  { month: 'Jun', revenue: 95000, costs: 52000, profit: 43000 },
];

const revenueByCategory = [
  { name: 'Son', value: 145000, color: '#3b82f6' },
  { name: 'Lumière', value: 98000, color: '#8b5cf6' },
  { name: 'Vidéo', value: 125000, color: '#ec4899' },
  { name: 'Scènes', value: 78000, color: '#f59e0b' },
  { name: 'Structures', value: 65000, color: '#10b981' },
];

const topClients = [
  { name: 'Festival Rock en Seine', revenue: 45000, events: 3, growth: 12 },
  { name: 'Salon du Mariage Lyon', revenue: 38000, events: 8, growth: -5 },
  { name: 'Concert Jazz Marseille', revenue: 32000, events: 12, growth: 18 },
  { name: 'TechDay Conference', revenue: 28000, events: 4, growth: 25 },
  { name: 'Wedding Paris Events', revenue: 24000, events: 15, growth: 8 },
];

const topProducts = [
  { name: 'Enceinte Line Array L-Acoustics', rentals: 45, revenue: 67500 },
  { name: 'Console Mixage DiGiCo SD7', rentals: 32, revenue: 48000 },
  { name: 'Lyre Spot Clay Paky Sharpy', rentals: 156, revenue: 39000 },
  { name: 'Écran LED 500x500mm', rentals: 89, revenue: 44500 },
  { name: 'Projecteur LED PAR 64 RGBW', rentals: 234, revenue: 35100 },
];

export function Revenue() {
  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = monthlyRevenue.reduce((sum, item) => sum + item.profit, 0);
  const averageProfit = (totalProfit / totalRevenue) * 100;
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].revenue;
  const growthRate = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
        <Crown className="h-6 w-6 text-yellow-600" />
        <div>
          <h2 className="text-lg">Tableau de Bord Administrateur</h2>
          <p className="text-sm text-muted-foreground">Chiffre d'affaires et analyses financières</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">CA Total (6 mois)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{(totalRevenue / 1000).toFixed(0)}K€</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +{growthRate.toFixed(1)}% vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Bénéfice Net</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{(totalProfit / 1000).toFixed(0)}K€</div>
            <p className="text-xs text-muted-foreground mt-1">
              Marge de {averageProfit.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">CA Mois Actuel</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{(lastMonthRevenue / 1000).toFixed(0)}K€</div>
            <p className="text-xs text-muted-foreground mt-1">
              Juin 2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Locations Actives</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">127</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15% ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Évolution du Chiffre d'Affaires</CardTitle>
                <CardDescription>Revenus, coûts et bénéfices mensuels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenus" />
                    <Bar dataKey="costs" fill="#ef4444" name="Coûts" />
                    <Bar dataKey="profit" fill="#10b981" name="Bénéfice" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CA par Catégorie</CardTitle>
                <CardDescription>Répartition des revenus par type de matériel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                      <Pie
                        data={revenueByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {revenueByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {revenueByCategory.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <div className="flex-1">
                          <p className="text-sm">{cat.name}</p>
                          <p className="text-xs text-muted-foreground">{(cat.value / 1000).toFixed(0)}K€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendance des Bénéfices</CardTitle>
              <CardDescription>Évolution mensuelle du bénéfice net</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Bénéfice"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Clients</CardTitle>
              <CardDescription>Clients générant le plus de revenus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.events} événements</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{(client.revenue / 1000).toFixed(0)}K€</p>
                      <div className="flex items-center gap-1 justify-end">
                        {client.growth > 0 ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <p className="text-xs text-green-600">+{client.growth}%</p>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-red-600" />
                            <p className="text-xs text-red-600">{client.growth}%</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Produits</CardTitle>
              <CardDescription>Matériel le plus loué et rentable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.rentals} locations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{(product.revenue / 1000).toFixed(1)}K€</p>
                      <Badge variant="secondary" className="text-xs">
                        {(product.revenue / product.rentals).toFixed(0)}€/location
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
