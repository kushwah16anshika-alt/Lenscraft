import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const AdminUsersPage = () => {
  const { users, toggleUserStatus } = usePlatform();
  const { success } = useToast();

  const handleToggle = (u) => {
    toggleUserStatus(u.id);
    success(`Account for ${u.name} is now ${u.status === 'active' ? 'deactivated' : 'activated'}.`);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Registered Clients ({users.length})
        </h1>
      </div>

      <Card className="p-6 bg-white border border-[#E5E0D8] shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-bold text-[#8C8276]">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F5F2]/50">
                  <td className="py-3 font-bold text-[#171717]">{u.name}</td>
                  <td className="py-3 text-[#6B6258]">{u.email}</td>
                  <td className="py-3 text-[#6B6258] font-mono">{u.phone || '+91 98200 11223'}</td>
                  <td className="py-3 text-[#6B6258]">{formatDate(u.joined || '2025-02-01')}</td>
                  <td className="py-3">
                    <Badge variant={u.status === 'active' ? 'success' : 'danger'} size="sm">
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Button
                      variant={u.status === 'active' ? 'ghost' : 'outline'}
                      size="sm"
                      onClick={() => handleToggle(u)}
                      className={u.status === 'active' ? 'text-[#99453F] hover:bg-[#FDF2F1]' : 'text-[#3D7055]'}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Reactivate'}
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

export default AdminUsersPage;
