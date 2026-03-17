import styles from './FallbackTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function FallbackTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      <div className={styles.content}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={styles.row}>
            <span className={styles.label}>{key}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
