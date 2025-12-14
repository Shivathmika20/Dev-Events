'use server'
import {prisma} from '@/lib/prisma'


export const createBooking=async({eventId,email}:{eventId:string,email:string})=>{
    try{
        const booking=await  prisma.booking.create({
            data:{
                eventId,
                email,
            }}
        );
        return {success:true,booking}
    }
    catch(e){
        console.log("Error creating booking:",e);
        return {success:false,error:e}
    }
}
   