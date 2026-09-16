import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const AdminAppointmentsPage = () => {
  const { bookings } = usePlatform();

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Escrow Transactions
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Platform Bookings & Escrow Monitor ({bookings.length})
        </h1>
      </div>

      <Card className="p-6 bg-white border border-zinc-200 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] uppercase font-semibold text-zinc-400">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Studio</th>
                <th className="pb-3">Event Date</th>
                <th className="pb-3">Escrow Status</th>
                <th className="pb-3 text-right">GMV Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-50/75">
                  <td className="py-3.5 font-mono font-medium text-zinc-900">{b.bookingNumber || b.bookingReference}</td>
                  <td className="py-3.5 font-medium text-zinc-900">{b.userName || b.user?.name}</td>
                  <td className="py-3.5 text-zinc-500">{b.professionalName || b.professional?.name}</td>
                  <td className="py-3.5 text-zinc-500">{formatDate(b.eventDate)}</td>
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
                  <td className="py-3.5 text-right font-semibold text-zinc-900">
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
