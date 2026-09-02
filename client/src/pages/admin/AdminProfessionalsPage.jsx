import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { Check, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';

const AdminProfessionalsPage = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Talent Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Creator Studio Directory
        </h1>
      </div>

      <Card className="p-6 bg-white border border-[#E5E0D8] shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-bold text-[#8C8276]">
                <th className="pb-3">Creator / Studio</th>
                <th className="pb-3">Discipline</th>
                <th className="pb-3">City</th>
                <th className="pb-3">Base Price</th>
                <th className="pb-3">Audit Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {MOCK_PROFESSIONALS.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5F2]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={p.avatar} name={p.name} size="sm" />
                      <div>
                        <span className="font-bold text-[#171717] block">{p.name}</span>
                        <span className="text-[10px] text-[#6B6258]">{p.rating} ★ ({p.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant="bronze" size="sm">
                      {p.role}
                    </Badge>
                  </td>
                  <td className="py-3 text-[#6B6258]">{p.location?.city}</td>
                  <td className="py-3 font-bold text-[#171717]">
                    {formatCurrency(p.startingPrice)} {formatPriceUnit(p.priceUnit)}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3D7055]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Button variant="outline" size="sm">
                      Inspect
                    </Button>
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
