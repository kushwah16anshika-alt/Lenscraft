import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { Save, Camera, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const SettingsPage = () => {
  const { user } = useAuth();
  const { professionals, updateStudioProfile } = usePlatform();
  const { success } = useToast();

  const currentPro = professionals[0] || {};

  const [formData, setFormData] = useState({
    name: currentPro.name || (user?.name ? `${user.name} Studio` : 'Aarav Mehta Studio'),
    tagline: currentPro.tagline || 'Fine Art Wedding & Editorial Portrait Photographer',
    city: currentPro.location?.city || 'Mumbai',
    state: currentPro.location?.state || 'Maharashtra',
    experienceYears: String(currentPro.experienceYears || '10'),
    bio: currentPro.bio || '10+ years capturing grand Indian weddings and destination celebrations across Udaipur, Goa, and Europe.',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudioProfile(currentPro.id, {
      name: formData.name,
      tagline: formData.tagline,
      location: { city: formData.city, state: formData.state, country: 'India' },
      experienceYears: Number(formData.experienceYears) || 5,
      bio: formData.bio,
    });
    success('Studio settings & biography updated across public portfolio!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Studio Profile</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Public Profile <span className="text-gradient-cyan">Settings</span>
        </h1>
      </div>

      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Studio / Brand Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Editorial Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Base City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="Years of Experience"
              type="number"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              required
            />
          </div>
          <Textarea
            label="Studio Biography"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
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
