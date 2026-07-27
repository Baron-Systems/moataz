"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const videos = [
  "/videos/video-3.mp4",
  "/videos/video-4.mp4",
];

function getItemsPerView() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export default function PatientVideos() {
  const [active, setActive] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [current, setCurrent] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, videos.length - itemsPerView);
  const clampedCurrent = Math.min(current, maxIndex);

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const goTo = (index: number) => setCurrent(Math.min(index, maxIndex));

  const open = (src: string) => {
    setIsClosing(false);
    setActive(src);
  };

  const close = () => {
    setIsClosing(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setActive(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };
  const onTouchEnd = () => {
    if (touchStart === null) return;
    if (touchDelta < -50) next();
    else if (touchDelta > 50) prev();
    setTouchStart(null);
    setTouchDelta(0);
  };

  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#0F4C81]">فيديوهات المرضى</h2>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            شاهد تجارب حقيقية ورحلات علاج لمرضى مركز D.F.C.
          </p>
        </AnimatedSection>

        {videos.length <= 2 ? (
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {videos.map((src) => (
                <div
                  key={src}
                  className="group cursor-pointer relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-video bg-[#0F4C81]"
                  onClick={() => open(src)}
                >
                  <video
                    src={src}
                    preload="metadata"
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            {clampedCurrent > 0 && (
              <button
                onClick={prev}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white transition"
                aria-label="previous"
              >
                <ChevronRight className="w-5 h-5 text-[#0F4C81]" />
              </button>
            )}
            {clampedCurrent < maxIndex && (
              <button
                onClick={next}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-white transition"
                aria-label="next"
              >
                <ChevronLeft className="w-5 h-5 text-[#0F4C81]" />
              </button>
            )}

            <div
              className="overflow-hidden mx-8 md:mx-10"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(${clampedCurrent * (100 / itemsPerView)}%)`,
                }}
              >
                {videos.map((src) => (
                  <div
                    key={src}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div
                      className="group cursor-pointer relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-video bg-[#0F4C81]"
                      onClick={() => open(src)}
                    >
                      <video
                        src={src}
                        preload="metadata"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    clampedCurrent === i
                      ? "bg-[#0F4C81] scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {active && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={close}
        >
          <div
            className={`relative max-w-5xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
              isClosing ? "scale-95 translate-y-4" : "scale-100 translate-y-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2 hover:bg-white transition shadow-lg"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
            <video
              ref={videoRef}
              src={active}
              controls
              autoPlay
              className="w-full max-h-[85vh]"
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
