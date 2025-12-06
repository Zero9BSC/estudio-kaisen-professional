const SectionTitle = ({ title, subtitle, center = false }) => {
  return (
    <div className={`${center ? 'text-center' : ''} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;