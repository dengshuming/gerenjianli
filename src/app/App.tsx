import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Mail, FileText, ArrowUpRight, Database, Box, Layers, BrainCircuit, Activity, Network, ChevronLeft, ChevronRight, BookOpen, X, Phone, Globe } from "lucide-react";
import profilePhoto from "../imports/profile-photo-data";

// ---------------------------------------------------------
// Global Styles
// ---------------------------------------------------------
const shimmerStyles = `
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .text-shimmer {
    background: linear-gradient(to right, #71717a 20%, #ffffff 40%, #ffffff 60%, #71717a 80%);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }
  .text-shimmer-subtle {
    background: linear-gradient(to right, #52525b 20%, #d4d4d8 40%, #d4d4d8 60%, #52525b 80%);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shimmer 5s linear infinite;
  }
  @media (max-width: 767px) {
    .text-shimmer-subtle {
      background: none;
      color: #d4d4d8;
      -webkit-background-clip: border-box;
      background-clip: border-box;
      animation: none;
    }
  }
  /* Hide scrollbar for cleaner look */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ---------------------------------------------------------
// Reusable Animation & UI Components
// ---------------------------------------------------------

const SectionWrapper = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => {
  return (
    <section
      id={id}
      className={`w-full h-screen min-h-[700px] md:min-h-[800px] snap-start shrink-0 pt-[110px] md:pt-[130px] pb-12 md:pb-16 relative flex flex-col px-6 md:px-16 lg:px-24 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full h-full flex flex-col max-w-[1400px] mx-auto relative"
      >
        {children}
      </motion.div>
    </section>
  );
};

// Unified Standardized Header for All Sections
// Aligned Left on Mobile, Centered on Desktop
const SectionHeader = ({ subtitle, title, desc = null, rightElement = null }: { subtitle: string, title: string, desc?: string | null, rightElement?: React.ReactNode }) => (
  <div className="w-full mb-[28px] md:mb-10 flex flex-col items-start md:items-center md:text-center shrink-0">
    <div className="flex items-center gap-3 md:gap-4 mb-[4px] md:mb-4 w-full md:w-auto">
      <div className="hidden md:block h-[1px] w-8 lg:w-12 bg-zinc-700" />
      <span className="text-sm font-mono text-zinc-400 tracking-widest uppercase">{subtitle}</span>
      <div className="h-[1px] w-8 lg:w-12 bg-zinc-700" />
    </div>
    <div className="relative flex items-center justify-start w-full md:w-auto md:justify-center gap-4 mb-[12px] md:mb-4">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-left md:text-center leading-none py-1">
        {title}
      </h2>
      {rightElement && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0">
          {rightElement}
        </div>
      )}
    </div>
    {desc && (
      <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-light leading-relaxed text-left md:text-center w-full md:whitespace-nowrap md:truncate">
        {desc}
      </p>
    )}
  </div>
);

const useAutoScrollOverflow = (activeKey: unknown, interval = 1500, step = 26) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeKey === null || activeKey === undefined) return;
    const target = ref.current;
    if (!target) return;
    let scrollTimer: number | null = null;

    target.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const startTimer = window.setTimeout(() => {
      if (target.scrollHeight <= target.clientHeight) return;

      scrollTimer = window.setInterval(() => {
        const maxScroll = target.scrollHeight - target.clientHeight;
        if (target.scrollTop >= maxScroll - 2) {
          target.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          target.scrollBy({ top: step, behavior: "smooth" });
        }
      }, interval);
    }, 650);

    return () => {
      window.clearTimeout(startTimer);
      if (scrollTimer !== null) window.clearInterval(scrollTimer);
    };
  }, [activeKey, interval, step]);

  return ref;
};

const AnimatedTitle = ({ text, className, delay = 0 }: { text: string, className: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`text-shimmer text-center inline-block ${className}`}
  >
    {text}
  </motion.div>
);

