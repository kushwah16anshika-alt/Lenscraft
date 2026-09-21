import React from 'react';
import { DollarSign, ArrowUpRight, TrendingUp, Download, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 text-left animate-reveal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Financials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Earnings & <span className="text-gradient-cyan">Payouts</span>
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

      <Card className="p-6 glass-card border border-sky-500/20 space-y-4 shadow-xl">
        <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold pb-3 border-b border-sky-500/15">
          Recent Payout History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-500/15 text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Client / Project</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-midnight-800/40 transition-colors">
                  <td className="py-3.5 font-mono font-medium text-cyan-300">{tx.id}</td>
                  <td className="py-3.5 text-slate-400">{formatDate(tx.date)}</td>
                  <td className="py-3.5 font-medium text-white">{tx.client}</td>
                  <td className="py-3.5 text-slate-400">{tx.type}</td>
                  <td className="py-3.5">
                    <Badge variant="success" size="sm">
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right font-semibold font-mono text-emerald-400">
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
