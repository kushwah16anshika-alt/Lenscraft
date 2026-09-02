import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AdminAppointmentsPage = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Escrow Transactions
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Platform Bookings & Escrow
        </h1>
      </div>

      <Card className="p-6 bg-white border border-[#E5E0D8] shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-bold text-[#8C8276]">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Studio</th>
                <th className="pb-3">Shoot Date</th>
                <th className="pb-3">Escrow Status</th>
                <th className="pb-3 text-right">GMV Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {MOCK_BOOKINGS.map((b) => (
                <tr key={b.id} className="hover:bg-[#F7F5F2]/50">
                  <td className="py-3 font-mono font-bold text-[#171717]">{b.bookingNumber}</td>
                  <td className="py-3 font-semibold text-[#171717]">{b.userName}</td>
                  <td className="py-3 text-[#6B6258]">{b.professionalName}</td>
                  <td className="py-3 text-[#6B6258]">{formatDate(b.eventDate)}</td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-bold text-[#171717]">
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
