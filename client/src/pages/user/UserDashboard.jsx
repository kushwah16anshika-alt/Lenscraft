import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Star, Compass, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const UserDashboard = () => {
  const { user } = useAuth();

  const userBookings = MOCK_BOOKINGS.filter((b) => b.userId === user?.id) || MOCK_BOOKINGS.slice(0, 3);

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-md bg-white border border-[#E5E0D8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Client Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs text-[#6B6258] mt-1">
            Track your shoot dates, creative deliverables, and saved creators.
          </p>
        </div>
        <Link to="/photographers">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Book a Creator
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Active Bookings"
          value="2"
          icon={Calendar}
          subtitle="Upcoming confirmed shoot dates"
        />
        <StatCard
          title="Saved Creators"
          value="5"
          icon={Heart}
          subtitle="In your curated wishlist"
        />
        <StatCard
          title="Reviews Submitted"
          value="1"
          icon={Star}
          subtitle="Feedback given to studios"
        />
      </div>

      {/* Recent Bookings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
          <h2 className="text-lg font-serif font-bold text-[#171717]">Your Recent Bookings</h2>
          <Link to="/user/bookings" className="text-xs font-semibold text-[#B88A5A] hover:underline">
            View All Bookings
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userBookings.map((b) => (
            <Card key={b.id} className="p-5 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Avatar src={b.professional?.avatar || b.professionalAvatar} name={b.professional?.name || b.professionalName} size="md" />
                  <div>
                    <h4 className="text-sm font-bold text-[#171717]">{b.professional?.name || b.professionalName}</h4>
                    <span className="text-[11px] text-[#6B6258]">{b.service?.title || b.serviceTitle}</span>
                  </div>
                </div>
                <Badge
                  variant={
                    b.status === 'confirmed' || b.status === 'accepted'
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

              <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#E5E0D8] text-[#6B6258]">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#8C8276]">Event Date</span>
                  <span className="font-bold text-[#171717]">{formatDate(b.eventDate)}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-[#8C8276]">Total Amount</span>
                  <span className="font-bold text-[#171717]">{formatCurrency(b.totalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B6258]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B88A5A]" />
                  <span>Deliverables pending</span>
                </span>
                <Link to={`/professionals/${b.professional?.id || b.professionalId || 'pro-1'}`} className="text-[#171717] font-bold hover:underline">
                  Contact Creator →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
