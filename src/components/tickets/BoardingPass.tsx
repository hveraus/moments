import styles from './BoardingPass.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

/** 厦门航空白鹭 logo SVG（白色，用于深色背景） */
function EgretLogo() {
  return (
    <svg viewBox="0 0 76 38" width="76" height="38" className={styles.egretSvg}>
      {/* 左翼（后翼）上表面 */}
      <path d="M 30,17 C 22,11 12,6 2,5 C 11,8 21,12 28,17 Z" fill="white"/>
      {/* 左翼下表面 */}
      <path d="M 30,19 C 21,19 11,22 4,28 C 12,23 22,21 29,20 Z" fill="white"/>
      {/* 机身 */}
      <path d="M 27,15 C 33,10 41,9 46,12 C 49,14 49,19 45,21 C 39,23 31,22 28,18 Z" fill="white"/>
      {/* 尾羽 */}
      <path d="M 29,19 C 21,20 13,22 5,27 C 13,23 22,21 29,20 Z" fill="white" opacity="0.85"/>
      {/* 右翼（前翼）上表面 */}
      <path d="M 44,12 C 51,7 58,4 66,3 C 59,6 52,9 45,13 Z" fill="white"/>
      {/* 右翼下表面 */}
      <path d="M 44,13 C 53,12 61,11 68,15 C 60,13 52,13 45,14 Z" fill="white"/>
      {/* 颈部 */}
      <path d="M 45,11 C 52,7 59,4 65,4 C 59,7 53,10 46,12 Z" fill="white"/>
      {/* 头部 */}
      <ellipse cx="67" cy="4" rx="4.5" ry="3" transform="rotate(-12,67,4)" fill="white"/>
      {/* 喙 */}
      <path d="M 70,3.5 L 77,1.5 L 77,4 L 70,5 Z" fill="white"/>
    </svg>
  );
}

/** "蓝色旋律" 四条波浪曲线装饰 */
function BlueWaves() {
  return (
    <svg className={styles.waves} viewBox="0 0 340 14" preserveAspectRatio="none">
      <path d="M0,7 C60,1 120,13 180,7 C240,1 300,13 340,7"
        stroke="#4a90d9" strokeWidth="2.2" fill="none" opacity="0.9"/>
      <path d="M0,9 C60,3 120,15 180,9 C240,3 300,15 340,9"
        stroke="#529FC9" strokeWidth="1.8" fill="none" opacity="0.75"/>
      <path d="M0,11 C60,5 120,17 180,11 C240,5 300,17 340,11"
        stroke="#244584" strokeWidth="1.4" fill="none" opacity="0.55"/>
      <path d="M0,5 C60,-1 120,11 180,5 C240,-1 300,11 340,5"
        stroke="#7ab8e8" strokeWidth="1.2" fill="none" opacity="0.6"/>
    </svg>
  );
}

/** 条形码 SVG */
function Barcode() {
  const pattern = [3,1,2,1,3,2,1,2,1,3,1,1,2,1,1,3,2,1,1,2,3,1,2,1,1,2,1,3,1,2,1,1,3,2,1];
  let x = 0;
  const bars: { x: number; w: number; fill: string }[] = [];
  pattern.forEach((w, i) => {
    bars.push({ x, w, fill: i % 2 === 0 ? '#111' : 'white' });
    x += w * 2;
  });
  const total = x;
  return (
    <svg viewBox={`0 0 ${total} 36`} className={styles.barcode} preserveAspectRatio="none">
      <rect width={total} height="36" fill="white"/>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w * 2} height="36" fill={b.fill}/>
      ))}
    </svg>
  );
}

