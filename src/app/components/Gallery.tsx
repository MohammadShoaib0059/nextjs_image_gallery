import fetchImages from "@/lib/fetchImages";
import { ImageResults } from "@/models/Images";
import ImageContainer from "./ImageContainer";
import getPrevNextPages from "@/lib/getPrevNextPages"
import Footer from "./Footer"

type Props = {
  topic?: string | undefined,
  page?: string | undefined,
}

export default async function Gallery({ topic = 'curated', page }: Props) {
  let url
  if (topic === 'curated' && page) { // browsing beyond home 
      url = `https://api.pexels.com/v1/curated?page=${page}`
  } else if (topic === 'curated') { // home 
      url = 'https://api.pexels.com/v1/curated'
  } else if (!page) { // 1st page of search results 
      url = `https://api.pexels.com/v1/search?query=${topic}`
  } else { // search result beyond 1st page
      url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
  }

  // const url = "https://api.pexels.com/v1/curated";
  const images: ImageResults | undefined = await fetchImages(url);
  
  if (!images || images.per_page === 0) return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>
    const { prevPage, nextPage } = getPrevNextPages(images)

    const footerProps = { topic, page, nextPage, prevPage }
  return (
    <>
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {images.photos.map((photo) => (
        <ImageContainer photo={photo} />
      ))}
    </section>
    <Footer {...footerProps} />
    </>
  );
}
