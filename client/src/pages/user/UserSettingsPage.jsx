import React from 'react';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Lock, Bell, Shield } from 'lucide-react';

const UserSettingsPage = () => {
  const { success } = useToast();

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    success('Password updated successfully.');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Security & Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Account Settings
        </h1>
      </div>

      {/* Password Change */}
      <Card className="p-6 sm:p-8 bg-white border border-zinc-200 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-200">
          <Lock className="w-4 h-4 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-900">Change Password</h3>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <Input label="Current Password" type="password" placeholder="••••••••" required />
          <Input label="New Password" type="password" placeholder="••••••••" required />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" required />
          <Button type="submit" variant="primary" size="sm">
            Update Password
          </Button>
        </form>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6 sm:p-8 bg-white border border-zinc-200 space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-200">
          <Bell className="w-4 h-4 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-900">Notification Settings</h3>
        </div>

        <div className="space-y-3 text-xs text-zinc-500">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
            <div>
              <span className="font-semibold text-zinc-900 block">Booking Status SMS Updates</span>
              <span>Receive instant text notifications when a creator accepts your date.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all">
            <div>
              <span className="font-semibold text-zinc-900 block">Deliverable Ready Email</span>
              <span>Get notified immediately when the download gallery link is published.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default UserSettingsPage;
