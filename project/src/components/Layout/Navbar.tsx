import { Navbar, Nav, Container } from "react-bootstrap";
import {
  Search,
  Home,
  MessageCircle,
  FileText,
  Users,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ChangeLanguageButton from "../UI/ChangeLanguageButton";

function MainNavbar() {
  const { t } = useTranslation();
  const location = useLocation();


  const navItems = [
    { path: "/dashboard", icon: Home, label: t("nav.home") },
    {
      path: "/consultation",
      icon: MessageCircle,
      label: t("nav.consultation"),
    },
    { path: "/documents", icon: FileText, label: t("nav.documents") },
    { path: "/research", icon: Search, label: t("nav.research") },
    { path: "/lawyers", icon: Users, label: t("nav.lawyers") },
    { path: "/profile", icon: User, label: t("nav.profile") },
  ];

  return (
    <Navbar expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="text-4xl">
          <Link to="/">{t("brand")}</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center  space-x-2 space-x-reverse px-2 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent-purple text-white"
                      : "text-neutral-dark dark:text-white hover:bg-secondary-lavender dark:hover:bg-neutral-dark"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-lg mx-1 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </Nav>

          {/* زر تغيير اللغة */}
         <ChangeLanguageButton/>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
