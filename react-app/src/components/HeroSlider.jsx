import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HeroSlider({ slides }) {
  const defaultSlides = [
    { id: 1, image: '/img/mainbanner/top_bnr_color_sta01.png', alt: 'カラー文具特集', link: '#' },
    { id: 2, image: '/img/mainbanner/top_bnr_feature01.png', alt: '特集', link: '#' },
    { id: 3, image: '/img/mainbanner/top_bnr_kitchen.png', alt: 'キッチン用品', link: '#' },
    { id: 4, image: '/img/mainbanner/top_bnr_m_jyokin03.png', alt: '除菌用品', link: '#' },
    { id: 5, image: '/img/mainbanner/top_bnr_tag.png', alt: 'タグ特集', link: '#' },
    { id: 6, image: '/img/mainbanner/top_pro_bnr_event.png', alt: 'イベント', link: '#' },
    { id: 7, image: '/img/mainbanner/top_pro_bnr_transfer_sta.png', alt: '転写文具', link: '#' },
  ];

  const displaySlides = slides || defaultSlides;

  return (
    <section className="main-banner-section relative w-full bg-gray-100 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 'auto',
            spaceBetween: 30,
          },
        }}
        className="hero-slider"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <a
                href={slide.link}
                className={`block h-full transition-all duration-300 ${
                  isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-80'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="rounded-lg"
                  style={{ width: '900px', height: '280px', objectFit: 'contain' }}
                />
              </a>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .hero-slider {
          padding: 0;
          height: 280px;
        }
        .hero-slider .swiper-slide {
          height: 280px;
          width: 900px !important;
        }
        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: rgba(0, 0, 0, 0.6);
          background: none;
          width: 40px;
          height: 40px;
          top: 50%;
          transform: translateY(-50%);
        }
        .hero-slider .swiper-button-prev {
          left: calc(50% - 470px);
        }
        .hero-slider .swiper-button-next {
          right: calc(50% - 470px);
        }
        .hero-slider .swiper-button-next:hover,
        .hero-slider .swiper-button-prev:hover {
          color: rgba(0, 0, 0, 0.9);
        }
        .hero-slider .swiper-button-next:after,
        .hero-slider .swiper-button-prev:after {
          font-size: 32px;
          font-weight: bold;
        }
        @media (max-width: 1023px) {
          .hero-slider .swiper-button-prev {
            left: 10px;
          }
          .hero-slider .swiper-button-next {
            right: 10px;
          }
        }
        .hero-slider .swiper-pagination {
          bottom: 0;
        }
        .hero-slider .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .hero-slider .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2563eb;
        }
      `}</style>
    </section>
  );
}

export default HeroSlider;
