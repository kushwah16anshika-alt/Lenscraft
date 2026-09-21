import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { Sparkles } from 'lucide-react';

const AdminAppointmentsPage = () => {
  const { bookings } = usePlatform();

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Escrow Transactions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Platform Bookings & Escrow <span className="text-gradient-cyan">Monitor</span> ({bookings.length})
        </h1>
      </div>

      <Card className="p-6 glass-card border border-sky-500/20 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-500/15 text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Studio</th>
                <th className="pb-3">Event Date</th>
                <th className="pb-3">Escrow Status</th>
                <th className="pb-3 text-right">GMV Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-midnight-800/40 transition-colors">
                  <td className="py-3.5 font-mono font-medium text-cyan-300">{b.bookingNumber || b.bookingReference}</td>
                  <td className="py-3.5 font-medium text-white">{b.userName || b.user?.name}</td>
                  <td className="py-3.5 text-slate-400">{b.professionalName || b.professional?.name}</td>
                  <td className="py-3.5 text-slate-400">{formatDate(b.eventDate)}</td>
                  <td className="py-3.5">
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
                  </td>
                  <td className="py-3.5 text-right font-semibold font-mono text-emerald-400">
                    {formatCurrency(b.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminAppointmentsPage;
