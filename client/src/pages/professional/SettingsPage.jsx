import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { Save, Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const SettingsPage = () => {
  const { user } = useAuth();
  const { success } = useToast();
  const [formData, setFormData] = useState({
    studioName: user?.name ? `${user.name} Studio` : 'Creative Studio',
    tagline: 'Professional Photography & Creative Media Services',
    city: user?.location?.city ? `${user.location.city}, ${user.location.state || 'India'}` : 'Mumbai, Maharashtra',
    experienceYears: '5',
    bio: 'Capturing moments with creative excellence and cinematic precision.',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    success('Studio settings & biography updated successfully!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Studio Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Public Profile Settings
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Studio / Brand Name"
            value={formData.studioName}
            onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
          />
          <Input
            label="Editorial Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Base City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <Input
              label="Years of Experience"
              type="number"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
            />
          </div>
          <Textarea
            label="Studio Biography"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Studio Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
