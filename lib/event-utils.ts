// Helper function to generate URL-friendly slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to normalize date to ISO format (YYYY-MM-DD)
export function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error('Invalid date format');
  return date.toISOString().split('T')[0];
}

// Helper function to normalize time format (HH:MM 24-hour)
export function normalizeTime(timeString: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);

  if (!match) {
    throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
  }

  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();

  if (period) {
    // Convert 12-hour to 24-hour
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  }

  if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
    throw new Error('Invalid time values');
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Helper to parse arrays from form data (agenda, tags)

