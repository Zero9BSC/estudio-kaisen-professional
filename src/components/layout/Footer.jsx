const Footer = () => {
  return (
    <footer className="text-white bg-primary">
      <div className="container px-6 py-12 mx-auto"> {/* Aumentado el padding lateral para móviles */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          
          {/* Logo - Centrado en móvil para mejor balance */}
          <div className="pb-6 border-b sm:col-span-2 md:col-span-1 border-white/10 md:border-none md:pb-0">
            <div className="mb-2 text-2xl font-bold tracking-wider">KAISEN</div>
            <p className="mb-2 text-sm font-semibold uppercase text-secondary">
              Estudio Contable - Impositivo - Jurídico
            </p>
            <p className="text-sm leading-relaxed text-gray-300">
              Comprometido con la excelencia y la innovación.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-lg font-bold border-b border-secondary/50 w-fit md:border-none">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="shrink-0">📍</span> 
                <span>9 de Julio 128, Trelew, Chubut</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">📞</span> 
                <span>+54 280 442-1137</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🕒</span> 
                <span>Lunes a Viernes, 9:00-18:00</span>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="mb-4 text-lg font-bold border-b border-secondary/50 w-fit md:border-none">
              Enlaces
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-gray-300 transition-colors hover:text-white">Inicio</a></li>
              <li><a href="/servicios" className="text-gray-300 transition-colors hover:text-white">Servicios</a></li>
              <li><a href="/nosotros" className="text-gray-300 transition-colors hover:text-white">Nosotros</a></li>
              <li><a href="/contacto" className="text-gray-300 transition-colors hover:text-white">Contacto</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="mb-4 text-lg font-bold border-b border-secondary/50 w-fit md:border-none">
              Servicios
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Consultoría Financiera</li>
              <li>Planificación Estratégica</li>
              <li>Asesoramiento Legal</li>
              <li>Capacitación</li>
            </ul>
          </div>
        </div>

        {/* Copyright - Ajuste de tamaño de fuente para móviles */}
        <div className="pt-8 mt-12 text-center border-t border-gray-800">
          <p className="text-xs leading-loose text-gray-400 md:text-sm">
            © {new Date().getFullYear()} Estudio Jurídico-Contable Kaisen. <br className="md:hidden" /> 
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;