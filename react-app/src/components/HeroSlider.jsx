import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HeroSlider({ slides }) {
  const defaultSlides = [
    { id: 1, image: '/img/mainbanner/mainbanner_01.jpg', alt: 'バナー1', link: '#' },
    { id: 2, image: '/img/mainbanner/mainbanner_02.jpg', alt: 'バナー2', link: '#' },
    { id: 3, image: '/img/mainbanner/mainbanner_03.jpg', alt: 'バナー3', link: '#' },
    { id: 4, image: '/img/mainbanner/mainbanner_04.jpg', alt: 'バナー4', link: '#' },
    { id: 5, image: '/img/mainbanner/mainbanner_05.jpg', alt: 'バナー5', link: '#' },
    { id: 6, image: '/img/mainbanner/mainbanner_06.jpg', alt: 'バナー6', link: '#' },
    { id: 7, image: '/img/mainbanner/mainbanner_07.jpg', alt: 'バナー7', link: '#' },
  ];

  const displaySlides = slides || defaultSlides;

  return (
    <section className="main-banner-section relative w-full bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
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
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        }}
        className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id} className="!h-auto">
            {({ isActive }) => (
              <a
                href={slide.link}
                className={`block h-full transition-all duration-300 ${
                  isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-70'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </a>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper {
          padding: 20px 0;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 30px;
          border-radius: 50%;
          width: 44px;
          height: 44px;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2563eb;
        }
      `}</style>
    </section>
  );
}

export default HeroSlider;
