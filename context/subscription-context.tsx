"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SubscriptionContextValue {
  subscriptionInView: boolean;
  setSubscriptionInView: (value: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(
  undefined
);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptionInView, setSubscriptionInView] = useState(false);

  return (
    <SubscriptionContext.Provider
      value={{ subscriptionInView, setSubscriptionInView }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};
