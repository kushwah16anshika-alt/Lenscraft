import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calendar, CheckCircle2, Save } from 'lucide-react';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const AvailabilityPage = () => {
  const { availabilitySchedule, setAvailabilitySchedule } = usePlatform();
  const { success } = useToast();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [schedule, setSchedule] = useState(availabilitySchedule);

  const handleSave = () => {
    setAvailabilitySchedule(schedule);
    success('Working days & calendar schedule saved to live store!');
  };

  return (
    <div className="max-w-3xl space-y-6 text-left">
      <div className="pb-4 border-b border-zinc-200">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
          Calendar Controls
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
          Working Days & Shoot Availability
        </h1>
      </div>

      <Card className="p-6 sm:p-8 bg-white border border-zinc-200 space-y-6 shadow-2xs">
        <p className="text-sm text-zinc-500">
          Configure which days of the week clients can schedule shoot dates with your studio.
        </p>

        <div className="space-y-2.5">
          {days.map((day) => (
            <label
              key={day}
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 cursor-pointer hover:border-zinc-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-700" />
                <span className="text-xs font-semibold text-zinc-900">{day}</span>
              </div>
              <input
                type="checkbox"
                checked={!!schedule[day]}
                onChange={(e) => setSchedule({ ...schedule, [day]: e.target.checked })}
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 w-4 h-4"
              />
            </label>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-200">
          <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
            Save Availability
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AvailabilityPage;
