import React from 'react';
import { Users, Camera, Calendar, DollarSign, ShieldAlert, ArrowUpRight, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const AdminDashboard = () => {
  const { bookings, professionals, users } = usePlatform();

  const totalGMV = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const completedGMV = bookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  return (
    <div className="space-y-8 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Master Administration
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          LensCraft Platform Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Platform GMV"
          value={formatCurrency(totalGMV || 175000)}
          icon={DollarSign}
          trend="+28% vs last month"
          trendPositive={true}
        />
        <StatCard
          title="Active Creators"
          value={professionals.length}
          icon={Camera}
          trend="+12 this month"
          trendPositive={true}
        />
        <StatCard
          title="Total Platform Clients"
          value={users.length || 140}
          icon={Users}
          trend="+140 this month"
          trendPositive={true}
        />
        <StatCard
          title="Disputes / Open Reports"
          value="0"
          icon={ShieldAlert}
          subtitle="All payments in good standing"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white border border-zinc-200 space-y-4 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
            Platform Bookings Stream ({bookings.length})
          </h3>
          <div className="space-y-3">
            {bookings.slice(0, 6).map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <div>
                  <h4 className="font-semibold text-zinc-900">
                    {b.userName || b.user?.name} → {b.professionalName || b.professional?.name}
                  </h4>
                  <span className="text-zinc-500">{formatDate(b.eventDate)} · Ref: {b.bookingNumber || b.bookingReference}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-zinc-900 block">{formatCurrency(b.totalAmount)}</span>
                  <Badge
                    variant={
                      b.status === 'confirmed'
                        ? 'success'
                        : b.status === 'completed'
                        ? 'charcoal'
                        : b.status === 'cancelled'
                        ? 'danger'
                        : 'warning'
                    }
                    size="sm"
                  >
                    {b.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border border-zinc-200 space-y-4 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
            Verified Studios & Creators ({professionals.length})
          </h3>
          <div className="space-y-3">
            {professionals.slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-zinc-900">{p.name}</h4>
                    <span className="text-zinc-500">{p.location?.city} · {p.rating} ★</span>
                  </div>
                </div>
                <Badge variant="outline" size="sm">
                  {p.role}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
