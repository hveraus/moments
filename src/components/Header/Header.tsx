import styles from './Header.module.css';
import type { SiteConfig } from '../../types';

interface HeaderProps {
  site: SiteConfig;
  sortOrder: 'newest' | 'oldest';
  onSortChange: (order: 'newest' | 'oldest') => void;
  viewMode: 'timeline' | 'universe';
  onViewChange: (mode: 'timeline' | 'universe') => void;
}

export function Header({ site, sortOrder, onSortChange, viewMode, onViewChange }: HeaderProps) {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleText}>{site.title}</h1>
      <p className={styles.titleSub}>{site.subtitle}</p>
      <div className={styles.socialRow}>
        {site.social.github && (
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        )}
        {site.social.twitter && (
          <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        )}
        {site.social.telegram && (
          <a href={site.social.telegram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        )}
        {site.social.email && (
          <a href={`mailto:${site.social.email}`} className={styles.socialLink}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        )}
      </div>

      {/* View mode toggle */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${viewMode === 'timeline' ? styles.active : ''}`}
          onClick={() => onViewChange('timeline')}
        >
          时间线
        </button>
        <button
          className={`${styles.viewBtn} ${viewMode === 'universe' ? styles.active : ''}`}
          onClick={() => onViewChange('universe')}
        >
          票根宇宙
        </button>
      </div>

      {/* Sort toggle - only in timeline mode */}
      {viewMode === 'timeline' && (
        <div className={styles.sortToggle}>
          <button
            className={`${styles.sortBtn} ${sortOrder === 'newest' ? styles.active : ''}`}
            onClick={() => onSortChange('newest')}
          >
            最新
          </button>
          <button
            className={`${styles.sortBtn} ${sortOrder === 'oldest' ? styles.active : ''}`}
            onClick={() => onSortChange('oldest')}
          >
            最早
          </button>
        </div>
      )}
    </div>
  );
}
