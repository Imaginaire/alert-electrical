import {useEffect, useState} from 'react'
import {getClient} from '@/lib/sanity.client'

function Shortcode({shortcode}: {shortcode: string}) {
  const [data, setData] = useState<String>('')

  useEffect(() => {
    const fetchShortcode = async () => {
      const client = getClient()
      const query = `*[_type == "shortcodes"][0].shortcodes[shortcode == "${shortcode}"]`
      const result = await client.fetch(query)

      if (result && result.length > 0) {
        setData(result[0].value)
      } else {
        setData('Shortcode not found')
      }
    }

    fetchShortcode()
  }, [shortcode])

  return data
}

export default Shortcode
