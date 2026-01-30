import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const slides = useMemo(
    () => [
      {
        id: 'apples',
        image:
          'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1600&q=80',
        alt: 'Fresh apples',
        headline: ['PREMIUM.', 'PERFECT.', 'UNMATCHED'],
        subheading: "Mahabaleshwar's sweetest apples",
        cta: 'SHOP NOW',
      },
      {
        id: 'Fresh fruits',
        image: '/fresh-fruits-14.jpg',
        alt: 'Fresh Fruits',
        headline: ['FRESH.', 'RIPENED.', 'DAILY'],
        subheading: 'Farm-fresh bananas, delivered fast',
        cta: 'SHOP NOW',
      },
      {
        id: 'citrus-fruits',
        image: '/apple_basket_blackberry_fruit_grapes_strawberry_hd_fruit.jpg',
        alt: 'Fresh oranges and citrus fruits',
        headline: ['BRIGHT.', 'JUICY.', 'CITRUS'],
        subheading: 'Oranges & citrus with natural shine',
        cta: 'SHOP NOW',
      },
      {
        id: '',
        image: '/fresh-fruits-14.jpg',
        alt: 'Fresh fruits and vegetables',
        headline: ['CRISP.', 'CLEAN.', 'GREENS'],
        subheading: 'fresh  fruits  & daily veggies—straight from farms',
        cta: 'SHOP NOW',
      },
      {
        id: 'fresh fruits',
        image: '/fruit image.jpg',
        alt: 'Fresh fruits',
        headline: ['FRESH.', 'VIBRANT.', 'COLORFUL'],
        subheading: 'A variety of fresh, seasonal fruits picked daily',
        cta: 'SHOP NOW',
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const goTo = (index) => {
    const next = (index + slides.length) % slides.length;
    setActiveIndex(next);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goNext();
      }, 2000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, slides.length]);

  const onMouseEnter = () => setIsPaused(true);
  const onMouseLeave = () => setIsPaused(false);

  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
  };

  const onTouchEnd = (e) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    const t = e.changedTouches?.[0];
    if (startX == null || startY == null || !t) return;

    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <section className="hero-wrap">
      <div className="container">
        <div
          className="hero-slider"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="hero-slides">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`hero-slide ${idx === activeIndex ? 'active' : ''}`}
                aria-hidden={idx !== activeIndex}
              >
                <img className="hero-image" src={slide.image} alt={slide.alt} draggable="false" />
                <div className="hero-gradient" />
              </div>
            ))}
          </div>

          <div className="hero-overlay" key={activeIndex}>
            <div className="hero-copy">
              <h1>
                {slides[activeIndex].headline.map((line, i) => (
                  <span key={line} className="hero-headline-line">
                    {line}
                    {i !== slides[activeIndex].headline.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h1>
              <p>{slides[activeIndex].subheading}</p>
            </div>

            <Link to="/explore" className="hero-cta" aria-label="Shop now">
              {slides[activeIndex].cta}
            </Link>
          </div>

          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`hero-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
