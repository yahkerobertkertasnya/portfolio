export interface Duration {
  years: number;
  months: number;
}

export function calculateDuration(startDate: Date, endDate: Date = new Date()): Duration {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

export function formatDuration(duration: Duration): string {
  const parts = [];
  if (duration.years > 0) {
    parts.push(`${duration.years} year${duration.years > 1 ? "s" : ""}`);
  }
  if (duration.months > 0) {
    parts.push(`${duration.months} month${duration.months > 1 ? "s" : ""}`);
  }
  return parts.join(" ");
}

export function formatDateRange(startDate: Date, endDate?: Date): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const start = `${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
  if (!endDate) {
    return `${start} - Present`;
  }
  return `${start} - ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
}
