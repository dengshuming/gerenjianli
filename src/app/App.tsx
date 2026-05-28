import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronDown, Mail, MessageCircle, FileText, ArrowUpRight, Database, Box, Layers, BrainCircuit, Activity, Network, ChevronLeft, ChevronRight, BookOpen, X } from "lucide-react";

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
        viewport={{ once: false, margin: "-5%" }}
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
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    className={`text-shimmer text-center inline-block ${className}`}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="transition-opacity duration-300 inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
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
        DCZ.
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
              text="DACHENGZI" 
              className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase inline-block" 
              delay={0}
            />
          </div>
          {/* Mobile multiline title */}
          <div className="md:hidden flex flex-col items-center space-y-0 w-full">
            <span className="text-shimmer inline-block text-[18vw] leading-[0.95] font-black tracking-tighter uppercase text-white">DA</span>
            <span className="text-shimmer inline-block text-[18vw] leading-[0.95] font-black tracking-tighter uppercase text-white">CHENG</span>
            <span className="text-shimmer inline-block text-[18vw] leading-[0.95] font-black tracking-tighter uppercase text-white">ZI</span>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } } }}
            className="flex flex-col items-center space-y-4 w-full mt-4 sm:mt-0"
          >
            {/* Desktop Inline Subtitles */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="hidden md:flex text-lg md:text-2xl lg:text-3xl font-medium tracking-wide w-full justify-center"
            >
              <span className="text-shimmer inline-block">专注大模型数据构建 · 标注规则设计 · 质检流程优化</span>
            </motion.div>
            
            {/* Mobile Stacked Subtitles (One per line) */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 w-full mt-2"
            >
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 专注大模型数据构建</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 标注规则设计</span>
              <span className="inline-block text-base font-medium tracking-wide text-zinc-300">• 质检流程优化</span>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="hidden md:block text-xs md:text-sm lg:text-lg font-mono tracking-widest uppercase w-full text-zinc-400 mt-4"
            >
              RAG数据构建 / Agent SFT标注 / 多模态图文质检
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="md:hidden flex flex-col items-center space-y-3 mt-6 text-xs font-mono tracking-widest uppercase text-zinc-400"
            >
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">RAG数据构建</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">Agent SFT标注</span>
              <span className="px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800">多模态图文质检</span>
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
    <div className="md:hidden w-16 h-16 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center ring-1 ring-inset ring-zinc-800 shrink-0 shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800 leading-none relative z-10 -mt-1">D</span>
      <span className="text-[8px] tracking-widest text-zinc-500 uppercase font-mono mt-0.5 relative z-10 leading-none">DCZ</span>
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
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:col-span-5 w-full bg-zinc-900 rounded-3xl p-8 flex-col justify-between relative overflow-hidden group shadow-2xl ring-1 ring-inset ring-zinc-800 will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <span className="text-[12rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 drop-shadow-sm group-hover:from-zinc-500 group-hover:to-zinc-800 transition-all duration-700">D</span>
            </div>
            <div className="relative z-10 text-sm tracking-widest text-zinc-500 uppercase font-mono text-center">
              DACHENGZI
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
                viewport={{ once: false }}
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
                onScroll={(e) => setIsAboutTextScrolled(e.currentTarget.scrollTop > 6)}
                className="space-y-4 h-full overflow-y-auto hide-scrollbar pb-10 md:pb-0"
              >
                {[
                  "我是一名专注AI数据构建的训练师，致力于为大语言模型和多模态模型提供高质量的数据养料。拥有丰富的数据标注、规则制定和质检流程优化经验。",
                  "在AI行业的发展浪潮中，我坚信“好的数据决定了模型的上限”。我擅长将复杂业务场景拆解为清晰的数据标注SOP，并通过精细化质检把控数据质量。",
                  "拥有UI设计与AI数据双重背景，使我不仅能关注数据逻辑，还能从产品体验的角度优化数据结构和Agent交互链路。"
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
              viewport={{ once: false }}
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 lg:mt-auto pt-4 lg:pt-8 lg:h-[180px] shrink-0"
            >
              {[
                { label: "AI行业经验", value: "2YRS+", icon: Activity },
                { label: "数据类型", value: "4TYPES", icon: Database },
                { label: "能力覆盖", value: "全流程", icon: Network },
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
  const projectModalSections = ["项目背景", "我的角色", "核心价值"];

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
      title: "企业研发知识库RAG",
      type: "RAG 数据",
      scale: "10万+条 / 3个月",
      desc: "针对企业内部技术文档，构建高质量的问答对数据，优化检索增强生成效果，提升知识库回答准确率。",
      tags: ["文档切片", "QA生成", "相关性标注", "事实性检查"],
      detailSections: [
        { title: "核心价值", items: ["把分散研发文档转化为可检索、可追溯、可质检的知识库数据。"] },
        { title: "我的角色", items: ["需求承接｜规则制定｜入库标准设计｜问答质检｜bad case归因"] },
        { title: "项目背景", items: ["企业研发文档分散在PDM、DTS等多个系统，一线员工查询成本高，模型回答经常脱离文档、依赖常识生成错误答案。"] },
        { title: "我的任务", items: ["从0到1制定数据清洗、Chunk切分、入库标准和问答质检规则，覆盖6类数据源。"] },
        { title: "关键难点", items: ["文档格式不统一（PDF/Word/PPT混杂）、术语密集、不同系统更新频率不一致，固定字数切分容易破坏语义完整性。"] },
        { title: "解决方法", items: ["按文档类型制定差异化切分策略：结构化文档按标题层级切，PPT/PDF按页切。", "补充来源、版本、适用范围等元数据字段。", "Chunk从完整性、准确性、唯一性、有效性、一致性五个维度评分，低于3分不入库。"] },
        { title: "主要bad case", items: ["召回文档与问题无关。", "回答脱离文档凭常识生成。", "Chunk边界切断关键语义。"] },
        { title: "我的产出", items: ["数据清洗规范、分类入库模板、Chunk质检评分表、问答质检规则、bad case归因复盘文档。"] }
      ],
      icon: Database
    },
    {
      title: "多模态图像数据标注",
      type: "多模态 图文",
      scale: "50万+张 / 6个月",
      desc: "负责复杂场景下的图像描述、目标检测及图文对齐标注，制定多模态质检SOP，显著降低数据废品率。",
      tags: ["图文匹配", "细粒度描述", "边界框标注", "质量抽检"],
      detailSections: [
        { title: "核心价值", items: ["把设计经验拆成非设计背景标注员也能执行的图像判断规则。"] },
        { title: "我的角色", items: ["规则制定｜图例对照表设计｜标注培训｜质检抽检｜bad case归类"] },
        { title: "项目背景", items: ["多模态模型对图片内容、视觉风格、用户文本需求的理解能力不足，需要构建高质量图文对齐数据。"] },
        { title: "我的任务", items: ["制定图像质量筛选标准、图文一致性标注规则，组织标注团队完成数据生产。"] },
        { title: "关键难点", items: ["标注人员普遍没有设计背景，无法准确判断镜头类型、光影方向、构图方式、色调风格等专业视觉维度，标注一致性低。"] },
        { title: "解决方法", items: ["基于UI设计经验将视觉判断拆解为可操作规则，为每个视觉维度制作图例对照表并配置正反例图片。", "按场景类型（电商/海报/生活/产品）制定差异化判断标准。", "含水印图片设为前置过滤规则。"] },
        { title: "主要bad case", items: ["图文描述对不上。", "含水印图片混入。", "视觉风格判断不一致。", "场景类型错标。"] },
        { title: "我的产出", items: ["视觉维度判断图例对照表、场景类型定义文档、图文一致性标注规则、bad case分类归因表。"] }
      ],
      icon: Box
    },
    {
      title: "Agent会议室助手标注",
      type: "Agent SFT",
      scale: "5万+对话 / 2个月",
      desc: "设计复杂多轮对话场景，训练Agent调用API预定会议室、查询日程，构建高阶思维链(CoT)数据。",
      tags: ["Function Calling", "多轮对话", "思维链(CoT)", "意图识别"],
      detailSections: [
        { title: "核心价值", items: ["把模糊工具调用过程拆成可标注、可检查的Think/Action链路。"] },
        { title: "我的角色", items: ["规则制定｜工具清单设计｜标注培训｜质检抽检｜QA文档沉淀"] },
        { title: "项目背景", items: ["用户输入模糊指令时，模型不会合理拆解任务步骤，工具调用逻辑混乱，无法稳定完成会议室预订、查询、取消等操作。"] },
        { title: "我的任务", items: ["为Agent SFT数据构建制定标注规则，覆盖Think链路、Tool Call、Observation、Final Answer四个环节的判断标准。"] },
        { title: "关键难点", items: ["Think链路质量难以量化，标注人员对“合理推理”判断标准容易不一致。", "工具参数边界模糊，容易出现似对非对的错误调用。"] },
        { title: "解决方法", items: ["将Think链路拆分为“是否识别用户意图、是否规划了正确工具、是否考虑约束条件”三个判断维度分别打标。", "制定工具触发条件表，明确每个工具的适用场景和必填参数。"] },
        { title: "主要bad case", items: ["Think重复冗余：思考链路反复重申同一句话，无逻辑推进。", "工具调错：意图明确但调用了错误工具接口。"] },
        { title: "我的产出", items: ["工具清单及触发条件表、Think/Action双维度标注规则、bad case归因分类表、QA文档。"] }
      ],
      icon: BrainCircuit
    },
    {
      title: "长文本切片与意图分级",
      type: "NLP 文本",
      scale: "20万+段 / 4个月",
      desc: "对海量真实销售录音转文本数据进行长文切片、情感分析与意图分级，辅助销售话术模型微调。",
      tags: ["长文理解", "情感分析", "语义分块", "实体抽取"],
      detailSections: [
        { title: "核心价值", items: ["把长销售对话拆成模型可处理的短片段，并建立意图分级边界。"] },
        { title: "我的角色", items: ["切片规则设计｜意图分级标准制定｜试标｜质检复盘"] },
        { title: "项目背景", items: ["销售大模型需要根据对话录音判断客户购买意图强弱，但原始数据为长录音，模型单次输入有字数限制。"] },
        { title: "我的任务", items: ["设计意图强弱判断规则，并解决录音转文本后的切片问题。"] },
        { title: "关键难点", items: ["单条录音30-60分钟，转文本后远超模型2500字输入上限。", "强/中/弱意图的边界判断容易产生歧义。"] },
        { title: "解决方法", items: ["将录音转文本后按上下文连贯原则切分为不超过2500字的片段。", "制定三级意图判断规则：强意图为明确询问价格/确认信息，中意图为未明确拒绝也未明确答应，弱意图为直接拒绝。"] },
        { title: "主要bad case", items: ["切片边界破坏对话上下文导致意图判断失准。", "强弱意图边界模糊案例归类不一致。"] },
        { title: "我的产出", items: ["录音切片规则、三级意图判断标准、正反例样本库、bad case归因文档。"] }
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
          desc="聚焦于大模型落地场景的核心数据构建，通过高质量数据提升模型表现。" 
        />

        {/* Desktop Accordion */}
        <div className="hidden md:flex flex-row flex-1 min-h-0 w-full gap-4">
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  setActiveIndex(i);
                  setSelectedProject(i);
                }}
                initial={false}
                animate={{ flex: isActive ? 10 : 1.2 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.9 }}
                className={`relative cursor-pointer overflow-hidden rounded-3xl group ring-1 ring-inset
                  ${isActive 
                    ? 'ring-zinc-600 bg-zinc-800/60' 
                    : 'ring-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/80 hover:ring-zinc-700'
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
              </motion.div>
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
              setActiveIndex(index);
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
          className="absolute inset-0 z-[60] flex items-end md:items-center md:justify-center bg-zinc-950/88 backdrop-blur-md md:bg-zinc-950/60 md:backdrop-blur-sm px-0 md:px-8"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-[calc(100%-2rem)] md:w-full md:max-w-3xl max-h-[86%] md:max-h-[74%] rounded-[2rem] md:rounded-3xl bg-zinc-900 ring-1 ring-inset ring-zinc-800 shadow-2xl p-6 md:p-8 overflow-hidden mb-4 md:mb-0"
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
              className="max-h-[calc(86vh-174px)] md:max-h-[calc(74vh-210px)] overflow-y-auto overscroll-contain hide-scrollbar pr-1 [mask-image:linear-gradient(to_bottom,black_97%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_97%,transparent_100%)]"
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [isMobileExperienceScrolled, setIsMobileExperienceScrolled] = useState(false);

  const experiences = [
    {
      period: "2024.06 至今",
      company: "深圳某AI数据服务公司",
      role: "AI数据训练师",
      tags: ["SFT", "RLHF", "质检", "Prompt"],
      details: [
        "负责主导多个大语言模型（LLM）的SFT及RLHF数据构建与标注任务分配。",
        "参与制定复杂场景的数据标注SOP，规范化标注流程，提升团队整体产出效率。",
        "搭建数据质检体系，通过多轮交叉抽检将数据准确率稳定维持在98%以上。",
        "与算法工程师深度协作，根据模型测试反馈，持续优化迭代Prompt规则库。"
      ]
    },
    {
      period: "2020.11 - 2024.05",
      company: "上海某互联网产品公司",
      role: "UI设计师",
      tags: ["规范", "B端", "增长", "转化"],
      details: [
        "负责公司核心App的视觉规范（Design System）搭建与全面UI升级迭代。",
        "主导多个从0到1的创新产品设计，涵盖B端后台管理系统与C端增长活动页面。",
        "优化核心业务转化漏斗链路，通过A/B测试设计方案使支付转化率提升15%。",
        "具备跨部门协作经验，有效推动设计落地，确保开发实现与设计稿的高还原度。"
      ]
    },
    {
      period: "2021 - 2024",
      company: "天津大学",
      role: "学生",
      tags: ["CS", "数据结构", "算法", "人机交互"],
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
    setCurrentIndex(index);
  };

  const handleMobileExperienceScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsMobileExperienceScrolled(e.currentTarget.scrollTop > 6);
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

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === experiences.length - 1;

  return (
    <SectionWrapper id="experience" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Experience" 
          title="工作经历" 
          desc="沉淀于核心业务场景，持续推动设计与数据的质量飞跃。" 
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
                  viewport={{ once: false }}
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
            className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center gap-4 md:gap-6 lg:gap-8 w-full md:px-0 left-0"
          >
            {experiences.map((exp, i) => (
              <div 
                key={i} 
                className="snap-start shrink-0 w-[85%] md:w-[85%] h-full md:h-[calc(100%-2rem)] max-h-[600px] bg-zinc-900 rounded-3xl p-6 pt-8 pb-4 md:p-10 lg:p-14 flex flex-col md:flex-row ring-1 ring-inset ring-zinc-800 relative overflow-hidden shadow-xl"
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
                        <span className="mr-3 md:mr-4 text-zinc-600 mt-1 md:mt-1.5 text-base md:text-lg">•</span>
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
        <div className="md:hidden absolute inset-0 z-[60] flex items-end bg-zinc-950/55 backdrop-blur-sm" onClick={() => setActiveExperience(null)}>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-[calc(100%-2rem)] max-h-[76%] rounded-[2rem] bg-zinc-900 ring-1 ring-inset ring-zinc-800 shadow-2xl p-6 pb-8 overflow-hidden mb-4"
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
              className="max-h-[calc(76vh-138px)] overflow-y-auto overscroll-contain hide-scrollbar pr-1 [mask-image:linear-gradient(to_bottom,black_94%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_bottom,black_94%,transparent_100%)]"
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
    { label: "邮箱", value: "hello@dachengzi.ai", icon: Mail },
    { label: "微信", value: "dachengzi_ai", icon: MessageCircle },
    { label: "文章", value: "阅读技术博客", icon: BookOpen },
    { label: "简历", value: "获取完整PDF", icon: FileText }
  ];

  return (
    <SectionWrapper id="contact" className="bg-zinc-950 text-zinc-200">
      <div className="flex flex-col h-full w-full">
        <SectionHeader 
          subtitle="Contact" 
          title="联系我" 
          desc="期待与您共同探索 AI 数据构建的无限可能" 
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
