import React from 'react';
import { TrainTicket } from './components/tickets/TrainTicket';
import { TempleTicket } from './components/tickets/TempleTicket';
import { MuseumTicket } from './components/tickets/MuseumTicket';
import { Certificate } from './components/tickets/Certificate';
import { RopewayTicket } from './components/tickets/RopewayTicket';
import { BoatTicket } from './components/tickets/BoatTicket';
import { TransitCard } from './components/tickets/TransitCard';
import { DisneyTicket } from './components/tickets/DisneyTicket';
import { CRHTicket } from './components/tickets/CRHTicket';
import { BoardingPass } from './components/tickets/BoardingPass';

type TemplateEntry = {
  id: string;
  label: string;
  desc: string;
  component: React.ComponentType<{ data: Record<string, string> }>;
  data: Record<string, string>;
};

// ── 每种模板的示例数据 ──────────────────────────────────────────
const TEMPLATES: TemplateEntry[] = [
  {
    id: 'train-ticket',
    label: '火车票 / 地铁票',
    desc: '适合高铁、普通列车、地铁等轨道交通',
    component: TrainTicket,
    data: {
      ticketNo: 'G1234',
      trainName: '京沪高速铁路',
      trainNameEn: 'Beijing–Shanghai HSR',
      from: '北京南',
      to: '上海虹桥',
      date: '2026-02-14',
      time: '09:00',
      car: '05车',
      seat: '12A',
      price: '¥553',
    },
  },
  {
    id: 'museum-ticket',
    label: '博物馆票 / 景区票',
    desc: '适合博物馆、主题园区、历史遗址等',
    component: MuseumTicket,
    data: {
      museumName: '故宫博物院',
      museumNameEn: 'The Palace Museum',
      type: '参观票',
      typeEn: 'General Admission',
      category: '成人',
      price: '¥60',
      date: '2026-01-20',
      time: '08:30 - 17:00',
      ticketNo: 'No. GG-20260120-00188',
    },
  },
  {
    id: 'temple-ticket',
    label: '寺庙祈福票',
    desc: '适合寺庙、神社、宗教场所参拜记录',
    component: TempleTicket,
    data: {
      templeName: '清水寺',
      templeNameEn: 'Kiyomizudera',
      type: '参拜券',
      typeEn: 'Admission',
      price: '¥300',
      date: '2025-04-05',
      blessing: '祈愿平安吉祥',
    },
  },
  {
    id: 'ropeway-ticket',
    label: '缆车票',
    desc: '适合山地缆车、索道、观光电梯',
    component: RopewayTicket,
    data: {
      name: '黄山北海索道',
      nameEn: 'Huangshan North Sea Ropeway',
      type: '往返票',
      typeEn: 'Round Trip',
      category: '成人',
      price: '¥140',
      date: '2026-01-15',
      time: '08:00 - 17:00',
      ticketNo: 'No. HS-20260115-05521',
    },
  },
  {
    id: 'boat-ticket',
    label: '船票 / 游轮票',
    desc: '适合游船、渡轮、轮渡等水上交通',
    component: BoatTicket,
    data: {
      boatName: '维多利亚号',
      boatNameEn: 'MV Victoria',
      route: '香港 → 澳门',
      flag: '🇭🇰',
      date: '2025-12-28',
      time: '10:30',
      ticketNo: 'No. TF-20251228-0042',
      price: 'HK$180',
    },
  },
  {
    id: 'transit-card',
    label: '交通卡 / 地铁卡',
    desc: '适合城市一日票、旅游卡、交通储值卡',
    component: TransitCard,
    data: {
      systemName: 'Bangkok BTS',
      systemNameLocal: 'รถไฟฟ้า BTS',
      type: 'One Day Pass',
      typeLocal: 'บัตรเดินทาง 1 วัน',
      price: '฿140',
      date: '2024-12-20',
      validUntil: '2024-12-20',
      cardNo: 'No. BTS-20241220-8871',
    },
  },
  {
    id: 'disney-ticket',
    label: '迪士尼票',
    desc: '适合迪士尼乐园及同风格主题园区（支持 imageUrl 字段换大图）',
    component: DisneyTicket,
    data: {
      parkName: '上海迪士尼乐园',
      parkNameEn: 'SHANGHAI DISNEYLAND',
      area: '梦幻世界',
      areaEn: 'FANTASYLAND',
      imageUrl: '/disney-10th.jpg',
      type: '一日票',
      category: '儿童',
      price: '¥399',
      date: '2026-02-14',
      ticketNo: 'No. SDL-20260214-08832',
    },
  },
  {
    id: 'boarding-pass',
    label: '厦门航空登机牌',
    desc: '仿真厦门航空 MF 登机牌，含白鹭 Logo、蓝色旋律波纹、条形码、副联撕票存根',
    component: BoardingPass,
    data: {
      passengerName: 'ZHANG SAN / MR',
      from: 'HGH',
      fromCity: '杭州萧山',
      to: 'SIN',
      toCity: '新加坡樟宜',
      flight: 'MF8300',
      date: '2026-03-20',
      gate: 'B12',
      seat: '34A',
      class: 'Y',
      classLabel: '经济舱',
      boardingTime: '09:30',
      departTime: '10:30',
      sequenceNo: '088',
      bookingRef: 'ABCD1234567',
    },
  },
  {
    id: 'crh-ticket',
    label: '高铁纸质票',
    desc: '仿真中国铁路磁卡车票，含速度线背景、二维码、底部蓝条',
    component: CRHTicket,
    data: {
      ticketNo: '192J093984',
      gate: 'A27',
      from: '郑州东',
      fromEn: 'Zhengzhoudong',
      trainNo: 'G1925',
      to: '西安北',
      toEn: "Xi`anbei",
      date: '2017年06月06日',
      time: '16:46',
      car: '03',
      seat: '04D',
      price: '¥239.0',
      channel: '网',
      seatType: '二等座',
      idNo: '14041111985****0854',
      name: '李小二',
      barcode: '65773311920607J093984',
    },
  },
  {
    id: 'certificate',
    label: '荣誉证书',
    desc: '适合获奖记录、纪念认证、荣誉证明',
    component: Certificate,
    data: {
      title: '公主认证书',
      titleEn: 'Princess Certificate',
      shrine: '奇妙仙子美发沙龙',
      shrineEn: 'Bibbidi Bobbidi Boutique',
      date: '二〇二六年二月十四日',
      dateWestern: '2026-02-14',
      message: '特此认证，已正式加冕成为迪士尼小公主，愿永远保持善良与勇气。',
    },
  },
];

