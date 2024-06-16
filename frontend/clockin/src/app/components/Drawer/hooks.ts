import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export function useHooks() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return { theme, router, isMobile };
}
