'use client'
import  {useState}  from 'react'
import { createBooking } from '@/lib/actions/booking-actions'
const BookEvent = ({eventId}: {eventId: string}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {success}= await createBooking({
            eventId,
            email
        });
        if(success)
          {
            setSubmitted(true);
            console.log("Booking successful")
          } 
        else{
            console.log("Booking failed:")
        }
    }

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>ThankYou for signing up.</p>
      ):(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" >Email Address</label>
                <input type="email"  
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                />
            </div>

            <button type="submit" className='button-submit'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default BookEvent
