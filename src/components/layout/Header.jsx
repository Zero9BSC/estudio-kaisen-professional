import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo3.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    navigate('/contacto');
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className="h-[72px] flex items-center justify-between px-4 md:px-[var(--spacing-sizing-page-padding-padding-global)] bg-[color:var(--color-schemes-color-scheme-1-background)]"
      style={{ fontFamily: 'var(--text-regular-normal-font-family)' }}
    >
      {/* Sección izquierda - Navegación (Desktop) */}
      <div className="items-center flex-1 hidden gap-8 md:flex">
        <NavLink to="/" text="Inicio" />
        <NavLink to="/servicios" text="Servicios" />
        <NavLink to="/nosotros" text="Nosotros" />
        {/* <NavLink to="/contacto" text="Contacto" /> */}
      </div>

      {/* Logo - Centro (clickeable) */}
      <LogoSection onClick={handleLogoClick} logo={logo} />

      {/* Botón Contactar - Derecha */}
      <div className="items-center justify-end flex-1 hidden md:flex">
        <ContactButton onClick={handleContactClick} />
      </div>

      {/* Menú móvil */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        onContactClick={handleContactClick}
      />
    </nav>
  );
};

// Componente reutilizable para enlaces
const NavLink = ({ to, text }) => (
  <Link 
    to={to}
    className="text-[color:var(--color-schemes-color-scheme-1-text)] hover:opacity-80 transition-opacity relative group"
    style={{
      fontSize: 'var(--text-regular-normal-font-size)',
      fontWeight: 'var(--text-regular-normal-font-weight)',
    }}
  >
    {text}
    {/* Indicador activo */}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
  </Link>
);

// Componente Logo
const LogoSection = ({ onClick, logo }) => (
  <div 
    className="flex items-center gap-4 cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-center justify-center p-1 overflow-hidden h-14 w-14 bg-white/5">
      <img 
        src={logo} 
        alt="Estudio Jurídico Contable Impositivo Kaisen" 
        className="object-contain min-w-full min-h-full transition-transform duration-300 group-hover:scale-105"
        style={{ 
          transform: 'scale(1.4)',
          transformOrigin: 'center'
        }}
      />
    </div>
    
    <div className="flex flex-col">
      <div 
        className="text-lg font-bold leading-tight tracking-tight transition-opacity group-hover:opacity-90"
        style={{ 
          fontFamily: 'var(--heading-h1-font-family)',
          color: 'var(--color-schemes-color-scheme-1-text)'
        }}
      >
        ESTUDIO KAISEN
      </div>
      <div 
        className="text-xs leading-tight transition-opacity opacity-90 group-hover:opacity-80"
        style={{ 
          fontFamily: 'var(--text-regular-normal-font-family)',
          color: 'var(--color-schemes-color-scheme-1-text)'
        }}
      >
        Contable • Impositivo • Jurídico 
      </div>
    </div>
  </div>
);

// Componente Botón Contactar
const ContactButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[color:var(--primitives-color-ebony)] text-[color:var(--primitives-color-white)] px-6 py-2.5 rounded-[100px] border border-[color:var(--primitives-color-ebony)] font-medium hover:opacity-90 transition-opacity cursor-pointer hover:shadow-lg"
    style={{
      fontSize: '14px',
      fontFamily: 'var(--text-regular-medium-font-family)',
      fontWeight: 'var(--text-regular-medium-font-weight)',
    }}
  >
    Contactar
  </button>
);

// Componente Menú Móvil
const MobileMenu = ({ isOpen, onToggle, onClose, onContactClick }) => (
  <>
    <button 
      className="md:hidden text-[color:var(--color-schemes-color-scheme-1-text)]"
      onClick={onToggle}
      aria-label="Menú"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {isOpen && (
      <div className="md:hidden absolute top-[72px] left-0 right-0 bg-[color:var(--color-schemes-color-scheme-1-background)] p-6 border-t border-[color:var(--color-schemes-color-scheme-1-border)] z-40">
        <div className="flex flex-col space-y-4">
          <MobileNavLink to="/" text="Inicio" onClick={onClose} />
          <MobileNavLink to="/servicios" text="Servicios" onClick={onClose} />
          <MobileNavLink to="/nosotros" text="Nosotros" onClick={onClose} />
          <button 
            onClick={() => {
              onContactClick();
              onClose();
            }}
            className="bg-[color:var(--primitives-color-ebony)] text-[color:var(--primitives-color-white)] py-3 px-4 rounded-[100px] mt-4 font-medium hover:opacity-90 transition-opacity"
          >
            Contactar
          </button>
        </div>
      </div>
    )}
  </>
);

// Componente Enlace Móvil
const MobileNavLink = ({ to, text, onClick }) => (
  <Link 
    to={to}
    className="text-[color:var(--color-schemes-color-scheme-1-text)] py-3 hover:opacity-80 transition-opacity border-b border-white/10"
    onClick={onClick}
  >
    {text}
  </Link>
);

export default Header;