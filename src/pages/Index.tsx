import { useState, useCallback, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const useSound = () => {
  type AC = typeof AudioContext;
  const ctx = useCallback(() => new ((window.AudioContext || (window as Window & { webkitAudioContext?: AC }).webkitAudioContext) as AC)(), []);

  const playSkip = useCallback(() => {
    const ac = ctx();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = "square";
    o.frequency.setValueAtTime(800, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(1400, ac.currentTime + 0.05);
    o.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.15);
    g.gain.setValueAtTime(0.15, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
    o.start(); o.stop(ac.currentTime + 0.2);
  }, [ctx]);

  const playVote = useCallback(() => {
    const ac = ctx();
    [0, 0.08, 0.16].forEach((t, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = "sine";
      o.frequency.value = [523, 659, 784][i];
      g.gain.setValueAtTime(0.12, ac.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.25);
      o.start(ac.currentTime + t);
      o.stop(ac.currentTime + t + 0.25);
    });
  }, [ctx]);

  const playNav = useCallback(() => {
    const ac = ctx();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(440, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(660, ac.currentTime + 0.06);
    g.gain.setValueAtTime(0.08, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.1);
    o.start(); o.stop(ac.currentTime + 0.1);
  }, [ctx]);

  const playLike = useCallback(() => {
    const ac = ctx();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = "triangle";
    o.frequency.setValueAtTime(300, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.08);
    g.gain.setValueAtTime(0.1, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    o.start(); o.stop(ac.currentTime + 0.12);
  }, [ctx]);

  const playJoin = useCallback(() => {
    const ac = ctx();
    const freqs = [523, 659, 784, 1047];
    freqs.forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = "sine";
      o.frequency.value = f;
      const t = ac.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o.start(t); o.stop(t + 0.3);
    });
  }, [ctx]);

  const playPost = useCallback(() => {
    const ac = ctx();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = "sawtooth";
    o.frequency.setValueAtTime(200, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(100, ac.currentTime + 0.1);
    g.gain.setValueAtTime(0.08, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
    o.start(); o.stop(ac.currentTime + 0.15);
  }, [ctx]);

  return { playSkip, playVote, playNav, playLike, playJoin, playPost };
};

const HERO_IMG = "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/files/a55cc338-1b2f-4e78-939b-cef1794dc018.jpg";

const NAV_ITEMS = ["Главная", "О партии", "Кандидаты", "Новости", "Игры", "Присоединиться", "Форум"];

const NEWS = [
  {
    date: "10 июн 2026",
    tag: "🔥 Срочно",
    title: "YouTube показал 5 реклам подряд. Один из членов партии не выдержал и закрыл вкладку",
    text: "Пострадавший госпитализирован с диагнозом «рекламное истощение». Партия требует компенсации. YouTube не ответил — видимо, показывает нам рекламу вместо ответа.",
  },
  {
    date: "5 июн 2026",
    tag: "📊 Расследование",
    title: "Выяснили: алгоритм YouTube знает о тебе больше, чем твоя мама",
    text: "После одного поиска «как завязать галстук» система рекомендовала курс по ораторскому мастерству, свадебный банкет и юриста по разводам. Мы не понимаем логику, но уважаем уверенность.",
  },
  {
    date: "1 июн 2026",
    tag: "📅 Съезд",
    title: "Первый съезд партии прошёл в формате звонка в Zoom. Никто не смог включить камеру",
    text: "45 минут технических проблем, один случайный вход постороннего человека и одно зависание — и всё равно приняли три резолюции. Эффективность 146%.",
  },
];

const CANDIDATES = [
  {
    id: 1,
    name: "slay4",
    role: "Верховный Скипер Рекламы",
    slogan: "«Нажал «пропустить» 12 000 раз. Это опыт, а не проблема»",
    img: "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/bucket/3e7e4726-7680-49dc-a8e6-adf140161b2d.jpg",
    program: "Первым делом запрещу рекламу в середине видео. Вторым — посмотрю что из этого выйдет.",
  },
  {
    id: 2,
    name: "Илья Виги",
    role: "Министр Рекомендаций",
    slogan: "«YouTube знает обо мне всё. Пора это исправить — или возглавить»",
    img: "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/bucket/aaaf158d-e200-43f3-b2dc-65d6e5cfc7da.jpg",
    program: "Введу налог на скучные видео длиннее 20 минут. Исключения — по личному заявлению.",
  },
  {
    id: 3,
    name: "kolplayyyyy",
    role: "Главный по Буферизации",
    slogan: "«Видел буферинг в 2026 году. До сих пор в терапии»",
    img: "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/bucket/8ac7d7c5-bc11-4efd-9072-e938252e8314.jpg",
    program: "Обяжу YouTube платить моральную компенсацию за каждую секунду загрузки. Тариф уточняется.",
  },
];

const MANIFESTO = [
  { icon: "SkipForward", text: "Кнопка «Пропустить рекламу» — с первой секунды. Это не переговоры." },
  { icon: "VolumeX", text: "Реклама громче видео — уголовная ответственность. Это зафиксировано." },
  { icon: "Clock", text: "Ролик на 10 минут ради монетизации — расстрел репутации автора." },
  { icon: "Repeat", text: "Автовоспроизведение в 3 ночи — отдельная статья кодекса." },
  { icon: "Zap", text: "Буферизация в 2026 году — это как печатать на машинке в офисе." },
  { icon: "MessageSquareOff", text: "Комментарии «первый» будут скрываться автоматически. Без суда." },
];

interface ForumPost {
  id: number;
  author: string;
  text: string;
  likes: number;
  time: string;
}

const INITIAL_POSTS: ForumPost[] = [
  { id: 1, author: "ПропустилРекламу228", text: "Смотрел ролик 8 минут, из которых 3 — реклама. Это уже не YouTube, это телевизор с претензиями.", likes: 312, time: "2 часа назад" },
  { id: 2, author: "Анонимус_Уставший", text: "YouTube предложил мне рекламу кредита сразу после ролика «как экономить деньги». Алгоритм издевается. Я уверен.", likes: 578, time: "4 часа назад" },
  { id: 3, author: "ДедушкаИнтернет", text: "Внук объяснил про что партия. Поддерживаю. Особенно пункт про комментарии «первый» — я не понимал зачем они, теперь понимаю: незачем.", likes: 447, time: "вчера" },
  { id: 4, author: "БуферизацияНет", text: "Видео грузится 40 секунд, а реклама перед ним — мгновенно. Совпадение? Не думаю.", likes: 891, time: "3 дня назад" },
];

// ===== ИГРА 1: ПРОПУСТИ РЕКЛАМУ =====
const AD_TEXTS = [
  { text: "Устал от рекламы пылесосов? Купи наш пылесос! Теперь с насадкой.", sponsor: "ООО Пылесос-М" },
  { text: "Кредит под 0%!\n\n\n\n\n*0% только в первый час. Далее 999% годовых.", sponsor: "Банк «Добрый»" },
  { text: "Похудей за 3 дня!\nВрач одобрил.\n\n*Врач — это наш офис-менеджер Артём.", sponsor: "Диета PRO" },
  { text: "РАСПРОДАЖА 90%!\n\nБыло: 10₽\nСтало: 1₽\nЭкономия: 9 рублей. Ты богат.", sponsor: "МегаШоп" },
  { text: "Узнай, кто смотрел твою страницу!\n\nСпойлер: никто. Но приложение платное.", sponsor: "СталкерАпп" },
  { text: "ВНИМАНИЕ! Ваш IQ снижается с каждой просмотренной рекламой.\n\nЭто тоже реклама.", sponsor: "Партия Новый Ютуб" },
  { text: "Заработай 300 000₽ в месяц не выходя из дома!\n\nПросто отдай нам 50 000₽ на обучение.", sponsor: "БизнесГуру" },
];

function SkipAdGame() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [skipped, setSkipped] = useState(0);
  const [watched, setWatched] = useState(0);
  const [adIdx, setAdIdx] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 85, y: 80 });
  const [shake, setShake] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showAd = () => {
    setAdIdx(Math.floor(Math.random() * AD_TEXTS.length));
    const sec = 3 + Math.floor(Math.random() * 4);
    setCountdown(sec);
    setVisible(true);
    setBtnPos({ x: 85, y: 80 });
  };

  useEffect(() => {
    if (!visible) return;
    timerRef.current = setInterval(() => {
      setCountdown(c => { if (c <= 1) { clearInterval(timerRef.current!); return 0; } return c - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [visible]);

  const skip = () => { setSkipped(s => s + 1); setVisible(false); };
  const watchFull = () => { setWatched(w => w + 1); setVisible(false); };

  const trySkip = () => {
    if (countdown === 0) { skip(); return; }
    setShake(true);
    setBtnPos({ x: 5 + Math.random() * 80, y: 10 + Math.random() * 75 });
    setTimeout(() => setShake(false), 300);
  };

  const ad = AD_TEXTS[adIdx];

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">📺</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Тренажёр скипера</h3>
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-white/40">⚡ Скипнул: <span className="text-green-400 font-bold">{skipped}</span></span>
        <span className="text-white/40">😔 Досмотрел: <span className="text-[#ff0000] font-bold">{watched}</span></span>
        {watched > 2 && <span className="text-yellow-500/60 text-[10px] italic">ты слабак</span>}
      </div>

      {!visible ? (
        <button onClick={showAd} className="w-full py-3 bg-[#ff0000] hover:bg-[#cc0000] text-white font-oswald tracking-widest uppercase text-sm transition-all">
          ▶ Включить рекламу
        </button>
      ) : (
        <div className="relative bg-[#111] border border-white/20 overflow-hidden" style={{ minHeight: 180 }}>
          <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-white/10">
            <span className="text-[10px] text-white/30 font-oswald uppercase tracking-widest">Реклама</span>
            <span className="text-[10px] text-white/50 font-oswald">{ad.sponsor}</span>
          </div>
          <p className="text-white/80 text-sm whitespace-pre-line p-4 pb-10">{ad.text}</p>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-black/40">
            <button onClick={watchFull} className="text-[10px] text-white/20 hover:text-white/40 font-oswald uppercase tracking-widest transition-colors">
              досмотреть
            </button>
            <div className="flex items-center gap-2">
              {countdown === 0 && (
                <div className="h-1.5 w-12 bg-white/10">
                  <div className="h-full bg-[#ff0000] w-full" />
                </div>
              )}
              <button
                onClick={trySkip}
                style={countdown > 0 ? { position: "absolute", left: `${btnPos.x}%`, bottom: `${btnPos.y / 4}%` } : {}}
                className={`px-3 py-1.5 text-xs font-oswald uppercase tracking-widest transition-all ${shake ? "scale-90" : ""} ${
                  countdown === 0 ? "bg-white/25 hover:bg-white/40 text-white cursor-pointer relative" : "bg-white/5 text-white/30 cursor-pointer"
                }`}
              >
                {countdown > 0 ? `▶▶ ${countdown}с` : "▶▶ Пропустить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== ИГРА 2: УБЕЙ БУФЕРИНГ =====
function BufferGame() {
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [active, setActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [circles, setCircles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setScore(0); setMissed(0); setTimeLeft(15); setCircles([]); setCombo(0); setActive(true);
    spawnRef.current = setInterval(() => {
      const id = Date.now();
      const size = 28 + Math.random() * 28;
      setCircles(c => [...c, { id, x: 5 + Math.random() * 82, y: 5 + Math.random() * 80, size }]);
      setTimeout(() => {
        setCircles(c => { const had = c.find(x => x.id === id); if (had) setMissed(m => m + 1); return c.filter(x => x.id !== id); });
      }, 900 + Math.random() * 400);
    }, 600);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(spawnRef.current!); clearInterval(timerRef.current!); setActive(false); return 0; } return t - 1; });
    }, 1000);
  };

  const hit = (id: number) => {
    setCircles(c => c.filter(x => x.id !== id));
    setScore(s => s + 1);
    setCombo(c => c + 1);
    setShowCombo(true);
    setTimeout(() => setShowCombo(false), 600);
  };

  useEffect(() => () => { clearInterval(spawnRef.current!); clearInterval(timerRef.current!); }, []);

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">⏳</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Убей буферинг</h3>
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-white/40">💀 Убито: <span className="text-green-400 font-bold">{score}</span></span>
        <span className="text-white/40">😤 Сбежало: <span className="text-[#ff0000] font-bold">{missed}</span></span>
        {active && <span className="text-white/40 ml-auto">⏱ {timeLeft}с</span>}
      </div>

      {!active ? (
        <div>
          {score > 0 && (
            <div className="bg-[#111] border border-white/10 p-3 mb-3 text-center">
              <div className="font-oswald text-2xl text-white">{score} / {score + missed}</div>
              <div className="text-xs text-white/30 mt-1">
                {score >= 15 ? "👑 Легенда! YouTube боится тебя" : score >= 8 ? "💪 Неплохо, скипер!" : "😅 Буферинг победил. Пока."}
              </div>
            </div>
          )}
          <button onClick={start} className="w-full py-3 border border-white/20 hover:border-[#ff0000]/60 hover:text-[#ff0000] text-white font-oswald tracking-widest uppercase text-sm transition-all">
            {score > 0 ? "Сыграть ещё" : "Начать охоту"}
          </button>
        </div>
      ) : (
        <div className="relative bg-[#111] border border-white/10 overflow-hidden cursor-crosshair select-none" style={{ height: 180 }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #ff0000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          {showCombo && combo > 1 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 font-oswald text-[#ff0000] text-sm animate-fade-in pointer-events-none">
              x{combo} КОМБО!
            </div>
          )}
          {circles.map(c => (
            <div key={c.id} onClick={() => hit(c.id)}
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.size, height: c.size }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/20 border-t-[#ff0000] animate-spin cursor-pointer hover:scale-110 transition-transform hover:border-t-white z-10"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ===== ИГРА 3: ГЕНЕРАТОР КАНАЛА =====
const CH_PRE = ["Дядя", "Мама", "Проф.", "ТОП-10", "Секретный", "Настоящий", "Официальный", "Анонимный", "Таинственный", "Великий"];
const CH_MID = ["Кулинар", "Лайфхакер", "Финансист", "Психолог", "Астролог", "Геймер", "Историк", "Диетолог", "Философ", "Механик"];
const CH_SUF = ["PRO", "LIVE", "2.0", "Плюс", "EXPERT", "777", "HD", "ULTRA", "vs Все", "| Не фейк"];
const CH_SUBS = ["3 подписчика", "47 подписчиков", "1 подписчик (мама)", "0 подписчиков (пока)", "12 подписчиков и 1 бот"];
const CH_VIDEOS = [
  "КАК Я ПОХУДЕЛ ЗА НОЧЬ (не кликбейт)",
  "ТОП 10 ЛАЙФХАКОВ КОТОРЫЕ ИЗМЕНЯТ ЖИЗНЬ #1",
  "МНЕ НАДО ПОГОВОРИТЬ С ВАМИ... (всё норм)",
  "ВСКРЫЛ МАТРИЦУ. УДАЛЯТ ЧЕРЕЗ 24 ЧАСА",
  "Первое видео на канале. Подписывайтесь.",
];

function ChannelNameGen() {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState("");
  const [video, setVideo] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    setName(`${CH_PRE[~~(Math.random()*CH_PRE.length)]} ${CH_MID[~~(Math.random()*CH_MID.length)]} ${CH_SUF[~~(Math.random()*CH_SUF.length)]}`);
    setSubs(CH_SUBS[~~(Math.random()*CH_SUBS.length)]);
    setVideo(CH_VIDEOS[~~(Math.random()*CH_VIDEOS.length)]);
    setCopied(false); setGenerated(true);
  };
  const copy = () => { navigator.clipboard.writeText(name); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎬</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Твой будущий канал</h3>
      </div>
      <p className="text-xs text-white/40">Генерируем карьеру YouTube-блогера. Бесплатно.</p>

      {generated && (
        <div className="bg-[#111] border border-white/10 p-4 space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white font-oswald text-lg shrink-0">
              {name[0]}
            </div>
            <div>
              <div className="font-oswald text-white text-base tracking-wide">{name}</div>
              <div className="text-[10px] text-white/30">{subs}</div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-2">
            <div className="text-[10px] text-white/20 mb-1 uppercase tracking-widest">Первое видео</div>
            <div className="text-xs text-white/60 italic">"{video}"</div>
          </div>
        </div>
      )}
      <div className="flex gap-2 mt-auto">
        <button onClick={generate} className="flex-1 py-2.5 bg-[#ff0000] hover:bg-[#cc0000] text-white font-oswald tracking-widest uppercase text-xs transition-all">
          {generated ? "Другой канал" : "Создать канал"}
        </button>
        {generated && (
          <button onClick={copy} className="px-4 py-2.5 border border-white/20 hover:border-white/50 text-white text-xs font-oswald uppercase tracking-widest transition-all">
            {copied ? "✓" : "Копировать"}
          </button>
        )}
      </div>
    </div>
  );
}

// ===== ИГРА 4: КАЛЬКУЛЯТОР ЖИЗНИ =====
function TimeLostCalc() {
  const [hours, setHours] = useState(2);
  const [years, setYears] = useState(5);
  const totalHours = hours * 365 * years;
  const days = Math.round(totalHours / 24);
  const movies = Math.round(totalHours / 2);
  const pizza = Math.round(totalHours * 0.5);
  const roasts = [
    days > 300 ? "Это почти год жизни. Поздравляем." : null,
    movies > 1000 ? "Ты мог посмотреть всё кино за историю человечества." : null,
    hours >= 6 ? "Ты смотришь YouTube больше, чем спишь. Это медицинский факт." : null,
    "Но ты всё равно сейчас откроешь YouTube после этого сайта. Мы знаем.",
  ].filter(Boolean);

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🕐</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Сколько жизни украл YouTube</h3>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Часов в день</label>
          <input type="range" min={1} max={16} value={hours} onChange={e => setHours(+e.target.value)}
            className="w-full accent-[#ff0000]" />
          <div className="text-center text-[#ff0000] font-oswald text-lg">{hours}ч</div>
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Лет смотришь</label>
          <input type="range" min={1} max={20} value={years} onChange={e => setYears(+e.target.value)}
            className="w-full accent-[#ff0000]" />
          <div className="text-center text-[#ff0000] font-oswald text-lg">{years}л</div>
        </div>
      </div>
      <div className="bg-[#111] border border-white/10 p-3 space-y-2">
        {[
          { label: "Потеряно дней", val: days, red: true },
          { label: "Можно было посмотреть фильмов", val: movies, red: false },
          { label: "Или съесть пицц", val: pizza, red: false },
        ].map(({ label, val, red }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-white/40">{label}</span>
            <span className={`font-oswald font-bold ${red ? "text-[#ff0000]" : "text-white"}`}>{val.toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-2 space-y-1">
          {roasts.map((r, i) => <p key={i} className="text-[10px] text-white/25 italic">{r}</p>)}
        </div>
      </div>
    </div>
  );
}

// ===== ИГРА 5: УГАДАЙ ДЛИНУ РЕКЛАМЫ =====
function GuessAdLength() {
  const [phase, setPhase] = useState<"idle"|"counting"|"result">("idle");
  const [start, setStart] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [guess, setGuess] = useState(0);
  const TARGET = 5;
  const rafRef = useRef<number>(0);

  const begin = () => { setPhase("counting"); setStart(Date.now()); tick(); };
  const tick = () => { rafRef.current = requestAnimationFrame(() => tick()); };
  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    const el = (Date.now() - start) / 1000;
    setElapsed(el); setGuess(el); setPhase("result");
  };
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const diff = Math.abs(elapsed - TARGET);
  const verdict = diff < 0.3 ? "🏆 ИДЕАЛЬНО! Ты — сам алгоритм!" : diff < 1 ? "💪 Почти! Скипер чувствует время." : diff < 2 ? "🤔 Неплохо, но реклама бы уже закончилась." : "💀 Ты смотришь YouTube слишком мало. Или слишком много.";

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎯</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Угадай 5 секунд рекламы</h3>
      </div>
      <p className="text-xs text-white/40">Нажми старт, отсчитай 5 секунд в уме и нажми стоп. Без читерства.</p>

      {phase === "idle" && (
        <button onClick={begin} className="w-full py-3 border border-white/20 hover:border-[#ff0000]/60 hover:text-[#ff0000] text-white font-oswald tracking-widest uppercase text-sm transition-all">
          ▶ Старт
        </button>
      )}
      {phase === "counting" && (
        <button onClick={stop} className="w-full py-4 bg-[#ff0000] hover:bg-[#cc0000] text-white font-oswald tracking-widest uppercase text-lg transition-all animate-pulse">
          ■ СТОП (сейчас 5 секунд?)
        </button>
      )}
      {phase === "result" && (
        <div className="space-y-3">
          <div className="bg-[#111] border border-white/10 p-4 text-center">
            <div className="text-4xl font-oswald text-white mb-1">{elapsed.toFixed(2)}с</div>
            <div className="text-xs text-white/30">Цель была: {TARGET} секунд</div>
            <div className="text-xs text-white/50 mt-2">{verdict}</div>
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#ff0000] rounded-full transition-all" style={{ width: `${Math.min(100, (elapsed / TARGET) * 100)}%` }} />
            </div>
          </div>
          <button onClick={() => setPhase("idle")} className="w-full py-2.5 border border-white/20 hover:border-white/50 text-white font-oswald tracking-widest uppercase text-xs transition-all">
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

// ===== ИГРА 6: РАНДОМНЫЙ СОВЕТ ОТ ПАРТИИ =====
const TIPS = [
  "Если поставить видео на 2x скорость — реклама тоже ускоряется. Но не исчезает. Мы работаем над этим.",
  "Лайфхак: открой видео в режиме инкогнито. Алгоритм не узнает тебя. Пока.",
  "Совет: если реклама раздражает — вступи в нашу партию. Не поможет, но приятно.",
  "Статистика: 73% пользователей открывают телефон прямо во время рекламы. Ты сейчас тоже хочешь.",
  "Лайфхак дня: просто закрыть YouTube и выйти на улицу. Это не лайфхак, это терапия.",
  "Совет от партии: если видео лагает — подуй на роутер. Не помогает, но успокаивает.",
  "Факт: YouTube Dark Mode изобрели, чтобы ты дольше смотрел ночью. Мы разоблачили заговор.",
  "Хочешь меньше рекламы? Смотри меньше YouTube. Хочешь меньше YouTube? Ты на правильном сайте.",
];

function RandomTip() {
  const [tip, setTip] = useState(TIPS[0]);
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const next = () => {
    setFlipping(true);
    setTimeout(() => {
      const ni = (idx + 1) % TIPS.length;
      setIdx(ni); setTip(TIPS[ni]); setFlipping(false);
    }, 200);
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <h3 className="font-oswald text-lg uppercase tracking-widest text-white">Совет от партии</h3>
      </div>
      <p className="text-xs text-white/40">Бесполезные, но честные советы. {idx + 1} / {TIPS.length}</p>
      <div className={`bg-[#111] border border-white/10 p-4 flex-1 min-h-[80px] flex items-center transition-opacity duration-200 ${flipping ? "opacity-0" : "opacity-100"}`}>
        <p className="text-white/70 text-sm leading-relaxed italic">"{tip}"</p>
      </div>
      <button onClick={next} className="w-full py-2.5 border border-white/20 hover:border-[#ff0000]/60 hover:text-[#ff0000] text-white font-oswald tracking-widest uppercase text-xs transition-all">
        Следующий совет →
      </button>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", city: "" });
  const [joinSent, setJoinSent] = useState(false);
  const [votes, setVotes] = useState<Record<number, number>>({ 1: 14, 2: 38, 3: 21 });
  const [votedFor, setVotedFor] = useState<number | null>(null);
  const { playSkip, playVote, playNav, playLike, playJoin, playPost } = useSound();

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const vote = (id: number) => {
    if (votedFor !== null) return;
    setVotes(v => ({ ...v, [id]: v[id] + 1 }));
    setVotedFor(id);
    playVote();
  };

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    playNav();
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    const post: ForumPost = {
      id: Date.now(),
      author: newAuthor.trim() || "Аноним",
      text: newPost.trim(),
      likes: 0,
      time: "только что",
    };
    setPosts([post, ...posts]);
    setNewPost("");
    setNewAuthor("");
    playPost();
  };

  const likePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    playLike();
  };

  const submitJoin = () => {
    if (!joinForm.name || !joinForm.email) return;
    setJoinSent(true);
    playJoin();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-ibm">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("Главная")} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#ff0000] rounded flex items-center justify-center group-hover:bg-[#cc0000] transition-colors">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
            </div>
            <div>
              <div className="font-oswald font-bold text-base tracking-[0.15em] uppercase text-white leading-none">Новый Ютуб</div>
              <div className="text-[9px] text-white/40 tracking-[0.2em] uppercase">Партия будущего</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-3 py-1.5 text-xs font-oswald tracking-widest uppercase transition-all ${
                  activeSection === item
                    ? "text-[#ff0000] border-b border-[#ff0000]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/60 hover:text-white"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/10 px-4 py-3 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-left py-2 text-sm font-oswald tracking-widest uppercase text-white/70 hover:text-[#ff0000] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="Главная" className="pt-16 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-3 py-1 border border-[#ff0000]/60 text-[#ff0000] text-xs font-oswald tracking-[0.3em] uppercase animate-fade-in">
              Это не шутка · Ну почти
            </div>
            <h1
              className="font-oswald font-bold text-5xl md:text-8xl uppercase leading-none mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              Новый<br />
              <span className="text-[#ff0000]">Ютуб</span>
            </h1>
            <p
              className="text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed mb-2 animate-fade-in"
              style={{ animationDelay: "0.25s", opacity: 0 }}
            >
              Нас достали 5 реклам подряд, автовоспроизведение в 2 ночи
              и комментарии «первый». Мы решили действовать.
            </p>
            <p
              className="text-sm text-white/40 italic mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              (Юридически — просто сайт. Морально — революция.)
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-in"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              <button
                onClick={() => { playSkip(); scrollTo("Присоединиться"); }}
                className="px-8 py-3.5 bg-[#ff0000] hover:bg-[#cc0000] text-white font-oswald tracking-widest uppercase text-sm transition-all hover:scale-105"
              >
                Вступить в партию
              </button>
              <button
                onClick={() => { playSkip(); scrollTo("О партии"); }}
                className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-oswald tracking-widest uppercase text-sm transition-all"
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pb-16 grid grid-cols-3 gap-4 md:gap-8">
          {[
            { num: "47", label: "Членов партии", sub: "48-й — кот, не считается" },
            { num: "6 000+", label: "Нажатий «Пропустить»", sub: "лично Буфеовым за месяц" },
            { num: "0₽", label: "Взносов", sub: "мы серьёзные, не жадные" },
          ].map((stat, i) => (
            <div
              key={i}
              className="border-l border-[#ff0000]/40 pl-4 animate-fade-in"
              style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}
            >
              <div className="font-oswald text-3xl md:text-5xl font-bold text-white">{stat.num}</div>
              <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-1">{stat.label}</div>
              <div className="text-xs text-white/30 italic">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* О ПАРТИИ */}
      <section id="О партии" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">О партии</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-oswald text-2xl md:text-3xl uppercase text-[#ff0000] mb-4 tracking-wide">
                Нас объединила пятая реклама подряд
              </h3>
              <p className="text-white/70 leading-relaxed mb-4 font-light">
                Партия «Новый Ютуб» возникла в 2026 году после исторического события: пятая реклама подряд
                прервала ролик на самом интересном месте. 47 человек одновременно написали в чат «ну всё»
                — и случайно образовали кворум. Юристы подтвердили: это законно.
              </p>
              <p className="text-white/70 leading-relaxed font-light">
                Мы не обещаем снизить налоги, построить дороги или навести порядок. Мы обещаем одно:
                кнопка «Пропустить рекламу» — с первой секунды. Звучит скромно? Назовите хоть одну другую партию,
                которая это обещала. Молчите? То-то же.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-white/5 border-l-2 border-[#ff0000] text-sm text-white/50 italic">
                «Реклама кредита прервала мой ролик про то, как не брать кредиты. В этот момент я всё понял.»
                <br /><span className="text-white/30 not-italic text-xs">— slay4, Верховный Скипер Рекламы</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {MANIFESTO.map((item, i) => (
                <div
                  key={i}
                  className="p-4 border border-white/10 hover:border-[#ff0000]/40 transition-all bg-white/[0.02] group"
                >
                  <div className="w-8 h-8 rounded bg-[#ff0000]/10 flex items-center justify-center mb-3 group-hover:bg-[#ff0000]/20 transition-colors">
                    <Icon name={item.icon} size={16} className="text-[#ff0000]" />
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КАНДИДАТЫ + ГОЛОСОВАНИЕ */}
      <section id="Кандидаты" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Кандидаты</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/30 text-sm italic mb-3">Кто станет главным? Решаешь ты.</p>

          {votedFor !== null && (
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-[#ff0000]/10 border border-[#ff0000]/30 text-[#ff0000] text-sm font-oswald tracking-widest uppercase">
                ✓ Ваш голос засчитан за Участника №{votedFor}
              </span>
            </div>
          )}
          {votedFor === null && (
            <p className="text-center text-[#ff0000]/70 text-xs font-oswald tracking-widest uppercase mb-10">
              👆 Нажмите «Проголосовать» под кандидатом
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {CANDIDATES.map((c) => {
              const pct = Math.round((votes[c.id] / totalVotes) * 100);
              const isLeading = votes[c.id] === Math.max(...Object.values(votes));
              const isVoted = votedFor === c.id;
              return (
                <div
                  key={c.id}
                  className={`group border transition-all overflow-hidden flex flex-col ${
                    isLeading ? "border-[#ff0000]/60 shadow-[0_0_30px_rgba(255,0,0,0.1)]" : "border-white/10 hover:border-white/25"
                  }`}
                >
                  {isLeading && (
                    <div className="bg-[#ff0000] text-white text-center text-[10px] font-oswald tracking-[0.3em] uppercase py-1.5">
                      👑 Лидирует
                    </div>
                  )}
                  <div className="relative overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.name}
                      className="w-full h-80 object-cover object-center transition-all duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs text-[#ff0000] font-oswald tracking-widest uppercase mb-1">{c.role}</div>
                    <div className="font-oswald text-xl uppercase tracking-wide text-white mb-1">{c.name}</div>
                    <div className="text-xs text-white/40 italic mb-3">{c.slogan}</div>
                    <div className="text-xs text-white/55 mb-4 leading-relaxed">{c.program}</div>

                    {/* Прогресс-бар */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-white/40 mb-1">
                        <span>Голоса</span>
                        <span className="font-oswald text-white/70">{pct}% · {votes[c.id]} чел.</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#ff0000] rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => vote(c.id)}
                      disabled={votedFor !== null}
                      className={`mt-auto w-full py-3 font-oswald tracking-widest uppercase text-sm transition-all ${
                        isVoted
                          ? "bg-[#ff0000] text-white cursor-default"
                          : votedFor !== null
                          ? "bg-white/5 text-white/20 cursor-not-allowed"
                          : "bg-white/5 border border-white/20 text-white hover:bg-[#ff0000] hover:border-[#ff0000]"
                      }`}
                    >
                      {isVoted ? "✓ Вы проголосовали" : "Проголосовать"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-xs text-white/20 italic">
            Всего проголосовало: {totalVotes} человек. Голосование ненастоящее, но результаты очень серьёзные.
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section id="Новости" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Новости</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-0 divide-y divide-white/10">
            {NEWS.map((n, i) => (
              <article key={i} className="py-8 group hover:bg-white/[0.02] transition-colors -mx-4 px-4 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="hidden md:block text-xs text-white/30 font-oswald tracking-widest uppercase w-28 pt-1 shrink-0">
                    {n.date}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] border border-[#ff0000]/50 text-[#ff0000] px-2 py-0.5 font-oswald tracking-widest uppercase">
                        {n.tag}
                      </span>
                      <span className="md:hidden text-xs text-white/30">{n.date}</span>
                    </div>
                    <h3 className="font-oswald text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-[#ff0000] transition-colors mb-2">
                      {n.title}
                    </h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">{n.text}</p>
                  </div>
                  <div className="hidden md:flex items-center text-white/20 group-hover:text-white/60 transition-colors shrink-0 mt-1">
                    <Icon name="ArrowRight" size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ПРИКОЛЫ И ИГРЫ */}
      <section id="Игры" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Развлечения</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/30 text-sm italic mb-12">Пока YouTube грузится — поиграй у нас</p>
          <div className="grid md:grid-cols-2 gap-6">
            <SkipAdGame />
            <BufferGame />
            <GuessAdLength />
            <ChannelNameGen />
            <TimeLostCalc />
            <RandomTip />
          </div>
        </div>
      </section>

      {/* ПРИСОЕДИНИТЬСЯ */}
      <section id="Присоединиться" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Присоединиться</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="max-w-xl mx-auto">
            {joinSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#ff0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={28} className="text-[#ff0000]" />
                </div>
                <h3 className="font-oswald text-2xl uppercase tracking-wide text-white mb-2">Добро пожаловать!</h3>
                <p className="text-white/50 text-sm">Ваша заявка принята. Членский билет выслан телепатически. Котик Васька уже в курсе.</p>
              </div>
            ) : (
              <div className="border border-white/10 p-8">
                <h3 className="font-oswald text-xl uppercase tracking-wide text-white mb-2">Вступай. Это бесплатно.</h3>
                <p className="text-white/40 text-sm mb-6 font-light">
                  Членский взнос — 0 рублей. Обязанности — нажимать «Пропустить рекламу» с чувством достоинства.
                  Форма одежды — свободная.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 font-oswald tracking-widest uppercase block mb-1">
                      Ваше имя *
                    </label>
                    <input
                      value={joinForm.name}
                      onChange={e => setJoinForm({ ...joinForm, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#ff0000]/60 outline-none px-4 py-3 text-white text-sm placeholder:text-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-oswald tracking-widest uppercase block mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={joinForm.email}
                      onChange={e => setJoinForm({ ...joinForm, email: e.target.value })}
                      placeholder="ivan@example.ru"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#ff0000]/60 outline-none px-4 py-3 text-white text-sm placeholder:text-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-oswald tracking-widest uppercase block mb-1">
                      Город
                    </label>
                    <input
                      value={joinForm.city}
                      onChange={e => setJoinForm({ ...joinForm, city: e.target.value })}
                      placeholder="Москва"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#ff0000]/60 outline-none px-4 py-3 text-white text-sm placeholder:text-white/20 transition-colors"
                    />
                  </div>
                  <button
                    onClick={submitJoin}
                    disabled={!joinForm.name || !joinForm.email}
                    className="w-full py-3.5 bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-white/10 disabled:text-white/30 text-white font-oswald tracking-widest uppercase text-sm transition-all"
                  >
                    Вступить в партию
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ФОРУМ */}
      <section id="Форум" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Форум</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/30 text-sm italic mb-12">Место, где можно выговориться про рекламу матрасов</p>

          <div className="max-w-2xl mx-auto">
            <div className="border border-white/10 p-5 mb-8 bg-white/[0.02]">
              <h4 className="font-oswald text-sm uppercase tracking-widest text-white/60 mb-4">Оставить комментарий</h4>
              <div className="space-y-3">
                <input
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="Ваш псевдоним (необязательно)"
                  className="w-full bg-transparent border border-white/10 focus:border-[#ff0000]/50 outline-none px-3 py-2.5 text-white text-sm placeholder:text-white/20 transition-colors"
                />
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Ваша мысль о программе партии..."
                  rows={3}
                  className="w-full bg-transparent border border-white/10 focus:border-[#ff0000]/50 outline-none px-3 py-2.5 text-white text-sm placeholder:text-white/20 transition-colors resize-none"
                />
                <button
                  onClick={submitPost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2.5 bg-[#ff0000] hover:bg-[#cc0000] disabled:bg-white/10 disabled:text-white/30 text-white font-oswald tracking-widest uppercase text-xs transition-all"
                >
                  Опубликовать
                </button>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-white/10">
              {posts.map((post) => (
                <div key={post.id} className="py-5 group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#ff0000]/20 flex items-center justify-center">
                          <Icon name="User" size={13} className="text-[#ff0000]" />
                        </div>
                        <span className="text-xs font-oswald tracking-wider text-white/70 uppercase">{post.author}</span>
                        <span className="text-xs text-white/25">{post.time}</span>
                      </div>
                      <p className="text-sm text-white/65 leading-relaxed pl-10">{post.text}</p>
                    </div>
                  </div>
                  <div className="pl-10 mt-3">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1.5 text-xs text-white/30 hover:text-[#ff0000] transition-colors"
                    >
                      <Icon name="ThumbsUp" size={13} />
                      <span>{post.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
              </div>
              <div>
                <div className="font-oswald font-bold text-sm tracking-[0.15em] uppercase text-white">Новый Ютуб</div>
                <div className="text-[9px] text-white/30 tracking-[0.2em] uppercase">Партия будущего · 2026</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-xs text-white/30 hover:text-white/70 font-oswald tracking-widest uppercase transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/20">
              © 2026 Партия «Новый Ютуб». Основана в 2026 году. Реклама запрещена. Котики приветствуются.
            </p>
            <p className="text-[10px] text-white/10 italic mt-1">
              Не является официальной политической партией. YouTube® — чужой товарный знак. Котик Васька — наш.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}