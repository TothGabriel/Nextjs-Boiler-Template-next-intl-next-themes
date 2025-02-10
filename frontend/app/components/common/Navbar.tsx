"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { lightTheme, darkTheme } from "@/app/config/theme";
import LocaleToggle from "@/app/components/common/LocaleToggle";
import ThemeToggle from "@/app/components/common/ThemeToggle";

interface NavbarProps {
  locale: string; // ✅ Passé en prop depuis `layout.tsx`
}

export const Navbar = ({ locale }: NavbarProps) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const { theme: appTheme } = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery((theme: typeof lightTheme) =>
    theme.breakpoints.down("md")
  );
  const muiTheme = appTheme === "dark" ? darkTheme : lightTheme;
  const t = useTranslations("global.nav");

  const navigation = [
    { name: t("home"), href: `/${locale}/` },
    { name: t("about"), href: `/${locale}/about` },
    { name: t("contact"), href: `/${locale}/contact` },
  ];

  const handleOpenMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: muiTheme.palette.background.default,
        boxShadow: "none",
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: muiTheme.palette.text.primary,
            }}
          >
            Logo
          </Typography>
        </Link>

        {/* Navigation desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body1"
                sx={{
                  color:
                    pathname === item.href
                      ? muiTheme.palette.primary.main
                      : muiTheme.palette.text.secondary,
                  "&:hover": { color: muiTheme.palette.primary.main },
                }}
              >
                {item.name}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Contrôles */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ThemeToggle locale={locale} />
          <LocaleToggle/>

          {/* Menu mobile */}
          {isMobile && (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleOpenMobileMenu}
                sx={{ color: muiTheme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleCloseMobileMenu}
                PaperProps={{
                  sx: {
                    backgroundColor: muiTheme.palette.background.paper,
                    minWidth: 200,
                  },
                }}
              >
                {navigation.map((item) => (
                  <MenuItem
                    key={item.href}
                    onClick={handleCloseMobileMenu}
                    sx={{
                      color:
                        pathname === item.href
                          ? muiTheme.palette.primary.main
                          : muiTheme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: muiTheme.palette.action.hover,
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <Typography>{item.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
