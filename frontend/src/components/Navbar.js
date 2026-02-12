import "./Navbar.css";

const Navbar = () => {
  const features = [
    { name: "Users", link: "/users", styleClass: "users-btn" },
    { name: "Transactions", link: "/transactions", styleClass: "transactions-btn" },
    { name: "Categories", link: "/categories", styleClass: "categories-btn" },
    { name: "Trends", link: "/trends", styleClass: "trends-btn" },
  ];

  return (
    <div className="top-bar">
      {/* HEADER + FEATURES */}
      <div className="navbar-top">
        <h2>SQL Analytics</h2>
        <div className="navbar-actions">
          <a href="/" className="home-btn">Home</a>
          {features.map((feature) => (
            <a
              key={feature.name}
              href={feature.link}
              className={`feature-btn ${feature.styleClass}`}
            >
              {feature.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
