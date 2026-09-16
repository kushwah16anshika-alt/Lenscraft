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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
            Financials
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
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

      <Card className="p-6 bg-white border border-zinc-200 space-y-4 shadow-2xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-200">
          Recent Payout History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] uppercase font-semibold text-zinc-400">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Client / Project</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/75">
                  <td className="py-3.5 font-mono font-medium text-zinc-900">{tx.id}</td>
                  <td className="py-3.5 text-zinc-500">{formatDate(tx.date)}</td>
                  <td className="py-3.5 font-medium text-zinc-900">{tx.client}</td>
                  <td className="py-3.5 text-zinc-500">{tx.type}</td>
                  <td className="py-3.5">
                    <Badge variant="success" size="sm">
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right font-semibold text-zinc-900">
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
