export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRole = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

export const formatStatus = (isActive: boolean): string => {
  return isActive ? 'Active' : 'Inactive';
};