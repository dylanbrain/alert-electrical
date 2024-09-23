import {DeliveryInfoBar as DeliveryInfoBarType} from '@/types'
import Link from 'next/link'

interface DevlieryInfoBarProps {
  info: DeliveryInfoBarType['info']
}

export default function DeliveryInfoBar(props: DevlieryInfoBarProps) {
  const {info = []} = props

  return (
    <>
      <div className="bg-blue-300 text-white  w-full py-2 text-base">
        {info.length > 1 ? (
          <div className="mx-7 flex justify-between items-center">
            {info.map((item, index) => {
              if (item.link) {
                return (
                  <Link href={item.link?.slug ?? ''} key={index} className="hover:text-blue-400">
                    {item.text}
                  </Link>
                )
              }
              return <span key={index}>{item.text}</span>
            })}
          </div>
        ) : (
          <div className="text-center">
            <Link href={info[0]?.link?.slug ?? ''} className="hover:text-primary">
              {info[0].text}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}