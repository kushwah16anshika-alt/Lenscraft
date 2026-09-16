import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { Camera, Save } from 'lucide-react';

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { success, error: toastError } = useToast();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.location?.city || 'Mumbai',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.location?.city || 'Mumbai',
      });
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        if (toastError) toastError('Avatar image must be less than 2MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        if (toastError) toastError('Please select a valid image file (JPG, PNG, GIF, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (updateUser) {
          updateUser({
            avatar: { url: reader.result },
          });
        }
        success('Avatar updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      if (toastError) toastError('Full Name cannot be empty.');
      return;
    }
    if (updateUser) {
      updateUser({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: {
          ...(user?.location || {}),
          city: formData.city.trim(),
        },
      });
    }
    success('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Account Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Personal Information
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-zinc-200 space-y-6 shadow-2xs">
        <div className="flex items-center gap-6 pb-6 border-b border-zinc-200">
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
            <p className="text-[11px] text-zinc-400">JPG, GIF or PNG. Max size of 2MB.</p>
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
