import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  DollarSign,
  Star,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { MOCK_BOOKINGS, MOCK_STATS } from '../../constants/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const proBookings = MOCK_BOOKINGS.slice(0, 4);

  return (
    <div className="space-y-8 text-left">
      {/* Studio Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
            Studio Creator Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            {user?.name || 'Studio Admin'}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Overview of upcoming shoots, milestone earnings, and client inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link to="/professional/portfolio">
            <Button variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Add Media
            </Button>
          </Link>
          <Link to="/professional/services">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              New Package
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Earnings"
          value="₹1,85,000"
          icon={DollarSign}
          trend="+18% vs last mo"
          trendPositive={true}
        />
        <StatCard
          title="Upcoming Shoots"
          value="6"
          icon={Calendar}
          subtitle="2 scheduled this weekend"
        />
        <StatCard
          title="Profile Views"
          value="3,420"
          icon={Eye}
          trend="+24% this week"
          trendPositive={true}
        />
        <StatCard
          title="Client Rating"
          value="4.96"
          icon={Star}
          subtitle="Based on 48 verified reviews"
        />
      </div>

      {/* Bookings & Action Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 cols: Recent Inquiries & Bookings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <h2 className="text-lg font-serif font-bold text-zinc-900">Recent Inquiries & Shoots</h2>
            <Link to="/professional/appointments" className="text-xs font-semibold text-zinc-900 hover:underline">
              Manage All Shoots
            </Link>
          </div>

          <div className="space-y-3">
            {proBookings.map((b) => (
              <Card key={b.id} className="p-4 bg-white border border-zinc-200 shadow-2xs hover:border-zinc-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={b.userAvatar} name={b.userName} size="md" />
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900">{b.userName}</h4>
                      <p className="text-xs text-zinc-500">{b.serviceTitle} • {b.location?.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right sm:block hidden">
                      <span className="text-xs font-semibold text-zinc-900 block">
                        {formatCurrency(b.totalAmount)}
                      </span>
                      <span className="text-[11px] text-zinc-400">{formatDate(b.eventDate)}</span>
                    </div>

                    <Badge
                      variant={
                        b.status === 'confirmed'
                          ? 'success'
                          : b.status === 'completed'
                          ? 'charcoal'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {b.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 1 col: Quick Action & Studio Checklist */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border border-zinc-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
              Studio Health Checklist
            </h3>

            <div className="space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2.5 text-zinc-900">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Identity & Portfolio Verified</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-900">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Active 2025 Calendar Configured</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-900">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bank Payout Account Connected</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-700">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>1 Deliverable Gallery Upload Pending</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/professional/portfolio">
                <Button variant="outline" size="sm" className="w-full justify-center">
                  Update Portfolio Media
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
