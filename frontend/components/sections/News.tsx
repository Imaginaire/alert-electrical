import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import getNewsArticles from '../utils/getNewsArticles'
import urlForImage from '@/shared/utils/urlForImage'
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

  // state for news
  const [news, setNews] = useState<ArticleType[]>([])
  const [numOfArticlesToShow, setNumOfArticlesToShow] = useState<number>(7)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch initial news articles
  useEffect(() => {
    const fetchInitialArticles = async () => {
      const initialArticles = await getNewsArticles(0, numOfArticlesToShow)
      setNews(initialArticles)
      setLoading(false)
    }

    fetchInitialArticles()
  }, [])

  // Load more articles when the "Load more" button is clicked
  const handleLoadMoreClick = async () => {
    const newNumOfArticlesToShow = numOfArticlesToShow + 6
    const additionalArticles = await getNewsArticles(news.length, newNumOfArticlesToShow)
    setNews((prev) => [...prev, ...additionalArticles])
    setNumOfArticlesToShow(newNumOfArticlesToShow)
  }

  return (
    <section className="latest-news relative">
      <div className="bg-primary w-full h-[329px] absolute top-0 z-[-1]" />
      <h1 className="py-[60px] text-4xl text-white text-center">{title}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="newsContainer grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 mx-auto px-5 max-w-[1388px] ">
          {news.slice(0, numOfArticlesToShow).map((article, articleIndex) => {
            const isFirst = articleIndex === 0

            return (
              <Link
                href={article.slug}
                key={articleIndex}
                className={`newsCard w-full  flex flex-col items-center  ${isFirst ? 'h-auto bg-[#F5F5F5] sm:col-span-2 lg:flex-row' : 'border-[1px] lg:col-span-1 xl:flex-row'} `}
              >
                <div
                  className={`relative w-full h-[328px] ${isFirst ? 'lg:w-10/12 lg:h-full' : 'xl:w-8/12 xl:h-full'}`}
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
                  className={`flex flex-col p-5 w-full  ${isFirst ? 'lg:p-[96px] lg:justify-center' : 'p-6'}`}
                >
                  <h2
                    className={`   ${
                      isFirst
                        ? 'text-4xl leading-[43px] mb-5 font-medium'
                        : 'text-primary text-[20px] leading-6 mb-2 font-semibold'
                    }`}
                  >
                    {article.title}
                  </h2>
                  <div className="font-manrope text-secondary ">
                    <p className="font-normal line-clamp-4">
                      {toPlainText(article.sections[0].content)}
                    </p>
                  </div>
                  <Link
                    href={article.slug}
                    className={`font-manrope flex items-center transition-all duration-200 ease-in-out ${isFirst ? 'mt-10' : 'mt-5 text-primary'} hover:text-[#009FE3]`}
                  >
                    <span>Read more</span>
                    <button className="bg-[#E0E0E0] ml-[10px] rounded-full p-1">
                      <RightArrow width="18" height="18" arrowColor="black" />
                    </button>
                  </Link>
                </div>
              </Link>
            )
          })}

          {news.length === numOfArticlesToShow ? (
            <button
              className="uppercase text-center underline mt-6 sm:col-span-2 hover:text-[#009FE3]"
              onClick={() => {
                handleLoadMoreClick()
              }}
            >
              load more
            </button>
          ) : null}
        </div>
      )}
    </section>
  )
}
