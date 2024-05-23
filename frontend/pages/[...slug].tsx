// Utils
import getCanonicalUrl from '@/shared/utils/getCanonicalUrl'
import {GetStaticPaths, GetStaticProps} from 'next'
import {getClient} from '@/lib/sanity.client'
import {readToken} from '@/lib/sanity.api'
import {useLiveQuery} from 'next-sanity/preview'
import groq from 'groq'

// Queries
import {settingsQuery, pagesBySlugQuery, homePageTitleQuery, pagePaths} from '@/lib/sanity.queries'

// Types
import {SettingsPayload, PagePayload} from '@/types'
import {PageProps} from '@/components/pages/Page'

// Components
import {Page} from '@/components/pages/Page'
import ProductPage from '@/components/pages/ProductPage'

interface Query {
  [key: string]: string
}

export default function PageSlugRoute(props: PageProps) {
  const {homePageTitle, settings, page: initialPage, draftMode, canonicalUrl} = props

  const [page, loading] = useLiveQuery<PagePayload | null>(initialPage, pagesBySlugQuery, {
    slug: initialPage.slug,
  })

  console.log(page)

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
    case 'product':
      pageComponent = (
        <ProductPage
          page={page}
          preview={draftMode}
          settings={settings}
          loading={loading}
          canonicalUrl={canonicalUrl}
          homePageTitle={homePageTitle}
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

  console.log(pageComponent)

  return pageComponent
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {draftMode = false, params = {}} = ctx
  const client = getClient(draftMode)

  const joinedSlug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug

  const canonicalUrl = getCanonicalUrl(joinedSlug)

  console.log('staticprops', joinedSlug)

  const [settings, page, homePageTitle] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<PagePayload | null>(pagesBySlugQuery, {
      slug: joinedSlug, // Join the segments to form the full slug
    }),
    client.fetch<string | null>(homePageTitleQuery),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
      settings: settings ?? {},
      homePageTitle: homePageTitle ?? undefined,
      draftMode,
      token: draftMode ? readToken : null,
      canonicalUrl,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const client = getClient()

  const paths = await client.fetch<string[]>(pagePaths)
  const productPaths = await client.fetch<string[]>(groq`*[_type == "product"].store.slug.current`)

  let formattedPaths = paths.map((slug) => {
    // Split the slug into segments
    const slugSegments = slug.split('/')

    // Return an object with the joined slug segments as params
    return {params: {slug: slugSegments}}
  })

  //   add product paths
  formattedPaths = formattedPaths.concat(
    productPaths.map((slug) => {
      return {params: {slug: slug.split('/')}}
    }),
  )

  console.log(formattedPaths[1])
  console.log(formattedPaths[5])

  return {
    paths: formattedPaths || [],
    fallback: 'blocking',
  }
}
