import type { ReactNode, FC } from "react";

interface AppSkeletonProps {
  children?: ReactNode;
}

export const AppSkeleton: FC<AppSkeletonProps> = ({ children = null }) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      padding: "18px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
    }}
  >
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: 44,
        fontWeight: 700,
        fontFamily: [
          "Inter",
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ].join(", "),
        letterSpacing: "-1.5px",
      }}
    >
      NextJS gRPC
    </div>
    <div
      style={{
        flexGrow: 2,
      }}
    >
      <div
        style={{
          minHeight: "84px",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  </div>
);
