import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { DollarSign, Save } from 'lucide-react';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const PricingPage = () => {
  const { pricingRates, setPricingRates } = usePlatform();
  const { success } = useToast();
  const [rates, setRates] = useState(pricingRates);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPricingRates(rates);
    success('Rate card updated & persisted successfully!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Rate Cards
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Standard Studio Pricing
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Standard Hourly Rate (₹)"
              type="number"
              value={rates.hourly}
              onChange={(e) => setRates({ ...rates, hourly: e.target.value })}
            />
            <Input
              label="Full Day Rate (8-10 Hours) (₹)"
              type="number"
              value={rates.fullDay}
              onChange={(e) => setRates({ ...rates, fullDay: e.target.value })}
            />
            <Input
              label="Half Day Rate (4-5 Hours) (₹)"
              type="number"
              value={rates.halfDay}
              onChange={(e) => setRates({ ...rates, halfDay: e.target.value })}
            />
            <Input
              label="Licensed Drone Pilot Add-on (₹)"
              type="number"
              value={rates.droneAddon}
              onChange={(e) => setRates({ ...rates, droneAddon: e.target.value })}
            />
            <Input
              label="Second Camera Operator Add-on (₹)"
              type="number"
              value={rates.secondShooter}
              onChange={(e) => setRates({ ...rates, secondShooter: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-[#E5E0D8]">
            <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
              Save Rate Card
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PricingPage;
