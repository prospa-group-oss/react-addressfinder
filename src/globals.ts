interface AppWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AddressFinder: any;
}

interface Global extends NodeJS.Global {
  window: AppWindow;
}

const appGlobal = global as Global;

export const window = appGlobal.window;
