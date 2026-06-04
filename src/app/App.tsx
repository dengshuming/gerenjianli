import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Mail, FileText, ArrowUpRight, Database, Box, Layers, BrainCircuit, Activity, Network, ChevronLeft, ChevronRight, X, Phone, Globe } from "lucide-react";
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
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-full px-3 md:px-4 h-14 flex items-center shadow-2xl w-[calc(100vw-48px)] max-w-[460px]"
    >
      <a 
        href="#hero" 
        onClick={(e) => handleNavClick(e, "hero")} 
        className={`inline-flex h-10 flex-[1.15] basis-0 min-w-0 items-center justify-center font-black tracking-widest text-base leading-[1] cursor-pointer transition-all px-2 ${
          activeSection === "hero" 
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        DSM.
      </a>
      
      <div className="flex flex-[4] min-w-0 items-center gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`relative inline-flex h-10 flex-1 basis-0 min-w-0 items-center justify-center px-2 text-sm leading-[1] transition-all duration-300 rounded-full ${
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
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tight uppercase text-white">DENG</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tight uppercase text-white">SHU</span>
            <span className="text-shimmer inline-block text-[16vw] leading-[0.95] font-black tracking-tight uppercase text-white">MING</span>
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
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">AI项目经理助理</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">数据规则设计</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">模型落地执行</span>
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
            className="hidden lg:flex lg:col-span-5 w-full bg-zinc-900 rounded-3xl p-0 flex-col justify-between relative overflow-hidden group shadow-2xl ring-1 ring-inset ring-zinc-800 will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 to-zinc-950 opacity-80" />
            <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-950">
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
                  "全流程数据经验：具备从需求拆解、标注规则制定、样本构建、质检验收到bad case复盘的完整数据项目执行经验，覆盖分类、问答、多模态等多种数据类型。",
                  "规则与质量意识：注重标注边界的清晰定义和规则文档的完整性，能够将模糊需求转化为可执行的标注规范，降低标注歧义和返修率，所负责项目的样本抽检合格率均达95%以上。",
                  "跨职能沟通能力：具备UI设计背景，理解产品逻辑与用户路径，能够在算法、业务、运营等多方协作中准确理解需求出发点，有效减少沟通成本。"
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
                { label: "数据样本规模", value: "1W+", icon: Database },
                { label: "落地项目", value: "3项", icon: Network },
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
  const projectModalScrollRef = useRef<HTMLDivElement>(null);
  const projectAutoStoppedRef = useRef(false);
  const projectAutoScrollRef = useRef(false);
  const projectModalAutoStoppedRef = useRef(false);
  const projectModalSections = ["项目背景", "我的角色", "核心价值"];

  useEffect(() => {
    const sectionEl = document.getElementById("projects");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setActiveIndex(0);
        projectAutoStoppedRef.current = false;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const isMobileProjectView = () => window.matchMedia("(max-width: 767px)").matches;

  const stopProjectAutoCarousel = () => {
    if (isMobileProjectView() && !projectAutoScrollRef.current) {
      projectAutoStoppedRef.current = true;
    }
  };

  const stopProjectModalAutoScroll = () => {
    projectModalAutoStoppedRef.current = true;
  };

  const getProjectPeriod = (scale: string) => {
    const period = scale.match(/\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2}/);
    return period ? period[0] : scale;
  };

  const scrollTo = (index: number, userInitiated = true) => {
    if (!scrollRef.current) return;
    if (userInitiated) {
      stopProjectAutoCarousel();
    }
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
      title: "海外PO采购单识别",
      type: "多模态 PO",
      scale: "2025.04 - 2026.06",
      desc: "针对海外客户PO图片和PDF文件，制定字段抽取、完整性判断和结构化输出规则，提升采购单关键信息识别稳定性。",
      tags: ["字段规则", "团队管理", "评测集", "bad case"],
      detailSections: [
        { title: "项目背景", items: ["海外客户PO采购单存在图片和PDF两种文件类型，版式、字段位置和表达方式不统一，字段缺失、不可读、格式异常等情况会影响模型稳定输出，需要建立可执行的字段抽取和人工复核判断标准。"] },
        { title: "我的角色", items: ["字段标注规则设计：针对PO图片和PDF两种文件类型，制定字段抽取规则和完整性判断标准，定义字段缺失、不可读、格式异常三类情况的标注方式，要求模型输出结构化字段结果的同时标记是否需人工复核。", "标注团队管理：根据标注员能力水平和PO文件复杂度进行任务匹配，优先将产品型号、金额、币种等高风险字段分配给经验较强的标注员，同步规则培训，把控整体进度和准确率。", "评测集建设：从合格样本中抽取500条固定评测集，覆盖不同PO版式、字段缺失、型号格式复杂等典型难样本，用于验证模型在各类文件和高风险字段上的识别效果。", "Bad case迭代：区分模型预提取错误和人工标注错误，针对型号漏后缀、金额币种格式混乱、多余字段未剔除等问题，修订标注规则和完整性判断标准，补充评测样本。"] },
        { title: "核心价值", items: ["基于500条固定人工评测集验证，模型关键字段抽取准确率由初版约74%提升至88%。", "通过字段完整性判断规则和结构化输出规范优化，新增对缺失字段、不可读字段、格式异常的标记能力，结构化输出格式合规率达到92%。"] }
      ],
      icon: Box
    },
    {
      title: "售后智能客服RAG+SFT",
      type: "RAG + SFT",
      scale: "8,000条 / 2024.10-2025.03",
      desc: "围绕储能APP售后高频问题，清洗知识库、建立术语映射并构建SFT问答样本，提升检索命中和首轮应答覆盖。",
      tags: ["知识库清洗", "术语映射", "SFT问答", "质检复盘"],
      detailSections: [
        { title: "项目背景", items: ["储能APP售后场景中，用户高频咨询集中在配网失败、设备离线、APP无数据等问题。原始知识来自售后FAQ、产品手册和操作视频文本，需要筛除动态信息、统一术语表达，并沉淀可检索、可回答的标准样本。"] },
        { title: "我的角色", items: ["知识库清洗：梳理售后FAQ、产品手册、操作视频文本，制定入库边界，保留稳定操作步骤和排查流程，排除设备状态、SN绑定关系等动态信息，确保知识库内容准确可依据。", "术语映射表建立：整理数采器、配网、SOC、设备离线、蓝牙等产品专有词汇和用户常见问法，建立术语与Query改写映射表，统一召回关键词和回答中的术语表达。", "SFT问答样本构建：围绕配网失败、设备离线、APP无数据等高频场景，设计“多模型候选回答-人工优选-标准答案改写”的样本流程，制定回答选择标准和改写规则。", "质检与bad case复盘：抽检标注和改写数据，重点核查幻觉回答、召回失败、术语不一致等问题，整理bad case反哺标注规则和评测样本，推动后续迭代。"] },
        { title: "核心价值", items: ["通过知识清洗、术语补充和Query改写优化，RAG Top-3检索命中率由72%提升至86%，建立约150条术语与Query改写映射记录。", "交付约8,000条RAG问答标准样本及SFT训练数据，样本抽检合格率达95%以上；试运行阶段高频售后问题首轮自动应答覆盖率约65%。"] }
      ],
      icon: Database
    },
    {
      title: "客服消息分类意图识别",
      type: "Intent 数据",
      scale: "3,000条 / 2024.07-2024.09",
      desc: "从零建立售前咨询、售后咨询、闲聊兜底三类意图标签，清洗客服消息并建设固定评测集。",
      tags: ["意图分类", "难样本", "规则培训", "模型评测"],
      detailSections: [
        { title: "项目背景", items: ["储能APP客服入口同时承接售前咨询、售后咨询和闲聊兜底类消息，需要基于完整对话上下文建立清晰的意图分级和分流规则，支撑本地部署模型完成客服消息自动识别。"] },
        { title: "我的角色", items: ["意图分类体系设计：从零建立售前咨询、售后咨询、闲聊兜底三类主标签，细化价格咨询、设备异常、APP使用等典型场景，制定基于完整对话上下文的判断规则，明确各类分流去向。", "数据清洗与难样本处理：组织历史客服消息清洗，重点复核售前售后边界模糊、上下文不完整、英文口语化表达等难判断样本，制定边界样本的标注规范，保证标签一致性。", "规则培训与迭代：组织标注员规则培训，跟进标注过程中的边界问题，针对误标样本及时修订规则并同步全员，推动整体准确率持续提升。", "模型评测：从合格样本中划出500条固定评测集，对训练后的本地部署模型进行意图识别效果验证，分析售前售后混淆、闲聊误判等典型错误类型，定位规则漏洞并反向修订标注规范。"] },
        { title: "核心价值", items: ["构建约3,000条客服消息意图识别样本，其中500条作为固定评测集，样本抽检合格率达到95%以上。", "支撑本地部署模型完成三类意图验证，一级意图识别准确率约85%。"] }
      ],
      icon: BrainCircuit
    }
  ];

  useEffect(() => {
    const sectionEl = document.getElementById("projects");
    if (!sectionEl) return;

    let timeoutIds: number[] = [];

    const stopSequence = () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      timeoutIds = [];
      projectAutoScrollRef.current = false;
    };

    const queueStep = (index: number, delay: number, shouldStopAfter = false) => {
      const timeoutId = window.setTimeout(() => {
        if (projectAutoStoppedRef.current || selectedProject !== null || !isMobileProjectView()) {
          stopSequence();
          return;
        }
        projectAutoScrollRef.current = true;
        scrollTo(index, false);
        window.setTimeout(() => {
          projectAutoScrollRef.current = false;
        }, 700);
        if (shouldStopAfter) {
          projectAutoStoppedRef.current = true;
        }
      }, delay);
      timeoutIds.push(timeoutId);
    };

    const startSequence = () => {
      if (timeoutIds.length || projectAutoStoppedRef.current || !isMobileProjectView()) return;
      projectAutoScrollRef.current = true;
      scrollTo(0, false);
      window.setTimeout(() => {
        projectAutoScrollRef.current = false;
      }, 350);
      queueStep(1, 650);
      queueStep(2, 1300);
      queueStep(0, 1950, true);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startSequence();
      } else {
        stopSequence();
      }
    }, { threshold: 0.65 });

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      stopSequence();
    };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === null) return;

    projectModalAutoStoppedRef.current = false;
    const scroller = projectModalScrollRef.current;
    if (!scroller) return;

    scroller.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    const startDelay = window.setTimeout(() => {
      const intervalId = window.setInterval(() => {
        if (projectModalAutoStoppedRef.current) {
          window.clearInterval(intervalId);
          return;
        }

        const reachedEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        if (reachedEnd) {
          window.clearInterval(intervalId);
          return;
        }

        scroller.scrollTop += isMobileProjectView() ? 0.8 : 1;
      }, 24);
    }, 900);

    return () => {
      window.clearTimeout(startDelay);
      projectModalAutoStoppedRef.current = true;
    };
  }, [selectedProject]);

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
            onPointerDown={stopProjectAutoCarousel}
            onTouchStart={stopProjectAutoCarousel}
            onWheel={stopProjectAutoCarousel}
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
              onClick={() => scrollTo(i, true)}
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
            className="w-full md:max-w-3xl h-[60dvh] md:h-auto max-h-[60dvh] md:max-h-[74%] rounded-[2rem] md:rounded-3xl bg-zinc-900 ring-1 ring-inset ring-zinc-800 shadow-2xl p-6 md:p-8 overflow-hidden flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-5 shrink-0">
              <div className="min-w-0">
                <span className="inline-flex px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3">
                  {getProjectPeriod(projects[selectedProject].scale)}
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
              ref={projectModalScrollRef}
              onWheel={(e) => {
                stopProjectModalAutoScroll();
                e.stopPropagation();
              }}
              onTouchStart={stopProjectModalAutoScroll}
              onTouchMove={(e) => {
                stopProjectModalAutoScroll();
                e.stopPropagation();
              }}
              onPointerDown={stopProjectModalAutoScroll}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain hide-scrollbar pr-1 pb-7 [mask-image:linear-gradient(to_bottom,black_0%,black_86%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_0%,black_86%,transparent_100%)] md:max-h-[calc(74vh-210px)]"
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
  const experienceAutoStoppedRef = useRef(false);
  const experienceAutoScrollRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [isMobileExperienceScrolled, setIsMobileExperienceScrolled] = useState(false);

  const experiences = [
    {
      period: "2024.03 - 2026.06",
      company: "深圳益邦阳光有限公司",
      role: "AI项目经理助理",
      tags: ["规则撰写", "团队培训", "质检验收", "bad case"],
      details: [
        "参与公司储能业务AI项目落地，负责客服消息分流、售后问答、多模态PO识别三个方向的数据工作，覆盖需求拆解、规则制定、样本构建到质检交付的完整流程。",
        "负责标注规则撰写与团队培训，统筹标注任务分配、质检验收和bad case复盘，推动规则持续迭代，三个项目样本抽检合格率均达95%以上。",
        "围绕PO字段抽取、RAG知识库清洗、术语与Query改写、SFT问答样本和客服意图识别，沉淀可复用的数据规则与验收标准。",
        "配合业务、算法和标注团队定位模型预提取错误、人工标注错误和规则边界问题，将复盘结果反向补充到评测集和标注规范中。"
      ]
    },
    {
      period: "2021.03 - 2024.05",
      company: "上海知渔信息科技有限公司",
      role: "UI设计师",
      tags: ["C端APP", "B端后台", "视觉规范", "UI走查"],
      details: [
        "负责公司多款工具类产品和后台系统设计，包括青芒天气、青芒日历等C端APP，以及知渔管理系统等B端后台。",
        "参与需求沟通、竞品分析、页面流程梳理、高保真设计、切图标注和UI走查，配合产品、开发、测试完成页面落地，并沉淀基础视觉规范。",
        "结合Ant Design等后台设计规范，输出表单、列表、筛选、弹窗、数据看板等页面样式，提升一致性和开发效率。",
        "跟进多个版本的需求变更，维护并更新C端和B端视觉规范文档，减少跨版本重复设计和开发沟通成本。"
      ]
    },
    {
      period: "2021.09 - 2024.06",
      company: "天津大学",
      role: "学生",
      tags: ["计算机科学", "数据结构", "算法", "人机交互"],
      details: [
        "系统学习计算机科学基础课程，覆盖数据结构、算法设计、操作系统与数据库原理等核心方向。",
        "完成面向真实业务场景的课程项目练习，理解从需求拆解、数据建模到功能实现的完整过程。",
        "持续关注人工智能与人机交互方向，积累将技术逻辑转化为产品体验的基础能力。",
        "参与团队协作式项目训练，熟悉文档沉淀、任务拆分与阶段性复盘。"
      ]
    }
  ];

  useEffect(() => {
    const sectionEl = document.getElementById("experience");
    if (!sectionEl) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setCurrentIndex(0);
        experienceAutoStoppedRef.current = false;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }
      }
    }, { threshold: 0 });
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  const isDesktopExperienceView = () => window.matchMedia("(min-width: 768px)").matches;

  const stopExperienceAutoCarousel = () => {
    if (isDesktopExperienceView() && !experienceAutoScrollRef.current) {
      experienceAutoStoppedRef.current = true;
    }
  };

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

  const scrollTo = (index: number, userInitiated = true) => {
    if (!scrollRef.current) return;
    if (userInitiated) {
      stopExperienceAutoCarousel();
    }
    const target = scrollRef.current;
    const child = target.children[0] as HTMLElement;
    const gap = window.innerWidth >= 1024 ? 32 : window.innerWidth >= 768 ? 24 : 16;
    const cardWidthWithGap = child.offsetWidth + gap;
    target.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const handleDesktopDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    stopExperienceAutoCarousel();
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

  useEffect(() => {
    const sectionEl = document.getElementById("experience");
    if (!sectionEl) return;

    let intervalId: number | undefined;

    const stopInterval = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const startInterval = () => {
      if (intervalId || experienceAutoStoppedRef.current || !isDesktopExperienceView()) return;
      window.setTimeout(() => {
        if (!experienceAutoStoppedRef.current && isDesktopExperienceView()) {
          experienceAutoScrollRef.current = true;
          scrollTo(1, false);
          window.setTimeout(() => {
            experienceAutoScrollRef.current = false;
          }, 700);
        }
      }, 900);
      intervalId = window.setInterval(() => {
        if (experienceAutoStoppedRef.current || !isDesktopExperienceView()) {
          stopInterval();
          return;
        }
        experienceAutoScrollRef.current = true;
        setCurrentIndex((current) => {
          const next = (current + 1) % experiences.length;
          scrollTo(next, false);
          return next;
        });
        window.setTimeout(() => {
          experienceAutoScrollRef.current = false;
        }, 700);
      }, 3200);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        experienceAutoStoppedRef.current = false;
        experienceAutoScrollRef.current = true;
        scrollTo(0, false);
        window.setTimeout(() => {
          experienceAutoScrollRef.current = false;
        }, 350);
        startInterval();
      } else {
        stopInterval();
      }
    }, { threshold: 0.65 });

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      stopInterval();
    };
  }, []);

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
            onWheel={(e) => {
              if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                stopExperienceAutoCarousel();
              }
            }}
            className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center gap-4 md:gap-6 lg:gap-8 w-full md:px-0 left-0 select-none"
          >
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                onClick={() => scrollTo(i, true)}
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
              <div className="flex-1 md:w-[65%] lg:w-[70%] overflow-hidden md:border-l md:border-zinc-800 md:pl-8 lg:pl-16 relative z-10 pr-2 [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]">
                <div className="h-full overflow-y-auto hide-scrollbar pb-16 md:pb-12">
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
              onClick={() => scrollTo(i, true)}
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
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [copyToast, setCopyToast] = useState("");
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
      setCopiedContact(contact.label);
      setCopyToast(`${contact.label}已复制`);
      window.setTimeout(() => {
        setCopiedContact(null);
        setCopyToast("");
      }, 1800);
      return;
    }

    if (contact.action === "phone" && contact.copyValue) {
      await copyText(contact.copyValue);
      setCopiedContact(contact.label);
      setCopyToast(`${contact.label}已复制`);
      window.setTimeout(() => {
        setCopiedContact(null);
        setCopyToast("");
      }, 1800);

      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (isMobile) {
        window.setTimeout(() => {
          window.location.href = `tel:${contact.copyValue.replace(/\D/g, "")}`;
        }, 450);
      }
      return;
    }

    if (contact.action === "link" && contact.href) {
      window.open(contact.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (contact.action === "download" && contact.href) {
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
          desc="可承接AI数据项目执行、RAG知识库、SFT样本构建与多模态文档识别相关工作" 
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
                className="bg-zinc-900 rounded-2xl md:rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer shadow-xl ring-1 ring-inset ring-transparent hover:ring-zinc-700 w-full group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 mb-4 md:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:border-zinc-600">
                  <contact.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-zinc-500 transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="text-center flex flex-col justify-center min-w-0">
                  <h4 className="text-white text-base md:text-lg lg:text-xl font-medium mb-1.5">{contact.label}</h4>
                  <p className="text-zinc-400 text-xs md:text-sm lg:text-base transition-colors group-hover:text-zinc-300 truncate">
                    {copiedContact === contact.label ? "已复制" : contact.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full text-center text-zinc-600 text-sm font-mono tracking-wider pointer-events-none hidden md:block z-10">
        © 2026 DACHENGZI
      </div>

      {copyToast && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          className="fixed left-1/2 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-[120] -translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900/95 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-md"
        >
          {copyToast}
        </motion.div>
      )}
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
