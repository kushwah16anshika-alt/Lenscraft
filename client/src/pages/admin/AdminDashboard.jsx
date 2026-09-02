import React from 'react';
import { Users, Camera, Calendar, DollarSign, ShieldAlert, ArrowUpRight, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { MOCK_STATS, MOCK_BOOKINGS, MOCK_PROFESSIONALS } from '../../constants/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AdminDashboard = () => {
  return (
    <div className="space-y-8 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Master Administration
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          LensCraft Platform Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Platform GMV"
          value={formatCurrency(MOCK_STATS.totalRevenue)}
          icon={DollarSign}
          trend="+28% vs last month"
          trendPositive={true}
        />
        <StatCard
          title="Active Creators"
          value={MOCK_STATS.activeProfessionals}
          icon={Camera}
          trend="+12 this month"
          trendPositive={true}
        />
        <StatCard
          title="Total Platform Clients"
          value={MOCK_STATS.totalUsers}
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
        <Card className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold text-[#171717] pb-3 border-b border-[#E5E0D8]">
            Platform Bookings Stream
          </h3>
          <div className="space-y-3">
            {MOCK_BOOKINGS.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-xs">
                <div>
                  <h4 className="font-bold text-[#171717]">{b.userName} → {b.professionalName}</h4>
                  <span className="text-[#6B6258]">{formatDate(b.eventDate)}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#171717] block">{formatCurrency(b.totalAmount)}</span>
                  <Badge variant="success" size="sm">
                    {b.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold text-[#171717] pb-3 border-b border-[#E5E0D8]">
            Recently Verified Studios
          </h3>
          <div className="space-y-3">
            {MOCK_PROFESSIONALS.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#171717]">{p.name}</h4>
                    <span className="text-[#6B6258]">{p.location?.city}</span>
                  </div>
                </div>
                <Badge variant="bronze" size="sm">
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
