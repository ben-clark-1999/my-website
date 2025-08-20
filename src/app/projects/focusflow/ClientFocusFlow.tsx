"use client";

import dynamic from "next/dynamic";

// Load the mixer only in the browser (uses Web Audio / window)
const FocusFlowApp = dynamic(() => import("@/components/focusflow/App"), {
  ssr: false,
});

export default function ClientFocusFlow() {
  return <FocusFlowApp />;
}
