"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

const previewImages = {
  portrait: "/images/alperen-demirli.png",
  zayed: "/images/zayed-airport.webp",
  riyadhClose: "/images/riyadh-metro-01.jpg",
  riyadhWide: "/images/riyadh-metro-02.jpg",
  istanbul: "/images/istanbul-airport.webp",
  portonovi: "/images/portonovi.jpg",
  msheireb: "/images/msheireb-downtown-doha.jpg",
  ammroc: "/images/ammroc.webp",
};

// Put the PDF in /public/Alperen_Demirli_Resume.pdf before deployment.
const cvHref = "/Alperen_Demirli_Resume.pdf";

const copy = {
  en: {
    nav: {
      projects: "Projects",
      value: "Value",
      profile: "Profile",
      contact: "Contact",
      cv: "Download CV",
      langLabel: "TR",
      menu: "Menu",
      close: "Close",
    },
    profile: {
      name: "Alperen Demirli",
      title: "Technical Manager",
      subtitle: "Technical Operations & Project Coordination",
      location: "Istanbul, Türkiye",
      email: "alperendemirli@outlook.com",
      phone: "+90 539 831 0599",
      linkedin: "linkedin.com/in/alperendemirlipm",
      portrait: previewImages.portrait,
    },
    hero: {
      eyebrow: "Major Projects · Technical Operations · Delivery Control",
      headline: "Technical Manager, Major Projects",
      subheadline: "Where complex projects lose clarity, I build control.",
      body:
        "9+ years across airports, metro, hospitality, infrastructure, and operational readiness environments in Türkiye, the UAE, Saudi Arabia, Qatar, and Montenegro. I connect site progress, engineering requirements, subcontractor output, client expectations, and management reporting — so decisions become clearer and delivery stays under control.",
      proofA: "Airports · Metro · Hospitality · Infrastructure",
      proofB: "Türkiye · UAE · KSA · Qatar · Montenegro",
    },
    projects: {
      label: "Project Environments",
      headline: "Large projects.\nDifferent pressures.\nSame need for control.",
      body:
        "Not a job-history section. This is a record of environments I have worked in: fast-moving, multi-party, technically demanding, and unforgiving when follow-up breaks down.",
      demand: "What the environment demanded",
      contribution: "My contribution",
    },
    value: {
      label: "Value",
      headline: "I turn scattered activity into controlled progress.",
      body:
        "On major projects, delays rarely come from one dramatic failure. They come from small gaps: unclear ownership, late information, weak follow-up, scattered records, unresolved comments, and reports that do not show what actually matters.",
    },
    profileBlock: {
      label: "Profile",
      headline: "Shaped by site reality and technical pressure.",
      p1:
        "My background started on site and moved into technical operations, project coordination, controls-oriented reporting, commissioning interfaces, handover workflows, FM transition, and operational readiness. That mix matters because projects do not fail inside neat job descriptions.",
      p2:
        "I add value by understanding both the field and the management layer: what teams are doing, what decision-makers need to see, what the client expects, and where gaps are likely to appear before they become expensive.",
      tags: [
        "Technical Operations",
        "Project Coordination",
        "Progress Visibility",
        "Subcontractor Follow-up",
        "Commissioning Interface",
        "Operational Readiness",
      ],
    },
    contact: {
      label: "Contact",
      headline: "Let’s discuss where I can add control to your project.",
      body:
        "Available for serious project teams that need technical coordination, project controls support, reporting discipline, and practical delivery follow-up across construction, commissioning, handover, or operational readiness phases.",
      email: "Email",
      linkedin: "LinkedIn",
    },
  },
  tr: {
    nav: {
      projects: "Projeler",
      value: "Katkı",
      profile: "Profil",
      contact: "İletişim",
      cv: "CV İndir",
      langLabel: "EN",
      menu: "Menü",
      close: "Kapat",
    },
    profile: {
      name: "Alperen Demirli",
      title: "Technical Manager",
      subtitle: "Teknik Operasyon ve Proje Koordinasyonu",
      location: "İstanbul, Türkiye",
      email: "alperendemirli@outlook.com",
      phone: "+90 539 831 0599",
      linkedin: "linkedin.com/in/alperendemirlipm",
      portrait: previewImages.portrait,
    },
    hero: {
      eyebrow: "Büyük Projeler · Teknik Operasyon · Teslimat Kontrolü",
      headline: "Büyük Projelerde Teknik Yönetim",
      subheadline: "Karmaşa arttığında işi görünür, takip edilebilir ve yönetilebilir hale getiririm.",
      body:
        "Türkiye, BAE, Suudi Arabistan, Katar ve Karadağ’da havalimanı, metro, otel, altyapı ve operasyonel hazırlık süreçlerinde 9+ yıl. Sahadaki ilerlemeyi, teknik gereklilikleri, alt yüklenici çıktılarını, işveren beklentilerini ve yönetim raporlamasını aynı resimde toplarım; ekipler neye odaklanacağını, yönetim neye karar vereceğini daha net görür.",
      proofA: "Havalimanı · Metro · Otel · Altyapı",
      proofB: "Türkiye · BAE · Suudi Arabistan · Katar · Karadağ",
    },
    projects: {
      label: "Proje Ortamları",
      headline: "Büyük projeler.\nFarklı baskılar.\nAynı kontrol ihtiyacı.",
      body:
        "Bu bölüm bir görev geçmişi listesi değil. Çalıştığım proje ortamlarının karakterini gösterir: hızlı ilerleyen, çok paydaşlı, teknik yoğunluğu yüksek ve takip zayıfladığında maliyeti hızla artan ortamlar.",
      demand: "Bu ortam ne gerektirir?",
      contribution: "Katkım",
    },
    value: {
      label: "Katkı",
      headline: "Dağınık ilerlemeyi yönetilebilir hale getiririm.",
      body:
        "Büyük projelerde gecikme çoğu zaman tek bir büyük hatadan doğmaz. Sorumlulukların belirsizleşmesi, bilginin geç gelmesi, takibin zayıflaması, kayıtların dağılması, yorumların kapanmaması ve raporların sahadaki gerçeği göstermemesi süreci yavaşlatır.",
    },
    profileBlock: {
      label: "Profil",
      headline: "Saha gerçeğiyle ve teknik baskıyla şekillenmiş bir profil.",
      p1:
        "Sahada başlayan deneyimim; teknik operasyon, proje koordinasyonu, proje kontrolleri odaklı raporlama, devreye alma arayüzleri, teslimat süreçleri, FM geçişi ve operasyonel hazırlık tarafına uzanıyor. Bu bütünlük önemli; çünkü büyük projeler hiçbir zaman tek bir iş tanımının içinde ilerlemiyor.",
      p2:
        "Katkım; sahada ne olduğunu, yönetimin neyi görmesi gerektiğini, işverenin ne beklediğini ve sorunların nerede büyüyebileceğini aynı anda okuyabilmekte.",
      tags: [
        "Teknik Operasyon",
        "Proje Koordinasyonu",
        "İlerleme Görünürlüğü",
        "Alt Yüklenici Takibi",
        "Commissioning Arayüzü",
        "Operasyonel Hazırlık",
      ],
    },
    contact: {
      label: "İletişim",
      headline: "Projenizde nerede değer katabileceğimi konuşalım.",
      body:
        "İnşaat, devreye alma, teslimat veya operasyonel hazırlık aşamalarında teknik koordinasyon, proje kontrolleri desteği, raporlama disiplini ve pratik teslimat takibi ihtiyacı olan proje ekipleriyle görüşmeye açığım.",
      email: "E-posta",
      linkedin: "LinkedIn",
    },
  },
  ar: {
    nav: {
      projects: "المشاريع",
      value: "القيمة",
      profile: "الملف المهني",
      contact: "التواصل",
      cv: "تحميل السيرة الذاتية",
      langLabel: "EN",
      menu: "القائمة",
      close: "إغلاق",
    },
    profile: {
      name: "Alperen Demirli",
      title: "مدير فني",
      subtitle: "العمليات الفنية وتنسيق المشاريع",
      location: "إسطنبول، تركيا",
      email: "alperendemirli@outlook.com",
      phone: "+90 539 831 0599",
      linkedin: "linkedin.com/in/alperendemirlipm",
      portrait: previewImages.portrait,
    },
    hero: {
      eyebrow: "مشاريع كبرى · عمليات فنية · ضبط التسليم",
      headline: "مدير فني للمشاريع الكبرى",
      subheadline: "عندما تفقد المشاريع المعقدة وضوحها، أحوّلها إلى عمل قابل للمتابعة والسيطرة.",
      body:
        "أكثر من 9 سنوات في بيئات المطارات والمترو والضيافة والبنية التحتية والجاهزية التشغيلية في تركيا والإمارات والسعودية وقطر والجبل الأسود. أربط تقدم الموقع بالمتطلبات الفنية ومخرجات المقاولين وتوقعات العميل وتقارير الإدارة، لتصبح القرارات أوضح ويبقى التسليم تحت السيطرة.",
      proofA: "مطارات · مترو · ضيافة · بنية تحتية",
      proofB: "تركيا · الإمارات · السعودية · قطر · الجبل الأسود",
    },
    projects: {
      label: "بيئات المشاريع",
      headline: "مشاريع كبرى.\nضغوط مختلفة.\nالحاجة نفسها إلى السيطرة.",
      body:
        "هذا ليس تسلسلاً وظيفياً، بل عرض لطبيعة البيئات التي عملت ضمنها: سريعة الحركة، متعددة الأطراف، عالية المتطلبات الفنية، ومكلفة عندما يضعف المتابعة والتنسيق.",
      demand: "ما الذي يتطلبه هذا النوع من المشاريع؟",
      contribution: "مساهمتي",
    },
    value: {
      label: "القيمة",
      headline: "أحوّل النشاط المتناثر إلى تقدم واضح ومنضبط.",
      body:
        "في المشاريع الكبرى، نادراً ما تأتي التأخيرات من خطأ واحد كبير. غالباً ما تبدأ من مسؤوليات غير واضحة، معلومات متأخرة، متابعة ضعيفة، سجلات متفرقة، ملاحظات غير مغلقة، وتقارير لا تعكس واقع الموقع.",
    },
    profileBlock: {
      label: "الملف المهني",
      headline: "خبرة تشكلت بين واقع الموقع والضغط الفني.",
      p1:
        "بدأت خبرتي من الموقع ثم امتدت إلى العمليات الفنية، تنسيق المشاريع، التقارير ذات الطابع الرقابي، واجهات التشغيل التجريبي، التسليم، انتقال إدارة المرافق، والجاهزية التشغيلية. هذه الخبرة المتداخلة مهمة لأن المشاريع الكبرى لا تتحرك داخل حدود وصف وظيفي واحد.",
      p2:
        "تأتي قيمتي من القدرة على قراءة الموقع ومستوى الإدارة في الوقت نفسه: ما الذي تنفذه الفرق، ما الذي يحتاج صانع القرار إلى رؤيته، ما الذي يتوقعه العميل، وأين يمكن أن تكبر المشكلة قبل أن تصبح مكلفة.",
      tags: [
        "العمليات الفنية",
        "تنسيق المشاريع",
        "وضوح التقدم",
        "متابعة المقاولين",
        "واجهات التشغيل التجريبي",
        "الجاهزية التشغيلية",
      ],
    },
    contact: {
      label: "التواصل",
      headline: "لنتحدث عن المكان الذي يمكنني فيه إضافة السيطرة إلى مشروعكم.",
      body:
        "متاح للتعاون مع فرق مشاريع جادة تحتاج إلى تنسيق فني، دعم في ضوابط المشاريع، انضباط في التقارير، ومتابعة عملية للتسليم خلال مراحل الإنشاء أو التشغيل التجريبي أو التسليم أو الجاهزية التشغيلية.",
      email: "البريد الإلكتروني",
      linkedin: "LinkedIn",
    },
  },
};

