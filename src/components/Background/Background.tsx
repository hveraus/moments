import styles from './Background.module.css';

interface BackgroundProps {
  theme: 'night' | 'day';
}

export function Background({ theme }: BackgroundProps) {
  return (
    <div className={styles.background}>
      {theme === 'night' ? <NightSky /> : <DayOcean />}
      {/* Subtle grain texture */}
      <div className={styles.grain} />
    </div>
  );
}

function NightSky() {
  return (
    <>
      {/* Deep ocean-night sky gradient */}
      <div className={styles.nightBase} />

      {/* Aurora / nebula glows */}
      <div className={`${styles.aurora} ${styles.aurora1}`} />
      <div className={`${styles.aurora} ${styles.aurora2}`} />
      <div className={`${styles.aurora} ${styles.aurora3}`} />
      <div className={`${styles.aurora} ${styles.aurora4}`} />

      {/* Stars — mix of sizes */}
      <div className={styles.stars}>
        {/* Tiny dim stars */}
        <div className={`${styles.star} ${styles.starTiny} ${styles.st1}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st4}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st7}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st9}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st14}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st16}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st20}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st23}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st26}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st28}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st33}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st37}`} />
        <div className={`${styles.star} ${styles.starTiny} ${styles.st39}`} />

        {/* Small twinkling stars */}
        <div className={`${styles.star} ${styles.starSmall} ${styles.st2} ${styles.d1}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st5} ${styles.d3}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st8} ${styles.d5}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st12} ${styles.d2}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st18} ${styles.d7}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st21} ${styles.d4}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st24} ${styles.d6}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st29} ${styles.d1}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st31} ${styles.d8}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st34} ${styles.d3}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st38} ${styles.d5}`} />
        <div className={`${styles.star} ${styles.starSmall} ${styles.st40} ${styles.d2}`} />

        {/* Medium stars */}
        <div className={`${styles.star} ${styles.starMed} ${styles.st3} ${styles.d2}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st6} ${styles.d6}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st11} ${styles.d4}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st15} ${styles.d1}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st19} ${styles.d7}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st22} ${styles.d3}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st25} ${styles.d8}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st30} ${styles.d5}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st35} ${styles.d2}`} />
        <div className={`${styles.star} ${styles.starMed} ${styles.st36} ${styles.d6}`} />

        {/* Bright stars with glow */}
        <div className={`${styles.star} ${styles.starBright} ${styles.st10} ${styles.d1}`} />
        <div className={`${styles.star} ${styles.starBright} ${styles.st13} ${styles.d4}`} />
        <div className={`${styles.star} ${styles.starBright} ${styles.st17} ${styles.d7}`} />
        <div className={`${styles.star} ${styles.starBright} ${styles.st27} ${styles.d3}`} />
        <div className={`${styles.star} ${styles.starBright} ${styles.st32} ${styles.d6}`} />
      </div>

      {/* Shooting stars */}
      <div className={`${styles.shootingStar} ${styles.shootingStar1}`} />
      <div className={`${styles.shootingStar} ${styles.shootingStar2}`} />

      {/* Ocean waves at the bottom */}
      <svg className={`${styles.oceanWave} ${styles.waveNight1}`} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 120 Q60 80 140 110 Q220 60 340 100 Q420 50 520 90 Q620 40 720 80 Q800 50 900 90 Q1000 60 1100 100 Q1200 70 1300 95 Q1380 80 1440 100 L1440 200 Z" />
      </svg>
      <svg className={`${styles.oceanWave} ${styles.waveNight2}`} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 150 Q100 130 200 145 Q300 120 400 140 Q500 125 600 142 Q700 128 800 140 Q900 130 1000 145 Q1100 135 1200 148 Q1300 138 1440 150 L1440 200 Z" />
      </svg>
    </>
  );
}

function DayOcean() {
  return (
    <>
      {/* Bright sky gradient */}
      <div className={styles.dayBase} />

      {/* Sun with glow */}
      <div className={styles.sun} />
      <div className={styles.sunRays} />

      {/* Fluffy clouds */}
      <div className={`${styles.cloud} ${styles.cloud1}`}>
        <div className={styles.cloudBody} />
      </div>
      <div className={`${styles.cloud} ${styles.cloud2}`}>
        <div className={styles.cloudBody} />
      </div>
      <div className={`${styles.cloud} ${styles.cloud3}`}>
        <div className={styles.cloudBody} />
      </div>
      <div className={`${styles.cloud} ${styles.cloud4}`}>
        <div className={styles.cloudBody} />
      </div>

      {/* Light sparkles on water */}
      <div className={styles.waterSparkles}>
        <div className={`${styles.waterSparkle} ${styles.ws1}`} />
        <div className={`${styles.waterSparkle} ${styles.ws2}`} />
        <div className={`${styles.waterSparkle} ${styles.ws3}`} />
        <div className={`${styles.waterSparkle} ${styles.ws4}`} />
        <div className={`${styles.waterSparkle} ${styles.ws5}`} />
        <div className={`${styles.waterSparkle} ${styles.ws6}`} />
        <div className={`${styles.waterSparkle} ${styles.ws7}`} />
        <div className={`${styles.waterSparkle} ${styles.ws8}`} />
      </div>


      {/* Ocean waves — daytime */}
      <svg className={`${styles.oceanWave} ${styles.waveDay1}`} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 100 Q80 60 180 90 Q280 40 380 80 Q480 30 580 70 Q680 20 780 65 Q880 35 980 75 Q1080 45 1180 80 Q1280 55 1380 85 Q1420 75 1440 80 L1440 200 Z" />
      </svg>
      <svg className={`${styles.oceanWave} ${styles.waveDay2}`} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 130 Q100 105 200 125 Q300 95 400 120 Q500 100 600 118 Q700 95 800 115 Q900 100 1000 122 Q1100 108 1200 125 Q1300 112 1440 130 L1440 200 Z" />
      </svg>
      <svg className={`${styles.oceanWave} ${styles.waveDay3}`} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 155 Q120 140 240 150 Q360 135 480 148 Q600 138 720 150 Q840 140 960 152 Q1080 142 1200 150 Q1320 145 1440 155 L1440 200 Z" />
      </svg>
    </>
  );
}
