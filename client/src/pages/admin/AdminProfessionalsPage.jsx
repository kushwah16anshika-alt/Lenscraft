import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { Check, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';

const AdminProfessionalsPage = () => {
  const { professionals } = usePlatform();

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Talent Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Creator Studio Directory ({professionals.length})
        </h1>
      </div>

      <Card className="p-6 bg-white border border-zinc-200 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] uppercase font-semibold text-zinc-400">
                <th className="pb-3">Creator / Studio</th>
                <th className="pb-3">Discipline</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Base Price</th>
                <th className="pb-3">Audit Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {professionals.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/75">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={p.avatar} name={p.name} size="sm" />
                      <div>
                        <span className="font-semibold text-zinc-900 block">{p.name}</span>
                        <span className="text-[11px] text-zinc-500">{p.rating || 5.0} ★ ({p.reviewCount || 0} reviews)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <Badge variant="outline" size="sm">
                      {p.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-zinc-500">{p.location?.city}</td>
                  <td className="py-3.5 font-semibold text-zinc-900">
                    {formatCurrency(p.startingPrice)} {formatPriceUnit(p.priceUnit)}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
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