const heroSlides = [previewImages.istanbul, previewImages.zayed, previewImages.riyadhClose];

const projectEnvironments = [
  {
    id: "01",
    title: "Riyadh Metro",
    image: previewImages.riyadhClose,
    alternateImage: previewImages.riyadhWide,
    category: { en: "Metro / Systems / Infrastructure", tr: "Metro / Sistemler / Altyapı", ar: "مترو / أنظمة / بنية تحتية" },
    contribution: {
      en:
        "Managed technical interface control across civil, MEP, and systems disciplines — tracking open issues, subcontractor output, inspection readiness, and progress signals against tight project milestones.",
      tr:
        "Civil, MEP ve sistemler arasında teknik arayüzleri yönettim; açık konuları, alt yüklenici çıktılarını, kontrol hazırlığını ve ilerleme durumunu kritik proje kilometre taşlarına göre takip ettim.",
      ar:
        "أدرت ضبط الواجهات الفنية بين الأعمال المدنية والـMEP والأنظمة، مع متابعة القضايا المفتوحة ومخرجات المقاولين وجاهزية التفتيش ومؤشرات التقدم مقابل مراحل المشروع الحرجة.",
    },
    demand: {
      en:
        "A rail environment requires disciplined interface control: civil, MEP, systems, testing, access, safety, reporting, and client coordination all moving together.",
      tr:
        "Raylı sistem projelerinde arayüz kontrolü kritiktir. Civil, MEP, sistemler, test süreçleri, saha erişimi, iş güvenliği, raporlama ve işveren koordinasyonu aynı takvim üzerinde ilerlemek zorundadır.",
      ar:
        "تتطلب بيئة المترو ضبطاً صارماً للواجهات: أعمال مدنية، MEP، أنظمة، اختبارات، وصول للموقع، سلامة، تقارير، وتنسيق مع العميل ضمن مسار واحد.",
    },
  },
  {
    id: "02",
    title: "Zayed International Airport",
    image: previewImages.zayed,
    category: { en: "Airport / Operational Readiness", tr: "Havalimanı / Operasyonel Hazırlık", ar: "مطار / جاهزية تشغيلية" },
    contribution: {
      en:
        "Structured asset data, maintenance logic, and readiness reporting frameworks ahead of operational go-live — coordinating between project teams, FM operations, and client representatives.",
      tr:
        "Operasyon başlamadan önce asset verisi, bakım kurgusu ve hazırlık raporlama yapısını organize ettim; proje ekipleri, FM operasyonları ve işveren temsilcileri arasında koordinasyon sağladım.",
      ar:
        "نظمت بيانات الأصول ومنطق الصيانة وأطر تقارير الجاهزية قبل بدء التشغيل، مع التنسيق بين فرق المشروع وعمليات إدارة المرافق وممثلي العميل.",
    },
    demand: {
      en:
        "An airport does not tolerate fragmented information. Assets, maintenance logic, reporting, readiness status, and stakeholder expectations must be structured before operations begin.",
      tr:
        "Havalimanı projelerinde dağınık bilgiye yer yoktur. Operasyon başlamadan önce asset verisi, bakım yaklaşımı, raporlama, hazırlık durumu ve paydaş beklentileri netleşmiş olmalıdır.",
      ar:
        "المطارات لا تحتمل المعلومات المبعثرة. يجب تنظيم بيانات الأصول ومنطق الصيانة والتقارير وحالة الجاهزية وتوقعات الأطراف قبل بدء التشغيل.",
    },
  },
  {
    id: "03",
    title: "Portonovi — One & Only Hotel",
    image: previewImages.portonovi,
    category: { en: "Luxury Hospitality / Client-facing Delivery", tr: "Lüks Otel / İşveren Odaklı Teslimat", ar: "ضيافة فاخرة / تسليم موجه للعميل" },
    contribution: {
      en:
        "Coordinated readiness tracking, consultant comment closeout, operator expectations, and delivery discipline across the main hotel and branded villas.",
      tr:
        "Ana otel ve markalı villalarda teslimat hazırlığını, danışman yorumlarının kapanışını, işletmeci beklentilerini ve son kontrolleri koordine ettim.",
      ar:
        "نسقت متابعة الجاهزية وإغلاق ملاحظات الاستشاري ومتطلبات المشغل وانضباط التسليم عبر الفندق الرئيسي والفيلات ذات العلامة التجارية.",
    },
    demand: {
      en:
        "Luxury hospitality requires precision beyond construction completion: room readiness, systems confidence, consultant comments, operator expectations, and brand-level finishing standards.",
      tr:
        "Lüks otel projelerinde iş yalnızca imalatı bitirmek değildir. Odaların hazır olması, sistemlerin güven vermesi, danışman yorumlarının kapanması, işletmeci beklentilerinin karşılanması ve marka seviyesinde ince iş standardı gerekir.",
      ar:
        "مشاريع الضيافة الفاخرة تتطلب دقة تتجاوز اكتمال الإنشاء: جاهزية الغرف، موثوقية الأنظمة، إغلاق الملاحظات، متطلبات المشغل، ومعايير التشطيب على مستوى العلامة.",
    },
  },
  {
    id: "04",
    title: "Istanbul Grand Airport",
    image: previewImages.istanbul,
    category: { en: "Airport / Site Execution", tr: "Havalimanı / Saha Uygulaması", ar: "مطار / تنفيذ موقعي" },
    contribution: {
      en:
        "Maintained daily field discipline across finishing subcontractors — managing inspection sequences, quality follow-up, and progress visibility at terminal scale.",
      tr:
        "İnce işler alt yüklenicilerinde günlük saha disiplinini takip ettim; terminal ölçeğinde kontrol sıraları, kalite takibi ve ilerleme görünürlüğünü yönettim.",
      ar:
        "حافظت على الانضباط اليومي في الموقع بين مقاولي التشطيبات، مع إدارة تسلسل التفتيش ومتابعة الجودة ووضوح التقدم على مستوى مبنى الركاب.",
    },
    demand: {
      en:
        "A terminal of this scale demands daily field discipline: subcontractor movement, finishing sequence, inspection readiness, quality follow-up, and accurate progress visibility.",
      tr:
        "Bu ölçekte bir terminal günlük saha disiplini ister: alt yüklenici hareketi, ince iş sıralaması, kontrol hazırlığı, kalite takibi ve doğru ilerleme görünürlüğü.",
      ar:
        "مبنى ركاب بهذا الحجم يتطلب انضباطاً يومياً في الموقع: حركة المقاولين، تسلسل التشطيبات، جاهزية التفتيش، متابعة الجودة، ووضوح التقدم.",
    },
  },
  {
    id: "05",
    title: "Msheireb Downtown Doha",
    image: previewImages.msheireb,
    category: { en: "Mixed-use Development / Technical Output Control", tr: "Karma Kullanım / Teknik Çıktı Kontrolü", ar: "تطوير متعدد الاستخدامات / ضبط المخرجات الفنية" },
    contribution: {
      en:
        "Controlled technical output across multiple disciplines — managing internal review cycles, comment registers, resubmission tracking, and high-volume delivery follow-up.",
      tr:
        "Birden fazla disiplinde teknik çıktıların kontrolünü sağladım; iç inceleme döngülerini, yorum kayıtlarını, revizyon takibini ve yüksek hacimli teslimat sürecini yönettim.",
      ar:
        "ضبطت المخرجات الفنية عبر عدة تخصصات، بما في ذلك دورات المراجعة الداخلية وسجلات الملاحظات وتتبع إعادة التقديم ومتابعة التسليم عالي الحجم.",
    },
    demand: {
      en:
        "A dense mixed-use development requires technical consistency: many disciplines, many stakeholders, high submission volume, and little room for weak internal review.",
      tr:
        "Yoğun karma kullanım projelerinde teknik tutarlılık şarttır: çok disiplinli ekipler, çok sayıda paydaş, yüksek teslimat hacmi ve zayıf iç kontrole yer bırakmayan bir tempo.",
      ar:
        "التطويرات متعددة الاستخدامات تتطلب اتساقاً فنياً عالياً: تخصصات كثيرة، أطراف متعددة، حجم تسليم كبير، ومساحة قليلة للمراجعة الداخلية الضعيفة.",
    },
  },
  {
    id: "06",
    title: "AMMROC",
    image: previewImages.ammroc,
    category: { en: "Restricted Operations / Technical Coordination", tr: "Kısıtlı Operasyon / Teknik Koordinasyon", ar: "عمليات مقيدة / تنسيق فني" },
    contribution: {
      en:
        "Provided controlled coordination between remote management teams and on-site stakeholders — maintaining reliable follow-up, communication discipline, and information integrity in a restricted environment.",
      tr:
        "Uzaktaki yönetim ekipleri ile saha paydaşları arasında kontrollü koordinasyon sağladım; kısıtlı proje ortamında güvenilir takip, iletişim disiplini ve bilgi bütünlüğünü korudum.",
      ar:
        "قدمت تنسيقاً منضبطاً بين فرق الإدارة عن بُعد وأطراف الموقع، مع الحفاظ على متابعة موثوقة وانضباط في الاتصال وسلامة المعلومات داخل بيئة مقيدة.",
    },
    demand: {
      en:
        "Restricted environments require discretion, controlled communication, reliable follow-up, and disciplined coordination between remote teams and site stakeholders.",
      tr:
        "Kısıtlı proje ortamlarında gizlilik, kontrollü iletişim, güvenilir takip ve saha paydaşlarıyla uzaktaki ekipler arasında disiplinli koordinasyon gerekir.",
      ar:
        "البيئات المقيدة تتطلب سرية، اتصالاً مضبوطاً، متابعة موثوقة، وتنسيقاً منضبطاً بين الفرق البعيدة وأطراف الموقع.",
    }
  },
];

