import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/files/a55cc338-1b2f-4e78-939b-cef1794dc018.jpg";
const CANDIDATE_IMG = "https://cdn.poehali.dev/projects/19393cb7-0092-45ec-bd7a-91a726d9fd1a/files/86138ef9-e4b7-4ea0-b99b-8b86389bdce1.jpg";

const NAV_ITEMS = ["Главная", "О партии", "Кандидаты", "Новости", "Присоединиться", "Форум"];

const NEWS = [
  {
    date: "10 июн 2026",
    tag: "Важно",
    title: "Партия требует убрать рекламу перед роликами длиной менее 60 секунд",
    text: "Государственная дума рассмотрит законопроект о минимальной длине рекламных пауз. Мы серьёзно.",
  },
  {
    date: "5 июн 2026",
    tag: "Программа",
    title: "Новая инициатива: алгоритм рекомендаций должен показывать то, что ты хочешь",
    text: "Революционная идея: интернет-платформы обязаны рекомендовать контент по интересам пользователя, а не по интересам рекламодателей.",
  },
  {
    date: "1 июн 2026",
    tag: "Съезд",
    title: "Состоялся первый съезд партии. Присутствовало 47 человек и один кот",
    text: "Кот воздержался при голосовании по вопросу монетизации. Его позиция остаётся неизменной.",
  },
];

const CANDIDATES = [
  {
    name: "Алексей Буферов",
    role: "Председатель партии",
    slogan: "«Загрузка идей — 100%»",
    img: CANDIDATE_IMG,
  },
  {
    name: "Мария Плейлистова",
    role: "Руководитель фракции",
    slogan: "«Ваш голос не пойдёт в спам»",
    img: CANDIDATE_IMG,
  },
  {
    name: "Игорь Монетизов",
    role: "Финансовый директор",
    slogan: "«Реклама — только с вашего согласия»",
    img: CANDIDATE_IMG,
  },
];

const MANIFESTO = [
  { icon: "Play", text: "Свободный интернет без цензуры и необоснованных блокировок" },
  { icon: "Shield", text: "Защита авторских прав без уничтожения авторов" },
  { icon: "Eye", text: "Прозрачные алгоритмы рекомендаций" },
  { icon: "Volume2", text: "Реклама — только добровольная и не громче самого ролика" },
  { icon: "Users", text: "Цифровое гражданство для каждого россиянина" },
  { icon: "Globe", text: "Интернет — общественное благо, а не частная собственность" },
];

interface ForumPost {
  id: number;
  author: string;
  text: string;
  likes: number;
  time: string;
}

const INITIAL_POSTS: ForumPost[] = [
  { id: 1, author: "Народный голос", text: "Наконец-то партия, которая понимает боль каждого пользователя. Долой рекламу за 5 секунд до конца ролика!", likes: 142, time: "2 часа назад" },
  { id: 2, author: "Аналитик_2026", text: "Программа партии заслуживает внимания. Вопрос алгоритмов — это реально важно для цифровой демократии.", likes: 89, time: "5 часов назад" },
  { id: 3, author: "Скептик_Иванов", text: "Хорошо звучит, но как именно планируете регулировать иностранные платформы?", likes: 34, time: "вчера" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [newPost, setNewPost] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", city: "" });
  const [joinSent, setJoinSent] = useState(false);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
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
  };

  const likePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const submitJoin = () => {
    if (!joinForm.name || !joinForm.email) return;
    setJoinSent(true);
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
              Выборы 2026 · Цифровая Россия
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
              Партия, которая борется за ваш интернет. Серьёзно.
              Очень серьёзно. Можете не смеяться — мы и не смеёмся.
            </p>
            <p
              className="text-sm text-white/40 italic mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              (Ну может чуть-чуть)
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-in"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              <button
                onClick={() => scrollTo("Присоединиться")}
                className="px-8 py-3.5 bg-[#ff0000] hover:bg-[#cc0000] text-white font-oswald tracking-widest uppercase text-sm transition-all hover:scale-105"
              >
                Вступить в партию
              </button>
              <button
                onClick={() => scrollTo("О партии")}
                className="px-8 py-3.5 border border-white/30 hover:border-white text-white font-oswald tracking-widest uppercase text-sm transition-all"
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pb-16 grid grid-cols-3 gap-4 md:gap-8">
          {[
            { num: "47", label: "Членов партии", sub: "и один кот" },
            { num: "3", label: "Законопроекта", sub: "все про ютуб" },
            { num: "∞", label: "Желания перемен", sub: "у каждого" },
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
                Мы не просто смотрим — мы действуем
              </h3>
              <p className="text-white/70 leading-relaxed mb-4 font-light">
                Партия «Новый Ютуб» основана в 2025 году группой граждан, которые устали нажимать «пропустить рекламу»
                и решили, что пора перестать ждать. Мы верим: цифровое пространство должно служить людям,
                а не корпорациям.
              </p>
              <p className="text-white/70 leading-relaxed font-light">
                Наша программа охватывает реальные вопросы цифровой политики: право на доступ к информации,
                прозрачность алгоритмов, защита авторов контента и пользователей. Без воды. Почти без воды.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-white/5 border-l-2 border-[#ff0000] text-sm text-white/50 italic">
                «Мы смотрели на проблему в течение 10 лет. Хватит смотреть — пора нажать на паузу»
                <br /><span className="text-white/30 not-italic text-xs">— Председатель партии</span>
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

      {/* КАНДИДАТЫ */}
      <section id="Кандидаты" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-oswald text-3xl md:text-5xl uppercase tracking-widest text-white">Кандидаты</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/30 text-sm italic mb-16">Реальные люди с реальными взглядами</p>

          <div className="grid md:grid-cols-3 gap-6">
            {CANDIDATES.map((c, i) => (
              <div
                key={i}
                className="group border border-white/10 hover:border-[#ff0000]/40 transition-all overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-56 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#ff0000] font-oswald tracking-widest uppercase mb-1">{c.role}</div>
                  <div className="font-oswald text-xl uppercase tracking-wide text-white mb-2">{c.name}</div>
                  <div className="text-sm text-white/40 italic">{c.slogan}</div>
                </div>
              </div>
            ))}
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
                <h3 className="font-oswald text-2xl uppercase tracking-wide text-white mb-2">Заявка принята</h3>
                <p className="text-white/50 text-sm">Мы свяжемся с вами. И не только по вопросам ютуба.</p>
              </div>
            ) : (
              <div className="border border-white/10 p-8">
                <h3 className="font-oswald text-xl uppercase tracking-wide text-white mb-2">Стань частью движения</h3>
                <p className="text-white/40 text-sm mb-6 font-light">
                  Членский взнос — 0 рублей. Просто хотеть лучшего интернета — уже достаточно.
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
          <p className="text-center text-white/30 text-sm italic mb-12">Обсуждайте идеи и программу партии</p>

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
                <div className="text-[9px] text-white/30 tracking-[0.2em] uppercase">Партия будущего · 2025</div>
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
              © 2026 Партия «Новый Ютуб». Все права сохранены, включая право смотреть без рекламы.
            </p>
            <p className="text-[10px] text-white/10 italic mt-1">
              Данный сайт не имеет отношения к YouTube LLC. Но хотели бы.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
