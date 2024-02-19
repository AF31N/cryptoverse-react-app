// cryptoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '0963ab3134msh4bb8c392774a3e8p1f1ccajsn5444c93b48dd',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`) // Update the endpoint as per API documentation
        }),
        getCryptoDetails:  builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`) 
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
          }),
          getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          }),
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery,  useGetCryptoHistoryQuery,  useGetExchangesQuery,
} = cryptoApi;
