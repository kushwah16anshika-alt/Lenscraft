import React from 'react';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Lock, Bell, Shield, Sparkles } from 'lucide-react';

const UserSettingsPage = () => {
  const { success } = useToast();

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    success('Password updated successfully.');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Security & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Account <span className="text-gradient-cyan">Settings</span>
        </h1>
      </div>

      {/* Password Change */}
      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-4 border-b border-sky-500/15">
          <Lock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-display font-bold text-white">Change Password</h3>
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
      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-4 border-b border-sky-500/15">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-display font-bold text-white">Notification Settings</h3>
        </div>

        <div className="space-y-3 text-xs text-slate-400">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 cursor-pointer hover:border-cyan-400/40 transition-all">
            <div>
              <span className="font-semibold text-white block">Booking Status SMS Updates</span>
              <span>Receive instant text notifications when a creator accepts your date.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-sky-500/30 text-cyan-400 focus:ring-cyan-400 accent-cyan-400 w-4 h-4" />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 cursor-pointer hover:border-cyan-400/40 transition-all">
            <div>
              <span className="font-semibold text-white block">Deliverable Ready Email</span>
              <span>Get notified immediately when the download gallery link is published.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-sky-500/30 text-cyan-400 focus:ring-cyan-400 accent-cyan-400 w-4 h-4" />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default UserSettingsPage;
