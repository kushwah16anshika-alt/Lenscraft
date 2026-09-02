import React from 'react';
import { DollarSign, ArrowUpRight, TrendingUp, Download } from 'lucide-react';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const EarningsPage = () => {
  const transactions = [
    { id: 'tx-1', date: '2025-07-02', client: 'Pooja & Rohan', amount: 35000, status: 'paid', type: 'Full Payment' },
    { id: 'tx-2', date: '2025-06-20', client: 'Vikram Sethi', amount: 15000, status: 'paid', type: 'Advance 50%' },
    { id: 'tx-3', date: '2025-06-10', client: 'StyleCo Luxury', amount: 45000, status: 'paid', type: 'Full Payment' },
    { id: 'tx-4', date: '2025-05-28', client: 'Ananya Roy', amount: 20000, status: 'paid', type: 'Milestone 2' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Financials
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Earnings & Payouts
          </h1>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
          Export CSV Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Gross Revenue"
          value="₹1,15,000"
          icon={DollarSign}
          trend="+32% this month"
          trendPositive={true}
        />
        <StatCard
          title="In Escrow (Pending Delivery)"
          value="₹20,000"
          icon={TrendingUp}
          subtitle="Released once client accepts files"
        />
        <StatCard
          title="Next Scheduled Payout"
          value="₹35,000"
          icon={DollarSign}
          subtitle="Direct deposit on Friday"
        />
      </div>

      <Card className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
        <h3 className="text-sm font-bold text-[#171717] pb-3 border-b border-[#E5E0D8]">
          Recent Payout History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-bold text-[#8C8276]">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Client / Project</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F7F5F2]/50">
                  <td className="py-3 font-mono font-bold text-[#171717]">{tx.id}</td>
                  <td className="py-3 text-[#6B6258]">{formatDate(tx.date)}</td>
                  <td className="py-3 font-semibold text-[#171717]">{tx.client}</td>
                  <td className="py-3 text-[#6B6258]">{tx.type}</td>
                  <td className="py-3">
                    <Badge variant="success" size="sm">
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-bold text-[#171717]">
                    {formatCurrency(tx.amount)}
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

export default EarningsPage;
