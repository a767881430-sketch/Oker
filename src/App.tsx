/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Package, 
  Truck, 
  ShieldCheck, 
  Warehouse, 
  Layers, 
  Fingerprint, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  X,
  Menu,
  Users,
  Globe2,
  Cpu
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Lang = 'zh' | 'ru' | 'en';

const t = {
  en: {
    navServices: "Services",
    navExperience: "Cases",
    navContact: "Contact",
    startProject: "Start Work",
    heroBadge: "Global Warehouse Solutions Leader",
    heroTitle: "Reliable Provider of",
    heroTitleSpan: "Comprehensive",
    heroTitleSuffix: " Warehouse Services OKER.",
    heroSubtitle: "Beyond the standard view.",
    heroDesc: "We offer an integrated approach to global logistics. Using OKER systems for depth-first warehouse management, we provide the most competitive solutions for physical supply chains.",
    contactUs: "Contact Us",
    servicesTitle: "Services",
    servicesDesc: "Tailored fulfillment and warehouse management for any business scale.",
    fboTitle: "FBO Optimization",
    fboDesc: "A workflow for selling goods from marketplace warehouses. OKER packs and selects transport according to any marketplace rules.",
    fbsTitle: "FBS Solutions",
    fbsDesc: "Sending goods directly from seller warehouses to customers. OKER optimizes all links from receipt to delivery.",
    markingTitle: "Honest Sign",
    markingDesc: "Digital marking code protection",
    markingRuntime: "Secure encryption logic",
    statusTitle: "Global Reliable Storage",
    statusSubtitle: "100% Personalized Service",
    fulfillmentTitle: "Comprehensive Fulfillment",
    fulfillmentItems: [
      "Collection and delivery from any warehouse",
      "E-commerce order orchestration",
      "Serial number record keeping",
      "FBO standard packaging",
      "FBS/DBS mode completion",
    ],
    processingTitle: "Processing Services",
    processingItems: {
      labels: "Labeling",
      boxes: "Basing Boxes",
      gifts: "Gift Wrapping",
      promo: "Promo Sets",
      packing: "Repacking",
      stickers: "Stickers",
    },
    processingLog: "SYSTEM ACTION: MANUAL PROCESSING ENABLED",
    crossDockingTitle: "Cross-Docking Services",
    crossDockingDesc: "OKER provides multi-level cross-docking. Orders are processed as indivisible units for maximum transit speed.",
    optimalNode: "Optimal Node",
    optimalDesc: "Best solution for products with limited shelf life and high demand.",
    industryTitle: "Industry Cases",
    industryDesc: "Deep logistics optimization for various vertical sectors.",
    industryCases: [
      {
        id: "01",
        name: "Apparel & Fashion",
        tags: ["Fast Turnover", "Precise Sorting", "Returns"],
        desc: "Agile supply chain solutions for fashion retail. High-frequency sorting, SKU management, and reverse logistics in central Moscow warehouses. 99.8% inventory accuracy.",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
        imageCaption: "High-density garment storage system optimized for rapid SKU picking."
      },
      {
        id: "02",
        name: "FMCG",
        tags: ["High Rotation", "Expiry Control", "Network"],
        desc: "Efficient distribution network. FEFO algorithm for strict expiration path management. Synchronous multi-node shipments across Russia for supermarkets and E-commerce.",
        image: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=800&auto=format&fit=crop",
        imageCaption: "FEFO-compliant storage facility ensuring maximum freshness for consumer goods."
      },
      {
        id: "03",
        name: "Construction & Sanitary",
        tags: ["Heavy Goods", "Custom Protection", "Bulky"],
        desc: "Storage and protection solutions for non-standard and heavy goods. Pallet-level reinforcement, moisture and impact protection. 40% reduction in damage rates.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Specialized racking for heavy building materials with impact protection."
      },
      {
        id: "04",
        name: "Power Tools (Battery)",
        tags: ["Lithium Battery", "Compliance", "Honest Sign"],
        desc: "Professional packaging for batteries according to UN3480/3481. Integration of Honest Sign marking throughout the path for legal retail entry.",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Certified HAZMAT packaging area for lithium-ion battery compliance."
      }
    ],
    readyToScale: "Ready to Scale?",
    locationLabel: "Location",
    locationVal: "Moscow Office - Sample Showroom",
    timingLabel: "Working Hours",
    timingVal: "Hours and Contact Details",
    consultLabel: "Consultation",
    formTitle: "Service Inquiry",
    formName: "NAME",
    formPhone: "PHONE",
    formEmail: "EMAIL",
    formInquiry: "INQUIRY DETAILS",
    formSubmit: "Submit Request",
    russiaTitle: "Russian Hub: Warehouse Network",
    russiaDesc: "Our logistics nodes are strategically located throughout Russia, ensuring seamless market access and efficient delivery.",
    russiaCapacity: "1,000,000+ m² Storage Capacity",
    russiaFacility: "Climate Control, 24/7 Security, Mezzanine Systems",
    russiaSpecialTitle: "Local Services",
    russiaSpecialItems: [
      "Full Honest Sign Support",
      "Express Delivery in Russia (2-3 days)",
      "Deep FBO Adaptation for Ozon & WB",
      "Customs Clearance and Support"
    ],
    russiaImages: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1200&auto=format&fit=crop"
    ],
    whyTitle: "Why Choose Us?",
    whyTeamTitle: "Expert Team",
    whyTeamDesc: "Logistics veterans with decades of international trade experience.",
    whyGlobalTitle: "Global Network",
    whyGlobalDesc: "Strategically located hubs across 10+ countries for seamless scale.",
    whyTechTitle: "Smart Tech",
    whyTechDesc: "Deep-first warehouse systems and AI-driven workflow optimization.",
    footerCopyright: "© 2026 OKER. All rights reserved.",
  },
  zh: {
    navServices: "服务内容",
    navExperience: "行业案例",
    navContact: "联系我们",
    startProject: "开始合作",
    heroBadge: "全球仓储解决方案领导者",
    heroTitle: "全方位仓储服务的",
    heroTitleSpan: "可靠供应商",
    heroTitleSuffix: " OKER.",
    heroSubtitle: "超越标准视野。",
    heroDesc: "我们提供全球物流的综合方法。使用 OKER 系统进行深度优先的仓库管理，我们为物理供应链提供最有竞争力的解决方案。",
    contactUs: "联系我们",
    servicesTitle: "服务内容",
    servicesDesc: "为各种业务规模量身定制的专业化履行业务与仓储管理服务",
    fboTitle: "FBO 优化",
    fboDesc: "FBO是一种从市场仓库销售货物的工作方案。OKER 将根据任何市场的规则包装货物并选择运输。",
    fbsTitle: "FBS 方案",
    fbsDesc: "将货物直接从卖家仓库发送给客户。OKER 优化了从接收到交付的所有环节。",
    markingTitle: "诚实标志",
    markingDesc: "诚实标志数字代码保护",
    markingRuntime: "安全加密逻辑",
    statusTitle: "全局可靠存储",
    statusSubtitle: "100% 个性化服务",
    fulfillmentTitle: "全方位履行",
    fulfillmentItems: [
      "组织从任何仓库收集和运送",
      "电子商务订单编排",
      "序列号记录保存",
      "FBO 标准包装",
      "FBS/DBS 模式完成",
    ],
    processingTitle: "代加工服务",
    processingItems: {
      labels: "贴标",
      boxes: "组装纸箱",
      gifts: "礼品包装",
      promo: "促销套装",
      packing: "重新包装",
      stickers: "封箱贴",
    },
    processingLog: "系统操作: 手动加工已启用",
    crossDockingTitle: "多区域：交叉转运服务",
    crossDockingDesc: "OKER 提供多层次交叉转运。订单作为不可分割的单元处理，以实现最高中转速度。",
    optimalNode: "最佳节点",
    optimalDesc: "适用于保质期有限的快速消费品和高需求货物。",
    whyTitle: "为什么选择我们?",
    whyTeamTitle: "专家团队",
    whyTeamDesc: "数十年的国际贸易和物流管理经验。",
    whyGlobalTitle: "全球网络",
    whyGlobalDesc: "在 10 多个国家/地区拥有战略性布局的仓库，提供无缝对接。",
    whyTechTitle: "创新科技",
    whyTechDesc: "先进的 OKER WMS 系统和 AI 驱动的自动化流程。",
    industryTitle: "行业案例",
    industryDesc: "深耕多个垂直领域，提供精准物流支持。",
    industryCases: [
      {
        id: "01",
        name: "服装时尚",
        tags: ["换季快", "精准分拣", "逆向物流"],
        desc: "针对快消时尚行业的敏捷供应链解决方案。我们在莫斯科及周边核心仓库提供高频次的换季分拣、精细化 SKU 管理及退换货逆向物流服务，实现 99.8% 的库存准确率。",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
        imageCaption: "针对高频分拣优化的服装仓储系统"
      },
      {
        id: "02",
        name: "快速消费品 (FMCG)",
        tags: ["高周转", "严格效期", "全网分拨"],
        desc: "面向高周转商品的高效分拨网络。通过 FEFO（先到期先出）算法严格管理效期，全俄多节点同步发货，确保商超及电商终端的极致履约速度。",
        image: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=800&auto=format&fit=crop",
        imageCaption: "符合效期管理标准的 FMCG 存储设施"
      },
      {
        id: "03",
        name: "重型建材与卫浴",
        tags: ["大件存储", "特殊定制加固", "重卡网络"],
        desc: "为非标大件、重型货物定制的仓储与防护方案。提供托盘级加固、防潮防跌落包装，配备专业的叉车堆高处理，有效降低 40% 的运输破损率。",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
        imageCaption: "工业建材专用重型货架系统"
      },
      {
        id: "04",
        name: "带电工具及汽配",
        tags: ["电池合规", "防静电保护", "诚实标志"],
        desc: "符合俄罗斯 UN3480/3481 锂电池运输合规要求的专业包装与认证。提供全链路的俄罗斯诚实标志（Honest Sign）代贴服务，确保商品合法高效进入各大零售终端。",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",
        imageCaption: "经认证的锂电池合规包装车间"
      }
    ],
    readyToScale: "准备好扩展了吗?",
    locationLabel: "办公地址",
    locationVal: "莫斯科办公室 - 样品展示区",
    timingLabel: "工作时间",
    timingVal: "展示时间及联系对接电话",
    consultLabel: "咨询邮件",
    formTitle: "个性化服务申请",
    formName: "姓名",
    formPhone: "电话",
    formEmail: "邮箱",
    formInquiry: "需求详情",
    formSubmit: "提交申请",
    russiaTitle: "俄罗斯腹地：核心仓储网络",
    russiaDesc: "我们战略性地分布在俄罗斯全境的物流枢纽，为您提供无缝的准入与高效的配送服务。",
    russiaCapacity: "1,000,000+ 平方米存储空间",
    russiaFacility: "恒温控制、24/7 安保、高架货位系统",
    russiaSpecialTitle: "本地化增值服务",
    russiaSpecialItems: [
      "诚实标志 (Honest Sign) 全力支持",
      "全俄境内 2-3 天极速配送",
      "针对本地市场 (Ozon, WB) 的 FBO 深度定制",
      "海关代理与清关协助"
    ],
    russiaImages: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1200&auto=format&fit=crop"
    ],
    footerCopyright: "© 2026 OKER. 保留所有权利。",
  },
  ru: {
    navServices: "Услуги",
    navExperience: "Кейсы",
    navContact: "Контакт",
    startProject: "Начать работу",
    heroBadge: "Глобальные складские решения",
    heroTitle: "Надежный поставщик",
    heroTitleSpan: "комплексных",
    heroTitleSuffix: " складских услуг OKER.",
    heroSubtitle: "За пределами стандартного обзора.",
    heroDesc: "Мы предлагаем комплексный подход к глобальной логистике. Используя системы OKER для управления складом, мы обеспечиваем конкурентные решения.",
    contactUs: "Связаться",
    servicesTitle: "Наши услуги",
    servicesDesc: "Индивидуальные решения по фулфилменту и управлению складом для любого масштаба бизнеса.",
    fboTitle: "FBO Оптимизация",
    fboDesc: "Схема продаж со склада маркетплейса. OKER упакует и доставит товар по правилам любой площадки.",
    fbsTitle: "FBS Динамика",
    fbsDesc: "Отгрузка со склада продавца. OKER оптимизирует все этапы: от приемки до передачи курьеру.",
    markingTitle: "Честный ЗНАК",
    markingDesc: "Защита цифровым кодом маркировки",
    markingRuntime: "Логика безопасного шифрования",
    statusTitle: "Надежное хранение",
    statusSubtitle: "100% Индивидуальный подход",
    fulfillmentTitle: "Полный Фулфилмент",
    fulfillmentItems: [
      "Сбор и доставка с любого склада",
      "Оркестрация e-commerce заказов",
      "Учет серийных номеров",
      "Упаковка по стандартам FBO",
      "Работа по моделям FBS/DBS",
    ],
    processingTitle: "Услуги обработки",
    processingItems: {
      labels: "Этикетки",
      boxes: "Коробки",
      gifts: "Подарки",
      promo: "Промо-наборы",
      packing: "Упаковка",
      stickers: "Стикеры",
    },
    processingLog: "ACTION: РУЧНАЯ ОБРАБОТКА ВКЛЮЧЕНА",
    crossDockingTitle: "Кросс-докинг",
    crossDockingDesc: "OKER обеспечивает многоуровневый кросс-докинг. Обработка без хранения для максимальной скорости.",
    optimalNode: "Оптимальный узел",
    optimalDesc: "Лучшее решение для товаров с коротким сроком годности и высокого спроса.",
    industryTitle: "Отраслевой контекст",
    industryDesc: "Логистическая оптимизация для различных вертикальных секторов.",
    industryCases: [
      {
        id: "01",
        name: "Одежда и мода",
        tags: ["Быстрый оборот", "Точная сортировка", "Возвраты"],
        desc: "Решения гибкой цепочки поставок для fashion-ритейла. Высокочастотная сортировка, SKU-управление и обратная логистика на центральных складах в Москве. Точность запасов 99,8%.",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Высокоплотная система хранения одежды, оптимизированная для быстрого отбора по SKU."
      },
      {
        id: "02",
        name: "FMCG",
        tags: ["Высокая ротация", "Контроль сроков", "Сеть"],
        desc: "Эффективная распределительная сеть. Алгоритм FEFO для строгой проверки сроков годности. Синхронные многоузловые отправки по всей России для супермаркетов и E-commerce.",
        image: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Складской комплекс, соответствующий стандартам FEFO, обеспечивающий максимальную свежесть товаров."
      },
      {
        id: "03",
        name: "Стройматериалы и сантехника",
        tags: ["Тяжелые грузы", "Усиленная защита", "Крупногабарит"],
        desc: "Складские решения для нестандартных и тяжелых грузов. Усиление паллет, влагозащитная и противоударная упаковка спецтехникой. Снижение риска повреждений на 40%.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Специализированные стеллажи для тяжелых строительных материалов с защитой от ударов."
      },
      {
        id: "04",
        name: "Электроинструменты (АКБ)",
        tags: ["Литиевые АКБ", "Комплаенс", "Честный ЗНАК"],
        desc: "Профессиональная упаковка аккумуляторов по стандартам UN3480/3481. Интеграция маркировки Честный ЗНАК на всем пути следования для легального ввода в оборот.",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=800&auto=format&fit=crop",
        imageCaption: "Сертифицированная зона упаковки опасных грузов для работы с литий-ионными АКБ."
      }
    ],
    readyToScale: "Готовы к росту?",
    locationLabel: "Локация",
    locationVal: "Офис в Москве - Шоурум образцов",
    timingLabel: "График",
    timingVal: "Часы работы и контактные данные",
    consultLabel: "Консультация",
    formTitle: "Запрос на услуги",
    formName: "ИМЯ",
    formPhone: "ТЕЛЕФОН",
    formEmail: "EMAIL",
    formInquiry: "ДЕТАЛИ ЗАПРОСА",
    formSubmit: "Отправить запрос",
    russiaTitle: "Российский Хаб: Сеть складов",
    russiaDesc: "Наши логистические узлы стратегически расположены по всей России, обеспечивая бесшовный доступ к рынку и эффективную доставку.",
    russiaCapacity: "1 000 000+ м² складских площадей",
    russiaFacility: "Климат-контроль, 24/7 охрана, мезонинные системы",
    russiaSpecialTitle: "Локальные сервисы",
    russiaSpecialItems: [
      "Полная поддержка Честного ЗНАКа",
      "Экспресс-доставка по России за 2-3 дня",
      "Глубокая FBO-адаптация под Ozon и WB",
      "Таможенное оформление и сопровождение"
    ],
    russiaImages: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a0a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1200&auto=format&fit=crop"
    ],
    whyTitle: "Почему выбирают нас?",
    whyTeamTitle: "Команда экспертов",
    whyTeamDesc: "Десятилетия опыта в международной торговле и логистике.",
    whyGlobalTitle: "Глобальная сеть",
    whyGlobalDesc: "Стратегические хабы в 10+ странах для бесшовного масштабирования.",
    whyTechTitle: "Инновации",
    whyTechDesc: "Передовые WMS системы OKER и автоматизация на базе ИИ.",
    footerCopyright: "© 2026 OKER. Все права защищены.",
  }
};

