export const ROLES = {
  USER: 'user',
  PHOTOGRAPHER: 'photographer',
  VIDEOGRAPHER: 'videographer',
  EDITOR: 'editor',
  ADMIN: 'admin',
};

export const ROLE_LABELS = {
  [ROLES.USER]: 'Customer / Client',
  [ROLES.PHOTOGRAPHER]: 'Photographer',
  [ROLES.VIDEOGRAPHER]: 'Videographer',
  [ROLES.EDITOR]: 'Video Editor',
  [ROLES.ADMIN]: 'Platform Administrator',
};

export const CREATIVE_ROLES = [
  ROLES.PHOTOGRAPHER,
  ROLES.VIDEOGRAPHER,
  ROLES.EDITOR,
];

export const ROLE_BADGE_STYLES = {
  [ROLES.USER]: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
  [ROLES.PHOTOGRAPHER]: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  [ROLES.VIDEOGRAPHER]: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
  [ROLES.EDITOR]: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  [ROLES.ADMIN]: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
};
