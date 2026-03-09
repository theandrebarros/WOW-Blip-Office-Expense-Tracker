export const DEBUG_MODE = import.meta.env.DEV;

export const debug = {
  log: (...args) => DEBUG_MODE && console.log(...args),
  error: (...args) => console.error(...args),
  warn: (...args) => DEBUG_MODE && console.warn(...args),
  info: (...args) => DEBUG_MODE && console.info(...args),
  time: (label) => DEBUG_MODE && console.time(label),
  timeEnd: (label) => DEBUG_MODE && console.timeEnd(label),
};

export const CONSTANTS = {
  STORAGE_KEY_PREFIX: 'wowo-blip-office-visit-v2',
  THEME_STORAGE_KEY: 'fd-theme-mode',
  LANG_STORAGE_KEY: 'fd-lang',
  AUTO_SAVE_DELAY: 1000,
  PERIODIC_SYNC_INTERVAL: 120000,
  TOAST_DURATION_SHORT: 2000,
  TOAST_DURATION_NORMAL: 3000,
  TOAST_DURATION_LONG: 5000,
  INPUT_DEBOUNCE_DELAY: 300,
  MOBILE_TYPING_CLEAR_DELAY: 2000,
  LAST_USER_INPUT_CLEAR_DELAY: 5000,
  QUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  DEFAULT_BUDGET_PER_QUARTER: 380,
  DEFAULT_GBP_RATE: 0.85,
  MAX_AMOUNT: 999999.99,
  MIN_AMOUNT: 0,
};
