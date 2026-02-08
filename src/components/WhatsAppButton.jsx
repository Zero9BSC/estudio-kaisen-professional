import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '5492804366867';
  const message = 'Hola, necesito información sobre los servicios del estudio';
  const encodedMessage = encodeURIComponent(message);

  const handleClick = (e) => {
    // Defer analytics so INP isn’t delayed by third-party push
    if (typeof window !== 'undefined' && window.dataLayer) {
      const payload = { event: 'whatsapp_click', event_category: 'engagement', event_label: 'sticky_button' };
      if (window.requestAnimationFrame) window.requestAnimationFrame(() => { window.dataLayer.push(payload); });
      else setTimeout(() => window.dataLayer.push(payload), 0);
    }
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline font-semibold">Consultar</span>
    </a>
  );
}
