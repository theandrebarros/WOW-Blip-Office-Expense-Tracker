import { useEffect } from 'react';
import { CONSTANTS, debug } from '../config/constants.js';

const EXCHANGE_RATE_APIS = [
  {
    url: 'https://api.exchangerate.host/latest?base=EUR&symbols=GBP',
    parser: (data) => (data.success && data.rates ? data.rates.GBP : null),
  },
  {
    url: 'https://api.fxratesapi.com/latest?base=EUR&symbols=GBP',
    parser: (data) => (data.rates ? data.rates.GBP : null),
  },
  {
    url: 'https://api.exchangerate-api.com/v4/latest/EUR',
    parser: (data) => (data.rates ? data.rates.GBP : null),
  },
];

export const useExchangeRate = (userId, onRateUpdate) => {
  useEffect(() => {
    const storageKey = userId
      ? `${CONSTANTS.STORAGE_KEY_PREFIX}-${userId}`
      : CONSTANTS.STORAGE_KEY_PREFIX;

    const updateRate = async () => {
      for (const api of EXCHANGE_RATE_APIS) {
        try {
          debug.log('Background: Trying exchange rate API:', api.url);
          const response = await fetch(api.url);
          if (!response.ok) continue;
          const data = await response.json();
          const gbpRate = api.parser(data);
          if (gbpRate && gbpRate > 0 && gbpRate < 2) {
            const roundedRate = Math.round(gbpRate * 10000) / 10000;
            const currentState = JSON.parse(localStorage.getItem(storageKey) || '{}');
            if (currentState.years) {
              Object.keys(currentState.years).forEach((yearKey) => {
                if (currentState.years[yearKey].settings) {
                  currentState.years[yearKey].settings.gbpRate = roundedRate;
                }
              });
              localStorage.setItem(storageKey, JSON.stringify(currentState));
              debug.log('Background: Updated EUR to GBP rate to:', roundedRate);
            }
            // Notify React so the UI reflects the fetched rate immediately
            if (typeof onRateUpdate === 'function') {
              onRateUpdate(roundedRate);
            }
            return;
          }
        } catch (apiError) {
          debug.log('Background: API failed:', api.url, apiError);
        }
      }
      debug.log('Background: All exchange rate APIs failed');
    };

    updateRate();
    const intervalId = setInterval(updateRate, 10 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [userId]);
};
