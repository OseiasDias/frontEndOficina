import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.1, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.1, when: "beforeChildren" },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: { duration: (i + 1) * 0.1 },
  }),
  show: (i) => ({
    x: 0,
    transition: { duration: (i + 1) * 0.1 },
  }),
};

const SideBarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setIsOpen(true);
  }, [setIsOpen]);

  useEffect(() => {
    if (!isOpen) setIsMenuOpen(false);
  }, [isOpen]);

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isOpen && (
          <motion.div
            animate={{ rotate: isMenuOpen ? -90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div
                key={subRoute.path}
                variants={menuItemAnimation}
                custom={i}
              >
                <NavLink to={subRoute.path} className="link">
                  <div className="icon">{subRoute.icon}</div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Definição de PropTypes para maior segurança e legibilidade
SideBarMenu.propTypes = {
  route: PropTypes.shape({
    icon: PropTypes.element,
    name: PropTypes.string.isRequired,
    subRoutes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        icon: PropTypes.element,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  showAnimation: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default SideBarMenu;
