import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: '', // 'success' | 'error'
    message: ''
  });

  // ============================================================
  // CONFIGURACIÓN PARA EMAILJS
  // ============================================================
  const emailjsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  // Función para mostrar toast con animación
  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message
    });
  };

  // Cerrar toast manualmente
  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      showToast('error', 'Por favor completa los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          user_phone: formData.phone,
          selected_service: formData.service || "No especificado",
          message: formData.message,
        },
        emailjsConfig.publicKey
      );
      
      if (result.status === 200) {
        showToast('success', '¡Mensaje enviado correctamente! Te contactaremos pronto.');
        
        // Resetear formulario tras éxito
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          service: '', 
          message: '' 
        });
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      showToast('error', 'Hubo un error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Efecto para ocultar el toast automáticamente
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = "+5492804366867";
    const message = "Hola, me gustaría obtener más información sobre sus servicios.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Función para llamar
  const makeCall = () => {
    window.location.href = 'tel:+542804421137';
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Dirección',
      content: 'Estamos sobre 9 de Julio N.º 128, 1° piso "A" (Edificio Iberia). Entre Belgrano y Rivadavia, Trelew.',
      action: null
    },
    {
      icon: <Phone size={24} />,
      title: 'Teléfono',
      content: '+54 280 442-1137',
      action: makeCall
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'estudiokaisentrelew@gmail.com',
      action: () => window.location.href = 'mailto:estudiokaisentrelew@gmail.com'
    },
    {
      icon: <Clock size={24} />,
      title: 'Horarios',
      content: 'Lunes a Viernes, 9:00 - 18:00',
      action: null
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp',
      content: '+54 9 280 436-6867',
      action: openWhatsApp
    }
  ];

  return (
    <section className="relative section-padding bg-gray-50">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed z-50 top-4 right-4 animate-fade-in-down">
          <div className={`flex items-center p-4 mb-3 rounded-lg shadow-lg max-w-md transform transition-all duration-300 ${
            toast.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex-shrink-0">
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={closeToast}
              className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Cerrar</span>
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary">
            Contacto
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            ¿Listo para optimizar la gestión de tu empresa? Contáctanos para una consultoría inicial.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Formulario */}
          <Card className="relative p-8">
            {isSubmitting && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 mb-2 text-secondary animate-spin" />
                  <p className="text-gray-600">Enviando mensaje...</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="+54 123 456 789"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Servicio de interés</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Seleccionar servicio</option>
                  <option value="Consultoría Financiera">Consultoría Financiera</option>
                  <option value="Planificación Estratégica">Planificación Estratégica</option>
                  <option value="Asesoramiento Legal-Contable">Asesoramiento Legal-Contable</option>
                  <option value="Capacitación & Desarrollo">Capacitación & Desarrollo</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Cuéntanos sobre tus necesidades..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="relative w-full py-3 overflow-hidden text-lg group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Enviar Mensaje</span>
                    <div className="absolute inset-0 transition-transform duration-300 transform -translate-x-full bg-secondary group-hover:translate-x-0"></div>
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Información de contacto */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-primary">Información de contacto</h3>
            
            <div className="mb-8 space-y-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-4 ${item.action ? 'cursor-pointer group' : ''}`}
                  onClick={item.action ? item.action : undefined}
                >
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    item.action 
                      ? 'bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-all duration-200 group-hover:scale-105' 
                      : 'bg-secondary/10 text-secondary'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                    {item.action && (
                      <div className="h-0 overflow-visible">
                        <span className="inline-block mt-1 text-sm font-medium transition-all duration-200 opacity-0 text-primary group-hover:opacity-100 group-hover:translate-x-1">
                          {item.title === 'WhatsApp' ? 'Escribir por WhatsApp →' : 
                          item.title === 'Teléfono' ? 'Llamar ahora →' : 
                          item.title === 'Email' ? 'Enviar email →' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 text-white bg-primary rounded-xl">
              <h4 className="mb-3 text-xl font-bold">¿Necesitas ayuda inmediata?</h4>
              <p className="mb-4">Nuestro equipo está listo para atenderte y resolver todas tus dudas.</p>
              <Button 
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
                onClick={openWhatsApp}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Escribir por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;