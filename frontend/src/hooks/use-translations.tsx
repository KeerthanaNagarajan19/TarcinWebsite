import { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '../lib/i18n';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.products': 'Products',
    'nav.courses': 'Courses',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.getInTouch': 'Get in Touch',
    'nav.selectLanguage': 'Select Language',
    'hero.title': 'Deep-Tech Solutions Rooted in Execution',
    'hero.description': 'Tarcin Robotic LLP delivers scalable, product-driven technology solutions across robotics, IoT, AI, custom software, and educational platforms, focusing on real-world impact from Madurai, Tamil Nadu.',
    'hero.cta.explore': 'Explore Our Solutions',
    'hero.cta.learn': 'Learn More',
    'about.title': 'Diverse Technology Domains',
    'about.description': 'Our expertise spans across interconnected technology fields, creating innovative solutions that drive measurable impact.',
    'about.robotics': 'Robotics & Autonomous Systems',
    'about.robotics.desc': 'Designing and prototyping autonomous systems, surveillance robots, and humanoids for practical applications.',
    'about.ai': 'AI & Data Science',
    'about.ai.desc': 'Building predictive systems, analytics-driven software, and exploratory agentic AI integrations for business intelligence.',
    'about.iot': 'IoT & Embedded Systems',
    'about.iot.desc': 'End-to-end smart automation solutions, including demo kits and deployable prototypes like our Smart Home Mini Kits.',
    'about.edutech': 'EdTech & Community Building',
    'about.edutech.desc': 'Tools and platforms like Code Asthram and SproutED LMS that support skill-building and STEM education, integrated with our S2P Community pipeline.',
    'about.software': 'Custom Software Development',
    'about.software.desc': 'Tailored CRM/ERP systems, automation backends, and internal business solutions that drive operational efficiency.',
    'about.analytics': 'Observability & Analytics',
    'about.analytics.desc': 'Intelligent dashboards, monitoring tools, and data intelligence platforms that provide actionable insights.',
    'products.code_asthram': 'Code Asthram',
    'products.code_asthram.desc': 'A logic-based, gamified coding education platform for schools and colleges focused on algorithmic thinking and syntax-free learning.',
    'products.sprouted': 'SproutED LMS',
    'products.sprouted.desc': 'A lightweight, modular learning management system built for schools and training institutions with classroom tracking features.',
    'products.crm': 'Tarcin CRM / ChargeHR',
    'products.crm.desc': 'Internal and customizable ERP/CRM systems with analytics layers, tailored for organizations.',
    'products.iot_kit': 'Smart Home Mini Kit',
    'products.iot_kit.desc': 'A deployable, IoT-driven demonstration unit for end-to-end home automation with data visualization and control dashboards.',
    'products.stem': 'STEM Kits & Books',
    'products.stem.desc': 'Hardware kits and Python + Embedded learning books designed for Grades 3–9, aligned with NEP for early technical fluency.',
    'services.erp': 'Custom ERP/CRM Solutions',
    'services.erp.desc': 'Automation solutions for startups, schools, and small enterprises that streamline operations and improve efficiency.',
    'services.pdaas': 'Product Development as a Service',
    'services.pdaas.desc': 'Outsourced, full-cycle product building via our internal and S2P Community student teams.',
    'services.training': 'Corporate & Institutional Training',
    'services.training.desc': 'Short-term to year-long skilling programs in Python, AI, IoT, Data Science, OpenCV, and related technologies.',
    'services.iot': 'IoT Deployment & Integration',
    'services.iot.desc': 'Custom home/building/enterprise automation solutions with analytics dashboards for real-time monitoring and control.',
    'services.ai': 'AI/Data Integrations',
    'services.ai.desc': 'Data pipelines, dashboards, visualizations, and embedded ML models for intelligent decision-making.',
    'services.edu': 'Educational Licensing',
    'services.edu.desc': 'Licensing of Code Asthram, SproutED, and STEM kits for school networks and educational institutions.',
    'community.title': 'S2P Community',
    'community.desc': 'Our Student to Professional pipeline that filters, mentors, and deploys skilled students into real-world client and internal projects.',
    'community.stats': '50+ institutions, 10,000+ students engaged across Tamil Nadu',
    'community.coe': 'Centres of Excellence',
    'community.coe.desc': 'Running multiple CoE setups across colleges focusing on robotics, embedded systems, and AI.',
    // Add more translations as needed
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களை பற்றி',
    'nav.services': 'சேவைகள்',
    'nav.products': 'தயாரிப்புகள்',
    'nav.courses': 'படிப்புகள்',
    'nav.careers': 'வேலைவாய்ப்புகள்',
    'nav.contact': 'தொடர்பு',
    'nav.getInTouch': 'தொடர்பு கொள்ளுங்கள்',
    'nav.selectLanguage': 'மொழியைத் தேர்ந்தெடு',
    'hero.title': 'ரோபாட்டிக்ஸ் & AI உடன் எதிர்காலத்தை வடிவமைக்கிறோம்',
    'hero.description': 'டார்சின் ரோபாட்டிக்ஸ் தொழில்துறைகளை உலகளவில் மாற்றுவதற்கு புத்திசாலித்தனமான இயந்திரங்கள், IoT சூழல்கள், மற்றும் AI-ஆல் இயக்கப்படும் கல்வி தளங்களின் அடுத்த தலைமுறையை முன்னோடியாக உள்ளது.',
    'hero.cta.explore': 'எங்கள் தயாரிப்புகளை ஆராயுங்கள்',
    'hero.cta.learn': 'மேலும் அறிக',
    'about.title': 'பல பரிமாணங்களில் முன்னோடி',
    'about.description': 'புதுமைக்கான எங்களின் ஒருங்கிணைந்த அணுகுமுறை முக்கிய தொழில்நுட்ப டொமைன்களில் பரவியுள்ளது, மாற்றமுடன் கூடிய தீர்வுகளை உருவாக்கும் ஒத்திசைவுகளை உருவாக்குகிறது.',
    'about.robotics': 'மேம்பட்ட ரோபாட்டிக்ஸ்',
    'about.robotics.desc': 'தொழில்துறை ஆட்டோமேஷன், சுகாதாரம், மற்றும் லாஜிஸ்டிக்ஸுக்கான தகவமைக்கும் கற்றல் திறன்களுடன் கூடிய சுயாதீன இயந்திரங்கள்.',
    'about.ai': 'AI தீர்வுகள்',
    'about.ai.desc': 'கணிப்பு பகுப்பாய்வு மற்றும் முடிவு அமைப்புகளை இயக்கும் நவீன இயந்திரக் கற்றல் மற்றும் நரம்பியல் வலைப்பின்னல்கள்.',
    'about.iot': 'IoT சூழல்கள்',
    'about.iot.desc': 'தொழில்துறைகளில் தரவு சேகரிப்பு, கண்காணிப்பு, மற்றும் ஆட்டோமேஷனை மாற்றும் இணைக்கப்பட்ட சாதன வலைப்பின்னல்கள்.',
    'about.edutech': 'கல்வி தொழில்நுட்ப தளங்கள்',
    'about.edutech.desc': 'AI டியூட்டரிங், ஊடாடும் மாதிரிகள், மற்றும் தகவமைக்கும் பாடத்திட்டங்களை இணைக்கும் புரட்சிகரமான கற்றல் அமைப்புகள்.',
    // Add more translations as needed
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.services': 'خدمات',
    'nav.products': 'منتجات',
    'nav.courses': 'دورات',
    'nav.careers': 'وظائف',
    'nav.contact': 'اتصل بنا',
    'nav.getInTouch': 'تواصل معنا',
    'nav.selectLanguage': 'اختر اللغة',
    'hero.title': 'تشكيل المستقبل بالروبوتات والذكاء الاصطناعي',
    'hero.description': 'تعمل تارسين روبوتكس على ريادة الجيل القادم من الآلات الذكية، وأنظمة إنترنت الأشياء، ومنصات التعليم المدعومة بالذكاء الاصطناعي لتحويل الصناعات في جميع أنحاء العالم.',
    'hero.cta.explore': 'استكشف منتجاتنا',
    'hero.cta.learn': 'معرفة المزيد',
    'about.title': 'ريادة الأبعاد المتعددة',
    'about.description': 'نهجنا الشامل للابتكار يمتد عبر مجالات تكنولوجية رئيسية، مما يخلق تآزرًا يدفع الحلول التحويلية.',
    'about.robotics': 'الروبوتات المتقدمة',
    'about.robotics.desc': 'آلات ذاتية مع قدرات تعلم متكيفة للأتمتة الصناعية والرعاية الصحية والخدمات اللوجستية.',
    'about.ai': 'حلول الذكاء الاصطناعي',
    'about.ai.desc': 'التعلم الآلي المتطور والشبكات العصبية التي تعمل على تحليلات التنبؤ وأنظمة القرار.',
    'about.iot': 'أنظمة إنترنت الأشياء',
    'about.iot.desc': 'شبكات الأجهزة المتصلة التي تحول جمع البيانات والمراقبة والأتمتة عبر الصناعات.',
    'about.edutech': 'منصات التكنولوجيا التعليمية',
    'about.edutech.desc': 'أنظمة تعليمية ثورية تجمع بين التدريس بالذكاء الاصطناعي والمحاكاة التفاعلية والمناهج التكيفية.',
    // Add more translations as needed
  },
};

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: () => '',
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Initialize from localStorage or browser preference
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && ['en', 'ta', 'ar'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    
    // Update document direction for RTL support
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    
    // Update lang attribute
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations['en'][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
};

export default useTranslations;
