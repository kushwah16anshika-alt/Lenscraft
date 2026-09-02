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
  [ROLES.USER]: 'bg-[#EFF4F8] text-[#3B5B75] border-[#D5E2EC]',
  [ROLES.PHOTOGRAPHER]: 'bg-[#FAF7F3] text-[#B88A5A] border-[#E8DBCA]',
  [ROLES.VIDEOGRAPHER]: 'bg-[#F6F2F8] text-[#6B4E71] border-[#E5DBE8]',
  [ROLES.EDITOR]: 'bg-[#EDF5F0] text-[#3D7055] border-[#D4E8DC]',
  [ROLES.ADMIN]: 'bg-[#171717] text-white border-[#171717]',
};
