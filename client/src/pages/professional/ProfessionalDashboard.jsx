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
      <div className="p-6 sm:p-8 rounded-md bg-white border border-[#E5E0D8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Studio Creator Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            {user?.name || 'Studio Admin'}
          </h1>
          <p className="text-xs text-[#6B6258] mt-1">
            Overview of upcoming shoots, milestone earnings, and client inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
            <h2 className="text-lg font-serif font-bold text-[#171717]">Recent Inquiries & Shoots</h2>
            <Link to="/professional/appointments" className="text-xs font-semibold text-[#B88A5A] hover:underline">
              Manage All Shoots
            </Link>
          </div>

          <div className="space-y-3">
            {proBookings.map((b) => (
              <Card key={b.id} className="p-4 bg-white border border-[#E5E0D8] shadow-2xs hover:border-[#171717] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={b.userAvatar} name={b.userName} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-[#171717]">{b.userName}</h4>
                      <p className="text-xs text-[#6B6258]">{b.serviceTitle} • {b.location?.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right sm:block hidden">
                      <span className="text-xs font-bold text-[#171717] block">
                        {formatCurrency(b.totalAmount)}
                      </span>
                      <span className="text-[10px] text-[#8C8276]">{formatDate(b.eventDate)}</span>
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
          <Card className="p-6 bg-white border border-[#E5E0D8] shadow-2xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717] pb-3 border-b border-[#E5E0D8]">
              Studio Health Checklist
            </h3>

            <div className="space-y-3 text-xs text-[#6B6258]">
              <div className="flex items-center gap-2.5 text-[#171717]">
                <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
                <span>Identity & Portfolio Verified</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#171717]">
                <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
                <span>Active 2025 Calendar Configured</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#171717]">
                <CheckCircle className="w-4 h-4 text-[#3D7055] shrink-0" />
                <span>Bank Payout Account Connected</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#B88A5A]">
                <Clock className="w-4 h-4 text-[#B88A5A] shrink-0" />
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
