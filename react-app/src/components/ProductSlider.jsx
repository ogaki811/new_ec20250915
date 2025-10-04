import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductSlider({ products, size = 'compact' }) {
  return (
    <div className="product-slider relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} size={size} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .product-slider .swiper-button-prev,
        .product-slider .swiper-button-next {
          color: #1e3a8a;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .product-slider .swiper-button-prev:after,
        .product-slider .swiper-button-next:after {
          font-size: 18px;
          font-weight: bold;
        }

        .product-slider .swiper-button-prev:hover,
        .product-slider .swiper-button-next:hover {
          background: #1e3a8a;
          color: white;
        }

        .product-slider .swiper-pagination-bullet {
          background: #9ca3af;
        }

        .product-slider .swiper-pagination-bullet-active {
          background: #1e3a8a;
        }
      `}</style>
    </div>
  );
}

export default ProductSlider;
