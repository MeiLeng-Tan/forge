import { createTheme } from "@mui/material";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#6b21a8", // Amethyst Purple from FORGE.png
        },
        background: {
          default: "#f8fafc",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#a855f7", // Lighter purple for better contrast in dark mode
        },
        background: {
          // Neutral dark greys instead of default MUI blue
          default: "#0f172a",
          paper: "#1e293b",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
        },
      },
    },
  },
  // colorSchemes: {
  //   light: true,
  //   dark: true,
  // },
  // palette: {
  //   primary: {
  //     main: "#6b21a8",
  //     light: "#a855f7",
  //     dark: "#4c1d95",
  //     contrastText: "#ffffff",
  //   },
  //   secondary: {
  //     main: "#475569",
  //   },
  //   background: {
  //     default: "#f8fafc",
  //     paper: "#ffffff",
  //   },
  //   text: {
  //     primary: "#1e293b",
  //     secondary: "#64748b",
  //   },
  //   divider: "#e2e8f0",
  // },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
    h5: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)",
          "&:hover": {
            background: "#4c1d95",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          border: "1px solid #f1f5f9",
        },
      },
    },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 600,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  // },
});