const valuePillars = [
  {
    title: { en: "Make priorities visible", tr: "Öncelikleri görünür hale getirmek", ar: "إظهار الأولويات بوضوح" },
    body: {
      en:
        "I separate noise from actual blockers so teams know what needs a decision, what needs escalation, and what simply needs disciplined follow-up.",
      tr:
        "Gürültüyü gerçek engellerden ayırırım; ekipler neyin karar, neyin eskalasyon, neyin sadece disiplinli takip gerektirdiğini net görür.",
      ar:
        "أفصل الضجيج عن العوائق الحقيقية، حتى تعرف الفرق ما الذي يحتاج إلى قرار، وما الذي يحتاج إلى تصعيد، وما الذي يحتاج فقط إلى متابعة منضبطة.",
    },
  },
  {
    title: { en: "Connect site to management", tr: "Sahadaki gerçeği yönetime taşımak", ar: "ربط واقع الموقع بالإدارة" },
    body: {
      en:
        "I turn scattered field updates into structured information management can use: progress, risk, readiness, delay signals, and ownership.",
      tr:
        "Dağınık saha bilgisini yönetimin kullanabileceği bir yapıya dönüştürürüm: ilerleme, risk, hazırlık durumu, gecikme sinyalleri ve sorumluluk sahipliği.",
      ar:
        "أحوّل تحديثات الموقع المتفرقة إلى معلومات منظمة يمكن للإدارة استخدامها: التقدم، المخاطر، الجاهزية، مؤشرات التأخير، وملكية المسؤوليات.",
    },
  },
  {
    title: { en: "Close coordination gaps", tr: "Koordinasyon boşluklarını kapatmak", ar: "إغلاق فجوات التنسيق" },
    body: {
      en:
        "I work across interfaces where issues usually fall between teams: engineering, operations, QA/QC, planning, subcontractors, consultants, and client representatives.",
      tr:
        "Sorunların çoğu ekipler arasındaki boşluklarda büyür. Mühendislik, operasyon, QA/QC, planlama, alt yükleniciler, danışmanlar ve işveren temsilcileri arasındaki bu arayüzlerde çalışırım.",
      ar:
        "غالباً ما تكبر المشكلات بين الفرق. أعمل عند هذه الواجهات بين الهندسة والعمليات وQA/QC والتخطيط والمقاولين والاستشاريين وممثلي العميل.",
    },
  },
  {
    title: { en: "Push delivery without theatrics", tr: "İşi sakin ama ısrarlı şekilde ilerletmek", ar: "دفع التسليم بهدوء وإصرار" },
    body: {
      en:
        "The work is practical: follow up, verify, clarify, report, escalate when needed, and keep pressure on the items that decide project momentum.",
      tr:
        "İşin özü pratiktir: takip etmek, doğrulamak, netleştirmek, raporlamak, gerektiğinde eskale etmek ve projenin hızını belirleyen maddelerin üzerinde baskıyı korumak.",
      ar:
        "جوهر العمل عملي: المتابعة، التحقق، التوضيح، التقرير، التصعيد عند الحاجة، والحفاظ على الضغط على البنود التي تحدد زخم المشروع.",
    },
  },
];

