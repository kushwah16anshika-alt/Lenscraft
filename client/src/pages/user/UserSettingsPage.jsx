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
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Security & Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Account Settings
        </h1>
      </div>

      {/* Password Change */}
      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E5E0D8]">
          <Lock className="w-4 h-4 text-[#B88A5A]" />
          <h3 className="text-sm font-bold text-[#171717]">Change Password</h3>
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
      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E5E0D8]">
          <Bell className="w-4 h-4 text-[#B88A5A]" />
          <h3 className="text-sm font-bold text-[#171717]">Notification Settings</h3>
        </div>

        <div className="space-y-3 text-xs text-[#6B6258]">
          <label className="flex items-center justify-between p-3 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] cursor-pointer">
            <div>
              <span className="font-bold text-[#171717] block">Booking Status SMS Updates</span>
              <span>Receive instant text notifications when a creator accepts your date.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-[#171717] focus:ring-0" />
          </label>

          <label className="flex items-center justify-between p-3 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] cursor-pointer">
            <div>
              <span className="font-bold text-[#171717] block">Deliverable Ready Email</span>
              <span>Get notified immediately when the download gallery link is published.</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-[#171717] focus:ring-0" />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default UserSettingsPage;
