import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Programs", "Results", "Faculty", "Facilities", "Contact"];

const STATS = [
  { value: "2000+", label: "Students Enrolled" },
  { value: "95%", label: "Selection Rate" },
  { value: "40", label: "Expert Faculty" },
  { value: "500+", label: "AIR Under 1000" },
];

const PROGRAMS = [
  {
    icon: "🎯",
    title: "NEET Foundation",
    subtitle: "Class 11 & 12",
    duration: "2 Years",
    desc: "Comprehensive two-year residential program integrating board preparation with NEET mastery. Daily doubt sessions, weekly tests, and personalized mentoring.",
    highlight: "Board + NEET Integration",
    color: "#C8102E",
  },
  {
    icon: "⚡",
    title: "NEET Intensive",
    subtitle: "Class 12 Droppers",
    duration: "1 Year",
    desc: "Fast-track intensive program for Class 12 students and droppers. Focused revision, topic mastery, and strategic exam preparation.",
    highlight: "High-Velocity Learning",
    color: "#1a1a2e",
  },
  {
    icon: "🏆",
    title: "NEET Achiever",
    subtitle: "Dropper Batch",
    duration: "11 Months",
    desc: "Our flagship dropper batch with proven track record. Smaller batch size ensures individual attention and guaranteed improvement.",
    highlight: "Guaranteed Improvement",
    color: "#C8102E",
  },
];

const RESULTS = [
  { name: "Priya Sharma", rank: "AIR 47", subject: "Biology 360/360", year: "2024" },
  { name: "Aryan Kumar", rank: "AIR 112", subject: "Physics 180/180", year: "2024" },
  { name: "Sneha Gupta", rank: "AIR 203", subject: "Chemistry 180/180", year: "2024" },
  { name: "Rahul Singh", rank: "AIR 389", subject: "Score 710/720", year: "2023" },
  { name: "Anjali Verma", rank: "AIR 501", subject: "Score 705/720", year: "2023" },
  { name: "Dev Patel", rank: "AIR 654", subject: "Score 698/720", year: "2024" },
];

const FACULTY = [
  { name: "Dr. R.K. Mishra", subject: "Biology", exp: "22 yrs", qual: "PhD, AIIMS Alumni", students: "5000+" },
  { name: "Prof. S.N. Sharma", subject: "Physics", exp: "18 yrs", qual: "IIT Kanpur, M.Tech", students: "4200+" },
  { name: "Dr. Anita Singh", subject: "Chemistry", exp: "15 yrs", qual: "PhD Chemistry, BHU", students: "3800+" },
  { name: "Dr. V.K. Tiwari", subject: "Zoology", exp: "20 yrs", qual: "PhD Zoology, Patna Univ", students: "4500+" },
];

const FACILITIES = [
  { icon: "🏠", title: "Premium Hostel", desc: "AC rooms with Wi-Fi, nutritious meals, 24/7 security and CCTV surveillance" },
  { icon: "📚", title: "Digital Library", desc: "10,000+ books, previous year papers, online resources and smart study rooms" },
  { icon: "🧪", title: "Hi-Tech Labs", desc: "Advanced physics, chemistry and biology labs with state-of-the-art equipment" },
  { icon: "💻", title: "Smart Classrooms", desc: "Interactive boards, HD projectors, recorded lectures accessible anytime" },
  { icon: "🏋️", title: "Sports & Wellness", desc: "Gym, yoga studio, sports ground for physical and mental wellbeing" },
  { icon: "🩺", title: "Medical Care", desc: "On-campus doctor, mental health counselors, 24/7 medical assistance" },
];

