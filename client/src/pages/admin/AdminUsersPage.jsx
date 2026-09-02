import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';

const AdminUsersPage = () => {
  const users = [
    { id: 'u-1', name: 'Pooja Sethi', email: 'pooja@example.com', role: 'user', joined: '2025-01-10', status: 'active' },
    { id: 'u-2', name: 'Vikram Malhotra', email: 'vikram@example.com', role: 'user', joined: '2025-02-15', status: 'active' },
    { id: 'u-3', name: 'Ananya Roy', email: 'ananya@example.com', role: 'user', joined: '2025-03-01', status: 'active' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Registered Clients
        </h1>
      </div>

      <Card className="p-6 bg-white border border-[#E5E0D8] shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-bold text-[#8C8276]">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F5F2]/50">
                  <td className="py-3 font-bold text-[#171717]">{u.name}</td>
                  <td className="py-3 text-[#6B6258]">{u.email}</td>
                  <td className="py-3">
                    <Badge variant="default" size="sm">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-3 text-[#6B6258]">{formatDate(u.joined)}</td>
                  <td className="py-3 text-right">
                    <Badge variant="success" size="sm">
                      {u.status}
                    </Badge>
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

export default AdminUsersPage;
