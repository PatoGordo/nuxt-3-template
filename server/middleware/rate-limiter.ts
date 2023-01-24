import { RateLimiter } from "limiter";
import { defineEventHandler, getRequestHeader, createError } from "h3";
import cache from "memory-cache";

// THIS RATE LIMITER ALLOWS 10 REQUESTS EVERY 10 SECONDS
export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, "x-forwarded-for");

  if (!cache.get(ip)) {
    const cachedLimiter = new RateLimiter({
      interval: 15000,
      tokensPerInterval: 9,
      fireImmediately: false,
    });

    cache.put(ip, cachedLimiter, 15000);
  } else {
    const cachedLimiter = cache.get(ip) as RateLimiter;

    if (Math.floor(cachedLimiter.getTokensRemaining()) > 1) {
      await cachedLimiter.removeTokens(1);

      cache.put(ip, cachedLimiter, 15000);
    } else {
      throw createError({
        statusCode: 429,
        statusMessage: "Too Many Requests",
      });
    }
  }
});
