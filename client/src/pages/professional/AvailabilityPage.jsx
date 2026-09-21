import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calendar, CheckCircle2, Save, Sparkles } from 'lucide-react';
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
    <div className="max-w-3xl space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Calendar Controls</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Working Days & Shoot <span className="text-gradient-cyan">Availability</span>
        </h1>
      </div>

      <Card className="p-6 sm:p-8 glass-card border border-sky-500/20 space-y-6 shadow-xl">
        <p className="text-sm text-slate-400">
          Configure which days of the week clients can schedule shoot dates with your studio.
        </p>

        <div className="space-y-2.5">
          {days.map((day) => (
            <label
              key={day}
              className="flex items-center justify-between p-3.5 rounded-xl bg-midnight-950/70 border border-sky-500/15 cursor-pointer hover:border-cyan-400/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">{day}</span>
              </div>
              <input
                type="checkbox"
                checked={!!schedule[day]}
                onChange={(e) => setSchedule({ ...schedule, [day]: e.target.checked })}
                className="rounded border-sky-500/30 text-cyan-400 focus:ring-cyan-400 accent-cyan-400 w-4 h-4"
              />
            </label>
          ))}
        </div>

        <div className="pt-4 border-t border-sky-500/15">
          <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
            Save Availability
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AvailabilityPage;
