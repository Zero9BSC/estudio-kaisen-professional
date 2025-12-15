const Footer = () => {
  return (
    <footer className="text-white bg-primary">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 text-2xl font-bold">KAISEN</div>
            <p className="text-sm text-gray-300">
              Estudio Jurídico-Contable
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 font-bold">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📍 9 de Julio 128, Trelew, Chubut</li>
              <li>📞 +54 280 442-1137</li>
              <li>🕒 Lunes a Viernes, 9:00-18:00</li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="mb-4 font-bold">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Inicio</a></li>
              <li><a href="/servicios" className="text-gray-300 hover:text-white">Servicios</a></li>
              <li><a href="/nosotros" className="text-gray-300 hover:text-white">Nosotros</a></li>
              <li><a href="/contacto" className="text-gray-300 hover:text-white">Contacto</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="mb-4 font-bold">Servicios</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Consultoría Financiera</li>
              <li>Planificación Estratégica</li>
              <li>Asesoramiento Legal</li>
              <li>Capacitación</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>© {new Date().getFullYear()} Estudio Jurídico-Contable Kaisen. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;