export function BoardingPass({ data }: TicketComponentProps) {
  return (
    <div className={styles.pass}>

      {/* ═══ 主联（左侧 2/3） ═══ */}
      <div className={styles.main}>

        {/* 顶部深蓝 header */}
        <div className={styles.header}>
          <div className={styles.logoGroup}>
            <EgretLogo />
            <div className={styles.airlineName}>
              <div className={styles.airlineCn}>厦门航空</div>
              <div className={styles.airlineEn}>XIAMENAIR</div>
            </div>
          </div>
          <div className={styles.boardingPassLabel}>
            <div className={styles.bpEn}>BOARDING PASS</div>
            <div className={styles.bpCn}>登机牌</div>
          </div>
        </div>

        {/* 蓝色旋律波浪 */}
        <BlueWaves />

        {/* 旅客姓名 */}
        <div className={styles.body}>
          <div className={styles.fieldGroup}>
            <div className={styles.label}>旅客姓名 PASSENGER NAME</div>
            <div className={styles.passengerName}>{data.passengerName}</div>
          </div>

          {/* 航线 */}
          <div className={styles.routeRow}>
            <div className={styles.cityBlock}>
              <div className={styles.iata}>{data.from}</div>
              <div className={styles.cityName}>{data.fromCity}</div>
            </div>
            <div className={styles.routeCenter}>
              <div className={styles.flightLabel}>{data.flight}</div>
              <div className={styles.routeArrow}>
                <svg viewBox="0 0 80 12" className={styles.arrowSvg}>
                  <line x1="0" y1="6" x2="72" y2="6" stroke="#244584" strokeWidth="1.5"/>
                  <polygon points="72,2 80,6 72,10" fill="#244584"/>
                </svg>
              </div>
            </div>
            <div className={`${styles.cityBlock} ${styles.cityRight}`}>
              <div className={styles.iata}>{data.to}</div>
              <div className={styles.cityName}>{data.toCity}</div>
            </div>
          </div>

          {/* 详情网格 */}
          <div className={styles.grid}>
            <div className={styles.gridCell}>
              <div className={styles.label}>日期 DATE</div>
              <div className={styles.value}>{data.date}</div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.label}>起飞 DEPART</div>
              <div className={styles.value}>{data.departTime}</div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.label}>登机 BOARDING</div>
              <div className={styles.value}>{data.boardingTime}</div>
            </div>
            <div className={styles.gridCell}>
              <div className={styles.label}>舱位 CLASS</div>
              <div className={styles.value}>{data.classLabel}（{data.class}）</div>
            </div>
          </div>
        </div>

        {/* 条形码区域 */}
        <div className={styles.barcodeRow}>
          <Barcode />
          <div className={styles.barcodeText}>{data.bookingRef}</div>
        </div>
      </div>

      {/* ═══ 虚线分隔 ═══ */}
      <div className={styles.separator}>
        <div className={styles.circleTop} />
        <div className={styles.circleBottom} />
      </div>

      {/* ═══ 副联（右侧 tear-off） ═══ */}
      <div className={styles.stub}>
        <div className={styles.stubHeader}>
          <EgretLogo />
        </div>
        <div className={styles.stubBody}>
          <div className={styles.stubFlight}>{data.flight}</div>
          <div className={styles.stubRoute}>{data.from} → {data.to}</div>
          <div className={styles.stubDate}>{data.date}</div>
          <div className={styles.stubDivider} />
          <div className={styles.stubField}>
            <div className={styles.label}>座位 SEAT</div>
            <div className={styles.stubSeat}>{data.seat}</div>
          </div>
          <div className={styles.stubField}>
            <div className={styles.label}>登机口 GATE</div>
            <div className={styles.stubGate}>{data.gate}</div>
          </div>
          <div className={styles.stubField}>
            <div className={styles.label}>登机时间</div>
            <div className={styles.stubTime}>{data.boardingTime}</div>
          </div>
          <div className={styles.stubField}>
            <div className={styles.label}>序号 SEQ</div>
            <div className={styles.stubSeq}>{data.sequenceNo}</div>
          </div>
        </div>
      </div>

    </div>
  );
}
