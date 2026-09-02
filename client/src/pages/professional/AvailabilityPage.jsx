import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calendar, CheckCircle2, Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const AvailabilityPage = () => {
  const { success } = useToast();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [schedule, setSchedule] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const handleSave = () => {
    success('Working days & calendar schedule saved!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Calendar Controls
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Working Days & Shoot Availability
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-[#E5E0D8] space-y-6 shadow-2xs">
        <p className="text-xs text-[#6B6258]">
          Configure which days of the week clients can schedule shoot dates with your studio.
        </p>

        <div className="space-y-2.5">
          {days.map((day) => (
            <label
              key={day}
              className="flex items-center justify-between p-3.5 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] cursor-pointer hover:border-[#171717] transition-all"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#B88A5A]" />
                <span className="text-xs font-bold text-[#171717]">{day}</span>
              </div>
              <input
                type="checkbox"
                checked={schedule[day]}
                onChange={(e) => setSchedule({ ...schedule, [day]: e.target.checked })}
                className="rounded text-[#171717] focus:ring-0"
              />
            </label>
          ))}
        </div>

        <div className="pt-4 border-t border-[#E5E0D8]">
          <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
            Save Availability
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AvailabilityPage;
