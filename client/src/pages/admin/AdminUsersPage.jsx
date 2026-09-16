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
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Registered Clients ({users.length})
        </h1>
      </div>

      <Card className="p-6 bg-white border border-zinc-200 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] uppercase font-semibold text-zinc-400">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50/75">
                  <td className="py-3.5 font-semibold text-zinc-900">{u.name}</td>
                  <td className="py-3.5 text-zinc-500">{u.email}</td>
                  <td className="py-3.5 text-zinc-500 font-mono">{u.phone || '+91 98200 11223'}</td>
                  <td className="py-3.5 text-zinc-500">{formatDate(u.joined || '2025-02-01')}</td>
                  <td className="py-3.5">
                    <Badge variant={u.status === 'active' ? 'success' : 'danger'} size="sm">
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right">
                    <Button
                      variant={u.status === 'active' ? 'ghost' : 'outline'}
                      size="sm"
                      onClick={() => handleToggle(u)}
                      className={u.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-emerald-600'}
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
