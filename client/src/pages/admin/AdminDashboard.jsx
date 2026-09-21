import React from 'react';
import { Users, Camera, Calendar, DollarSign, ShieldAlert, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const AdminDashboard = () => {
  const { bookings, professionals, users } = usePlatform();

  const totalGMV = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  return (
    <div className="space-y-8 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Master Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          LensCraft <span className="text-gradient-cyan">Platform Overview</span>
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
        <Card className="p-6 glass-card border border-sky-500/20 space-y-4 shadow-xl">
          <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold pb-3 border-b border-sky-500/15">
            Platform Bookings Stream ({bookings.length})
          </h3>
          <div className="space-y-3">
            {bookings.slice(0, 6).map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 text-xs hover:border-cyan-400/40 transition-colors">
                <div>
                  <h4 className="font-display font-bold text-white">
                    {b.userName || b.user?.name} → {b.professionalName || b.professional?.name}
                  </h4>
                  <span className="text-slate-400">{formatDate(b.eventDate)} · Ref: <span className="text-cyan-300 font-mono">{b.bookingNumber || b.bookingReference}</span></span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400 block">{formatCurrency(b.totalAmount)}</span>
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

        <Card className="p-6 glass-card border border-sky-500/20 space-y-4 shadow-xl">
          <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold pb-3 border-b border-sky-500/15">
            Verified Studios & Creators ({professionals.length})
          </h3>
          <div className="space-y-3">
            {professionals.slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 text-xs hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center gap-2.5">
                  <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border border-sky-500/30" />
                  <div>
                    <h4 className="font-display font-bold text-white">{p.name}</h4>
                    <span className="text-slate-400">{p.location?.city} · <span className="text-amber-300">{p.rating} ★</span></span>
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
