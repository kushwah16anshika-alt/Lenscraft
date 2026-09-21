import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowUpRight, Ban, MessageSquarePlus, CheckCircle2, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import Tabs from '../../components/common/Tabs';
import WriteReviewModal from '../../components/common/WriteReviewModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const MyBookingsPage = () => {
  const { bookings, cancelBooking } = usePlatform();
  const { success, info } = useToast();
  const [filterTab, setFilterTab] = useState('all');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter((b) => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: bookings.filter((b) => b.status === 'completed').length },
    { id: 'pending', label: 'Pending Approval', count: bookings.filter((b) => b.status === 'pending').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter((b) => b.status === 'cancelled').length },
  ];

  const filtered =
    filterTab === 'all'
      ? bookings
      : bookings.filter((b) => b.status === filterTab);

  const handleCancel = (bookingId, bookingRef) => {
    cancelBooking(bookingId, 'Cancelled by client request');
    info(`Booking ${bookingRef} has been cancelled and escrow released.`);
  };

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bookings Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            My Creative <span className="text-gradient-cyan">Bookings</span>
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
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <Card key={b.id} className="p-6 glass-card border border-sky-500/20 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={b.professional?.avatar || b.professionalAvatar}
                    name={b.professional?.name || b.professionalName}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-base font-display font-bold text-white">
                      {b.professional?.name || b.professionalName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {b.service?.title || b.serviceTitle} · <span className="font-medium text-cyan-300">{b.eventType}</span>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:bg-red-500/10"
                      onClick={() => handleCancel(b.id, b.bookingNumber || b.bookingReference)}
                      leftIcon={<Ban className="w-3.5 h-3.5" />}
                    >
                      Cancel
                    </Button>
                  )}

                  {b.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBookingForReview(b)}
                      leftIcon={<MessageSquarePlus className="w-3.5 h-3.5" />}
                    >
                      Leave Review
                    </Button>
                  )}

                  <Link to={`/professionals/${b.professionalId || b.professional?.id || 'pro-1'}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                      View Studio
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-midnight-950/70 border border-sky-500/15 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Booking Ref</span>
                  <span className="font-mono font-medium text-cyan-300">{b.bookingNumber || b.bookingReference}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Event Date</span>
                  <span className="font-medium text-white">{formatDate(b.eventDate)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Location / City</span>
                  <span className="font-medium text-white">{b.location?.city || 'Mumbai, MH'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Total Amount</span>
                  <span className="font-semibold text-emerald-400 font-mono">{formatCurrency(b.totalAmount)}</span>
                </div>
              </div>

              {b.notes && (
                <p className="text-xs text-slate-300 italic border-l-2 border-cyan-400 pl-3">
                  "{b.notes}"
                </p>
              )}
            </Card>
          ))
        ) : (
          <div className="p-12 text-center glass-card rounded-2xl border border-sky-500/20">
            <p className="text-xs text-slate-400 mb-3">No bookings found in this view.</p>
            <Link to="/photographers">
              <Button variant="primary" size="sm">
                Explore Creative Studios
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {selectedBookingForReview && (
        <WriteReviewModal
          isOpen={!!selectedBookingForReview}
          onClose={() => setSelectedBookingForReview(null)}
          booking={selectedBookingForReview}
        />
      )}
    </div>
  );
};

export default MyBookingsPage;
