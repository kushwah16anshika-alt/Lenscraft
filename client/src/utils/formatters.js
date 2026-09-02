export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatPriceUnit = (unit) => {
  const map = {
    per_hour: '/ hour',
    per_day: '/ day',
    per_project: '/ project',
    per_video: '/ video',
    fixed: 'fixed',
  };
  return map[unit] || '';
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'accepted':
    case 'completed':
    case 'paid_in_full':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'pending':
    case 'advance_paid':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'in_progress':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'rejected':
    case 'cancelled':
    case 'unpaid':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-700/30 text-slate-300 border-slate-600/30';
  }
};