const metrics = [
  { label: { en: "Years in major project environments", tr: "Büyük proje ortamında yıl", ar: "سنوات في بيئات المشاريع الكبرى" }, value: "9+", icon: "timer" },
  { label: { en: "Countries across GCC and Europe", tr: "GCC ve Avrupa’da ülke", ar: "دول عبر الخليج وأوروبا" }, value: "5", icon: "map-pin" },
  { label: { en: "Project sectors covered", tr: "Proje sektörü", ar: "قطاعات مشاريع" }, value: "6", icon: "building" },
  { label: { en: "From site execution to management reporting", tr: "Sahadan yönetime tam kapsam", ar: "من تنفيذ الموقع إلى تقارير الإدارة" }, value: "End-to-end", icon: "ruler" },
];

type Lang = "en" | "tr" | "ar";
type LocalizedText = string | Partial<Record<Lang, string>>;

function t(value: LocalizedText, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? "";
}

const languageOptions: Array<{ code: Lang; label: string }> = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "ar", label: "AR" },
];

function LanguageSwitcher({ lang, setLang, className = "" }: { lang: Lang; setLang: (lang: Lang) => void; className?: string }) {
  return (
    <div className={`inline-flex rounded-full border border-stone-100/20 bg-black/35 p-1 backdrop-blur-xl ${className}`} dir="ltr">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          onClick={() => setLang(option.code)}
          className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition md:px-4 ${
            lang === option.code
              ? "bg-orange-500 text-black"
              : "text-stone-400 hover:bg-stone-100/10 hover:text-stone-100"
          }`}
          aria-pressed={lang === option.code}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function runPortfolioTests() {
  const validProjects = projectEnvironments.length >= 6 && projectEnvironments.every((project) => {
    return (
      project.id &&
      project.title &&
      project.image &&
      project.category.en &&
      project.category.tr &&
      project.category.ar &&
      project.contribution.en &&
      project.contribution.tr &&
      project.contribution.ar &&
      project.demand.en &&
      project.demand.tr &&
      project.demand.ar &&
      !("year" in project) &&
      !("role" in project)
    );
  });

  const validCopy = copy.en.hero.headline && copy.tr.hero.headline && copy.ar.hero.headline && copy.en.nav.cv && copy.tr.nav.cv && copy.ar.nav.cv;
  const validValues = valuePillars.length === 4 && valuePillars.every((item) => item.title.en && item.title.tr && item.title.ar && item.body.en && item.body.tr && item.body.ar);
  const validMetrics = metrics.length === 4 && metrics.every((item) => item.label.en && item.label.tr && item.label.ar && item.value && item.icon);
  const validCv = cvHref === "/Alperen_Demirli_Resume.pdf";
  const validLanguages = languageOptions.length === 3 && languageOptions.map((item) => item.code).join("/") === "en/tr/ar";
  const validFeaturedCount = projectEnvironments.slice(0, 3).every((project) => project.id) && projectEnvironments.length >= 6;

  return { validProjects, validCopy, validValues, validMetrics, validCv, validLanguages, validFeaturedCount };
}

if (typeof window !== "undefined") {
  const tests = runPortfolioTests();
  console.assert(tests.validProjects, "Portfolio test failed: project cards need EN/TR/AR contribution/demand copy and no visible years/role history.");
  console.assert(tests.validCopy, "Portfolio test failed: EN/TR/AR navigation and hero copy must be configured.");
  console.assert(tests.validValues, "Portfolio test failed: value pillars need EN/TR/AR title and body.");
  console.assert(tests.validMetrics, "Portfolio test failed: metric labels and values must be configured.");
  console.assert(tests.validCv, "Portfolio test failed: production CV link should point to /Alperen_Demirli_Resume.pdf.");
  console.assert(tests.validLanguages, "Portfolio test failed: language switcher must include EN/TR/AR.");
  console.assert(tests.validFeaturedCount, "Portfolio test failed: first three projects should be treated as featured projects.");
}

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const common: React.SVGProps<SVGSVGElement> = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow-up-right":
      return <svg {...common}><path d="M7 17L17 7" /><path d="M9 7h8v8" /></svg>;
    case "chevron-down":
      return <svg {...common}><path d="M6 9l6 6 6-6" /></svg>;
    case "mail":
      return <svg {...common}><path d="M4 6h16v12H4z" /><path d="M4 7l8 6 8-6" /></svg>;
    case "download":
      return <svg {...common}><path d="M12 3v11" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>;
    case "map-pin":
      return <svg {...common}><path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V6l8-3 8 3v15" /><path d="M9 21v-6h6v6" /><path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></svg>;
    case "ruler":
      return <svg {...common}><path d="M4 17L17 4l3 3L7 20z" /><path d="M14 7l3 3M11 10l2 2M8 13l3 3" /></svg>;
    case "timer":
      return <svg {...common}><path d="M10 2h4" /><path d="M12 14l3-3" /><circle cx="12" cy="14" r="8" /></svg>;
    case "close":
      return <svg {...common}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

function CustomCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => setActive(Boolean((event.target as Element | null)?.closest?.("a, button, [data-cursor]")));
    const out = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as Element | null;
      if (!relatedTarget || !relatedTarget.closest?.("a, button, [data-cursor]")) setActive(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-stone-300/40 mix-blend-difference md:block"
      animate={{ x: position.x - 16, y: position.y - 16, scale: active ? 2.25 : 1, opacity: active ? 0.5 : 1 }}
      transition={{ type: "spring", mass: 0.15, stiffness: 260, damping: 22 }}
    />
  );
}

function SectionLabel({ children, index = "" }: { children: React.ReactNode; index?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-stone-400"
    >
      <span className="font-mono text-orange-400/80">{index}</span>
      <span className="h-px w-12 bg-orange-500/70" />
      {children}
    </motion.div>
  );
}

function TextureLayer() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:18px_18px]" />
    </>
  );
}

function ImagePanel({ src, alt, className = "", overlay = true }: { src: string; alt: string; className?: string; overlay?: boolean }) {
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.18),transparent_32%),linear-gradient(135deg,#111,#030303)] p-8 text-center text-xs uppercase tracking-[0.28em] text-stone-500">
          Visual Preview
        </div>
      )}
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:linear-gradient(120deg,#fff_1px,transparent_1px)] [background-size:11px_11px]" />
    </div>
  );
}

function ActionButtons({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const c = copy[lang];
  return (
    <div className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : "sm:flex-row lg:justify-end"}`}>
      <a
        href={cvHref}
        download="Alperen_Demirli_Resume.pdf"
        data-cursor
        className="group inline-flex items-center justify-center gap-3 rounded-full border border-orange-400/40 bg-orange-500/10 px-6 py-4 text-xs uppercase tracking-[0.2em] text-orange-100 transition hover:border-orange-300 hover:bg-orange-500/20"
      >
        <Icon name="download" className="h-4 w-4" /> {c.nav.cv}
      </a>
      <a
        href={`mailto:${c.profile.email}`}
        data-cursor
        className="group inline-flex items-center justify-center gap-3 rounded-full border border-stone-100/15 px-6 py-4 text-xs uppercase tracking-[0.2em] text-stone-200 transition hover:border-orange-400/70 hover:bg-orange-500/10"
      >
        <Icon name="mail" className="h-4 w-4" /> {c.contact.email}
      </a>
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const isNumeric = /^[\d.]+/.test(value);
  const suffix = value.replace(/^[\d.]+/, "");
  const numericPart = Number.parseFloat(value);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isNumeric) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        const startTime = performance.now();
        const duration = 1200;

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * numericPart * 10) / 10;
          setDisplay(current % 1 === 0 ? String(current) : current.toFixed(1));
          if (progress < 1) requestAnimationFrame(step);
          else setDisplay(numericPart % 1 === 0 ? String(numericPart) : numericPart.toFixed(1));
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNumeric, numericPart]);

  return <span ref={ref}>{isNumeric ? `${display}${suffix}` : value}</span>;
}

