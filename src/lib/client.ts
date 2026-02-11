import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY || process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!apiKey) {
    throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
    serviceDomain,
    apiKey,
});
