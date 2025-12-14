import Explorebtn from '@/components/Explorebtn'
import EventCard from '@/components/EventCard'
import axios from 'axios'
import { cacheLife } from 'next/cache'

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL
export default  async function Home() {
  'use cache';
  cacheLife('hours');


  const res = await fetch(`${BASE_URL}/api/events`, {
    next: { revalidate: 3600 } // 1 hour caching
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();
  const events = data.events;
  

  return (
    <section className="mx-6">
      <h1 className="text-center mt-10">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-4">Hackthons,Meetups, and Conferences, All in One Place</p>
      <Explorebtn />
      

      <div className='featured-events'>
        <h3>Featured Events</h3>
        <ul className='events'>
        {
          events && events.length>0 && events.map((event:any)=>(
            <li key={event.id} className='list-none'>
              <EventCard {...event} />
            </li>
          ))
        }
        </ul>
      </div>
    </section>
  )
}