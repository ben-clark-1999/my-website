declare module "lottie-react" {
  import * as React from "react";

  interface LottieProps {
    animationData: object;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  const Lottie: React.FC<LottieProps>;
  export default Lottie;
}
