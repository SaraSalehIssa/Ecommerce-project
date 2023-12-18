import axios from 'axios'
import { Link } from 'react-router-dom';
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
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=5`);
    return data;
  }

  const { data, isLoading } = useQuery('web_categories', getCategories);

  if (isLoading) {
    return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

  return (
    <>
      <div className='container'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4.5}
          navigation
          loop={true}
          autoplay={{
            delay: 500
          }}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          {data.categories.length ? data.categories.map((category) =>
            <SwiperSlide className='swiper mx-auto d-flex justify-content-center align-items-center' key={category._id}>
              <Link to={`/products/category/${category._id}`}>
                <div>
                  <img src={category.image.secure_url} className="rounded-circle image-card p-2" alt="category image..." />
                </div>
              </Link>
            </SwiperSlide>
          ) : 'No categories found!'}
        </Swiper>
        <div className="swiper-custom-pagination"></div>
      </div>
    </>
  )
}

export default WebCategories