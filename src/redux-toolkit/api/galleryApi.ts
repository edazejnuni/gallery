import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';


export const galleryApi = createApi({
   reducerPath: 'galleryApi',
   baseQuery: fetchBaseQuery({
      prepareHeaders: (headers) => {
         headers.set('accept', 'application/json');
         headers.set('accept-language', 'it');
         headers.set('Authorization', 'Client-ID 6c504bdd2db8ffa');
         return headers;
       },
   }),
   endpoints: (builder) => ({
      getGallery: builder.query({
         query: ({ section, sort, window, page, showViral, showMature, albumPreviews }) => {
            return {
               url: `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`,
               method: 'get',
            };
         },
      }),
      getImage: builder.query({
         query: ({ id }) => {
            return {
               url: `https://api.imgur.com/3/gallery/${id}`,
               method: 'get',
            };
         },
      }),
 
    
   }),
});

export const {
 useGetGalleryQuery,
 useGetImageQuery
} = galleryApi;
