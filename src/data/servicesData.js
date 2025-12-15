// src/data/servicesData.js
import { 
  TrendingUp, 
  Target, 
  Scale, 
  Users,
  DollarSign,
  BarChart3,
  FileText,
  GraduationCap 
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Consultoría Financiera",
    description: "Asesoramiento integral para la gestión financiera de tu empresa.",
    features: [
      "Gestión financiera empresarial",
      "Optimización de costos",
      "Proyección de presupuestos",
      "Análisis de rentabilidad"
    ],
    iconName: "DollarSign", // Nombre del ícono, no el componente
    category: "Finanzas",
    color: "blue"
  },
  {
    id: 2,
    title: "Planificación Estratégica",
    description: "Desarrollo de estrategias para el crecimiento sostenible.",
    features: [
      "Desarrollo de estrategias",
      "Análisis de mercado",
      "Evaluación de riesgos",
      "Planes de crecimiento"
    ],
    iconName: "Target",
    category: "Estrategia", 
    color: "purple"
  },
  {
    id: 3,
    title: "Asesoramiento Legal-Contable",
    description: "Cumplimiento normativo y asesoramiento legal especializado.",
    features: [
      "Conformidad legal y fiscal",
      "Auditorías contables",
      "Asesoramiento societario",
      "Trámites regulatorios"
    ],
    iconName: "Scale",
    category: "Legal",
    color: "green"
  },
  {
    id: 4,
    title: "Capacitación & Desarrollo",
    description: "Formación de equipos y desarrollo organizacional.",
    features: [
      "Capacitación de líderes",
      "Formación en competencias",
      "Teambuilding",
      "Desarrollo organizacional"
    ],
    iconName: "Users",
    category: "Desarrollo",
    color: "orange"
  }
];

export const values = [
  {
    title: "Integridad",
    description: "Promover la honestidad y la ética en todas las interacciones profesionales."
  },
  {
    title: "Profesionalismo",
    description: "Demostrar un alto nivel de competencia y compromiso."
  },
  {
    title: "Experiencia",
    description: "Años de trayectoria en el sector contable de Trelew."
  },
  {
    title: "Atención Personalizada",
    description: "Soluciones adaptadas a las necesidades específicas de cada cliente."
  }
];

export const companyInfo = {
  mission: "Brindar soluciones contables integrales y personalizadas que permitan a nuestros clientes alcanzar sus objetivos financieros de manera eficiente y ética.",
  vision: "Ser reconocidos como líderes en el sector contable de Trelew, siendo el socio preferido por empresas y emprendedores para la optimización de sus recursos financieros y el impulso de su crecimiento.",
  objectives: [
    "Brindar servicios de contabilidad precisos y oportunos",
    "Maximizar la eficiencia financiera de los clientes",
    "Proporcionar asesoramiento fiscal y financiero personalizado",
    "Promover la conformidad legal y fiscal",
    "Fomentar relaciones sólidas y duraderas con los clientes"
  ]
};