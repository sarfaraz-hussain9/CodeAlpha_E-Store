import {fetchBaseQuery,createApi} from "@reduxjs/toolkit"

import { BASE_URL } from "../features/constants"

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});

export const apislice=createApi({
    baseQuery,
    tagsTypes:['Product','Order','User'],
    endPoints:(builder)=>({})
})