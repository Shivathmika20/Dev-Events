import React from 'react'
import BookEvent from '@/components/BookEvent'
import EventCard from '@/components/EventCard'
import { getSimilarEvents } from '@/lib/actions/event-actions'
import { cacheLife } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'


const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

const Eventdetails =({icon,alt,label}:{icon:string,alt:string,label:string})=>{
  return (
      <div className='flex flex-row items-center gap-2'>
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p>
      </div>
  )
}

const EventAgenda=({agendaItems}:{agendaItems:string[]})=>{
 return(
   <div className="agenda">
    <h2>Event Agenda</h2>
    <ul>
      {
        agendaItems.map((item)=>(
          <li key={item} >{item}</li>
        ))
      }
    </ul>
  </div>
 )

}

const EventTags=({tags}:{tags:string[]})=>{
  return(
    <div className='flex flex-row gap-1.5 flex-wrap'>
      {
        tags.map((tag)=>(
          <div key={tag} className="pill">{tag}</div>
        ))
      }
    </div>
  )
}



const EventDetails = async ({ params }: { params: Promise<string> }) => {


  const slug=await params
  let event;
  try{
     const res = await fetch(`${BASE_URL}/api/events/${slug}`, {
             next: { revalidate: 30 }, 
     })
  
    if (!res.ok) {
        if (res.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${res.statusText}`);
    }
    const data = await res.json()
    event = data.eventInfo

    if(!event){
        return notFound();
        }   
  }
   
  catch(e){
        console.error('Error fetching event:', e);
        return notFound();
  }
  
    const booking=10;
    const similarEvents:any=await getSimilarEvents(slug);

  return (
    <section id="event" className="my-4">
        <div className="header">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>

        <div className="details">
          {/* leftside-event content */}
          <div className="content">
           <Image src={event.image} alt="Event Banner" width={800} height={800} className="banner"/>

            <section className="flex-col-gap-2">
                <h2>Overview</h2>
                <p>{event.overview}</p>
            </section>

             <section className="flex-col-gap-2">
                <h2>Event Details</h2>
                <Eventdetails icon="/icons/calendar.svg" alt="calender" label={event.date}/>
                <Eventdetails icon="/icons/clock.svg" alt="clock" label={event.time}/>
                <Eventdetails icon="/icons/pin.svg" alt="pin" label={`${event.venue}, ${event.location}`}/>
                <Eventdetails icon="/icons/mode.svg" alt="mode" label={event.mode}/>
                <Eventdetails icon="/icons/audience.svg" alt="audience" label={event.audience}/>
            </section>

            <EventAgenda agendaItems={event.agenda}/>
              
            <section className='flex-col-gap-2'>
              <h2>About the Organizer</h2>
              <p>{event.organizer}</p>
            </section>

            <EventTags tags={event.tags}/>

          </div>

            {/* ryt side */}
          <aside className="booking">
              <div className='signup-card'>
                <h2>Book Your Spot</h2>
                {
                  booking>0 ? (
                    <p className='text-sm'>
                      Join {booking} people who have already booked their spot!
                    </p>
                  ):(
                    <p className='text-sm'>
                      Be the first to book your spot for this event!
                    </p>
                  )
                }

                <BookEvent eventId={event.id}/>
              </div>
          </aside>
        </div>

        <div className='flex w-full flex-col gap-4 pt-16'>
          <h2>Similar Events</h2>
          <div className='events'>
                {similarEvents.length>0 && similarEvents.map((similarEvent:any)=>(
                
                    <EventCard key={similarEvent.id} {...similarEvent} />
                  
                ))}
          </div>
        </div>

        
    </section>
  )
}

export default EventDetails