export default function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const content = t[lang];
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRussiaImage, setCurrentRussiaImage] = useState(0);
  
  // Auto-play for Russia Hub Carousel
  useEffect(() => {
    const images = content.russiaImages as string[];
    if (!images || images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentRussiaImage(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [content.russiaImages]);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', inquiry: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Simple Validation Logic
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      if (lang === 'zh') error = '请输入姓名';
      else if (lang === 'en') error = 'Please enter your name';
      else error = 'Введите имя';
    }
    if (name === 'phone') {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!value.trim()) {
        if (lang === 'zh') error = '请输入电话';
        else if (lang === 'en') error = 'Please enter your phone';
        else error = 'Введите телефон';
      }
      else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        if (lang === 'zh') error = '电话格式不正确';
        else if (lang === 'en') error = 'Invalid phone format';
        else error = 'Неверный формат телефона';
      }
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        if (lang === 'zh') error = '请输入邮箱';
        else if (lang === 'en') error = 'Please enter your email';
        else error = 'Введите email';
      }
      else if (!emailRegex.test(value)) {
        if (lang === 'zh') error = '邮箱格式不正确';
        else if (lang === 'en') error = 'Invalid email format';
        else error = 'Неверный формат email';
      }
    }
    if (name === 'inquiry' && !value.trim()) {
      if (lang === 'zh') error = '请描述您的需求';
      else if (lang === 'en') error = 'Please describe your request';
      else error = 'Опишите ваш запрос';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLElement> | null, selector: string) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsMobileMenuOpen(false);
    gsap.to(window, {
      duration: 0.7,
      scrollTo: { y: selector, offsetY: 80 },
      ease: "power2.out"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateField('name', formData.name);
    const isPhoneValid = validateField('phone', formData.phone);
    const isEmailValid = validateField('email', formData.email);
    const isInquiryValid = validateField('inquiry', formData.inquiry);

    if (isNameValid && isPhoneValid && isEmailValid && isInquiryValid) {
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => {
        let msg = '';
        if (lang === 'zh') msg = '提交成功！我们会尽快联系您。';
        else if (lang === 'en') msg = 'Submitted successfully! We will contact you shortly.';
        else msg = 'Успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        
        alert(msg);
        setFormData({ name: '', phone: '', email: '', inquiry: '' });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (activeCase !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeCase]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Entry Animation Hook
      gsap.fromTo(
        cardsRef.current,
        { 
          rotateX: 90, 
          opacity: 0, 
          y: 100, 
          scale: 0.9,
          filter: "blur(12px)",
          transformOrigin: "bottom center" 
        },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#services-grid",
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );

      // Refined Hero Animations
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.4,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
      });

      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          y: "25%",
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      translateZ: 20,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="OKER" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} 
            />
            <span className="hidden font-display font-bold text-2xl tracking-tighter text-[#8AC53E]">OKER.</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center bg-zinc-100 p-1 rounded-full border border-zinc-200">
              <button 
                onClick={() => setLang('zh')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${lang === 'zh' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600 font-medium'}`}
              >
                中文
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600 font-medium'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${lang === 'ru' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600 font-medium'}`}
              >
                RU
              </button>
            </div>
            <div className="w-px h-4 bg-zinc-200" />
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="hover:text-black transition-colors">{content.navServices}</a>
              <a href="#cases" onClick={(e) => scrollToSection(e, "#cases")} className="hover:text-black transition-colors">{content.navExperience}</a>
              <a href="#russia-hub" onClick={(e) => scrollToSection(e, "#russia-hub")} className="hover:text-black transition-colors">{lang === 'zh' ? '仓储网络' : (lang === 'en' ? 'Network' : 'Сеть складов')}</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="hover:text-black transition-colors">{content.navContact}</a>
            </div>
            <button 
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden lg:block bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-sm"
            >
              {content.startProject}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '100vh', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-hidden"
            >
              <div className="flex flex-col p-8 gap-8">
                <div className="flex flex-col gap-6 border-b border-zinc-100 pb-8">
                  <a href="#services" onClick={(e) => scrollToSection(e, "#services")} className="text-3xl font-display font-semibold tracking-tight">{content.navServices}</a>
                  <a href="#cases" onClick={(e) => scrollToSection(e, "#cases")} className="text-3xl font-display font-semibold tracking-tight">{content.navExperience}</a>
                  <a href="#russia-hub" onClick={(e) => scrollToSection(e, "#russia-hub")} className="text-3xl font-display font-semibold tracking-tight">{lang === 'zh' ? '仓储网络' : (lang === 'en' ? 'Network' : 'Сеть складов')}</a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-3xl font-display font-semibold tracking-tight">{content.navContact}</a>
                </div>
                
                <div className="flex flex-col gap-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Language</h4>
                  <div className="flex gap-2">
                    <button onClick={() => setLang('zh')} className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${lang === 'zh' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'}`}>中文</button>
                    <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${lang === 'en' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'}`}>EN</button>
                    <button onClick={() => setLang('ru')} className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${lang === 'ru' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'}`}>RU</button>
                  </div>
                </div>

                <button 
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="w-full bg-black text-white py-5 rounded-3xl text-sm font-bold uppercase tracking-widest shadow-xl"
                >
                  {content.startProject}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 overflow-hidden">
        {/* Subtle grid background to reduce empty feel */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8ed7c80a0a?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}
        />
        <div className="max-w-7xl mx-auto text-center md:text-left relative z-10">
          <motion.div 
            key={`${lang}-badge`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-black text-white text-[10px] rounded-full mb-8 font-bold uppercase tracking-widest"
          >
            {content.heroBadge}
          </motion.div>
          
          <h1 key={`${lang}-title`} className="hero-text font-display text-5xl md:text-[84px] font-semibold tracking-tighter leading-[1] mb-12 max-w-5xl">
            {content.heroTitle}<br />
            <span className="text-zinc-400">{content.heroTitleSpan}</span>{content.heroTitleSuffix}
          </h1>
          
          <div className="hero-text flex flex-col md:flex-row gap-12 items-start justify-between">
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl font-normal leading-relaxed">
              {content.heroDesc}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={(e) => scrollToSection(e, "#contact")}
                className="px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-black/20"
              >
                {content.contactUs}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 perspective-1000" id="services-grid">
            <div 
              ref={(el) => (cardsRef.current[0] = el)}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              className="md:col-span-2 md:row-span-2 bg-[#f5f5f7] p-10 rounded-3xl border border-gray-100 bento-card flex flex-col justify-between min-h-[440px]"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-black text-white text-[10px] rounded-full mb-6 font-bold uppercase tracking-widest">FBO STACK</span>
                <h2 className="text-3xl font-semibold tracking-tight">{content.fboTitle}</h2>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xs">{content.fboDesc}</p>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div className="text-6xl font-light text-gray-200 tracking-tighter">01</div>
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <Package className="w-8 h-8 text-black" />
                </div>
              </div>
            </div>

            <div 
              ref={(el) => (cardsRef.current[1] = el)}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              className="md:col-span-2 bg-white rounded-3xl p-10 flex flex-col justify-between border border-gray-100 shadow-xl bento-card min-h-[210px]"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold tracking-tight">{content.fbsTitle}</h3>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{content.fbsDesc}</p>
              <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-black h-full w-3/4"></div>
              </div>
            </div>

            <div 
              ref={(el) => (cardsRef.current[2] = el)}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              className="bg-[#f5f5f7] rounded-3xl p-8 border border-gray-100 bento-card flex flex-col justify-center items-center text-center min-h-[210px]"
            >
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-xs font-bold uppercase tracking-widest">{content.markingTitle}</h4>
              <p className="text-[11px] text-gray-400 mt-2">{content.markingDesc}<br/>{content.markingRuntime}</p>
            </div>

            <div 
              ref={(el) => (cardsRef.current[3] = el)}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              className="bg-black text-white rounded-3xl p-8 flex flex-col justify-between bento-card min-h-[210px]"
            >
              <div className="mono-info opacity-50 uppercase tracking-widest">STATUS: ACTIVE</div>
              <div className="text-lg font-medium leading-snug">{content.statusTitle}<br/>{content.statusSubtitle}</div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>

            <div 
              ref={(el) => (cardsRef.current[4] = el)}
              onMouseMove={(e) => handleMouseMove(e, 4)}
              onMouseLeave={() => handleMouseLeave(4)}
              className="md:col-span-2 bg-[#f5f5f7] p-10 rounded-3xl border border-gray-100 bento-card flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-[10px] text-zinc-400">{content.fulfillmentTitle}</h3>
                <ul className="space-y-4">
                  {content.fulfillmentItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium tracking-tight">
                      <div className="w-1 h-1 bg-black rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div 
              ref={(el) => (cardsRef.current[5] = el)}
              onMouseMove={(e) => handleMouseMove(e, 5)}
              onMouseLeave={() => handleMouseLeave(5)}
              className="md:col-span-2 bg-white rounded-3xl p-10 flex flex-col justify-between border border-gray-100 shadow-sm bento-card"
            >
              <h3 className="text-xl font-bold uppercase tracking-widest text-[10px] text-zinc-400 mb-8">{content.processingTitle}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(content.processingItems).map(([key, item]) => (
                  <div key={key} className="bg-[#f5f5f7] p-3 rounded-xl text-[11px] font-bold text-center uppercase tracking-tight">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-gray-500 font-mono italic">{content.processingLog}</p>
            </div>

            <div 
              ref={(el) => (cardsRef.current[6] = el)}
              onMouseMove={(e) => handleMouseMove(e, 6)}
              onMouseLeave={() => handleMouseLeave(6)}
              className="md:col-span-4 bg-white p-10 rounded-3xl border border-gray-100 bento-card shadow-sm flex flex-col md:flex-row items-center gap-10"
            >
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase mb-6 tracking-wider">
                  Efficiency_Engine
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{content.crossDockingTitle}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm italic">{content.crossDockingDesc}</p>
              </div>
              <div className="flex-1 bg-[#f5f5f7] rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">{content.optimalNode}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{content.optimalDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-zinc-50 relative overflow-hidden border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              {content.whyTitle}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: content.whyTeamTitle, desc: content.whyTeamDesc, icon: Users, color: "bg-blue-500" },
              { title: content.whyGlobalTitle, desc: content.whyGlobalDesc, icon: Globe2, color: "bg-[#8AC53E]" },
              { title: content.whyTechTitle, desc: content.whyTechDesc, icon: Cpu, color: "bg-purple-500" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform shadow-lg shadow-black/5`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-16 md:py-24 px-6 relative">
        {/* Subtle grid background to reduce empty feel */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-zinc-50" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">{content.industryTitle}</h2>
              <p className="text-zinc-500 text-lg md:text-xl">{content.industryDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {content.industryCases.map((industry, i) => (
              <motion.div 
                key={`${lang}-${i}`}
                initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="group cursor-pointer bg-[#f5f5f7] p-8 rounded-3xl border border-gray-100 relative overflow-hidden"
                onClick={() => setActiveCase(i)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0">
                  <img src={industry.image} alt={industry.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="relative z-10">
                  <div className="mono-info opacity-50 mb-8 uppercase tracking-widest transition-opacity group-hover:opacity-100">SECTOR_{industry.id}</div>
                  <motion.h3 
                    className="text-xl font-bold mb-2 tracking-tight transition-colors"
                    whileHover={{ y: -5, color: "#8AC53E" }}
                  >
                    {industry.name}
                  </motion.h3>
                  {industry.imageCaption && (
                    <p className="text-[10px] text-zinc-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 italic leading-relaxed">
                      {industry.imageCaption}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {industry.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold tracking-widest uppercase text-zinc-400 group-hover:text-zinc-600 transition-colors bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[10px] font-mono opacity-50">EXPLORE</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="russia-hub" className="py-24 md:py-32 px-6 bg-zinc-950 text-white relative overflow-hidden">
        {/* Dynamic Full-Width Background Carousel (Robust Alternative to Video) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRussiaImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale-[0.3]"
              style={{ backgroundImage: `url(${((content.russiaImages as string[]) || [])[currentRussiaImage]})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-zinc-950/40" />
        </div>
        
        {/* Background circuit/grid effect overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 text-[#8AC53E] bg-[#8AC53E]/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase mb-8 tracking-widest border border-[#8AC53E]/20">
                <Globe className="w-3 h-3" />
                Strategic Footprint
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
                {content.russiaTitle}
              </h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-xl">
                {content.russiaDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-[#8AC53E] mb-2">1M+ m²</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{content.russiaCapacity}</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-[#8AC53E] mb-2">24/7</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{content.russiaFacility}</div>
                </motion.div>
              </div>
            </motion.div>

              <div className="relative aspect-square lg:aspect-auto h-full min-h-[500px] bg-zinc-900 rounded-[3rem] border border-white/5 overflow-hidden group shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRussiaImage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={((content.russiaImages as string[]) || ["https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop"])[currentRussiaImage]} 
                      alt="Warehouse Facility" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Carousel Controls */}
                <div className="absolute top-8 right-8 flex gap-2 z-20">
                  {((content.russiaImages as string[]) || []).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentRussiaImage(i)}
                      className={`w-12 h-1 rounded-full transition-all duration-500 ${i === currentRussiaImage ? 'bg-[#8AC53E] w-16' : 'bg-white/20'}`}
                    />
                  ))}
                </div>

                <div className="absolute inset-x-8 bottom-8 p-8 bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 z-20">
                  <h4 className="text-lg font-bold mb-6 text-[#8AC53E] uppercase tracking-widest">{content.russiaSpecialTitle}</h4>
                  <ul className="space-y-4">
                    {(content.russiaSpecialItems as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-4 h-4 text-[#8AC53E] shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 px-6 bg-apple-bg text-apple-text overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <footer className="mb-12 flex justify-between items-end border-b border-zinc-200 pb-8">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-8">{content.readyToScale}</h2>
              <div className="mono-info text-gray-400 leading-relaxed">
                SYSTEM_LOG: VERTICAL_ROTATION_LOADED<br/>
                COORDINATES: 34.0522° N, 118.2437° W
              </div>
            </div>
            <div className="flex gap-4">
               <button 
                 onClick={(e) => scrollToSection(e, "#contact")}
                 className="px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
               >
                 {content.startProject}
               </button>
            </div>
          </footer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              {[
                { label: content.locationLabel, val: content.locationVal, icon: MapPin },
                { label: content.timingLabel, val: content.timingVal, icon: Phone },
                { label: content.consultLabel, val: "business@oker.com", icon: Mail },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h4 className="mono-info opacity-40 uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-lg font-medium tracking-tight">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-10 md:p-14 rounded-3xl text-zinc-900 shadow-2xl border border-gray-100">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-widest text-[10px] text-zinc-400">{content.formTitle}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={content.formName} 
                      className={`w-full bg-[#f5f5f7] rounded-xl h-12 px-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 transition-all border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-black'}`} 
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={content.formPhone} 
                      className={`w-full bg-[#f5f5f7] rounded-xl h-12 px-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 transition-all border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-black'}`} 
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={content.formEmail} 
                    className={`w-full bg-[#f5f5f7] rounded-xl h-12 px-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 transition-all border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-black'}`} 
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                  <textarea 
                    rows={3} 
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    placeholder={content.formInquiry} 
                    className={`w-full bg-[#f5f5f7] rounded-xl p-5 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 transition-all border ${errors.inquiry ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-black'} resize-none`}
                  ></textarea>
                  {errors.inquiry && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.inquiry}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full h-14 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:opacity-80 transition-all active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : content.formSubmit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-100 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="OKER" 
              className="h-6 w-auto object-contain grayscale"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} 
            />
            <div className="hidden font-display font-bold text-xl tracking-tighter text-[#8AC53E]">OKER.</div>
            <span className="mono-info opacity-30 mx-2">/</span>
            <span className="mono-info opacity-50">{content.footerCopyright}</span>
          </div>
          <nav className="flex gap-8 mono-info uppercase tracking-widest opacity-50">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Systems</a>
          </nav>
        </div>
      </footer>

      <AnimatePresence>
        {activeCase !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6" onClick={() => setActiveCase(null)}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden border border-zinc-200"
            >
              <div className="md:w-[45%] h-64 md:h-auto relative">
                <img src={content.industryCases[activeCase].image} alt={content.industryCases[activeCase].name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                   <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-2">OKER_{content.industryCases[activeCase].id}</div>
                   <div className="text-white text-3xl font-display font-medium leading-tight mb-2">{content.industryCases[activeCase].name}</div>
                   {content.industryCases[activeCase].imageCaption && (
                     <div className="text-white/60 text-[10px] italic border-l border-[#8AC53E] pl-3 py-1 mt-2">
                       {content.industryCases[activeCase].imageCaption}
                     </div>
                   )}
                </div>
              </div>
              <div className="md:w-[55%] p-8 md:p-12 flex flex-col items-start overflow-y-auto bg-white">
                <button onClick={() => setActiveCase(null)} className="absolute top-6 right-6 w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors">
                  <X className="w-5 h-5 text-black" />
                </button>
                <div className="mono-info opacity-40 mb-6 uppercase tracking-widest text-black">SECTOR_{content.industryCases[activeCase].id} / INSIGHTS</div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">System Architecture</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {content.industryCases[activeCase].tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-black bg-zinc-100/80 px-3 py-1.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed mb-10 text-lg">{content.industryCases[activeCase].desc}</p>
                <button 
                  onClick={() => setActiveCase(null)} 
                  className="mt-auto px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-black/10"
                >
                  {lang === 'zh' ? '应用此方案' : 'Применить'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
