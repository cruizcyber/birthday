import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import contentConfig from './contentConfig';

const floatingHearts = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 100}%`,
  size: 10 + (index % 6) * 6,
  duration: 12 + (index % 7) * 4,
  delay: (index % 6) * 1.5,
}));

function App() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(0);
  const [loveLevel, setLoveLevel] = useState(98);
  const [showSurprise, setShowSurprise] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loveStatus = useMemo(() => {
    if (loveLevel >= 95) return 'Unbelievably radiant';
    if (loveLevel >= 85) return 'Deeply magnetic';
    if (loveLevel >= 75) return 'Warm and glowing';
    return 'Steadily growing';
  }, [loveLevel]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const startMusicOnLoad = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.7;
      audio.muted = true;
      await audio.play();
      setIsPlaying(true);
      setIsMuted(true);

      window.setTimeout(() => {
        audio.muted = false;
        setIsMuted(false);
      }, 800);
    } catch {
      setIsPlaying(false);
    }
  };

  const triggerConfetti = () => {
    setShowSurprise(true);
    window.clearTimeout((triggerConfetti as unknown as { timeoutId?: number }).timeoutId);
    (triggerConfetti as unknown as { timeoutId?: number }).timeoutId = window.setTimeout(() => {
      setShowSurprise(false);
    }, 3200);

    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#f9b5bf', '#fcd9d5', '#d88ea7', '#fff3eb', '#8f3d4f'],
    });
  };

  const triggerBlow = () => {
    setIsBlowing((current) => !current);
    triggerConfetti();
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  useEffect(() => {
    startMusicOnLoad();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#fff9f7_0%,_#fdf1ef_30%,_#f8e8ea_60%,_#f4dfe4_100%)] text-stone-800">
      <audio
        ref={audioRef}
        src={contentConfig.backgroundMusicUrl}
        loop
        muted={isMuted}
        preload="auto"
        autoPlay
        playsInline
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className="heart-floating"
            style={{
              left: heart.left,
              top: heart.top,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
            }}
          />
        ))}
      </div>

      <header className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-card relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/25 p-6 shadow-[0_25px_80px_rgba(143,61,79,0.14)] backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,255,255,0)_55%)]" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-100/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-rose-700 uppercase shadow-sm">
                {contentConfig.birthdayDate}
              </span>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display text-5xl leading-none text-stone-800 sm:text-6xl lg:text-7xl"
                >
                  {contentConfig.heroTitle}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="max-w-xl text-base leading-8 text-stone-700 sm:text-lg"
                >
                  {contentConfig.heroSubtitle}
                </motion.p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm font-medium text-rose-700">
                <span className="rounded-full bg-white/60 px-3 py-2 shadow-sm ring-1 ring-rose-100">For the girl of my dreams</span>
                <span className="rounded-full bg-white/60 px-3 py-2 shadow-sm ring-1 ring-rose-100">You make life sweeter</span>
                <span className="rounded-full bg-white/60 px-3 py-2 shadow-sm ring-1 ring-rose-100">I love you always</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  onClick={triggerConfetti}
                  className="rounded-full bg-[linear-gradient(135deg,#8f3d4f,#c9788e)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Surprise me
                </button>
                <a
                  href="#memories"
                  className="rounded-full border border-rose-200 bg-white/60 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-white/80"
                >
                  Read our story
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="birthday-stage">
                <div className="cake-stand" />

                <div className={`candle-main ${isBlowing ? 'is-blown' : ''}`}>
                  <div className={`flame ${isBlowing ? 'is-out' : ''}`} />
                </div>

                <div className="birthday-cake">
                  <div className="cake-top" />
                  <div className="cake-mid" />
                  <div className="cake-base" />
                </div>

                <div className="photo-stack">
                  {contentConfig.galleryPhotos.map((image, index) => (
                    <div key={index} className={`photo-card photo-card-${index + 1}`}>
                      <img src={image} alt={`Love memory ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={triggerBlow}
                className="blow-button"
              >
                {isBlowing ? 'Wish made ✨' : 'Blow the candle'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-12 px-5 pb-28 sm:px-6 lg:px-8">
        <section className="glass-card rounded-[2rem] border border-white/60 bg-white/45 p-6 shadow-[0_20px_60px_rgba(143,61,79,0.08)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/60 p-3 shadow-sm">
              <img
                src={contentConfig.profileImage}
                alt={contentConfig.profileAlt}
                className="h-[340px] w-full rounded-[1.1rem] object-cover"
              />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.25em] text-rose-500 uppercase">A little love note</p>
              <h2 className="font-display text-5xl leading-none text-stone-800">My favorite birthday wish</h2>
              <p className="text-lg leading-8 text-stone-700">{contentConfig.cakeMessage}</p>
              <p className="rounded-[1.25rem] border border-rose-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(249,219,225,0.7))] p-4 text-base leading-7 text-stone-700 shadow-inner">
                {contentConfig.loveLetter}
              </p>
            </div>
          </div>
        </section>

        <section id="memories" className="space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-rose-500 uppercase">Why I love you</p>
              <h2 className="mt-3 font-display text-4xl text-stone-800 sm:text-5xl">A thousand beautiful reasons</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contentConfig.memories.map((memory, index) => {
              const isOpen = selectedMemory === index;
              return (
                <motion.button
                  key={memory.id}
                  type="button"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setSelectedMemory(isOpen ? null : index)}
                  className="group relative h-[360px] cursor-pointer text-left [perspective:1200px]"
                >
                  <motion.div
                    animate={{ rotateY: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="relative h-full w-full rounded-[1.8rem] shadow-[0_16px_40px_rgba(144,83,97,0.12)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/60 backdrop-blur-md" style={{ backfaceVisibility: 'hidden' }}>
                      <img src={memory.image} alt={memory.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-rose-100/80">Memory</p>
                        <h3 className="mt-2 font-display text-3xl">{memory.title}</h3>
                        <p className="mt-2 text-sm text-white/80">{memory.caption}</p>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(252,220,224,0.8))] p-5 text-stone-700"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: `linear-gradient(135deg, rgba(255,255,255,0.9), ${memory.accent}66)`,
                      }}
                    >
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-rose-500">A little note</p>
                        <h3 className="mt-3 font-display text-3xl text-stone-800">{memory.title}</h3>
                      </div>
                      <p className="text-base leading-7 text-stone-700">{memory.message}</p>
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-card rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_20px_60px_rgba(143,61,79,0.08)] backdrop-blur-xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-rose-500 uppercase">Love journey</p>
                <h2 className="mt-2 font-display text-4xl text-stone-800">Our milestones</h2>
              </div>
            </div>

            <div className="space-y-6">
              {contentConfig.timeline.map((item, index) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="relative pl-9"
                >
                  <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-[linear-gradient(135deg,#8f3d4f,#f3b7c5)] shadow-[0_0_18px_rgba(143,61,79,0.4)]" />
                  <div className="absolute left-[7px] top-6 h-[calc(100%+0.75rem)] w-px bg-gradient-to-b from-rose-300 to-transparent" />
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-500">{item.date}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-stone-800">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-base leading-7 text-stone-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="glass-card rounded-[2rem] border border-white/60 bg-white/45 p-6 shadow-[0_20px_60px_rgba(143,61,79,0.08)] backdrop-blur-xl sm:p-8"
          >
            <p className="text-xs font-semibold tracking-[0.25em] text-rose-500 uppercase">Love meter</p>
            <h2 className="mt-3 font-display text-4xl text-stone-800">It keeps growing</h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between text-sm font-medium text-stone-600">
                <span>Current intensity</span>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">{loveLevel}%</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-rose-100 ring-1 ring-rose-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loveLevel}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[linear-gradient(135deg,#8f3d4f,#eea5b5,#f7d5d3)]"
                />
              </div>

              <div className="space-y-2 text-sm text-stone-600">
                <label htmlFor="love-range" className="font-medium text-stone-700">Adjust the meter</label>
                <input
                  id="love-range"
                  type="range"
                  min={60}
                  max={100}
                  value={loveLevel}
                  onChange={(event) => setLoveLevel(Number(event.target.value))}
                  className="slider w-full accent-rose-500"
                />
              </div>

              <div className="rounded-2xl border border-rose-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(250,233,236,0.8))] p-4 shadow-inner">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">Status</p>
                <p className="mt-2 text-2xl font-semibold text-stone-800">{loveStatus}</p>
              </div>

              <button
                type="button"
                onClick={triggerConfetti}
                className="w-full rounded-full bg-[linear-gradient(135deg,#8f3d4f,#cf7587)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Trigger surprise moment
              </button>

              <AnimatePresence>
                {showSurprise && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-base leading-7 text-stone-700 shadow-sm"
                  >
                    {contentConfig.surpriseMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contentConfig.loveMessages.map((message, index) => (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-[1.5rem] border border-white/60 bg-white/50 p-5 text-center shadow-[0_18px_40px_rgba(143,61,79,0.08)] backdrop-blur-xl"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f9dee5,#fdf5f2)] text-lg text-rose-500">
                ♥
              </div>
              <p className="text-base leading-7 text-stone-700">{message}</p>
            </motion.div>
          ))}
        </section>
      </main>

      <AnimatePresence>
        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="surprise-overlay"
          >
            <motion.div
              initial={{ scale: 0.72, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="surprise-burst"
            >
              <div className="surprise-hearts" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <span
                    key={index}
                    className="surprise-heart"
                    style={{
                      left: `${(index * 17) % 100}%`,
                      animationDelay: `${(index % 6) * 0.2}s`,
                      animationDuration: `${2.1 + (index % 5) * 0.35}s`,
                    }}
                  />
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="surprise-tag"
              >
                You are my favorite person
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="surprise-title"
              >
                Happy Birthday
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="surprise-subtitle"
              >
                I love you more than words can say ❤️
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-50">
        <div className="glass-card flex items-center gap-3 rounded-full border border-white/60 bg-white/60 px-3 py-2 shadow-[0_18px_40px_rgba(143,61,79,0.15)] backdrop-blur-xl">
          <button
            type="button"
            onClick={toggleMusic}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8f3d4f,#d87d94)] text-lg text-white shadow-md"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="rounded-full bg-rose-100 px-2 py-1 font-medium text-rose-700">Now playing</span>
            <span className="font-medium text-stone-700">Heaven Baby — Ayra Starr</span>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm text-stone-700 transition hover:bg-white"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
