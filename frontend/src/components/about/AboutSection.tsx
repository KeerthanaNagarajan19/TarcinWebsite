import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Lightbulb, Share2, Users } from 'lucide-react';

/* ─── Glitter / Victory-shower canvas ─── */
type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotate: number;
  rotateSpeed: number;
  shape: 'circle' | 'star' | 'square';
};

const COLORS = [
  '#3B82F6', '#6366F1', '#818CF8', '#38BDF8',
  '#A5B4FC', '#C7D2FE', '#E0E7FF', '#FFFFFF',
  '#93C5FD', '#67E8F9',
];

const useGlitterCanvas = (sectionRef: React.RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const spawnBurst = useCallback((cx: number, cy: number, count = 6) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particles.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        size: 3 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        rotate: Math.random() * 360,
        rotateSpeed: (Math.random() - 0.5) * 8,
        shape: (['circle', 'star', 'square'] as const)[Math.floor(Math.random() * 3)],
      });
    }
  }, []);

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = ((i * 4 * Math.PI) / 5) - Math.PI / 2;
      const b = ((i * 4 * Math.PI) / 5 + (2 * Math.PI) / 5) - Math.PI / 2;
      i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
        : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      ctx.lineTo(Math.cos(b) * (r * 0.4), Math.sin(b) * (r * 0.4));
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;

      const last = lastPointer.current;
      if (last) {
        const dx = x - last.x, dy = y - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 12) spawnBurst(x, y, Math.min(8, Math.floor(dist / 4)));
      }
      lastPointer.current = { x, y };
    };

    const onMouseLeave = () => { lastPointer.current = null; };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.alpha > 0.01);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;          // gravity
        p.vx *= 0.98;          // air drag
        p.alpha -= p.decay;
        p.rotate += p.rotateSpeed;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(ctx, p.x, p.y, p.size / 2, p.rotate);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotate * Math.PI) / 180);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [sectionRef, spawnBurst]);

  return canvasRef;
};

/* ─── Data ─── */
const focusItems = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: 'Innovation Engineering',
    description: 'We build scalable technology frameworks for automation, R&D, and integrated digital ecosystems that power next-gen industries.',
    number: '01', accent: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
    hoverAccent: 'group-hover:text-blue-700', tag: 'Core Tech',
    diceFrom: { rotateY: -90, opacity: 0, scale: 0.85 },
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Smart Learning',
    description: 'EdTech platforms and content driving STEM through interactive, real-time, and AI-powered learning experiences.',
    number: '02', accent: 'from-indigo-500 to-purple-400',
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    hoverAccent: 'group-hover:text-indigo-700', tag: 'Education',
    diceFrom: { rotateX: 90, opacity: 0, scale: 0.85 },
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: 'System Integration',
    description: 'Bridging hardware and software for seamless, intelligent operations — from factory floors to educational institutions.',
    number: '03', accent: 'from-sky-500 to-blue-400',
    iconBg: 'bg-sky-50', iconColor: 'text-sky-600',
    hoverAccent: 'group-hover:text-sky-700', tag: 'Infrastructure',
    diceFrom: { rotateX: -90, opacity: 0, scale: 0.85 },
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Research & Outreach',
    description: 'Empowering institutions and learners with research-driven content, live workshops, and community-driven live projects.',
    number: '04', accent: 'from-violet-500 to-indigo-400',
    iconBg: 'bg-violet-50', iconColor: 'text-violet-600',
    hoverAccent: 'group-hover:text-violet-700', tag: 'Community',
    diceFrom: { rotateY: 90, opacity: 0, scale: 0.85 },
  },
];

/* ─── Feature Card ─── */
const FeatureCard: React.FC<{ item: typeof focusItems[0]; delay: number; inView: boolean }> = ({ item, delay, inView }) => (
  <motion.div
    className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl cursor-pointer"
    style={{ perspective: 1500 }}
    initial={{ ...item.diceFrom, y: 20 }}
    animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, scale: 1, y: 0 } : { ...item.diceFrom, y: 20 }}
    transition={{
      duration: 0.4,
      delay: delay * 0.4,
      type: "spring",
      stiffness: 160,
      damping: 18
    }}
    whileHover={{ y: -10, rotateX: 3, rotateY: -3, transition: { duration: 0.3 } }}
  >
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.08]`} />
    <div className="mb-6 flex items-center justify-between">
      <span className={`rounded-full px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold ${item.iconBg} ${item.iconColor} border border-blue-100`}>{item.tag}</span>
    </div>

    <div className="flex items-start gap-6 mb-4">
      <motion.div
        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} shadow-inner transition-all duration-500 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6`}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={inView ? { rotateY: 0, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: (delay * 0.4) + 0.2, type: 'spring', stiffness: 200 }}
      >
        {item.icon}
      </motion.div>
      <div className="flex-1">
        <h3 className={`mb-3 text-2xl font-heading font-black text-black transition-colors duration-300 ${item.hoverAccent} tracking-tight`}>{item.title}</h3>
        <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors line-clamp-2 md:line-clamp-none">{item.description}</p>
      </div>
    </div>


  </motion.div>
);

/* ─── Main ─── */
const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: false, margin: '-80px' });
  const canvasRef = useGlitterCanvas(sectionRef);

  return (
    <section ref={sectionRef} className="relative bg-white py-32 overflow-hidden">

      {/* Glitter canvas — sits above bg but below cards */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-100/30 blur-[110px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.2" fill="#1e3a8a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid-about)" />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 shadow-sm">
            <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Our Foundations</span>
          </div>
          <h2 className="mb-8 text-black text-3xl md:text-5xl lg:text-7xl font-heading font-black leading-tight tracking-tight">
            About Tarcin Robotic
          </h2>
          <p className="mx-auto max-w-3xl text-lg md:text-xl font-medium leading-relaxed text-slate-500">
            We are committed to building impactful educational technologies and automation systems that empower students,
            educators, and industries through bold innovation.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {focusItems.map((item, i) => (
            <FeatureCard key={i} item={item} delay={i * 0.18} inView={inView} />
          ))}
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '20+', label: 'Partner Institutions' },
            { value: '5000+', label: 'Students Empowered' },
            { value: '8+', label: 'Years of Innovation' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center rounded-[2rem] border border-blue-50 bg-white py-10 px-6 text-center shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500"
              initial={{ rotateY: -90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <span className="text-4xl md:text-5xl font-heading font-black text-black mb-2 tracking-tight">{stat.value}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
