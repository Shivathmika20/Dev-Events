'use client'
import Image from "next/image"
import Link from "next/link"

const Explorebtn = () => {
  return (
    <button id="explore-btn" onClick={() => {console.log('Explore')}} className="mt-6 mx-auto">
        <Link href="/">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
        </Link>
    </button>
  )
}

export default Explorebtn