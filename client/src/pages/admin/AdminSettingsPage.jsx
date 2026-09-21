import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Save, Settings, Sparkles } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const AdminSettingsPage = () => {
  const { success } = useToast();
  const [platformFee, setPlatformFee] = useState('10');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = (e) => {
    e.preventDefault();
    success('Platform governance configurations updated.');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Governance & Fees</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Platform <span className="text-gradient-cyan">Settings</span>
        </h1>
      </div>

      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 space-y-4 shadow-xl">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Platform Commission Rate (%)"
            type="number"
            value={platformFee}
            onChange={(e) => setPlatformFee(e.target.value)}
          />
          <Input
            label="Default Currency Code"
            value={currency}
            disabled
          />
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Platform Configuration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
