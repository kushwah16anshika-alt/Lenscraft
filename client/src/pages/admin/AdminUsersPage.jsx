import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { formatDate } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';
import { Sparkles } from 'lucide-react';

const AdminUsersPage = () => {
  const { users, toggleUserStatus } = usePlatform();
  const { success } = useToast();

  const handleToggle = (u) => {
    toggleUserStatus(u.id);
    success(`Account for ${u.name} is now ${u.status === 'active' ? 'deactivated' : 'activated'}.`);
  };

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>User Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Registered <span className="text-gradient-cyan">Clients</span> ({users.length})
        </h1>
      </div>

      <Card className="p-6 glass-card border border-sky-500/20 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sky-500/15 text-[11px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-500/10">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-midnight-800/40 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar src={u.avatar} name={u.name} size="sm" />
                      <span className="font-display font-bold text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-300">{u.email}</td>
                  <td className="py-3.5 text-slate-300 font-mono">{u.phone || '+91 98200 11223'}</td>
                  <td className="py-3.5 text-slate-400">{formatDate(u.joined || '2025-02-01')}</td>
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
                      className={u.status === 'active' ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400'}
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
