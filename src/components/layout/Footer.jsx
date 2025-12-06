const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold mb-2">KAISEN</div>
            <p className="text-gray-300 text-sm">
              Estudio Jurídico-Contable
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📍 9 de Julio 128, Trelew</li>
              <li>📞 +54 280 442-1137</li>
              <li>🕒 Lunes a Viernes, 9:00-18:00</li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Inicio</a></li>
              <li><a href="/servicios" className="text-gray-300 hover:text-white">Servicios</a></li>
              <li><a href="/nosotros" className="text-gray-300 hover:text-white">Nosotros</a></li>
              <li><a href="/contacto" className="text-gray-300 hover:text-white">Contacto</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Consultoría Financiera</li>
              <li>Planificación Estratégica</li>
              <li>Asesoramiento Legal</li>
              <li>Capacitación</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Estudio Jurídico-Contable Kaisen. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;