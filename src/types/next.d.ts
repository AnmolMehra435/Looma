// Type definitions for Next.js

declare module 'next' {
  import { ComponentType } from 'react';
  
  export interface NextPage<P = {}, IP = P> {
    (props: P): JSX.Element | null;
    getInitialProps?(ctx: any): Promise<IP> | IP;
  }
  
  export function dynamic<T = any>(
    dynamicOptions: any,
    options?: any
  ): ComponentType<T>;
}

declare module 'next/dynamic' {
  import { ComponentType } from 'react';
  
  function dynamic<T = any>(
    dynamicOptions: any,
    options?: any
  ): ComponentType<T>;
  
  export default dynamic;
}
