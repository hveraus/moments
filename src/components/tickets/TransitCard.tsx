import styles from './TransitCard.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function TransitCard({ data }: TicketComponentProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.systemName}>{data.systemName}</div>
        <div className={styles.systemNameLocal}>{data.systemNameTh || data.systemNameLocal}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.type}>{data.type}</div>
        <div className={styles.typeLocal}>{data.typeTh || data.typeLocal}</div>
        <div className={styles.price}>{data.price}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <span className={styles.footerLabel}>有效日期</span>
          <span className={styles.footerValue}>{data.date}</span>
        </div>
        <div className={styles.footerItem}>
          <span className={styles.footerLabel}>有效至</span>
          <span className={styles.footerValue}>{data.validUntil}</span>
        </div>
      </div>
      <div className={styles.cardNo}>{data.cardNo}</div>
    </div>
  );
}
