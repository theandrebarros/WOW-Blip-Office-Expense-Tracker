export const getBudgetPerQuarter = (travelOrigin) => {
  if (travelOrigin === 'porto') return 30;
  if (travelOrigin === 'mainland') return 340;
  return 380; // islands (default)
};

const INITIAL_STATE = {
  quarters: {
    Q1: { active: true, spent: 0, details: { flightToOffice: 0, flightHome: 0, hotel: 0 } },
    Q2: { active: true, spent: 0, details: { flightToOffice: 0, flightHome: 0, hotel: 0 } },
    Q3: { active: true, spent: 0, details: { flightToOffice: 0, flightHome: 0, hotel: 0 } },
    Q4: { active: true, spent: 0, details: { flightToOffice: 0, flightHome: 0, hotel: 0 } },
  },
  budgetPerQuarter: 380,
};

export const createInitialYearState = (travelOrigin = 'islands') => {
  const state = JSON.parse(JSON.stringify(INITIAL_STATE));
  state.budgetPerQuarter = getBudgetPerQuarter(travelOrigin);
  return state;
};

export const DEFAULT_START_YEAR = 2025;

export const getDefaultSelectedYear = () => {
  const y = new Date().getFullYear();
  return y >= DEFAULT_START_YEAR ? y : DEFAULT_START_YEAR;
};

export const ensureQuarterShape = (q) => ({
  active: q?.active ?? true,
  spent: Number(q?.spent ?? 0),
  details: {
    flightToOffice: Number(q?.details?.flightToOffice ?? 0),
    flightHome: Number(q?.details?.flightHome ?? 0),
    hotel: Number(q?.details?.hotel ?? 0),
  },
});

export const ensureStateShape = (s, rootSettings = {}) => {
  const travelOrigin = rootSettings?.travelOrigin || s?.settings?.travelOrigin || null;
  const budgetPerQuarter =
    s?.budgetPerQuarter !== undefined
      ? Number(s.budgetPerQuarter)
      : getBudgetPerQuarter(travelOrigin || 'islands');
  return {
    budgetPerQuarter,
    quarters: {
      Q1: ensureQuarterShape(s?.quarters?.Q1),
      Q2: ensureQuarterShape(s?.quarters?.Q2),
      Q3: ensureQuarterShape(s?.quarters?.Q3),
      Q4: ensureQuarterShape(s?.quarters?.Q4),
    },
    settings: {
      gbpMode: Boolean(s?.settings?.gbpMode ?? false),
      gbpRate: Number(s?.settings?.gbpRate ?? 0.85),
      travelOrigin,
    },
  };
};