function MobileMenu({ lang, setLang, isOpen, setIsOpen }: { lang: Lang; setLang: (lang: Lang) => void; isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const c = copy[lang];
  const navLinks = [
    { href: "#work", label: c.nav.projects },
    { href: "#value", label: c.nav.value },
    { href: "#profile", label: c.nav.profile },
    { href: "#contact", label: c.nav.contact },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] flex flex-col bg-black/95 px-6 py-7 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.42em] text-stone-300">AD / Major Projects</div>
            <button onClick={() => setIsOpen(false)} className="rounded-full border border-stone-100/15 p-3 text-stone-300">
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 + 0.1 }}
                className="border-b border-stone-100/10 py-5 text-3xl font-black uppercase tracking-[-0.04em] text-stone-100 transition hover:text-orange-300"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pb-6">
            <a
              href={cvHref}
              download="Alperen_Demirli_Resume.pdf"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-orange-400/40 bg-orange-500/10 px-6 py-4 text-xs uppercase tracking-[0.2em] text-orange-100"
            >
              <Icon name="download" className="h-4 w-4" /> {c.nav.cv}
            </a>
            <LanguageSwitcher lang={lang} setLang={setLang} className="justify-center" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const c = copy[lang];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % heroSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black pt-24 text-stone-100">
      <MobileMenu lang={lang} setLang={setLang} isOpen={menuOpen} setIsOpen={setMenuOpen} />

      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide}')` }}
            animate={{ opacity: activeSlide === index ? 1 : 0, scale: activeSlide === index ? 1.045 : 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/72 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(249,115,22,0.18),transparent_26%),radial-gradient(circle_at_16%_78%,rgba(148,163,184,0.14),transparent_34%)]" />
      </motion.div>

      <TextureLayer />
      <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black via-black/75 to-transparent" />

      <nav className="fixed left-0 right-0 top-0 z-[70] flex items-center justify-between border-b border-stone-100/10 bg-black/55 px-6 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-12">
        <div className="font-mono text-xs uppercase tracking-[0.42em] text-stone-300">AD / Major Projects</div>

        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-stone-400 md:flex">
          <a href="#work" className="transition hover:text-stone-100">{c.nav.projects}</a>
          <a href="#value" className="transition hover:text-stone-100">{c.nav.value}</a>
          <a href="#profile" className="transition hover:text-stone-100">{c.nav.profile}</a>
          <a href="#contact" className="transition hover:text-stone-100">{c.nav.contact}</a>
          <a href={cvHref} download="Alperen_Demirli_Resume.pdf" className="rounded-full border border-orange-400/30 px-4 py-2 text-orange-200 transition hover:bg-orange-500/10">
            {c.nav.cv}
          </a>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <button onClick={() => setMenuOpen(true)} className="rounded-full border border-stone-100/15 p-3 text-stone-300">
            <Icon name="menu" className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <div className="relative z-10 grid min-h-[calc(100vh-88px)] items-end px-6 pb-12 md:px-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
        <div className="max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-3 text-xs uppercase tracking-[0.36em] text-orange-400/90 md:text-sm"
          >
            {c.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl text-[10vw] font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-[6.5vw]"
          >
            {c.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.52 }}
            className="mt-3 max-w-4xl text-xl font-light italic text-orange-300/85 md:text-2xl"
          >
            {c.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.72 }}
            className="mt-8 grid gap-5 border-t border-stone-100/15 pt-7 md:grid-cols-[0.62fr_0.38fr]"
          >
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-stone-300 md:text-xl">{c.hero.body}</p>
              <div className="mt-7"><ActionButtons lang={lang} compact /></div>
            </div>

            <div className="flex flex-col justify-between gap-6 text-xs uppercase tracking-[0.24em] text-stone-400 md:items-end md:text-right">
              <span>{c.hero.proofA}</span>
              <span>{c.hero.proofB}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative ml-auto w-full max-w-md border border-stone-100/10 bg-black/45 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="absolute -left-6 top-8 h-px w-12 bg-orange-400/80" />
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300">{c.profile.name}</div>
            <div className="mt-2 text-2xl font-black uppercase leading-none tracking-[-0.04em] text-stone-100">{c.profile.title}</div>
            <div className="mt-1 text-sm text-stone-400">{c.profile.subtitle}</div>

            <div className="mt-12 grid grid-cols-2 gap-px bg-stone-100/10 text-xs uppercase tracking-[0.18em] text-stone-400">
              <div className="bg-black/80 p-4">9+ Years</div>
              <div className="bg-black/80 p-4">5 Countries</div>
              <div className="bg-black/80 p-4">GCC Projects</div>
              <div className="bg-black/80 p-4">Technical Ops</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        data-cursor
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 right-7 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-stone-100/15 bg-stone-950/30 backdrop-blur-xl transition hover:border-orange-400/60 md:right-12"
        aria-label="Scroll to project section"
      >
        <Icon name="chevron-down" className="h-5 w-5 text-stone-300" />
      </motion.a>
    </section>
  );
}

