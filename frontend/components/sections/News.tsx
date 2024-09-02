import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import getNewsArticles from '../utils/getNewsArticles'
import urlForImage from '@/shared/utils/urlForImage'
import {CustomPortableText} from '../shared/CustomPortableText'
import RightArrow from '@/svgs/RightArrow'

interface ArticleType {
  id: string
  title: string
  slug: string
  image: string
  sections: {
    content: PortableTextBlock[]
  }[]
}

// types
import {News as NewsType} from '../../types'
import type {PortableTextBlock} from '@portabletext/types'
import toPlainText from '../utils/toPlainText'

export default function News(newsData: NewsType) {
  const {title} = newsData ?? {}

  console.log(newsData)

  // state for news
  const [news, setNews] = useState<ArticleType[]>([])
  const [displayedNews, setDisplayedNews] = useState<number>(7)
  const [loading, setLoading] = useState<boolean>(true)

  // get news
  useEffect(() => {
    getNewsArticles().then((res) => {
      setNews(res)
      setLoading(false)
    })
  }, [])

  console.log('news', news)

  const getFirstSentence = (content: PortableTextBlock[]) => {
    const plainText = toPlainText(content)
    const firstSentence = plainText.split('.').slice(0, 2).join('.') + '.'
    return firstSentence
  }

  return (
    <section className="latest-news w-full flex justify-center items-center relative">
      <div className="bg-primary pt-[60px] w-full h-[329px] absolute top-0">
        <h1 className="text-4xl text-white text-center ">{title}</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="newsContainer w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-[164px] mb-12 px-5 z-30 max-w-[1388px] ">
          {news.slice(0, displayedNews).map((article, articleIndex) => {
            return (
              <div
                key={articleIndex}
                className={`newsCard w-full flex flex-col items-center  ${articleIndex === 0 ? 'bg-[#F5F5F5] sm:col-span-2 lg:flex-row' : 'border-[1px] lg:col-span-1 xl:flex-row'} `}
              >
                <div
                  className={`relative w-full h-[328px]   ${articleIndex === 0 ? 'lg:w-10/12 lg:h-full' : 'xl:w-8/12 xl:h-full'}`}
                >
                  <Image
                    src={urlForImage(article.image)?.width(1920).url()}
                    alt={article.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={`flex flex-col p-5 w-full  ${articleIndex === 0 ? 'lg:p-[96px] lg:justify-center' : 'p-6'}`}
                >
                  <h2
                    className={`   ${
                      articleIndex === 0
                        ? 'text-4xl leading-[43px] mb-5 font-medium'
                        : 'text-primary text-[20px] leading-6 mb-2 font-semibold'
                    }`}
                  >
                    {article.title}
                  </h2>
                  <div className="font-manrope text-secondary ">
                    <p className="font-normal">{getFirstSentence(article.sections[0].content)}</p>
                  </div>
                  <Link
                    href={article.slug}
                    className={`font-manrope flex items-center ${articleIndex === 0 ? 'mt-10' : 'mt-5 text-primary'} hover:text-[#009FE3]`}
                  >
                    <span>Read more</span>
                    <button className="bg-[#E0E0E0] ml-[10px] rounded-full p-1">
                      <RightArrow width="18" height="18" arrowColor="black" />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
          <button
            className="uppercase text-center underline mt-6 sm:col-span-2 hover:text-[#009FE3]"
            onClick={() => {
              setDisplayedNews(displayedNews + 6)
            }}
          >
            load more
          </button>
        </div>
      )}
    </section>
  )
}
