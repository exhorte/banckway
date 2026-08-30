export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/my-banks",
    label: "Accounts",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Transactions",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Send money",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-brand-50",
    circleBg: "bg-brand-100",
    text: {
      main: "text-brand-900",
      count: "text-brand-700",
    },
    progress: {
      bg: "bg-brand-100",
      indicator: "bg-brand-500",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-500",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-muted",
    circleBg: "bg-secondary",
    text: {
      main: "text-foreground",
      count: "text-muted-foreground",
    },
    progress: {
      bg: "bg-muted",
      indicator: "bg-foreground/70",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-brand-200",
    backgroundColor: "bg-brand-400",
    textColor: "text-brand-700",
    chipBackgroundColor: "bg-brand-50",
  },
  Payment: {
    borderColor: "border-brand-200",
    backgroundColor: "bg-brand-500",
    textColor: "text-brand-700",
    chipBackgroundColor: "bg-brand-50",
  },
  "Bank Fees": {
    borderColor: "border-amber-200",
    backgroundColor: "bg-amber-500",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-amber-50",
  },
  Transfer: {
    borderColor: "border-blue-100",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-blue-25",
  },
  Processing: {
    borderColor: "border-border",
    backgroundColor: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    chipBackgroundColor: "bg-muted",
  },
  Success: {
    borderColor: "border-brand-200",
    backgroundColor: "bg-brand-500",
    textColor: "text-brand-700",
    chipBackgroundColor: "bg-brand-50",
  },
  Travel: {
    borderColor: "border-blue-100",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-blue-25",
  },
  default: {
    borderColor: "border-border",
    backgroundColor: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    chipBackgroundColor: "bg-muted",
  },
};
