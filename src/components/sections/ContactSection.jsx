import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aca va la lógica para enviar el formulario
    alert('Mensaje enviado correctamente');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    <section className="section-padding bg-gray-50">
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
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Seleccionar servicio</option>
                  <option value="consultoria">Consultoría Financiera</option>
                  <option value="planificacion">Planificación Estratégica</option>
                  <option value="legal">Asesoramiento Legal-Contable</option>
                  <option value="capacitacion">Capacitación & Desarrollo</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Mensaje *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Cuéntanos sobre tus necesidades..."
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Enviar Mensaje
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
                      ? 'bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors' 
                      : 'bg-secondary/10 text-secondary'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                    {item.action && (
                      <span className="inline-block mt-1 text-sm font-medium transition-opacity opacity-0 text-primary group-hover:opacity-100">
                        {item.title === 'WhatsApp' ? 'Escribir por WhatsApp' : 
                         item.title === 'Teléfono' ? 'Llamar ahora' : 
                         item.title === 'Email' ? 'Enviar email' : ''}
                      </span>
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
    </section>
  );
};

export default ContactSection;