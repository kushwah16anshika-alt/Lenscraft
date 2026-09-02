export const ROLES = {
  USER: 'user',
  PHOTOGRAPHER: 'photographer',
  VIDEOGRAPHER: 'videographer',
  EDITOR: 'editor',
  ADMIN: 'admin',
};

export const CREATIVE_ROLES = [
  ROLES.PHOTOGRAPHER,
  ROLES.VIDEOGRAPHER,
  ROLES.EDITOR,
];

export const ALL_ROLES = Object.values(ROLES);