// ---------------------------------------------------------
// Page Sections
// ---------------------------------------------------------

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "projects", "experience", "contact"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Trigger slightly before it hits the center
        threshold: 0.2, // As long as 20% is in the detection zone, trigger it
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "about", label: "关于" },
    { id: "projects", label: "项目" },
    { id: "experience", label: "经历" },
    { id: "contact", label: "联系" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-full px-4 md:px-6 h-14 md:h-auto md:py-2 flex items-center justify-between sm:justify-center gap-1 sm:gap-0 shadow-2xl w-[92%] sm:w-auto max-w-[420px]"
    >
      <a 
        href="#hero" 
        onClick={(e) => handleNavClick(e, "hero")} 
        className={`inline-flex h-8 flex-1 basis-0 min-w-0 sm:flex-none items-center justify-center font-black tracking-widest text-base leading-none cursor-pointer transition-all px-2 sm:pr-4 ${
          activeSection === "hero" 
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        DSM.
      </a>
      
      <div className="h-4 w-px bg-zinc-700/80 hidden sm:block mx-2"></div>
      
      <div className="contents sm:flex sm:flex-none sm:items-center sm:gap-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`relative inline-flex h-8 flex-1 basis-0 min-w-0 sm:flex-none items-center justify-center px-2 sm:px-4 text-sm leading-none transition-all duration-300 rounded-full ${
              activeSection === item.id 
                ? "text-white font-bold bg-white/10 ring-1 ring-white/20 shadow-sm" 
                : "text-zinc-400 font-medium hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <SectionWrapper id="hero" className="bg-zinc-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
        <div className="max-w-5xl w-full flex flex-col items-center space-y-8">
          <div className="hidden md:block w-full">
            <AnimatedTitle 
              text="DENGSHUMING" 
              className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase inline-block" 
              delay={0}
            />
          </div>
          {/* Mobile multiline title */}
          <div className="md:hidden flex flex-col items-center space-y-0 w-full">
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-normal uppercase text-white">DENG</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-normal uppercase text-white">SHU</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-normal uppercase text-white">MING</span>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
            className="flex flex-col items-center space-y-4 w-full mt-4 sm:mt-0"
          >
            {/* Desktop Inline Subtitles */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="hidden md:flex text-lg md:text-2xl lg:text-3xl font-medium tracking-wide w-full justify-center"
            >
              <span className="text-shimmer inline-block">AI训练师 · 数据组长 · 规则与质检体系建设</span>
            </motion.div>
            
            {/* Mobile Stacked Subtitles (One per line) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 w-full mt-2"
            >
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• AI训练师</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 数据组长</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 规则与质检体系建设</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="hidden md:block text-xs md:text-sm lg:text-lg font-mono tracking-widest uppercase w-full text-zinc-400 mt-4"
            >
              Agent轨迹 / RAG+SFT / 多模态文档理解
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 mt-6 text-xs font-mono tracking-widest uppercase text-zinc-400"
            >
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">Agent轨迹</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">RAG+SFT</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">多模态文档理解</span>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <div className="absolute bottom-8 left-0 w-full flex justify-center z-10 pointer-events-none">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-8 h-8 text-zinc-500" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

const AboutSection = () => {
  const [isAboutTextScrolled, setIsAboutTextScrolled] = useState(false);

  const mobileDCard = (
    <div className="md:hidden w-16 h-16 bg-zinc-900 rounded-2xl ring-1 ring-inset ring-zinc-800 shrink-0 shadow-lg relative overflow-hidden">
      <img src={profilePhoto} alt="邓述明头像" className="h-full w-full object-cover object-[50%_18%]" />
    </div>
  );

  return (
    <SectionWrapper id="about" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader subtitle="About Me" title="关于我" desc="个人概况简介" rightElement={mobileDCard} />
        
        {/* Adjusted to align top edges. Grid stretches children natively. */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:col-span-5 w-full bg-zinc-900 rounded-3xl flex-col relative overflow-hidden group shadow-2xl ring-1 ring-inset ring-zinc-800 will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-zinc-950 opacity-80" />
            <div className="relative z-10 flex-1 min-h-0 overflow-hidden bg-zinc-950">
              <img src={profilePhoto} alt="邓述明头像" className="h-full w-full object-cover object-[50%_18%] grayscale-[15%] transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]" />
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-between h-full min-h-0">
            <div
              className={`relative flex-1 min-h-0 shrink md:[mask-image:none] md:[WebkitMaskImage:none] ${
                isAboutTextScrolled
                  ? "[mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_65%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,transparent_0%,black_12%,black_65%,transparent_100%)]"
                  : "[mask-image:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)]"
              }`}
            >
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
                onScroll={(e) => {
                  const scrolled = e.currentTarget.scrollTop > 6;
                  setIsAboutTextScrolled((current) => current === scrolled ? current : scrolled);
                }}
                className="space-y-4 h-full overflow-y-auto hide-scrollbar pb-10 md:pb-0"
              >
                {[
                  "具备意图分类、RAG知识库、SFT问答、多模态文档理解与Agent轨迹等多类型AI数据项目经验，能够将算法需求拆解为清晰、可执行、可质检的数据规则。",
                  "具备数据团队管理与质量体系建设能力，熟悉分层抽检、复核、双人标注和高风险字段全量核查等策略，能够保障多项目并行下的交付稳定性。",
                  "具备AI工具驱动的数据生产提效能力，能够通过候选回答批处理、轨迹格式预检等方式前置重复性检查，让团队更聚焦规则判断、推理逻辑和事实一致性。"
                ].map((text, i) => (
                  <motion.p 
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                    className="text-base lg:text-lg leading-relaxed font-light block text-zinc-300"
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 lg:mt-auto pt-4 lg:pt-8 lg:h-[180px] shrink-0"
            >
              {[
                { label: "执行团队", value: "8人", icon: Activity },
                { label: "RAG/SFT样本", value: "1.4W+", icon: Database },
                { label: "Agent轨迹", value: "8500+", icon: Network },
                { label: "复合背景", value: "UI+AI", icon: Layers }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-800 transition-colors duration-300 ring-1 ring-inset ring-zinc-800 h-full min-h-[120px] lg:min-h-0"
                >
                  <stat.icon className="w-5 h-5 lg:w-8 lg:h-8 text-zinc-500 mb-2 lg:mb-5" />
                  <span className="text-xl lg:text-3xl font-bold text-zinc-200 mb-1 lg:mb-2">{stat.value}</span>
                  <span className="text-xs lg:text-sm text-zinc-500 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const mobileProjectScrollRef = useRef<HTMLDivElement>(null);
  const projectAutoPreviewRef = useRef(false);
  const projectDetailScrollRef = useAutoScrollOverflow(selectedProject, 1500, 28);
  const [isProjectsInView, setIsProjectsInView] = useState(false);
  const projectModalSections = ["项目背景", "我的角色", "核心价值"];

  useEffect(() => {
    const sectionEl = document.getElementById("projects");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      setIsProjectsInView(isIntersecting);
      if (!isIntersecting) {
        projectAutoPreviewRef.current = false;
        setActiveIndex(0);
        mobileProjectScrollRef.current?.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setActiveIndex(index);
      return;
    }
    const target = mobileProjectScrollRef.current;
    if (!target) return;
    const child = target.children[index] as HTMLElement | undefined;
    if (!child) return;
    target.scrollTo({ left: child.offsetLeft, behavior });
    setActiveIndex(index);
  };

  const handleMobileProjectClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProject(index);
      return;
    }
    scrollTo(index);
  };

  const handleProjectClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProject(index);
      return;
    }
    scrollTo(index);
  };

  const projects = [
    {
      title: "售后客服智能体轨迹",
      type: "Agent 数据",
      scale: "8500条 / 2026.03-至今",
      desc: "围绕售后智能体工具调用轨迹，建设逐轮思考、工具选择、参数完整性和事实一致性质检标准。",
      tags: ["轨迹质检", "工具调用", "格式预检", "团队分工"],
      detailSections: [
        { title: "项目背景", items: ["售后客服智能体需要根据用户问题完成知识库检索、设备状态查询、保修查询、转人工等工具选择，并输出可信的多轮处理轨迹。"] },
        { title: "我的角色", items: ["规则设计｜结构化格式预检｜生产管理｜复杂场景口径统一｜质检复盘"] },
        { title: "核心价值", items: ["基于算法侧工具定义文档，围绕推理合理性、工具选择准确性、参数完整性和回复事实一致性制定逐轮审核标准。", "借助Claude Code编写结构化输出格式预检脚本，在质检前自动拦截工具名拼写、参数缺失、JSON结构异常等格式类问题。", "推进建设约8,500条数据，其中训练集8,000条、评测集500条，工具选择准确率与整体抽检合格率均达到95%以上。"] }
      ],
      icon: BrainCircuit
    },
    {
      title: "海外客户PO采购单识别",
      type: "多模态识别",
      scale: "4000份 / 2026.01-2026.02",
      desc: "针对海外客户PO图片与PDF，建设字段抽取、完整性判断和OA录入前置审核数据。",
      tags: ["字段抽取", "双人标注", "高风险核查", "评测分析"],
      detailSections: [
        { title: "项目背景", items: ["客户PO模板、字段位置和订单结构不统一，金额、型号等关键字段误标会直接影响录单准确性，需要用多模态识别结果辅助人工审核。"] },
        { title: "我的角色", items: ["字段规则制定｜任务梯度设计｜双人标注机制｜高风险字段核查｜模型错例分析"] },
        { title: "核心价值", items: ["研究客户PO模板，针对PDF与图片两种格式、单品类与多品类两类订单结构制定字段抽取规则和完整性判断标准。", "建立双人标注与高风险字段100%核查机制，区分模型预提取错误和人工标注错误，针对性修订规则。", "2个月完成约4,000份文件标注与质检，产出约3,500份训练样本和500份评测集，支撑关键字段识别准确率由74%提升至88%。"] }
      ],
      icon: Box
    },
    {
      title: "APP智能客服RAG+SFT",
      type: "RAG + SFT",
      scale: "1.4W条 / 2025.09-2025.12",
      desc: "围绕储能APP售后知识库、RAG检索与SFT问答样本，提升高频售后场景自动应答能力。",
      tags: ["知识入库", "术语映射", "Dify提效", "评测集"],
      detailSections: [
        { title: "项目背景", items: ["售后FAQ、产品手册等知识源需要结构化入库，并通过RAG检索和SFT回答样本支撑海外用户常见问题自动应答。"] },
        { title: "我的角色", items: ["知识库边界制定｜术语与Query映射｜Dify批处理工作流｜SFT样本质检｜评测分析"] },
        { title: "核心价值", items: ["梳理FAQ和产品手册等内容源，制定知识库入库边界与术语映射规范，整理约200条术语与Query改写映射。", "基于Dify搭建多模型候选回答收集工作流，批量调用GPT、DeepSeek等模型输出标准格式数据表，替代人工逐条复制粘贴。", "交付约14,000条训练样本，参与构建500条RAG检索评测集和1,000条SFT评测集，支撑RAG Top-3命中率由72%提升至86%。"] }
      ],
      icon: Database
    },
    {
      title: "客服消息意图分类",
      type: "文本分类",
      scale: "1.6W条 / 2025.06-2025.08",
      desc: "从零建立售前咨询、售后服务、闲聊三类意图体系，支撑客服消息自动分流。",
      tags: ["三分类体系", "数据清洗", "任务管理", "分流验证"],
      detailSections: [
        { title: "项目背景", items: ["海外用户消息同时包含购买咨询、售后服务和闲聊类内容，原流程依赖人工先判断再分发，需要建立可训练、可评测的意图分类数据。"] },
        { title: "我的角色", items: ["意图体系设计｜原始消息清洗｜标注任务分配｜培训答疑｜疑难样本复核"] },
        { title: "核心价值", items: ["从约20,000条原始客服消息中筛选去重，保留有效数据约16,000条，并制定统一清洗口径。", "作为晋升组长后的首个独立管理项目，负责三分类标注任务分配、培训答疑与疑难样本复核。", "产出约15,000条训练样本及1,000条固定评测集，支撑Qwen2-7B微调后一级意图识别准确率约85%，项目抽检合格率达96%。"] }
      ],
      icon: BrainCircuit
    },
    {
      title: "泛电商多模态图片理解",
      type: "图片理解",
      scale: "2W张 / 2024.07-2025.05",
      desc: "参与对外图片理解数据项目，围绕商品主图、海报、场景图、细节图和信息图进行多维标签与结构化描述。",
      tags: ["多维标签", "结构化描述", "规则贡献", "抽检合格率97%"],
      detailSections: [
        { title: "项目背景", items: ["项目面向泛电商图片理解场景，需要对不同类型图片进行标签标注和100-150字结构化描述，提升模型对图片类型、视觉意图和内容信息的理解能力。"] },
        { title: "我的角色", items: ["图片标签标注｜结构化描述｜图片类型边界梳理｜典型Bad Case沉淀"] },
        { title: "核心价值", items: ["作为标注员完成主图、海报、场景图、细节图和信息图等图片类型的多维标签标注及结构化描述。", "结合UI设计经验，从视觉设计意图角度梳理图片类型边界与典型Bad Case，如主图与海报图的功能差异，并整理纳入内部操作手册。", "参与团队4批次、约20,000张图片交付，个人抽检合格率达到97%，因质量表现与规则贡献于2025.06晋升数据组长。"] }
      ],
      icon: Layers
    },
    {
      title: "小红书图文笔记标签体系",
      type: "图文内容理解",
      scale: "30万条 / 2023.04-2024.06",
      desc: "参与小红书图文笔记标签体系优化，覆盖内容类目、主题标签、内容意图、图文一致性和低质风险等字段。",
      tags: ["标签体系", "图文一致性", "低质风险", "质检返修"],
      detailSections: [
        { title: "项目背景", items: ["项目面向小红书图文笔记内容理解，需要综合封面图、图片组、标题、正文和话题标签，完成多字段标注与质量复核。"] },
        { title: "我的角色", items: ["图文内容标注｜同组样本抽检｜返修跟进｜高频错误整理｜判断口径统一"] },
        { title: "核心价值", items: ["完成内容类目、主题标签、内容意图、场景标签、图文一致性、低质风险及笔记摘要等字段标注。", "后期参与同组样本抽检与返修跟进，重点检查主类目判断、图文一致性和低质风险字段。", "参与约30万条图文笔记数据的3批次交付，个人累计完成约15,000条标注，参与约5,000条样本抽检与返修，项目整体抽检通过率达95%以上。"] }
      ],
      icon: BookOpen
    }
  ];

  useEffect(() => {
    if (!isProjectsInView || selectedProject !== null || projectAutoPreviewRef.current) return;
    if (typeof window !== "undefined" && window.innerWidth >= 768) return;
    projectAutoPreviewRef.current = true;
    const timers: number[] = [];
    projects.forEach((_, index) => {
      if (index === 0) return;
      timers.push(window.setTimeout(() => scrollTo(index), index * 520));
    });
    timers.push(window.setTimeout(() => scrollTo(0), projects.length * 520 + 520));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isProjectsInView, selectedProject, projects.length]);

  return (
    <SectionWrapper id="projects" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Projects" 
          title="项目经历" 
          desc="围绕储能售后与内容理解场景，覆盖Agent轨迹、RAG+SFT、多模态文档识别、意图分类与图片理解。" 
        />

        {/* Desktop Accordion */}
        <div className="hidden md:flex flex-row flex-1 min-h-0 w-full gap-3 lg:gap-4">
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex((current) => current === i ? current : i)}
                onClick={() => handleProjectClick(i)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl group ring-1 ring-inset transition-[flex,background-color,border-color] duration-300 ease-out
                  ${isActive 
                    ? 'flex-[8] ring-zinc-600 bg-zinc-800/60' 
                    : 'flex-[0.95] ring-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/80 hover:ring-zinc-700'
                  }`}
              >
                <div className="absolute top-[-10px] lg:top-[-20px] right-4 lg:right-[-20px] text-[4rem] lg:text-[10rem] leading-none font-black text-white/[0.03] select-none pointer-events-none">
                  0{i + 1}
                </div>

                <div className={`absolute inset-0 p-6 md:p-8 lg:p-10 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100 z-10 delay-300' : 'opacity-0 z-0 pointer-events-none'}`}>
                  <div className="w-[300px] md:w-full lg:w-[600px] h-full flex flex-col justify-start">
                    <div className="flex items-center space-x-3 mb-6 lg:mb-8">
                      <span className="px-3 py-1.5 lg:px-4 lg:py-2 bg-zinc-950/80 text-zinc-300 text-xs lg:text-sm font-mono rounded-full flex items-center gap-2 border border-zinc-700">
                        <project.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                        {project.type}
                      </span>
                      <span className="text-zinc-400 text-xs lg:text-sm font-medium tracking-wide">{project.scale}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 leading-tight truncate">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-300 text-sm md:text-base lg:text-xl leading-relaxed max-w-2xl font-light whitespace-normal">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 lg:gap-3 mt-6 lg:mt-10">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1.5 lg:px-4 lg:py-2 border border-zinc-700 text-zinc-300 rounded-xl text-xs lg:text-sm bg-zinc-900/80 backdrop-blur-sm whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${isActive ? 'opacity-0 z-0 pointer-events-none' : 'opacity-100 z-10 delay-300'}`}>
                  <div className="whitespace-nowrap text-lg md:text-xl font-bold text-zinc-600 tracking-widest transition-colors duration-300 group-hover:text-zinc-400 md:[writing-mode:vertical-lr] md:[text-orientation:mixed]">
                    {project.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div 
          className="md:hidden flex-1 min-h-0 w-full relative mb-1 transition-all duration-300"
          style={{
            maskImage: activeIndex === projects.length - 1 
              ? 'linear-gradient(to left, black 85%, transparent 100%)'
              : 'linear-gradient(to right, black 85%, transparent 100%)',
            WebkitMaskImage: activeIndex === projects.length - 1
              ? 'linear-gradient(to left, black 85%, transparent 100%)'
              : 'linear-gradient(to right, black 85%, transparent 100%)'
          }}
        >
          <div 
            ref={mobileProjectScrollRef}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 w-full h-full"
            onScroll={(e) => {
              const target = e.currentTarget;
              const child = target.children[0] as HTMLElement;
              const gap = 16;
              const cardWidthWithGap = child.offsetWidth + gap;
              const index = Math.round(target.scrollLeft / cardWidthWithGap);
              setActiveIndex((current) => current === index ? current : index);
            }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => handleMobileProjectClick(i)}
                className="snap-start shrink-0 w-[85%] h-full relative overflow-hidden rounded-3xl bg-zinc-800/60 ring-1 ring-inset ring-zinc-600 shadow-xl cursor-pointer"
              >
                <div className="absolute top-0 right-5 text-[5.5rem] leading-none font-black text-white/[0.05] select-none pointer-events-none">
                  0{i + 1}
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-start">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="px-3 py-1.5 bg-zinc-950/80 text-zinc-300 text-xs font-mono rounded-full flex items-center gap-2 border border-zinc-700">
                      <project.icon className="w-3 h-3" />
                      {project.type}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight truncate">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-300 text-sm leading-relaxed font-light whitespace-normal">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-3 py-1.5 border border-zinc-700 text-zinc-300 rounded-xl text-xs bg-zinc-900/80 backdrop-blur-sm whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 h-12 flex items-center text-zinc-400 text-xs font-medium tracking-wide">
                  {project.scale}
                </div>
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Short centered progress bar */}
        <div className="md:hidden w-32 h-1.5 mx-auto flex gap-2 overflow-hidden mt-4 shrink-0">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollTo(i)}
              className={`flex-1 h-full rounded-full cursor-pointer transition-colors duration-300 ${i === activeIndex ? 'bg-zinc-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            />
          ))}
        </div>
      </div>

      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/88 backdrop-blur-md px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:items-center md:bg-zinc-950/70 md:backdrop-blur-sm md:px-8 md:py-8"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 56, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-3xl max-h-[calc(100dvh-2rem-env(safe-area-inset-bottom))] md:max-h-[74%] rounded-[2rem] md:rounded-3xl bg-zinc-900 ring-1 ring-inset ring-zinc-800 shadow-2xl p-6 md:p-8 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                <span className="inline-flex px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3">
                  {projects[selectedProject].type} · {projects[selectedProject].scale}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {projects[selectedProject].desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0"
                aria-label="关闭项目详情"
              >
                <X className="w-4 h-4 text-zinc-300" />
              </button>
            </div>

            <div
              ref={projectDetailScrollRef}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="max-h-[calc(100dvh-206px-env(safe-area-inset-bottom))] md:max-h-[calc(74vh-210px)] overflow-y-auto overscroll-contain hide-scrollbar pr-1 [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_97%,transparent_100%)]"
            >
              <div className="space-y-5 text-zinc-300">
                {projectModalSections.map((sectionTitle) => {
                  const section = projects[selectedProject].detailSections.find((item) => item.title === sectionTitle);
                  if (!section) return null;
                  return (
                  <div key={section.title}>
                    <h4 className="text-white text-base md:text-lg font-semibold mb-3">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-zinc-500 shrink-0 shadow-[0_0_8px_rgba(161,161,170,0.35)]" />
                          <span className="leading-relaxed font-light text-sm md:text-base tracking-wide">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )})}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  );
};

const ExperienceSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const experienceAutoPreviewRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const mobileExperienceDetailRef = useAutoScrollOverflow(activeExperience, 1500, 26);
  const [isMobileExperienceScrolled, setIsMobileExperienceScrolled] = useState(false);
  const [isExperienceInView, setIsExperienceInView] = useState(false);

  const experiences = [
    {
      period: "2024.07 - 2026.06",
      company: "深圳益邦阳光有限公司",
      role: "数据组长 / AI训练师",
      tags: ["Agent轨迹", "RAG+SFT", "多模态", "团队管理"],
      details: [
        "入职初期以标注员身份参与对外图片理解项目，因质量表现与规则贡献于2025.06晋升数据组长，统筹8人执行团队。",
        "先后负责意图分类、RAG+SFT、PO多模态识别、Agent轨迹等方向的规则制定、数据执行、质检复盘与模型效果验证。",
        "根据项目风险切换试标全检、日常抽检、双人标注、高风险字段100%核查等策略，建立争议样本上报与规则迭代机制。",
        "善用Dify和Claude Code优化流程，搭建多模型候选回答批量收集工作流，并编写Agent轨迹格式预检脚本，减少低级格式错误占用质检时间。"
      ]
    },
    {
      period: "2023.04 - 2024.06",
      company: "行吟信息科技（上海）有限公司（小红书）",
      role: "图文内容标注 / 质检专员",
      tags: ["图文理解", "标签体系", "抽检返修", "错误归因"],
      details: [
        "负责图文笔记多维度标注，综合封面图、图片组、标题、正文和话题标签，完成内容类目、主题标签、内容意图、场景标签、图文一致性、低质风险等字段标注。",
        "后期因准确率稳定参与同组样本抽检与返修跟进，重点检查主类目判断、图文一致性和低质风险字段。",
        "整理高频错误并协助统一判断口径，熟悉大规模内容数据项目的批次交付与质量闭环。",
        "参与约30万条图文笔记数据的3批次交付，个人累计完成约15,000条标注，参与约5,000条样本抽检与返修，项目整体抽检通过率95%以上。"
      ]
    },
    {
      period: "2021.03 - 2023.04",
      company: "上海知渔信息科技有限公司",
      role: "UI设计师",
      tags: ["C端APP", "B端后台", "视觉规范", "UI走查"],
      details: [
        "负责青芒天气、青芒日历等C端工具类APP，以及知渔管理系统等B端后台的UI设计。",
        "参与需求沟通、竞品分析、页面流程梳理、高保真设计、切图标注和开发交接。",
        "结合Ant Design等后台设计规范，输出表单、列表、筛选、弹窗、数据看板等页面样式，提升一致性和开发效率。",
        "配合产品、开发、测试完成页面落地，沉淀APP端与B端后台基础视觉规范，减少重复设计和开发沟通成本。"
      ]
    }
  ];

  useEffect(() => {
    const sectionEl = document.getElementById("experience");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      setIsExperienceInView(isIntersecting);
      if (!isIntersecting) {
        experienceAutoPreviewRef.current = false;
        setCurrentIndex(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isExperienceInView || activeExperience !== null || experienceAutoPreviewRef.current) return;
    experienceAutoPreviewRef.current = true;
    const timers: number[] = [];
    experiences.forEach((_, index) => {
      if (index === 0) return;
      timers.push(window.setTimeout(() => scrollTo(index), index * 620));
    });
    timers.push(window.setTimeout(() => scrollTo(0), experiences.length * 620 + 620));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeExperience, experiences.length, isExperienceInView]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const child = target.children[0] as HTMLElement;
    const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 768 ? 24 : 16;
    const cardWidthWithGap = child.offsetWidth + gap;
    const index = Math.round(target.scrollLeft / cardWidthWithGap);
    setCurrentIndex((current) => current === index ? current : index);
  };

  const handleMobileExperienceScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrolled = e.currentTarget.scrollTop > 6;
    setIsMobileExperienceScrolled((current) => current === scrolled ? current : scrolled);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current;
    const child = target.children[0] as HTMLElement;
    const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 768 ? 24 : 16;
    const cardWidthWithGap = child.offsetWidth + gap;
    target.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleDesktopDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
  };

  const handleDesktopDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !dragStartRef.current) return;
    const delta = e.clientX - dragStartRef.current.x;
    scrollRef.current.scrollLeft = dragStartRef.current.scrollLeft - delta;
  };

  const handleDesktopDragEnd = () => {
    if (!scrollRef.current || !dragStartRef.current) return;
    const target = scrollRef.current;
    const child = target.children[0] as HTMLElement;
    const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 768 ? 24 : 16;
    const cardWidthWithGap = child.offsetWidth + gap;
    const index = Math.round(target.scrollLeft / cardWidthWithGap);
    dragStartRef.current = null;
    scrollTo(index);
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === experiences.length - 1;

  return (
    <SectionWrapper id="experience" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Experience" 
          title="工作经历" 
          desc="从内容标注、UI设计到AI数据组长，持续沉淀规则设计、质量体系与团队执行能力。" 
        />

        <div
          onScroll={handleMobileExperienceScroll}
          className={`md:hidden flex-1 min-h-0 w-full relative mb-1 overflow-y-auto hide-scrollbar ${
            isMobileExperienceScrolled
              ? "[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_78%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,transparent_0%,black_10%,black_78%,transparent_100%)]"
              : "[mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
          }`}
        >
          <div
            className={`absolute left-[11px] top-0 bottom-0 w-1 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.28)] ${
              isMobileExperienceScrolled
                ? "bg-gradient-to-b from-transparent via-white/70 to-transparent"
                : "bg-gradient-to-b from-white via-white/70 to-transparent"
            }`}
          />
          <div className="flex flex-col gap-3 pl-8 pb-24">
            {experiences.map((exp, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[27px] top-7 h-4 w-4 rounded-full bg-zinc-950 ring-2 ring-white shadow-[0_0_14px_rgba(255,255,255,0.55)] z-10">
                  <span className="absolute inset-1 rounded-full bg-white" />
                </span>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                  onClick={() => setActiveExperience(i)}
                  className="relative w-full rounded-3xl bg-zinc-900 p-4 text-left ring-1 ring-inset ring-zinc-800 shadow-xl overflow-hidden flex flex-col active:scale-[0.99] transition-transform"
                >
                  <div className="relative z-10">
                    <span className="inline-flex px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono mb-2.5">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight tracking-tight mb-2.5">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="relative z-10 mt-auto flex items-end justify-between gap-4">
                    <div className="text-zinc-400 font-medium text-xs leading-snug">
                      {exp.company}
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-zinc-300" />
                    </span>
                  </div>
                  <div className="absolute right-[-18%] top-[-30%] w-[60%] h-[140%] bg-gradient-to-l from-zinc-800/30 to-transparent pointer-events-none rounded-full blur-3xl opacity-70" />
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="hidden md:block flex-1 min-h-0 w-full relative mb-1 md:mb-0 transition-all duration-300 md:[mask-image:none_!important] md:[WebkitMaskImage:none_!important]"
          style={{
            maskImage: currentIndex === experiences.length - 1 
              ? 'linear-gradient(to left, black 85%, transparent 100%)'
              : 'linear-gradient(to right, black 85%, transparent 100%)',
            WebkitMaskImage: currentIndex === experiences.length - 1
              ? 'linear-gradient(to left, black 85%, transparent 100%)'
              : 'linear-gradient(to right, black 85%, transparent 100%)'
          }}
        >
          {/* Desktop Fade Overlays */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-16 lg:w-24 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: currentIndex > 0 ? 1 : 0 }} />
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-16 lg:w-24 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: currentIndex < experiences.length - 1 ? 1 : 0 }} />

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleDesktopDragStart}
            onMouseMove={handleDesktopDragMove}
            onMouseUp={handleDesktopDragEnd}
            onMouseLeave={handleDesktopDragEnd}
            className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center gap-4 md:gap-6 lg:gap-8 w-full md:px-0 left-0 select-none"
          >
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                onClick={() => scrollTo(i)}
                className={`snap-start shrink-0 w-[85%] md:w-[85%] h-full md:h-[calc(100%-2rem)] max-h-[600px] bg-zinc-900 rounded-3xl p-6 pt-8 pb-4 md:p-10 lg:p-14 flex flex-col md:flex-row ring-1 ring-inset ring-zinc-800 relative overflow-hidden shadow-xl transition-colors duration-300 ${
                  i === currentIndex ? "cursor-default" : "cursor-pointer hover:bg-zinc-800/80"
                }`}
              >
              {/* Left Column */}
              <div className="md:w-[35%] lg:w-[30%] flex flex-col justify-start shrink-0 relative z-10 mb-4 md:mb-0">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-full text-zinc-400 text-sm font-mono mb-4 lg:mb-8">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight mb-2 md:mb-4 tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-zinc-400 font-medium text-base md:text-lg lg:text-2xl">
                    {exp.company}
                  </div>
                </div>
              </div>

              {/* Right List (Scrollable on internal content) */}
              <div className="flex-1 md:w-[65%] lg:w-[70%] overflow-hidden md:border-l md:border-zinc-800 md:pl-8 lg:pl-16 relative z-10 pr-2 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_75%,transparent_100%)] md:[mask-image:none] md:[WebkitMaskImage:none]">
                <div className="h-full overflow-y-auto hide-scrollbar pb-16 md:pb-0">
                  <ul className="space-y-4 md:space-y-6 lg:space-y-8 text-zinc-300">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start">
                        <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-zinc-500 shrink-0 shadow-[0_0_8px_rgba(161,161,170,0.35)]" />
                        <span className="leading-relaxed font-light text-sm md:text-base lg:text-lg tracking-wide">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Subtle background element */}
              <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[150%] bg-gradient-to-l from-zinc-800/20 to-transparent pointer-events-none rounded-full blur-3xl opacity-50" />
            </div>
          ))}
          </div>
        </div>

        {/* Short centered progress bar for all devices */}
        <div className="hidden md:flex w-24 md:w-32 h-1.5 mx-auto gap-2 overflow-hidden mt-4 shrink-0">
          {experiences.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollTo(i)}
              className={`flex-1 h-full rounded-full cursor-pointer transition-colors duration-300 ${i === currentIndex ? 'bg-zinc-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            />
          ))}
        </div>

      </div>

      {activeExperience !== null && (
        <div className="md:hidden fixed inset-0 z-[100] flex items-end justify-center bg-zinc-950/80 backdrop-blur-sm px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" onClick={() => setActiveExperience(null)}>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[calc(100dvh-2rem-env(safe-area-inset-bottom))] rounded-[2rem] bg-zinc-900 ring-1 ring-inset ring-zinc-800 shadow-2xl p-6 pb-8 overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="inline-flex px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3">
                  {experiences[activeExperience].period}
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                  {experiences[activeExperience].role}
                </h3>
                <div className="text-zinc-400 font-medium text-sm">
                  {experiences[activeExperience].company}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveExperience(null)}
                className="w-9 h-9 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0"
                aria-label="关闭经历详情"
              >
                <X className="w-4 h-4 text-zinc-300" />
              </button>
            </div>
            <div
              ref={mobileExperienceDetailRef}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="max-h-[calc(100dvh-170px-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain hide-scrollbar pr-1 [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_94%,transparent_100%)]"
            >
              <ul className="space-y-4 text-zinc-300">
                {experiences[activeExperience].details.map((detail, j) => (
                  <li key={j} className="flex items-start">
                    <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-zinc-500 shrink-0 shadow-[0_0_8px_rgba(161,161,170,0.35)]" />
                    <span className="leading-relaxed font-light text-sm tracking-wide">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  );
};

const ContactSection = () => {
  const [contactFeedback, setContactFeedback] = useState<{ label: string; message: string } | null>(null);
  const contacts = [
    { label: "邮箱", value: "hi@dengshuming.com", icon: Mail, action: "copy", copyValue: "hi@dengshuming.com" },
    { label: "电话", value: "153-0790-1581", icon: Phone, action: "phone", copyValue: "153-0790-1581" },
    { label: "网站", value: "dengshuming.com", icon: Globe, action: "link", href: "https://dengshuming.com" },
    { label: "简历", value: "下载完整PDF", icon: FileText, action: "download", href: "./resume.pdf" }
  ];

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  };

  const handleContactClick = async (contact: typeof contacts[number]) => {
    if (contact.action === "copy" && contact.copyValue) {
      await copyText(contact.copyValue);
      setContactFeedback({ label: contact.label, message: "已复制" });
      window.setTimeout(() => {
        setContactFeedback(null);
      }, 1500);
      return;
    }

    if (contact.action === "phone" && contact.copyValue) {
      await copyText(contact.copyValue);
      setContactFeedback({ label: contact.label, message: "已复制" });
      window.setTimeout(() => {
        setContactFeedback(null);
      }, 1500);

      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (isMobile) {
        window.setTimeout(() => {
          window.location.href = `tel:${contact.copyValue.replace(/\D/g, "")}`;
        }, 450);
      }
      return;
    }

    if (contact.action === "link" && contact.href) {
      setContactFeedback({ label: contact.label, message: "打开中" });
      window.setTimeout(() => {
        setContactFeedback(null);
      }, 1500);
      window.open(contact.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (contact.action === "download" && contact.href) {
      setContactFeedback({ label: contact.label, message: "下载中" });
      window.setTimeout(() => {
        setContactFeedback(null);
      }, 1500);
      const link = document.createElement("a");
      link.href = contact.href;
      link.download = "邓述明 - AI数据训练师-15307901581.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Contact" 
          title="联系我" 
          desc="可承接AI数据规则设计、质检体系建设、RAG/SFT样本构建、多模态文档理解与Agent轨迹数据相关工作" 
        />

        <div className="flex-1 min-h-0 w-full relative flex flex-col justify-start pb-0 md:pb-16">
          <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 items-center">
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                role="button"
                tabIndex={0}
                whileHover={{ y: -5 }}
                onClick={() => handleContactClick(contact)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleContactClick(contact);
                  }
                }}
                className="relative overflow-hidden bg-zinc-900 rounded-2xl md:rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer shadow-xl ring-1 ring-inset ring-transparent hover:ring-zinc-700 w-full group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 mb-4 md:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:border-zinc-600">
                  <contact.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="text-center flex flex-col justify-center min-w-0">
                  <h4 className="text-white text-base md:text-lg lg:text-xl font-medium mb-1.5">{contact.label}</h4>
                  <p className="text-zinc-400 text-xs md:text-sm lg:text-base transition-colors group-hover:text-zinc-300 truncate">
                    {contact.value}
                  </p>
                </div>
                {contactFeedback?.label === contact.label && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/86 backdrop-blur-sm"
                  >
                    <span className="rounded-full border border-zinc-700 bg-zinc-900/95 px-5 py-2 text-sm md:text-base font-medium text-white shadow-xl">
                      {contactFeedback.message}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <FooterLegal className="absolute bottom-6 left-0 w-full text-center text-zinc-600 text-sm font-mono tracking-wider pointer-events-none hidden md:flex z-10" />
    </SectionWrapper>
  );
};

const FooterLegal = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}>
    <span>© 2026 DACHENGZI</span>
    <span className="text-zinc-700">·</span>
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noreferrer"
      className="pointer-events-auto transition-colors hover:text-zinc-300"
    >
      粤ICP备2026069686号-1
    </a>
  </div>
);

export default function App() {
  return (
    <div className="bg-zinc-950 text-white font-sans selection:bg-zinc-800 selection:text-white h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory scroll-smooth relative overflow-x-hidden hide-scrollbar">
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />
      <Navbar />
      <div className="w-full relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
      
      {/* Mobile Fixed Footer */}
      <FooterLegal className="md:hidden fixed bottom-4 left-0 w-full text-center text-zinc-600 text-[10px] font-mono tracking-widest pointer-events-none z-50 mix-blend-difference" />
    </div>
  );
}
