import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Save, Settings } from 'lucide-react';
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
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Governance & Fees
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Platform Settings
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-zinc-200 space-y-4 shadow-2xs">
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