const TESTIMONIALS = [
  {
    text: "VISION 40 transformed my approach to NEET. The faculty's dedication and the residential environment helped me focus completely. Got AIR 47 in my first attempt!",
    name: "Priya Sharma",
    rank: "AIR 47 | NEET 2024",
    college: "AIIMS Delhi",
  },
  {
    text: "After failing twice, I joined VISION 40's dropper batch. The personalized mentoring and strategic study plan helped me crack NEET with AIR 389. Life-changing experience!",
    name: "Rahul Singh",
    rank: "AIR 389 | NEET 2023",
    college: "Maulana Azad Medical College",
  },
  {
    text: "The competitive environment here keeps you motivated. Daily tests, brilliant faculty, excellent facilities — VISION 40 is truly Patna's best NEET coaching.",
    name: "Anjali Verma",
    rank: "AIR 501 | NEET 2023",
    college: "VMMC, New Delhi",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AnimatedCounter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[\d]/g, "");
    let start = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, num);
      setDisplayed(start + suffix);
      if (start >= num) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{displayed}</span>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a12]/95 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#C8102E] rounded-lg flex items-center justify-center shadow-lg shadow-red-900/40">
            <span className="text-white font-black text-lg tracking-tight">V40</span>
          </div>
          <div className="leading-tight">
            <div className="text-white font-black text-xl tracking-widest">VISION 40</div>
            <div className="text-[#C8102E] text-[10px] tracking-[0.25em] uppercase font-semibold">
              Sankalp Se Selection Tak
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#C8102E]"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-6 py-2.5 bg-[#C8102E] text-white text-sm font-bold tracking-wide rounded-lg hover:bg-[#a50e25] transition-all duration-200 shadow-lg shadow-red-900/30"
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0a0a12]/98 border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-[#C8102E] text-base font-medium py-1 transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-6 py-3 bg-[#C8102E] text-white font-bold rounded-lg text-center"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07070f]"
    >
      {/* Animated BG */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#C8102E]/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#C8102E]/5 blur-3xl"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C8102E]/40 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
          <span className="text-[#C8102E] text-xs font-bold tracking-[0.2em] uppercase">
            Bihar's #1 Residential NEET Coaching
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
        >
          From{" "}
          <span className="relative inline-block">
            <span className="text-[#C8102E]">Sankalp</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-1 left-0 right-0 h-1 bg-[#C8102E]/40 rounded-full origin-left"
            />
          </span>
          <br />
          to{" "}
          <span className="relative inline-block">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #fff 30%, #C8102E 100%)" }}
            >
              Selection
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Premium residential NEET coaching in Patna, Bihar. Expert faculty, advanced infrastructure, and a proven methodology that turns aspirations into All India Ranks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-[#C8102E] text-white font-bold text-lg rounded-xl hover:bg-[#a50e25] transition-all duration-200 shadow-2xl shadow-red-900/40 flex items-center gap-2"
          >
            Start Your Journey
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#results"
            className="px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            View Results
          </a>
        </motion.div>

        {/* Mini stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white">
                <AnimatedCounter target={s.value} />
              </span>
              <span className="text-gray-500 text-xs font-medium tracking-wide mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-[#0a0a12] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">About VISION 40</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6 leading-tight">
                Where Every Dream<br />
                <span className="text-[#C8102E]">Finds Its Path</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Founded in Patna, Bihar, VISION 40 is a premier residential NEET coaching institute built on a single premise: every student who commits wholly to their dream can achieve it.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our name "VISION 40" embodies our philosophy — 40 weeks of focused, immersive preparation that creates doctors from Bihar's most determined aspirants. We blend world-class faculty, cutting-edge infrastructure, and a nurturing residential environment.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Est. 2015", sub: "9 Years of Excellence" },
                  { title: "Patna, Bihar", sub: "Prime Location" },
                  { title: "Batch Size ≤30", sub: "Individual Attention" },
                  { title: "24×7 Support", sub: "Doubt Resolution" },
                ].map((item) => (
                  <div key={item.title} className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                    <div className="text-white font-bold text-lg">{item.title}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#C8102E]/20 to-transparent p-10">
              <div className="absolute inset-0 bg-[#0d0d1a]" />
              <div className="relative z-10">
                <div className="text-7xl font-black text-[#C8102E] leading-none mb-4">95%</div>
                <div className="text-white text-2xl font-bold mb-2">Selection Rate</div>
                <div className="text-gray-400 mb-10">Consistently above national average</div>

                <div className="space-y-4">
                  {[
                    { label: "AIIMS Selection", pct: 78 },
                    { label: "Top Govt. Medical Colleges", pct: 92 },
                    { label: "Private Medical Colleges", pct: 98 },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{bar.label}</span>
                        <span className="text-white font-semibold">{bar.pct}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${bar.pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.5 }}
                          className="h-full bg-[#C8102E] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-5 -right-5 bg-[#C8102E] text-white px-5 py-3 rounded-xl shadow-2xl shadow-red-900/50 font-bold text-sm"
            >
              🏆 Bihar's Best<br />NEET Institute
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="bg-[#07070f] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Choose Your Path<br />
            <span className="text-[#C8102E]">to Medicine</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-white/10 bg-[#0d0d1a] p-8 cursor-pointer overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-[#C8102E]/0 group-hover:bg-[#C8102E]/5 transition-all duration-500 rounded-2xl" />

              <div className="text-4xl mb-5">{prog.icon}</div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-black text-2xl">{prog.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{prog.subtitle}</p>
                </div>
                <span className="px-3 py-1 bg-[#C8102E]/20 text-[#C8102E] text-xs font-bold rounded-full border border-[#C8102E]/30">
                  {prog.duration}
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">{prog.desc}</p>

              <div className="flex items-center gap-2 text-[#C8102E] text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                {prog.highlight}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <a
                  href="#contact"
                  className="w-full block text-center py-3 border border-[#C8102E]/40 text-[#C8102E] font-semibold rounded-xl hover:bg-[#C8102E] hover:text-white transition-all duration-200 text-sm"
                >
                  Inquire Now →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="bg-[#0a0a12] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">Hall of Fame</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Our Toppers,<br />
            <span className="text-[#C8102E]">Our Pride</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden group"
            >
              {i === 0 && (
                <div className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 font-bold">
                  🥇 Top Rank
                </div>
              )}
              <div className="text-3xl font-black text-[#C8102E] mb-1">{r.rank}</div>
              <div className="text-white font-bold text-lg mb-0.5">{r.name}</div>
              <div className="text-gray-500 text-sm mb-3">{r.subject}</div>
              <div className="text-gray-600 text-xs font-medium tracking-wider uppercase">
                NEET {r.year}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C8102E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Summary banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#C8102E]/20 via-[#C8102E]/10 to-transparent border border-[#C8102E]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-white font-black text-3xl">500+ Students</div>
            <div className="text-gray-400 mt-1">achieved AIR under 1000 in last 5 years</div>
          </div>
          <div className="flex gap-8">
            {[
              { n: "47", l: "Best AIR Ever" },
              { n: "95%", l: "Selection Rate" },
              { n: "200+", l: "Govt. Medical" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-white font-black text-2xl">{s.n}</div>
                <div className="text-gray-500 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section id="faculty" className="bg-[#07070f] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">Expert Faculty</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Learn from<br />
            <span className="text-[#C8102E]">the Best Minds</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-[#0d0d1a] text-center group hover:border-[#C8102E]/40 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-[#C8102E]/20 border-2 border-[#C8102E]/40 flex items-center justify-center mx-auto mb-4 text-[#C8102E] font-black text-lg">
                {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <h3 className="text-white font-bold text-lg">{f.name}</h3>
              <p className="text-[#C8102E] text-sm font-semibold mt-1">{f.subject}</p>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{f.qual}</p>
              <div className="mt-4 flex justify-center gap-4 text-center">
                <div>
                  <div className="text-white font-bold">{f.exp}</div>
                  <div className="text-gray-600 text-xs">Experience</div>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <div className="text-white font-bold">{f.students}</div>
                  <div className="text-gray-600 text-xs">Students</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="bg-[#0a0a12] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">World-Class Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Everything You Need<br />
            <span className="text-[#C8102E]">Under One Roof</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex gap-5 p-6 rounded-2xl border border-white/10 bg-[#0d0d1a] hover:border-[#C8102E]/30 transition-all duration-300"
            >
              <div className="text-3xl flex-shrink-0 mt-1">{f.icon}</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[#07070f] py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">Student Stories</span>
        <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-16">
          Voices of<br />
          <span className="text-[#C8102E]">Success</span>
        </h2>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border border-white/10 bg-[#0d0d1a]"
            >
              <div className="text-4xl text-[#C8102E] mb-4">"</div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                {TESTIMONIALS[active].text}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center text-[#C8102E] font-black">
                  {TESTIMONIALS[active].name[0]}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold">{TESTIMONIALS[active].name}</div>
                  <div className="text-[#C8102E] text-sm font-medium">{TESTIMONIALS[active].rank}</div>
                  <div className="text-gray-500 text-xs">{TESTIMONIALS[active].college}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === active ? "bg-[#C8102E] w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", batch: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", email: "", batch: "", message: "" });
  };

  return (
    <section id="contact" className="bg-[#0a0a12] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold tracking-[0.2em] uppercase">Admissions Open</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Begin Your<br />
            <span className="text-[#C8102E]">Medical Journey</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-10">
              {[
                { icon: "📍", label: "Address", value: "VISION 40, Bailey Road, Patna, Bihar 800001" },
                { icon: "📞", label: "Phone", value: "+91 7654 321 098 | +91 9876 543 210" },
                { icon: "📧", label: "Email", value: "admissions@vision40.edu.in" },
                { icon: "🕐", label: "Office Hours", value: "Mon–Sat: 8:00 AM – 8:00 PM" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start p-5 rounded-xl border border-white/10 bg-[#0d0d1a]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA urgency */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#C8102E]/20 to-transparent border border-[#C8102E]/30">
              <div className="text-white font-bold text-lg mb-2">⚡ Limited Seats Available</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Batch size is limited to 30 students to ensure personalized attention. Secure your seat for 2025 batch before applications close.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0d0d1a]">
            <h3 className="text-white font-bold text-xl mb-6">Request Admission Info</h3>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">✅</div>
                <div className="text-white font-bold text-xl">Application Submitted!</div>
                <div className="text-gray-400 mt-2">Our team will contact you within 24 hours.</div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-400 text-sm font-medium mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(form as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E]/60 transition-colors text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Program Interest</label>
                  <select
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#C8102E]/60 transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-[#0d0d1a]">Select Program</option>
                    <option value="foundation" className="bg-[#0d0d1a]">NEET Foundation (11–12)</option>
                    <option value="intensive" className="bg-[#0d0d1a]">NEET Intensive (12/Dropper)</option>
                    <option value="achiever" className="bg-[#0d0d1a]">NEET Achiever (Dropper Batch)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1.5">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any questions or specific requirements..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-600 focus:outline-none focus:border-[#C8102E]/60 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C8102E] text-white font-bold text-lg rounded-xl hover:bg-[#a50e25] transition-all duration-200 shadow-xl shadow-red-900/30 mt-2"
                >
                  Submit Application →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#07070f] border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">V40</span>
              </div>
              <div>
                <div className="text-white font-black text-lg tracking-widest">VISION 40</div>
                <div className="text-[#C8102E] text-[9px] tracking-[0.2em] uppercase">Sankalp Se Selection Tak</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Bihar's premier residential NEET coaching institute in Patna. Turning medical aspirations into reality since 2015.
            </p>
          </div>

          <div>
            <div className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</div>
            <div className="space-y-2">
              {NAV_LINKS.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-gray-500 hover:text-[#C8102E] text-sm transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Programs</div>
            <div className="space-y-2">
              {["NEET Foundation", "NEET Intensive", "NEET Achiever", "Online Test Series", "Crash Course"].map((p) => (
                <div key={p} className="text-gray-500 text-sm">{p}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 VISION 40. All Rights Reserved. Patna, Bihar.
          </p>
          <p className="text-gray-700 text-xs">
            Results based on actual NEET performances of enrolled students.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Results />
      <Faculty />
      <Facilities />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
