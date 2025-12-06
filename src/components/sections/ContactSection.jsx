import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Dirección',
      content: 'Calle Falsa 123, Trelew, Chubut'
    },
    {
      icon: <Phone size={24} />,
      title: 'Teléfono',
      content: '+54 123 456 789'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'info@kaisencontable.com'
    },
    {
      icon: <Clock size={24} />,
      title: 'Horarios',
      content: 'Lunes a Viernes, 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Contacto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Listo para optimizar la gestión de tu empresa? Contáctanos para una consultoría inicial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nombre completo *</label>
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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email *</label>
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
                  <label className="block text-gray-700 mb-2">Teléfono</label>
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
                <label className="block text-gray-700 mb-2">Servicio de interés</label>
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
                <label className="block text-gray-700 mb-2">Mensaje *</label>
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
            <h3 className="text-2xl font-bold text-primary mb-6">Información de contacto</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary rounded-xl p-6 text-white">
              <h4 className="text-xl font-bold mb-3">¿Necesitas ayuda inmediata?</h4>
              <p className="mb-4">Nuestro equipo está listo para atenderte y resolver todas tus dudas.</p>
              <Button variant="dark" className="bg-white text-primary hover:bg-gray-100">
                Llamar ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;