import urlForImage from '@/shared/utils/urlForImage'
import {SocialMediaLink} from '@/types'
interface SocialMediaBlockProps {
  socialMedia: {
    [key: string]: SocialMediaLink | undefined
  }
  containerClasses?: string
  listClasses?: string
  imgaeClasses?: string
}

export default function SocialMediaBlock({
  socialMedia,
  containerClasses,
  listClasses,
  imgaeClasses,
}: SocialMediaBlockProps) {
  // convert social media object of objects to array of objects
  const socialMediaArray = Object.keys(socialMedia).map((key) => socialMedia[key])
  return (
    <div className={`social-media-block ${containerClasses}`}>
      <ul className="flex items-center">
        {socialMediaArray.map((social, index) => (
          <li className={listClasses} key={index}>
            <a href={social?.url || ''} target="_blank" rel="noopener noreferrer">
              <img
                className={`w-auto h-8 object-cover ${imgaeClasses} `}
                src={urlForImage(social?.image).url()}
                alt="social media image"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
