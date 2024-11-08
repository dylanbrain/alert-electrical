import React from 'react'
import {TextMapType} from '@/types'
import {CustomPortableText} from '../shared/CustomPortableText'
import Availability from '../shared/Availability'

export default function TextMap(textMapData: TextMapType) {
  const {
    sectionTitle,
    description,
    showPhoneNumber,
    phoneNumberCaption,
    showEmail,
    emailCaption,
    addressTitle,
    openingHoursTitle,
    settings,
  } = textMapData

  const {phone, email, address, availability} = settings?.companyInfo || {}

  return (
    <>
      {textMapData && (
        <section className="w-full py-7 px-5 md:px-7 font-manrope flex justify-center ">
          <div className="w-full max-w-screen-xl gap-10 flex flex-col md:flex-row md:justify-between">
            {/* Text Content */}
            <div className="md:flex-1 self-center md:py-3 text-center md:text-left">
              <h2 className="font-semibold mb-2">{sectionTitle}</h2>
              <div className="font-light space-y-6">
                {description && <CustomPortableText value={description} />}

                {showPhoneNumber && phone ? (
                  <p className="!mt-2">
                    {phoneNumberCaption}: <span className="font-semibold">{phone}</span>
                  </p>
                ) : null}

                {showEmail && email ? (
                  <p>
                    {emailCaption}: <span className="font-semibold">{email}</span>
                  </p>
                ) : null}
              </div>

              {address && (
                <>
                  <h2 className="uppercase mt-5 mb-2 font-semibold">{addressTitle}</h2>
                  <span className="font-light">{`${address.street}, ${address.city} ${address.postCode}`}</span>
                </>
              )}

              {availability && (
                <>
                  <h2 className="uppercase mt-5 mb-2 font-semibold">{openingHoursTitle}</h2>
                  <Availability
                    availability={availability}
                    classes="flex justify-center md:justify-start"
                  />
                </>
              )}
            </div>

            {/* Map */}
            <div className="md:flex-1 h-72 md:h-auto mt-6 md:mt-0">
              <iframe
                title="Nottingham Lighting Centre Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2403.7755662386235!2d-1.155431522185584!3d52.95246127217758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c22a5a018a13%3A0xab7d6145fe3cd97e!2sNottingham%20Lighting%20Centre!5e0!3m2!1sen!2suk!4v1727099707457!5m2!1sen!2suk"
                width="100%"
                height="100%"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
