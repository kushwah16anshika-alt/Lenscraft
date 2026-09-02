import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowUpRight, Filter } from 'lucide-react';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Tabs from '../../components/common/Tabs';
import { formatCurrency, formatDate } from '../../utils/formatters';

const MyBookingsPage = () => {
  const [filterTab, setFilterTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Bookings', count: MOCK_BOOKINGS.length },
    { id: 'confirmed', label: 'Confirmed', count: MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: MOCK_BOOKINGS.filter((b) => b.status === 'completed').length },
    { id: 'pending', label: 'Pending', count: MOCK_BOOKINGS.filter((b) => b.status === 'pending').length },
  ];

  const filtered =
    filterTab === 'all'
      ? MOCK_BOOKINGS
      : MOCK_BOOKINGS.filter((b) => b.status === filterTab);

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Bookings Manager
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            My Creative Bookings
          </h1>
        </div>
        <Link to="/photographers">
          <Button variant="primary" size="sm">
            Book New Creator
          </Button>
        </Link>
      </div>

      <Tabs tabs={tabs} activeTab={filterTab} onChange={setFilterTab} />

      <div className="space-y-4">
        {filtered.map((b) => (
          <Card key={b.id} className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar src={b.professionalAvatar} name={b.professionalName} size="lg" />
                <div>
                  <h3 className="text-base font-bold text-[#171717]">{b.professionalName}</h3>
                  <p className="text-xs text-[#6B6258]">{b.serviceTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    b.status === 'confirmed'
                      ? 'success'
                      : b.status === 'completed'
                      ? 'charcoal'
                      : 'warning'
                  }
                  size="md"
                >
                  {b.status}
                </Badge>
                <Link to={`/professionals/${b.professionalId}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    View Creator
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Booking Ref</span>
                <span className="font-mono font-bold text-[#171717]">{b.bookingNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Event Date</span>
                <span className="font-bold text-[#171717]">{formatDate(b.eventDate)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Location / City</span>
                <span className="font-bold text-[#171717]">{b.location?.city || 'Mumbai, MH'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Total Amount</span>
                <span className="font-bold text-[#171717]">{formatCurrency(b.totalAmount)}</span>
              </div>
            </div>

            {b.notes && (
              <p className="text-xs text-[#6B6258] italic border-l-2 border-[#B88A5A] pl-3">
                "{b.notes}"
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
