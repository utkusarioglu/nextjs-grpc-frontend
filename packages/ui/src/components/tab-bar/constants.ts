import { Home, AlertOctagon, User } from "@tamagui/lucide-icons";

export const ANIMATED_Y_STACK_VARIANTS = {
  leftFade: {
    true: {
      x: -50,
      opacity: 0,
    },
  },
  rightFade: {
    true: {
      x: 50,
      opacity: 0,
    },
  },
  fade: {
    true: {
      opacity: 0,
    },
  },
} as const;

export const TAB_ITEMS = [
  {
    path: "/",
    tKey: "rest:TabBar.Feed",
    Icon: Home,
  },
  {
    path: "/decade-stats",
    tKey: "rest:TabBar.DecadeStats",
    Icon: AlertOctagon,
  },
  {
    path: "/user/1",
    tKey: "rest:TabBar.User",
    Icon: User,
  },
];

export const RAW_STYLES = {
  isActiveAndHovered: {
    scale: 1.3,
    opacity: 0.5,
  },
  isActive: {
    scale: 1.8,
    opacity: 0.5,
  },
  idleAndHovered: {
    scale: 1,
    opacity: 0.2,
  },
  idle: {
    scale: 0,
    opacity: 0,
  },
  overlayColor: "#00000040",
  tabButton: {
    active: {
      scale: 1,
    },
    idle: {
      scale: 0.8,
    },
  },
  iconAndLabel: {
    active: {
      opacity: 1,
    },
    idle: {
      opacity: 0.8,
    },
  },
};
