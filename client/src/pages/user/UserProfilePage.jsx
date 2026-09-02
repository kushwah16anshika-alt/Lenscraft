import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { Camera, Save } from 'lucide-react';

const UserProfilePage = () => {
  const { user } = useAuth();
  const { success } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: 'Mumbai',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    success('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Account Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Personal Information
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] space-y-6 shadow-2xs">
        <div className="flex items-center gap-6 pb-6 border-b border-[#E5E0D8]">
          <Avatar src={user?.avatar?.url} name={user?.name} size="2xl" />
          <div className="space-y-2">
            <Button variant="outline" size="sm" leftIcon={<Camera className="w-3.5 h-3.5" />}>
              Change Avatar
            </Button>
            <p className="text-[11px] text-[#8C8276]">JPG, GIF or PNG. Max size of 2MB.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            disabled
            helperText="Email address cannot be modified directly."
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="City / Location"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserProfilePage;
