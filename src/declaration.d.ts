
// custom.d.ts or images.d.ts
declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const value: string;
    export default value;
  }
  
  declare module '*.mp4' {
    const src: string;
    export default src;
  }
  
  declare module '*.webm' {
    const src: string;
    export default src;
  }
  
  declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  declare module '*.wav' {
    const src: string;
    export default src;
  }
  
  declare module '*.ogg' {
    const src: string;
    export default src;
  }
  
  declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  