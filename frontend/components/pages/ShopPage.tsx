import ScrollUp from '@/shared/utils/ScrollUp'
import {PageProps} from '@/types'
import PageHead from './PageHead'
import Layout from '@/components/global/Layout'
import {resolveHref} from '@/shared/utils/resolveHref'
import Link from 'next/link'
import {useState} from 'react'
import ShortHero from '../sections/ShortHero'
import ProductCard from '../global/ProductCard'

export function ShopPage({
  page,
  settings,
  preview,
  loading,
  canonicalUrl,
  homePageTitle,
  products,
}: PageProps) {
  const [numOfProductsToShow, setNumOfProductsToShow] = useState<number>(24)

  const {shortHero} = page || {}

  console.log(products)

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main">
          {shortHero && <ShortHero {...shortHero} />}
          <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-11 max-w-[1728px] mx-auto p-5 pt-9">
            {/* Products */}
            {products && products.length > 0 ? (
              products.map((product) => {
                const {title, featuredImage, brand, id, slug} = product || {}
                return <ProductCard product={product} key={product.id} />
              })
            ) : (
              <p>No products found</p>
            )}
          </div>
          {products && numOfProductsToShow < products.length && (
            <div className="flex justify-center">
              <button
                className="uppercase text-center text-primary underline mt-6 mb-[60px] hover:text-[#009FE3]"
                onClick={() => {
                  setNumOfProductsToShow((prev) => prev + 24)
                }}
              >
                load more
              </button>
            </div>
          )}
        </div>

        <ScrollUp />
      </Layout>
    </>
  )
}

export default ShopPage
