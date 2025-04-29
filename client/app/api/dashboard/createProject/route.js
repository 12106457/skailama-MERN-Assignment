export const dynamic = 'force-dynamic';

import axios from 'axios';
import { NextResponse } from "next/server";

export async function POST(req) {
    const axiosInstance = axios.create({
        httpsAgent: new (require('https').Agent)({  
          rejectUnauthorized: false  
        })
    });
    try {
        // Extract auth token from the request headers (if required)
        const authToken = req.headers.authorization || "";

        // Fetch the request body
        const body = await req.json();
        // Make a POST request to your external backend API using Axios        
         
        const url = process.env.NEXT_PUBLIC_API_URL + '/project/create'

        const axiosResponse =  await axiosInstance.post(url,body,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':authToken
            }
        });

        return NextResponse.json(axiosResponse.data);

    } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
            // Extract specific message from axios error response if available
            // return new NextResponse(error.response.data.message || 'Something went wrong', { status: error.response.status });
            return NextResponse.json(error.response.data);

        } else {
            return new NextResponse('Something went wrong', { status: 400 });
        }
    }
}