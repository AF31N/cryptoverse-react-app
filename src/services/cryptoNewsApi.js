import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '0963ab3134msh4bb8c392774a3e8p1f1ccajsn5444c93b48dd',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl =  'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk'; // Updated base URL


const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&lang=en&sortBy=relevancy&pageSize=${count}`)
        })
    })
});


export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
