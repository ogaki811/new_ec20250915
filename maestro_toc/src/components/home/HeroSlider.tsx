'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSlider.css';

interface Slide {
  id: number;
  image: string;
  alt: string;
  link: string;
}

interface HeroSliderProps {
  slides?: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const defaultSlides: Slide[] = [
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
    <section className="ec-hero-slider main-banner-section relative w-full bg-gray-100 py-8">
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
        className="ec-hero-slider__container hero-slider"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id} className="ec-hero-slider__slide">
            {({ isActive }: { isActive: boolean }) => (
              <Link
                href={slide.link}
                className={`ec-hero-slider__link ${isActive ? 'ec-hero-slider__link--active' : ''} block h-full transition-all duration-300 ${
                  isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-80'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="ec-hero-slider__image rounded-lg"
                  style={{ width: '900px', height: '280px', objectFit: 'contain' }}
                />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
