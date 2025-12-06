const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "font-medium py-3 px-6 rounded-lg transition-colors duration-300";
  
  const variants = {
    primary: "bg-secondary hover:bg-accent text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    dark: "bg-primary hover:bg-dark text-white"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;