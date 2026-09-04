import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, X, Eye } from 'lucide-react';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Tabs from '../../components/common/Tabs';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useToast } from '../../hooks/useToast';

const AppointmentsPage = () => {
  const { success } = useToast();
  const [filterTab, setFilterTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Inquiries', count: MOCK_BOOKINGS.length },
    { id: 'confirmed', label: 'Confirmed', count: MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length },
    { id: 'pending', label: 'Pending Approval', count: MOCK_BOOKINGS.filter((b) => b.status === 'pending').length },
    { id: 'completed', label: 'Completed', count: MOCK_BOOKINGS.filter((b) => b.status === 'completed').length },
  ];

  const filtered =
    filterTab === 'all'
      ? MOCK_BOOKINGS
      : MOCK_BOOKINGS.filter((b) => b.status === filterTab);

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Calendar Schedule
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Appointments & Bookings
        </h1>
      </div>

      <Tabs tabs={tabs} activeTab={filterTab} onChange={setFilterTab} />

      <div className="space-y-4">
        {filtered.map((b) => (
          <Card key={b.id} className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar src={b.user?.avatar || b.userAvatar} name={b.user?.name || b.userName} size="lg" />
                <div>
                  <h3 className="text-base font-bold text-[#171717]">{b.user?.name || b.userName}</h3>
                  <p className="text-xs text-[#6B6258]">{b.service?.title || b.serviceTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
                {b.status === 'pending' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => success('Booking confirmed for client!')}
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                  >
                    Accept Date
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Client Contact</span>
                <span className="font-bold text-[#171717]">{b.userEmail || 'client@example.com'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Shoot Date</span>
                <span className="font-bold text-[#171717]">{formatDate(b.eventDate)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Location</span>
                <span className="font-bold text-[#171717]">{b.location?.city || 'Mumbai'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8276] block">Payout Amount</span>
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

export default AppointmentsPage;