export function TicketGallery() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0ece4',
      padding: '48px 32px',
      fontFamily: "'Noto Sans SC', sans-serif",
    }}>
      {/* 页头 */}
      <div style={{ maxWidth: 960, margin: '0 auto 48px' }}>
        <h1 style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#1e1508',
          marginBottom: 8,
          fontFamily: "'LXGW WenKai', serif",
        }}>
          票根样式库
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#8a7a68', lineHeight: 1.7 }}>
          所有可用模板一览，写日记时在 <code style={{
            background: 'rgba(0,0,0,0.07)', borderRadius: 4, padding: '1px 6px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem',
          }}>template:</code> 字段填入左侧灰色编号即可。
        </p>
      </div>

      {/* 票根列表 */}
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {TEMPLATES.map(({ id, label, desc, component: Comp, data }) => (
          <div key={id}>
            {/* 标题行 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <code style={{
                background: '#2c2416',
                color: '#f0c060',
                borderRadius: 6,
                padding: '3px 10px',
                fontSize: '0.82rem',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.03em',
                flexShrink: 0,
              }}>{id}</code>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1e1508' }}>{label}</span>
              <span style={{ fontSize: '0.82rem', color: '#9a8a78' }}>{desc}</span>
            </div>

            {/* 票根预览 */}
            <div style={{
              background: 'rgba(255,255,255,0.45)',
              borderRadius: 16,
              padding: '32px 24px',
              border: '1px solid rgba(180,160,120,0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              <Comp data={data} />
            </div>
          </div>
        ))}
      </div>

      {/* 页脚 */}
      <p style={{
        textAlign: 'center',
        marginTop: 64,
        fontSize: '0.75rem',
        color: '#c0b0a0',
      }}>
        Moments in Light · 票根样式库
      </p>
    </div>
  );
}
