import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, X, Eye, CheckCircle2, Ban } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Tabs from '../../components/common/Tabs';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const AppointmentsPage = () => {
  const { bookings, updateBookingStatus } = usePlatform();
  const { success, info } = useToast();
  const [filterTab, setFilterTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Inquiries', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter((b) => b.status === 'confirmed').length },
    { id: 'pending', label: 'Pending Approval', count: bookings.filter((b) => b.status === 'pending').length },
    { id: 'completed', label: 'Completed', count: bookings.filter((b) => b.status === 'completed').length },
    { id: 'cancelled', label: 'Declined/Cancelled', count: bookings.filter((b) => b.status === 'cancelled').length },
  ];

  const filtered =
    filterTab === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filterTab);

  const handleAccept = (bookingId, bookingRef) => {
    updateBookingStatus(bookingId, 'confirmed');
    success(`Shoot date accepted for booking ${bookingRef}! Client notified.`);
  };

  const handleDecline = (bookingId, bookingRef) => {
    updateBookingStatus(bookingId, 'cancelled', 'Studio unavailable for this date.');
    info(`Inquiry ${bookingRef} declined and client refunded.`);
  };

  const handleComplete = (bookingId, bookingRef) => {
    updateBookingStatus(bookingId, 'completed');
    success(`Booking ${bookingRef} marked as completed. Escrow payout unlocked!`);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Calendar Schedule
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Appointments & Shoot Inquiries
        </h1>
      </div>

      <Tabs tabs={tabs} activeTab={filterTab} onChange={setFilterTab} />

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <Card key={b.id} className="p-6 bg-white border border-zinc-200 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={b.user?.avatar || b.userAvatar}
                    name={b.user?.name || b.userName}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">{b.user?.name || b.userName}</h3>
                    <p className="text-xs text-zinc-500">
                      {b.service?.title || b.serviceTitle} · <span className="font-medium text-zinc-900">{b.eventType}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
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
                    size="md"
                  >
                    {b.status}
                  </Badge>

                  {b.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAccept(b.id, b.bookingNumber || b.bookingReference)}
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                      >
                        Accept Date
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDecline(b.id, b.bookingNumber || b.bookingReference)}
                        leftIcon={<X className="w-3.5 h-3.5" />}
                      >
                        Decline
                      </Button>
                    </>
                  )}

                  {b.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComplete(b.id, b.bookingNumber || b.bookingReference)}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      Mark Completed
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <div>
                  <span className="text-[11px] uppercase font-semibold text-zinc-400 block">Client Contact</span>
                  <span className="font-medium text-zinc-900">{b.userEmail || b.user?.email || 'client@example.com'}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-zinc-400 block">Shoot Date</span>
                  <span className="font-medium text-zinc-900">{formatDate(b.eventDate)} ({b.eventTime || 'Full Day'})</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-zinc-400 block">Location</span>
                  <span className="font-medium text-zinc-900">{b.location?.city || 'Mumbai'}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-zinc-400 block">Payout Amount</span>
                  <span className="font-semibold text-zinc-900">{formatCurrency(b.totalAmount)}</span>
                </div>
              </div>

              {b.notes && (
                <p className="text-xs text-zinc-600 italic border-l-2 border-zinc-900 pl-3">
                  "{b.notes}"
                </p>
              )}
            </Card>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-zinc-200">
            <p className="text-xs text-zinc-500">No appointments match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
