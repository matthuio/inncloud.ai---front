declare module 'vanta/dist/vanta.clouds.min' {
  interface VantaCloudOptions {
    el: HTMLElement;
    THREE: any;
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    [key: string]: any;  // Allow additional properties
  }

  interface VantaEffect {
    destroy: () => void;
  }

  // Export default function for the CLOUDS effect
  export default function(options: VantaCloudOptions): VantaEffect;
}
