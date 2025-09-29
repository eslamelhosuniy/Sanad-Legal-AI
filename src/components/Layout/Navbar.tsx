import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import React, { useState } from "react";
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
import PopUp from "../UI/PopUp";

function MainNavbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [pop, setPop] = useState(false);

  function togglePop() {
    setPop(!pop);
  }

  const navItems = [
    { path: "/dashboard", icon: Home, label: t("nav.home") },
    {
      path: "/consultation",
      icon: MessageCircle,
      label: t("nav.consultation"),
    },
    {
      path: "/documents",
      icon: FileText,
      label: t("nav.documents"),
      soon: false,
    },
    { path: "/research", icon: Search, label: t("nav.research"), soon: false },
    { path: "/lawyers", icon: Users, label: t("nav.lawyers"), soon: false },
    { path: "/profile", icon: User, label: t("nav.profile") },
  ];

  return (
    <Navbar expand="xl" className="bg-body-tertiary">
      <Container fluid>
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
                  to={ item.soon ? "#" : item.path}
                  onClick={item.soon ? togglePop : null}
                  className={`flex items-center mx-2 px-2 py-2 rounded-lg transition-colors ${
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
          {user && (
            <Link
              onClick={logout}
              className="text-accent-purple mx-3 hover:text-purple-600 font-medium transition-colors"
            >
              {t("landingPage.logout")}
            </Link>
          )}
          <ChangeLanguageButton />
        </Navbar.Collapse>
      </Container>
      {pop && (
        <PopUp onClose={togglePop}>
          <p>{t("soon")}</p>
        </PopUp>
      )}
    </Navbar>
  );
}

export default MainNavbar;