function ProjectCard({ project, index, lang, isFeatured = false }: { project: typeof projectEnvironments[number]; index: number; lang: Lang; isFeatured?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const c = copy[lang];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      data-cursor
      className={`group relative grid overflow-hidden border-t border-stone-100/10 ${
        isFeatured ? "min-h-[72vh] xl:h-[82vh] lg:grid-cols-[minmax(380px,0.62fr)_1.38fr] xl:grid-cols-[minmax(430px,0.58fr)_1.42fr]" : "min-h-[52vh] xl:h-[58vh] lg:grid-cols-[minmax(340px,0.56fr)_1.44fr] xl:grid-cols-[minmax(380px,0.52fr)_1.48fr]"
      }`}
    >
      <div className="relative z-10 flex min-h-0 min-w-0 flex-col justify-between bg-[#090909]/95 p-7 backdrop-blur md:p-10">
        <div className="flex items-start justify-between gap-8">
          <span className={`font-mono ${isFeatured ? "text-base text-orange-400" : "text-sm text-orange-400/70"}`}>{project.id}</span>
          <span className="text-right text-xs uppercase tracking-[0.25em] text-stone-500">{t(project.category, lang)}</span>
        </div>

        <div className="min-h-0 min-w-0 py-8">
          <h3 className={`max-w-xl text-wrap break-words font-black uppercase leading-[0.92] tracking-[-0.055em] text-stone-100 ${isFeatured ? "text-[clamp(2.35rem,4.5vw,4.8rem)]" : "text-[clamp(2rem,3.5vw,3.9rem)]"}`}>
            {project.title}
          </h3>

          <div className="mt-7 border-l-2 border-orange-500/60 pl-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-orange-400/70">{c.projects.contribution}</p>
            <p className="text-base leading-relaxed text-stone-200">{t(project.contribution, lang)}</p>
          </div>

          <div className="mt-7 border-t border-stone-100/10 pt-5">
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-stone-600">{c.projects.demand}</p>
            <p className="max-w-md text-sm leading-relaxed text-stone-500">{t(project.demand, lang)}</p>
          </div>
        </div>
      </div>

      <div className={`relative min-w-0 overflow-hidden bg-stone-900 ${isFeatured ? "min-h-[48vh] lg:h-full" : "min-h-[34vh] lg:h-full"}`}>
        <motion.img
          style={{ y: project.title === "AMMROC" ? 0 : imageY, objectPosition: project.title === "AMMROC" ? "center bottom" : "center center" }}
          src={project.image}
          alt={project.title}
          className={`w-full grayscale transition duration-700 group-hover:grayscale-0 ${
            project.title === "AMMROC"
              ? "h-full object-contain bg-stone-950 p-4 group-hover:scale-[1.015]"
              : "h-[118%] object-cover group-hover:scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/52 via-black/5 to-black/20" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:76px_76px]" />

        {project.alternateImage && (
          <div className="absolute bottom-8 right-8 hidden h-32 w-52 overflow-hidden border border-stone-100/10 bg-black/40 p-1 shadow-2xl shadow-black/50 backdrop-blur-xl xl:block">
            <img src={project.alternateImage} alt={`${project.title} secondary visual`} className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0" />
          </div>
        )}

        <motion.div className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full border border-stone-100/20 bg-black/20 backdrop-blur transition group-hover:rotate-45 group-hover:border-orange-400/70">
          <Icon name="arrow-up-right" className="h-5 w-5" />
        </motion.div>
      </div>
    </motion.article>
  );
}

function Projects({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <section id="work" className="bg-black px-6 py-28 text-stone-100 md:px-12 md:py-40">
      <SectionLabel index="01">{c.projects.label}</SectionLabel>
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <h2 className="max-w-6xl whitespace-pre-line text-6xl font-black uppercase leading-[0.84] tracking-[-0.075em] md:text-8xl lg:text-9xl">
          {c.projects.headline}
        </h2>
        <p className="max-w-md text-stone-400">{c.projects.body}</p>
      </div>

      <div className="border-b border-stone-100/10">
        {projectEnvironments.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} lang={lang} isFeatured={index < 3} />
        ))}
      </div>
    </section>
  );
}

function Value({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <section id="value" className="relative overflow-hidden bg-[#080808] px-6 py-28 text-stone-100 md:px-12 md:py-40">
      <TextureLayer />
      <div className="absolute left-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative z-10">
        <SectionLabel index="02">{c.value.label}</SectionLabel>
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.065em] md:text-8xl">{c.value.headline}</h2>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-stone-400">{c.value.body}</p>
          </div>

          <div className="grid gap-px bg-stone-100/10 md:grid-cols-2">
            {metrics.map((metric, index) => (
              <motion.div
                key={t(metric.label, lang)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.08 }}
                className="bg-[#080808] p-7 md:p-9"
              >
                <Icon name={metric.icon} className="mb-12 h-6 w-6 text-orange-400" />
                <div className="text-4xl font-black tracking-[-0.06em] md:text-6xl"><AnimatedNumber value={metric.value} /></div>
                <p className="mt-4 max-w-[14rem] text-sm uppercase leading-6 tracking-[0.18em] text-stone-500">{t(metric.label, lang)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-px bg-stone-100/10 md:grid-cols-2 xl:grid-cols-4">
          {valuePillars.map((item, index) => (
            <motion.div
              key={t(item.title, lang)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="group relative min-h-[22rem] overflow-hidden bg-stone-950/70 p-8"
            >
              <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />
              <div className="mb-16 font-mono text-xs text-stone-500">0{index + 1}</div>
              <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.035em]">{t(item.title, lang)}</h3>
              <p className="mt-6 leading-7 text-stone-400">{t(item.body, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profile({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <section id="profile" className="relative overflow-hidden bg-[#070707] px-6 py-28 text-stone-100 md:px-12 md:py-40">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-stone-100/20 to-transparent" />
      <div className="absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-orange-500/5 blur-3xl" />

      <SectionLabel index="03">{c.profileBlock.label}</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(18% 0 18% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-orange-400/50" />
          <ImagePanel src={c.profile.portrait} alt={c.profile.name} className="h-[62vh] border border-stone-100/10 grayscale transition duration-700 hover:scale-[1.015] hover:grayscale-0" />
          <div className="absolute bottom-6 left-6 right-6 border border-stone-100/10 bg-black/55 p-5 backdrop-blur-xl">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300">{c.profile.name}</div>
            <div className="mt-1 text-sm font-bold text-stone-200">{c.profile.title}</div>
            <div className="text-xs text-stone-400">{c.profile.subtitle}</div>
          </div>
        </motion.div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95 }}
            className="max-w-6xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.065em] md:text-7xl lg:text-8xl"
          >
            {c.profileBlock.headline}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-10 grid gap-8 text-stone-300 md:grid-cols-2"
          >
            <p className="text-xl leading-relaxed">{c.profileBlock.p1}</p>
            <p className="leading-8 text-stone-400">{c.profileBlock.p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-12 grid gap-px bg-stone-100/10 md:grid-cols-3"
          >
            {c.profileBlock.tags.map((item) => (
              <div key={item} className="bg-[#070707] p-5 text-xs uppercase tracking-[0.22em] text-stone-400">{item}</div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <section id="contact" className="relative overflow-hidden bg-black px-6 py-24 text-stone-100 md:px-12 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.14),transparent_32%)]" />
      <TextureLayer />

      <div className="relative z-10 flex min-h-[56vh] flex-col justify-between">
        <SectionLabel index="04">{c.contact.label}</SectionLabel>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl text-[11vw] font-black uppercase leading-[0.82] tracking-[-0.08em] md:text-[6.8vw] xl:text-[6.1vw]"
          >
            {c.contact.headline}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="mt-8 grid gap-8 border-t border-stone-100/10 pt-8 lg:grid-cols-[1fr_0.8fr] lg:items-end"
          >
            <p className="max-w-2xl text-xl leading-relaxed text-stone-400">{c.contact.body}</p>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a href={cvHref} download="Alperen_Demirli_Resume.pdf" data-cursor className="group inline-flex items-center justify-center gap-4 rounded-full border border-orange-400/40 bg-orange-500/10 px-7 py-5 text-sm uppercase tracking-[0.22em] text-orange-100 transition hover:border-orange-300 hover:bg-orange-500/20">
                <Icon name="download" className="h-4 w-4" /> {c.nav.cv}
              </a>
              <a href="https://www.linkedin.com/in/alperendemirlipm" target="_blank" rel="noopener noreferrer" data-cursor className="group inline-flex items-center justify-center gap-4 rounded-full border border-stone-100/15 px-7 py-5 text-sm uppercase tracking-[0.22em] text-stone-200 transition hover:border-orange-400/70 hover:bg-orange-500/10">
                {c.contact.linkedin}<Icon name="arrow-up-right" className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-5 border-t border-stone-100/10 pt-7 text-xs uppercase tracking-[0.24em] text-stone-500 md:grid-cols-3">
          <span>{c.profile.email}</span>
          <span>{c.profile.phone}</span>
          <span className="md:text-right">{c.profile.location}</span>
        </div>
      </div>
    </section>
  );
}

export default function CinematicConstructionPortfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, [lang]);

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-x-hidden bg-black font-sans text-stone-100 selection:bg-orange-500 selection:text-black md:cursor-none">
      <CustomCursor />
      <motion.div className="fixed left-0 top-0 z-[90] h-1 origin-left bg-orange-500" style={{ scaleX }} />
      <Hero lang={lang} setLang={setLang} />
      <Projects lang={lang} />
      <Value lang={lang} />
      <Profile lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
