import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { Check, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const AdminProfessionalsPage = () => {
  const { professionals } = usePlatform();

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Talent Moderation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Creator Studio <span className="text-gradient-cyan">Directory</span> ({professionals.length})
        </h1>
      </div>

      <Card className="p-6 glass-card border border-sky-500/20 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-500/15 text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                <th className="pb-3">Creator / Studio</th>
                <th className="pb-3">Discipline</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Base Price</th>
                <th className="pb-3">Audit Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {professionals.map((p) => (
                <tr key={p.id} className="hover:bg-midnight-800/40 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={p.avatar} name={p.name} size="sm" />
                      <div>
                        <span className="font-display font-bold text-white block">{p.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono"><span className="text-amber-300">{p.rating || 5.0} ★</span> ({p.reviewCount || 0} reviews)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <Badge variant="outline" size="sm">
                      {p.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-slate-300">{p.location?.city}</td>
                  <td className="py-3.5 font-semibold font-mono text-emerald-400">
                    {formatCurrency(p.startingPrice)} {formatPriceUnit(p.priceUnit)}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link to={`/professionals/${p.id}`}>
                      <Button variant="outline" size="sm" rightIcon={<ArrowUpRight className="w-3 h-3" />}>
                        Inspect
                      </Button>
                    </Link>
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

export default AdminProfessionalsPage;
