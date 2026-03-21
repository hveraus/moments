import styles from './TripSection.module.css';
import { TicketSlot } from '../TicketSlot/TicketSlot';
import { TripMap } from '../TripMap/TripMap';
import type { Trip, TicketData } from '../../types';

interface TripSectionProps {
  trip: Trip;
  onTicketClick: (ticket: TicketData) => void;
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    return `${months[s.getMonth()]} ${s.getDate()} – ${e.getDate()}, ${s.getFullYear()}`;
  }
  if (s.getFullYear() === e.getFullYear()) {
    return `${months[s.getMonth()]} ${s.getDate()} – ${months[e.getMonth()]} ${e.getDate()}, ${s.getFullYear()}`;
  }
  return `${months[s.getMonth()]} ${s.getDate()}, ${s.getFullYear()} – ${months[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}

export function TripSection({ trip, onTicketClick }: TripSectionProps) {
  return (
    <div id={`trip-${trip.slug}`}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.destination}>{trip.title}</h2>
          <p className={styles.meta}>
            {trip.country} · {formatDateRange(trip.startDate, trip.endDate)}
          </p>
        </div>
        <div className={styles.tickets}>
          {trip.tickets.map((ticket) => (
            <TicketSlot
              key={ticket.id}
              ticket={ticket}
              onClick={() => onTicketClick(ticket)}
            />
          ))}
        </div>
        {trip.locations && trip.locations.length > 0 && (
          <TripMap locations={trip.locations} />
        )}
      </div>
    </div>
  );
}
