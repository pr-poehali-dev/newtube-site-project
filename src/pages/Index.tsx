import { useState, useCallback } from "react";
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

const NAV_ITEMS = ["Главная", "О партии", "Кандидаты", "Новости", "Присоединиться", "Форум"];

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

      {/* ПРИСОЕДИНИТЬСЯ */}
      <section id="Присоединиться" className="py-24 bg-[#0a0a0a]">
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