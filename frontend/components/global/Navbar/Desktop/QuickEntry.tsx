import CartPlus from '@/svgs/CartPlus'
import {useState} from 'react'

export default function QuickEntry() {
  const [entry, setEntry] = useState('')

  return (
    <div className="quickEntry flex items-center px-4 w-1/4 space-x-2 ">
      <span>
        <CartPlus />
      </span>

      <form className="flex-grow">
        <input
          className="placeholder-black uppercase duration-500 outline-none px-2 py-1 focus:border-primary border-transparent border-2 rounded"
          type="text"
          placeholder="Quick entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
      </form>
    </div>
  )
}
