export const dynamic = "force-dynamic";
import Explorebtn from '@/components/Explorebtn'
import EventCard from '@/components/EventCard'

export default async function Home() {
  // Use relative URL fallback so it works both locally and on Vercel
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const res = await fetch(`${baseUrl}/api/events`, {
    // Always fetch fresh data from the DB in production
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Events fetch failed", res.status, res.statusText);
    return <p className="text-center mt-10">Events unavailable</p>;
  }

  const data = await res.json();
  const events = data.events;
  // console.log("Fetched Eventts:", events);

  return (
    <section className="mx-6">
      <h1 className="text-center mt-10">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-4">Hackthons,Meetups, and Conferences, All in One Place</p>
      <Explorebtn />

      <div className='featured-events' id="feature-events">
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