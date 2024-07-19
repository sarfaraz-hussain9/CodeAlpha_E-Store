import {fetchBaseQuery,createApi} from "@reduxjs/toolkit/query/react"

const baseQuery=fetchBaseQuery({baseUrl:''});

export const apislice=createApi({
    baseQuery,
    tagsTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})
