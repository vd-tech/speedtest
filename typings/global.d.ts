export declare global {
  export interface Window {}

  namespace NodeJS {
    interface Global {}
    interface ProcessEnv {}
    interface Process {
      browser: boolean;
    }
  }
}
