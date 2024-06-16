import {
  Check as CheckIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  SwipeableDrawer,
  styled,
} from "@mui/material";
import { useHooks } from "./hooks";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Drawer({
  open,
  handleDrawerToggle,
}: {
  open: boolean;
  handleDrawerToggle: any;
}) {
  const { theme, router, isMobile } = useHooks();
  const pathname = usePathname();

  const getItemStyle = (path: string) => {
    return pathname === path
      ? { backgroundColor: theme.palette.action.selected }
      : {};
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => router.push("/")}
          style={getItemStyle("/")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          onClick={() => router.push("/checkins")}
          style={getItemStyle("/checkins")}
        >
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Checkins" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)` },
        flexShrink: { sm: 0 },
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
      aria-label="mailbox folders"
    >
      {isMobile ? (
        <SwipeableDrawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      ) : (
        <MuiDrawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              overflowX: "hidden",
            },
          }}
          open={open}
        >
          {drawer}
        </MuiDrawer>
      )}
    </Box>
  );
}
