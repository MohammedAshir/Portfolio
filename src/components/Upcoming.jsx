const UpcomingProjects = () => {
  const upcoming = [
    {
      id: 1,
      title: "RK Plywood, Glass and Hardware E-commerce",
      description: "A comprehensive e-commerce platform for plywood, glass, and hardware products with advanced inventory management.",
      status: "In Production",
      progress: 65,
      type: "client",
      tags: ["web", "ecommerce", "React", "Java Spring"]
    }
  ];

  return (
    <section id="upcoming" className="py-20 px-4 sm:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
          <span className="text-indigo-600">Coming</span> Soon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {upcoming.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjects;