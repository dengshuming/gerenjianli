import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Mail, MessageCircle, FileText, ArrowUpRight, Database, Box, Layers, BrainCircuit, Activity, Network, ChevronLeft, ChevronRight, BookOpen, X } from "lucide-react";
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
  <div className="w-full mb-6 md:mb-10 flex flex-col items-start md:items-center md:text-center shrink-0">
    <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-4 w-full md:w-auto">
      <div className="hidden md:block h-[1px] w-8 lg:w-12 bg-zinc-700" />
      <span className="text-sm font-mono text-zinc-400 tracking-widest uppercase">{subtitle}</span>
      <div className="h-[1px] w-8 lg:w-12 bg-zinc-700" />
    </div>
    <div className="flex items-center justify-between w-full md:w-auto md:justify-center gap-4 mb-2 md:mb-4">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-left md:text-center leading-none py-1">
        {title}
      </h2>
      {rightElement}
    </div>
    {desc && (
      <p className="text-zinc-400 text-sm md:text-base lg:text-lg font-light text-left md:text-center w-full md:whitespace-nowrap md:truncate">
        {desc}
      </p>
    )}
  </div>
);

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
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tighter uppercase text-white">DENG</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tighter uppercase text-white">SHU</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tighter uppercase text-white">MING</span>
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
              <span className="text-shimmer inline-block">AI项目经理助理 · 数据规则设计 · 模型落地执行</span>
            </motion.div>
            
            {/* Mobile Stacked Subtitles (One per line) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 w-full mt-2"
            >
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• AI项目经理助理</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 数据规则设计</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 模型落地执行</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="hidden md:block text-xs md:text-sm lg:text-lg font-mono tracking-widest uppercase w-full text-zinc-400 mt-4"
            >
              RAG知识库 / SFT问答样本 / 多模态PO识别
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 mt-6 text-xs font-mono tracking-widest uppercase text-zinc-400"
            >
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">RAG知识库</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">SFT问答样本</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">多模态PO识别</span>
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
            className="hidden lg:flex lg:col-span-5 w-full bg-zinc-900 rounded-3xl p-8 flex-col justify-between relative overflow-hidden group shadow-2xl ring-1 ring-inset ring-zinc-800 will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-zinc-950 opacity-80" />
            <div className="relative z-10 flex-1 min-h-0 rounded-[1.5rem] overflow-hidden ring-1 ring-inset ring-zinc-800 bg-zinc-950">
              <img src={profilePhoto} alt="邓述明头像" className="h-full w-full object-cover object-[50%_18%] grayscale-[15%] transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]" />
            </div>
            <div className="relative z-10 text-sm tracking-widest text-zinc-500 uppercase font-mono text-center">
              DENG SHUMING
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
                  "我是一名具备AI数据项目执行经验的AI项目经理助理，参与过客服意图识别、RAG知识库、SFT问答样本、多模态PO识别等项目。",
                  "我擅长把售前/售后分流、售后知识问答、订单字段校验等业务问题，转化为可标注、可评测、可交付的数据任务。",
                  "过往UI设计背景让我更理解产品流程、用户体验和业务逻辑，能在产品、算法、客服、销售之间推动AI数据项目落地。"
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
                { label: "AI项目经验", value: "2YRS+", icon: Activity },
                { label: "PO结构化样本", value: "3500+", icon: Database },
                { label: "知识库条目", value: "4800+", icon: Network },
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const projectModalSections = ["项目背景", "我的角色", "核心价值", "我的任务", "项目成果"];

  useEffect(() => {
    const sectionEl = document.getElementById("projects");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setActiveIndex(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const target = scrollRef.current;
    const child = target.children[0] as HTMLElement;
    const gap = 16;
    const cardWidthWithGap = child.offsetWidth + gap;
    target.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const handleMobileProjectClick = (index: number) => {
    const target = scrollRef.current;
    const child = target?.children[0] as HTMLElement | undefined;
    const currentIndex = target && child
      ? Math.round(target.scrollLeft / (child.offsetWidth + 16))
      : activeIndex;

    if (index === currentIndex) {
      setSelectedProject(index);
    } else {
      scrollTo(index);
    }
  };

  const projects = [
    {
      title: "海外客户PO识别",
      type: "多模态 文档",
      scale: "3500条 / 6个月",
      desc: "围绕海外客户PO采购单，构建页面图像、OCR文本、OA字段与人工标准输出的结构化数据，用于订单字段抽取和一致性校验。",
      tags: ["OCR文本", "字段抽取", "OA校验", "bad case复盘"],
      detailSections: [
        { title: "核心价值", items: ["把格式不统一的海外客户PO转成可抽取、可校验、可评测的结构化样本，辅助销售、商务、财务提前发现错填、漏填和冲突字段。"] },
        { title: "我的角色", items: ["范围收敛｜字段清单设计｜标注格式制定｜一致性判断｜bad case复盘"] },
        { title: "项目背景", items: ["新能源储能产品采用海外B2B销售模式，销售需根据客户PO在OA/ERP中创建内部销售订单；客户PO格式不统一，型号、币种、金额等字段容易录入出错。"] },
        { title: "我的任务", items: ["收敛一期范围，聚焦客户PO采购单，支持PDF和扫描图片两类输入。", "设计客户名称、PO编号、产品型号、数量、币种、金额、交付国家等字段抽取清单。", "制定“PO页面图像/OCR文本 + OA订单字段 + 人工结构化输出”的数据格式。"] },
        { title: "项目成果", items: ["构建客户PO采购单多模态结构化样本约3,500条。", "基于500条人工评测集验证，关键字段抽取准确率达到88%，OA字段一致性判断准确率达到86%。"] }
      ],
      icon: Box
    },
    {
      title: "APP智能客服RAG+SFT",
      type: "RAG + SFT",
      scale: "4800条 / 18个月",
      desc: "将售后FAQ、产品手册和视频转写文本整理为智能客服知识库，并设计SFT问答样本生产规范，提升售后问题检索与回答质量。",
      tags: ["知识清洗", "Chunk分类", "术语表", "回答改写"],
      detailSections: [
        { title: "核心价值", items: ["把分散的售后知识转化为稳定、可检索、可用于SFT生产的垂直知识库数据。"] },
        { title: "我的角色", items: ["入库边界制定｜资料清洗切块｜知识目录搭建｜SFT样本规范｜幻觉回答控制"] },
        { title: "项目背景", items: ["公司原有售后FAQ、产品手册、操作视频文本等知识分散，用户难以快速找到对应说明，智能客服需要作为APP帮助体系的自然语言入口。"] },
        { title: "我的任务", items: ["制定知识库入库边界，将配网步骤、设备添加/解绑流程、设备离线排查SOP等稳定知识纳入知识库。", "清洗售后FAQ、产品手册、操作视频转写文本，建立设备操作知识目录，并整理多语言术语对照表。", "设计SFT阶段样本生产规范，制定候选回答选择和改写规则。"] },
        { title: "项目成果", items: ["构建多语言垂直知识库约4,800条。", "建立新能源领域术语对照表720条。", "基于300条评测集，RAG Top-3检索命中率由72%提升至86%。"] }
      ],
      icon: Database
    },
    {
      title: "客服消息意图识别",
      type: "NLP 分类",
      scale: "3000条 / 4个月",
      desc: "基于历史客服消息、销售咨询记录和售后FAQ，构建售前、售后、意图不明确三类意图体系，减少人工首轮分拣成本。",
      tags: ["意图体系", "边界样本", "分流规则", "试标抽检"],
      detailSections: [
        { title: "核心价值", items: ["把用户消息转成可分流、可训练、可评测的意图识别数据，降低售前售后首轮分拣压力。"] },
        { title: "我的角色", items: ["意图体系设计｜分流规则制定｜边界样本补充｜训练样本构建｜bad case复盘"] },
        { title: "项目背景", items: ["项目基于本地部署模型验证客服消息意图识别能力，将用户消息分为售前、售后、意图不明确三类，分别流转至销售、售后或人工判断。"] },
        { title: "我的任务", items: ["设计售前、售后、意图不明确三类一级意图体系。", "制定“售前→销售团队、售后→售后团队、意图不明确→人工判断”的分流规则。", "补充短句模糊、售前售后混合表达等边界样本，组织试标、抽检和规则优化。"] },
        { title: "项目成果", items: ["构建意图识别训练及评测样本约3,000条。", "沉淀售前/售后边界规则、人工判断标准和bad case复盘表。"] }
      ],
      icon: BrainCircuit
    },
    {
      title: "工具类APP与B端后台",
      type: "UI 设计",
      scale: "2021-2024",
      desc: "负责工具类APP、小程序、WEB后台及B端销售后台界面设计与交互优化，沉淀基础视觉规范并推动开发落地。",
      tags: ["B端后台", "交互梳理", "视觉规范", "UI走查"],
      detailSections: [
        { title: "核心价值", items: ["UI设计经历补足了我对产品流程、业务逻辑和用户体验的理解，也让后续AI数据项目更容易和产品侧对齐。"] },
        { title: "我的角色", items: ["需求沟通｜竞品分析｜流程梳理｜高保真设计｜切图标注｜UI走查"] },
        { title: "项目背景", items: ["公司需要持续迭代自研APP、小程序、WEB后台及B端销售后台，提升业务流程效率和界面一致性。"] },
        { title: "我的任务", items: ["与产品经理进行项目初期产品设定讨论，并研究B端用户体验。", "参考Ant Design进行页面设计并输出后台视觉规范，同步开发人员降低开发成本。", "系统梳理页面之间的交互逻辑并优化用户体验。"] },
        { title: "项目成果", items: ["完成多端界面设计与交互优化，配合产品、开发、测试推进页面落地。", "沉淀基础视觉规范，为后续跨部门协作提供统一设计依据。"] }
      ],
      icon: Layers
    }
  ];

  return (
    <SectionWrapper id="projects" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Projects" 
          title="项目经历" 
          desc="围绕新能源业务场景，覆盖多模态识别、RAG知识库、SFT样本与客服意图分流。" 
        />

        {/* Desktop Accordion */}
        <div className="hidden md:flex flex-row flex-1 min-h-0 w-full gap-4">
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex((current) => current === i ? current : i)}
                onClick={() => {
                  setActiveIndex(i);
                  setSelectedProject(i);
                }}
                className={`relative cursor-pointer overflow-hidden rounded-3xl group ring-1 ring-inset transition-[flex,background-color,border-color] duration-300 ease-out
                  ${isActive 
                    ? 'flex-[10] ring-zinc-600 bg-zinc-800/60' 
                    : 'flex-[1.2] ring-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/80 hover:ring-zinc-700'
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
            ref={scrollRef}
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [isMobileExperienceScrolled, setIsMobileExperienceScrolled] = useState(false);

  const experiences = [
    {
      period: "2024.03 - 2026.06",
      company: "深圳益邦阳光有限公司",
      role: "AI项目经理助理",
      tags: ["RAG", "SFT", "多模态", "质检"],
      details: [
        "参与新能源储能业务AI项目落地，覆盖客服消息分流、售后RAG知识库、SFT问答样本、多模态PO识别等方向。",
        "负责需求拆解、规则制定、样本构建、标注质检与bad case复盘，推动数据任务可标注、可评测、可交付。",
        "对接产品、算法、客服、销售等角色，将售前/售后分流、售后问答、订单字段校验等业务问题转化为数据任务。",
        "基于评测结果持续优化字段抽取、知识检索、候选回答改写和分流规则，推动模型在垂直业务场景中落地。"
      ]
    },
    {
      period: "2021.03 - 2024.03",
      company: "上海知渔信息科技有限公司",
      role: "UI设计师",
      tags: ["APP", "小程序", "WEB后台", "B端"],
      details: [
        "负责公司自研APP、小程序、WEB后台及B端销售后台的界面设计与交互优化。",
        "参与需求沟通、竞品分析、页面流程梳理、高保真设计、切图标注和UI走查。",
        "参考Ant Design输出后台视觉规范，和开发同步设计规则，降低页面实现与维护成本。",
        "配合产品、开发、测试完成页面落地，并沉淀基础视觉规范和交互梳理经验。"
      ]
    },
    {
      period: "本科",
      company: "计算机与产品体验复合背景",
      role: "教育背景",
      tags: ["业务理解", "流程梳理", "数据任务", "协作"],
      details: [
        "具备本科教育背景，长期围绕产品流程、用户体验和业务逻辑进行项目实践。",
        "从UI设计转向AI数据项目执行后，能更快理解产品需求、算法约束和业务交付边界。",
        "熟悉文档沉淀、任务拆分、规则制定和阶段性复盘，适合承担AI数据项目的执行与协调工作。",
        "能够把跨部门沟通内容整理成清晰的标注规则、评测口径和交付标准。"
      ]
    }
  ];

  useEffect(() => {
    const sectionEl = document.getElementById("experience");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setCurrentIndex(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

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
          desc="从UI设计到AI数据项目执行，持续沉淀业务拆解、规则制定与跨部门协作能力。" 
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
  const contacts = [
    { label: "邮箱", value: "hi@dengshuming.com", icon: Mail },
    { label: "电话", value: "153-0790-1581", icon: MessageCircle },
    { label: "定位", value: "AI项目经理助理", icon: BookOpen },
    { label: "简历", value: "AI训练师 / 数据项目执行", icon: FileText }
  ];

  return (
    <SectionWrapper id="contact" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Contact" 
          title="联系我" 
          desc="可承接AI数据项目执行、RAG知识库、SFT样本构建与多模态文档识别相关工作" 
        />

        <div className="flex-1 min-h-0 w-full relative flex flex-col justify-start pb-0 md:pb-16">
          <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 items-center">
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-zinc-900 rounded-2xl md:rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer shadow-xl ring-1 ring-inset ring-transparent hover:ring-zinc-700 w-full group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 mb-4 md:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:border-zinc-600">
                  <contact.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="text-center flex flex-col justify-center min-w-0">
                  <h4 className="text-white text-base md:text-lg lg:text-xl font-medium mb-1.5">{contact.label}</h4>
                  <p className="text-zinc-400 text-xs md:text-sm lg:text-base transition-colors group-hover:text-zinc-300 truncate">{contact.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full text-center text-zinc-600 text-sm font-mono tracking-wider pointer-events-none hidden md:block z-10">
        © 2026 DACHENGZI
      </div>
    </SectionWrapper>
  );
};

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
      <div className="md:hidden fixed bottom-4 left-0 w-full text-center text-zinc-600 text-[10px] font-mono tracking-widest pointer-events-none z-50 mix-blend-difference">
        © 2026 DACHENGZI
      </div>
    </div>
  );
}
