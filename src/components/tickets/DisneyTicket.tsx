import styles from './DisneyTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

export function DisneyTicket({ data }: TicketComponentProps) {
  const hasImage = Boolean(data.imageUrl);

  return (
    <div className={styles.ticket}>
      {/* 顶部横幅 */}
      <div className={styles.header}>
        <span className={styles.headerText}>ADMIT ONE GUEST</span>
      </div>

      {/* 品牌区 */}
      <div className={styles.brand}>
        <div className={styles.parkEn}>{data.parkNameEn ?? 'SHANGHAI DISNEYLAND'}</div>
        <div className={styles.parkCn}>{data.parkName ?? '上海迪士尼乐园'}</div>
        {data.area && (
          <div className={styles.areaLabel}>
            {data.areaEn} · {data.area}
          </div>
        )}
      </div>

      {/* 主图区：真实照片 or CSS 城堡场景 */}
      {hasImage ? (
        <div className={styles.photoArea}>
          <img src={data.imageUrl} alt={data.parkName} className={styles.photo} />
        </div>
      ) : (
        <div className={styles.scene}>
          {/* 天空渐变 */}
          <div className={styles.sky} />
          {/* 月亮 */}
          <div className={styles.moon} />
          {/* 星星 × 14 */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className={styles.star}
              style={{
                '--i': i,
                '--x': `${6 + (i * 73 + 11) % 86}%`,
                '--y': `${4 + (i * 37 + 7) % 56}%`,
              } as React.CSSProperties}
            />
          ))}
          {/* 烟花 × 3 */}
          <div className={`${styles.firework} ${styles.fw1}`} />
          <div className={`${styles.firework} ${styles.fw2}`} />
          <div className={`${styles.firework} ${styles.fw3}`} />

          {/* 城堡整体 */}
          <div className={styles.castleWrap}>
            {/* 远景小塔 (最左) */}
            <div className={`${styles.tinyTower} ${styles.tinyL2}`}>
              <div className={`${styles.tinySpire} ${styles.tinySpire2}`} />
            </div>
            {/* 左侧翼塔 */}
            <div className={`${styles.wingTower} ${styles.wingL}`}>
              <div className={styles.wingWindow} />
              <div className={styles.wingSpire} />
            </div>
            {/* 主塔主体 */}
            <div className={styles.mainTower}>
              {/* 主塔窗口排 */}
              <div className={styles.mainWindows}>
                <div className={styles.mainWin} />
                <div className={`${styles.mainWin} ${styles.mainWinCenter}`} />
                <div className={styles.mainWin} />
              </div>
              {/* 主塔时钟圆花窗 */}
              <div className={styles.roseWindow} />
              {/* 主塔门洞拱廊 */}
              <div className={styles.archRow}>
                <div className={styles.arch} />
                <div className={`${styles.arch} ${styles.archCenter}`} />
                <div className={styles.arch} />
              </div>
              {/* 主塔上方塔尖群 */}
              <div className={styles.spireGroup}>
                <div className={`${styles.subSpire} ${styles.subSpireL}`} />
                <div className={styles.mainSpire} />
                <div className={`${styles.subSpire} ${styles.subSpireR}`} />
              </div>
            </div>
            {/* 右侧翼塔 */}
            <div className={`${styles.wingTower} ${styles.wingR}`}>
              <div className={styles.wingWindow} />
              <div className={styles.wingSpire} />
            </div>
            {/* 远景小塔 (最右) */}
            <div className={`${styles.tinyTower} ${styles.tinyR2}`}>
              <div className={`${styles.tinySpire} ${styles.tinySpire2}`} />
            </div>
          </div>

          {/* 地面草坡 */}
          <div className={styles.ground} />
          {/* 水面倒影 */}
          <div className={styles.water}>
            <div className={styles.waterReflect} />
          </div>
        </div>
      )}

      {/* 虚线分割 */}
      <div className={styles.divider} />

      {/* 底部信息 */}
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <span className={styles.typeLabel}>{data.type}</span>
          {data.category && <span className={styles.categoryBadge}>{data.category}</span>}
          <span className={styles.price}>{data.price}</span>
        </div>
        <div className={styles.dateRow}>{data.date}</div>
        <div className={styles.ticketNo}>{data.ticketNo}</div>
      </div>
    </div>
  );
}
