// Utils
import {useLiveQuery} from 'next-sanity/preview'
import {fetchStaticProps} from '@/shared/utils/dynamicSlugUtils/staticPropsUtil'
import {fetchStaticPaths} from '@/shared/utils/dynamicSlugUtils/staticPathsUtil'

// Queries
import {pagesBySlugQuery} from '@/lib/sanity.queries'

// Types
import {PagePayload, PageProps} from '@/types'

// Components
import {Page} from '@/components/pages/Page'
import ProductPage from '@/components/pages/ProductPage'
import ShopPage from '@/components/pages/ShopPage'
import CartPage from '@/components/pages/CartPage'
import {LatestNewsPage} from '@/components/pages/LatestNewsPage'

export default function PageSlugRoute(props: PageProps) {
  const {
    homePageTitle,
    settings,
    page: initialPage,
    product,
    products,
    draftMode,
    canonicalUrl,
    productSetting,
    filterItems,
  } = props

  const [page, loading] = useLiveQuery<PagePayload | null | undefined>(
    initialPage,
    pagesBySlugQuery,
    {
      slug: initialPage?.slug,
    },
  )

  let pageComponent: JSX.Element

  switch (page?._type) {
    case 'page':
      pageComponent = (
        <Page
          settings={settings}
          page={page}
          homePageTitle={homePageTitle}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
        />
      )
      break
    case 'shop':
      pageComponent = (
        <ShopPage
          page={page}
          settings={settings}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle}
          products={products}
          filterItems={filterItems}
        />
      )
      break
    case 'cart':
      pageComponent = (
        <CartPage
          page={page}
          settings={settings}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle || undefined}
        />
      )
      break
    case 'product':
      pageComponent = (
        <ProductPage
          page={page}
          preview={draftMode}
          settings={settings}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle || undefined}
          addToCartText={page?.addToCartText}
          productSetting={productSetting ?? undefined}
          product={product}
        />
      )
      break
    case 'latestNews':
      pageComponent = (
        <LatestNewsPage
          settings={settings}
          page={page}
          homePageTitle={homePageTitle || undefined}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
        />
      )
      break
    default:
      pageComponent = (
        <Page
          settings={settings}
          page={page}
          homePageTitle={homePageTitle}
          preview={draftMode}
          loading={loading}
          canonicalUrl={canonicalUrl}
        />
      )
  }

  return pageComponent
}

export const getStaticProps = fetchStaticProps

export const getStaticPaths = async () => {
  const formattedPaths = await fetchStaticPaths()

  return {
    paths: formattedPaths || [],
    fallback: 'blocking',
  }
}
