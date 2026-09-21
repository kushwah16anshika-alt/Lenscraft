import React, { useState, useRef } from 'react';
import { Camera, Save, Sparkles, UserCheck } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Avatar from '../../components/common/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { updateUserProfile } = usePlatform();
  const { success } = useToast();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || 'Pooja Sethi',
    email: user?.email || 'pooja@example.com',
    phone: user?.phone || '+91 98200 11223',
    city: user?.location?.city || user?.city || 'Mumbai, MH',
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      updateUser({
        ...user,
        avatar: fakeUrl,
      });
      success('Avatar updated!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
      });
    }
    if (updateUserProfile) {
      updateUserProfile(user?.id || 'u-1', {
        name: formData.name,
        phone: formData.phone,
        location: {
          city: formData.city,
        },
      });
    }
    success('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Account Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Personal <span className="text-gradient-cyan">Information</span>
        </h1>
      </div>

      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 space-y-6 shadow-xl">
        <div className="flex items-center gap-6 pb-6 border-b border-sky-500/15">
          <Avatar src={user?.avatar?.url || user?.avatar} name={user?.name} size="2xl" />
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Camera className="w-3.5 h-3.5" />}
              onClick={() => fileInputRef.current?.click()}
            >
              Change Avatar
            </Button>
            <p className="text-[11px] text-slate-400 font-mono">JPG, GIF or PNG. Max size of 2MB.</p>
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
            helperText="Email address is protected and cannot be modified directly."
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
