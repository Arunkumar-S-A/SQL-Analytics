import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./carousel.css";

const AnalyticsCarousel = ({ modules }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-wrapper">
      {modules.map((item) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={item.id}
          className="carousel-card"
          onClick={() => navigate(`/analytics/${item.id}`)}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsCarousel;
