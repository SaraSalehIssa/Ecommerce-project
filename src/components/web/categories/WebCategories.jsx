import axios from 'axios'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../../index.css'

function WebCategories() {
  const getCategories = async () => {
    const { data } = await axios.get('https://ecommerce-node4.vercel.app/categories');
    return data;
  }
  const { data, isLoading } = useQuery('web_categories', getCategories);

  if (isLoading)
    return <h2>Loading...</h2>

  return (
    <>
      <div className='container'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={6}
          navigation
          loop={true}
          autoplay={{
            delay: 500
          }}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {data?.categories.length ? data?.categories.map((category) =>
            <SwiperSlide className='swiper' key={category._id}>
              <img src={category.image.secure_url} className="rounded-circle image-card p-3" alt="..." />
              <h5 className="text-center fs-5">{category.name}</h5>
            </SwiperSlide>
          ) : 'No categories found!'}
        </Swiper>
        <div className="swiper-custom-pagination"></div>
      </div>
    </>
  )
}

export default WebCategories