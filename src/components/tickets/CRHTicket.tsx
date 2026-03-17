import styles from './CRHTicket.module.css';
import type { TicketComponentProps } from '../../utils/ticketRegistry';

/** 简化版二维码 SVG，仅作视觉效果 */
function QRPlaceholder() {
  const dots: [number, number][] = [
    // 数据区模拟点阵
    [7,1],[9,1],[8,2],[10,2],[7,3],[10,3],[8,4],
    [7,5],[9,5],[10,5],[7,6],[10,6],
    // 右侧列
    [11,7],[13,7],[15,7],[12,8],[14,8],[16,8],
    [11,9],[13,9],[15,9],[12,10],[16,10],
    [11,11],[13,11],[15,11],[12,12],[14,12],
    [11,13],[14,13],[16,13],[12,14],[15,14],
    [11,15],[13,15],[16,15],
    // 下方数据区
    [7,11],[9,11],[8,12],[10,12],[7,13],[9,13],[10,13],
    [8,14],[7,15],[10,15],
    // 定位辅助
    [1,7],[3,7],[5,7],[1,9],[3,9],[5,9],
  ];

  return (
    <svg
      width="51" height="51"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.qr}
    >
      <rect width="18" height="18" fill="white"/>
      {/* 左上角定位图案 */}
      <rect x="1" y="1" width="5" height="5" fill="#111"/>
      <rect x="2" y="2" width="3" height="3" fill="white"/>
      <rect x="3" y="3" width="1" height="1" fill="#111"/>
      {/* 右上角定位图案 */}
      <rect x="12" y="1" width="5" height="5" fill="#111"/>
      <rect x="13" y="2" width="3" height="3" fill="white"/>
      <rect x="14" y="3" width="1" height="1" fill="#111"/>
      {/* 左下角定位图案 */}
      <rect x="1" y="12" width="5" height="5" fill="#111"/>
      <rect x="2" y="13" width="3" height="3" fill="white"/>
      <rect x="3" y="14" width="1" height="1" fill="#111"/>
      {/* 时序图案 */}
      <rect x="7" y="6" width="1" height="1" fill="#111"/>
      <rect x="6" y="7" width="1" height="1" fill="#111"/>
      <rect x="8" y="7" width="1" height="1" fill="#111"/>
      <rect x="7" y="8" width="1" height="1" fill="#111"/>
      {/* 数据点 */}
      {dots.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="#111"/>
      ))}
    </svg>
  );
}

export function CRHTicket({ data }: TicketComponentProps) {
  return (
    <div className={styles.ticket}>
      {/* 右侧速度线纹理 */}
      <div className={styles.speedLines} aria-hidden="true" />

      {/* 第1行：票号 + 检票口 */}
      <div className={styles.row1}>
        <span className={styles.ticketNo}>{data.ticketNo}</span>
        <span className={styles.gate}>检票:{data.gate}</span>
      </div>

      {/* 第2行：始发站 · 车次 · 终到站 */}
      <div className={styles.stationRow}>
        <div className={styles.stationL}>
          <div className={styles.stationNameRow}>
            <span className={styles.stationName}>{data.from}</span>
            <span className={styles.zhan}>站</span>
          </div>
          <div className={styles.pinyin}>{data.fromEn}</div>
        </div>

        <div className={styles.trainNo}>{data.trainNo}</div>

        <div className={styles.stationR}>
          <div className={styles.stationNameRow}>
            <span className={styles.stationName}>{data.to}</span>
            <span className={styles.zhan}>站</span>
          </div>
          <div className={styles.pinyin}>{data.toEn}</div>
        </div>
      </div>

      {/* 第3行：日期时间 + 车厢座位 */}
      <div className={styles.row3}>
        <span>{data.date} {data.time}开</span>
        <span>{data.car}车{data.seat}号</span>
      </div>

      {/* 第4行：票价 + 渠道 + 席别 */}
      <div className={styles.row4}>
        <span>{data.price}元</span>
        <span>{data.channel ?? '网'}</span>
        <span>{data.seatType}</span>
      </div>

      {/* 第5行：限乘说明 */}
      <div className={styles.restriction}>限乘当日当次车</div>

      {/* 第6行：乘客信息 + 广告框 + 二维码 */}
      <div className={styles.passengerRow}>
        <div className={styles.passengerLeft}>
          <div className={styles.idName}>
            {data.idNo}&nbsp;&nbsp;{data.name}
          </div>
          <div className={styles.adBox}>
            <div>买票请到12306 发货请到95306</div>
            <div>中国铁路祝你旅途愉快</div>
          </div>
        </div>
        <QRPlaceholder />
      </div>

      {/* 底部蓝条 */}
      <div className={styles.bottomBar}>
        <span className={styles.barcodeNo}>{data.barcode}</span>
        <span>{data.from}售</span>
      </div>
    </div>
  );
}
