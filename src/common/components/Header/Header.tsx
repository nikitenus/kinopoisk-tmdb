import { NavLink } from "react-router"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { navItems } from "./navItems"
import logo from "@/assets/logo.svg"
import { LinearProgress, useTheme } from "@mui/material"
import { selectAppStatus } from "@/app/appSlice.ts"
import { useSelector } from "react-redux"

type Props = {
  changeThemeMode: () => void
}

export const Header = ({ changeThemeMode }: Props) => {
  const theme = useTheme()
  const isLight = theme.palette.mode === "light"
  const status = useSelector(selectAppStatus)

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            position: "relative",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={NavLink}
            to="/"
            sx={{ display: "inline-flex", zIndex: 1 }}
          >
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ width: 130 }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 2,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                color="inherit"
                sx={{ "&.active": { fontWeight: 700, textDecoration: "underline" } }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            sx={{ zIndex: 1 }}
            onClick={changeThemeMode}
          >
            {isLight ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </Container>
    </AppBar>
  )
}
