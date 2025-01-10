<template>
  <div class="min-h-screen bg-[#FEF9F2]">
    <!-- Header -->
    <header class="bg-[#FEF9F2] text-[#598bb5] py-6 text-center">
      <h1 class="text-4xl font-extrabold">Fasilitas Kost 🏠</h1>
      <p class="text-lg  font-medium text-black py-1 text-center">
        Nikmati pengalaman tinggal yang nyaman dan aman dengan fasilitas terbaik di kost eksklusif kami.
      </p>
    </header>

    <!-- Carousel -->
    <div class="flex justify-center mt-6">
      <swiper-container
        class="w-3/4 max-w-md h-60 rounded-lg shadow-lg overflow-hidden"
        pagination="true"
        navigation="true"
        autoplay-delay="2000"
        loop="true"
      >
        <swiper-slide>
          <img
            src="https://asset.morefurniture.id/NEWS/2022/kamar%20tidur%20gaming%20style%20desain%20japandi.jpg"
            alt="Kamar Nyaman"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://asset-2.tstatic.net/bangka/foto/bank/images/tips-penataan-kamar-mandi-yang-terletak-di-dalam-kamar-tidur-fungsional-namun-tetap-nyaman.jpg"
            alt="Kamar Mandi Pribadi"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://swift-thumbor.sirclocdn.com/unsafe/1200x628/filters:format(jpeg):quality(70)/web.mitra10.com/media/Blog/cover_desain_dapur_minimalis_3x3.jpg"
            alt="Dapur Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://chub.fisipol.ugm.ac.id/wp-content/uploads/sites/10/2020/02/coworking-space.png"
            alt="Ruang Bersama"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://inspire.qa/wp-content/uploads/2024/01/radio-man-and-a-security-guard-or-safety-officer-outdoor-on-a-city-road-for-communication-back-of-e1706457509394.jpg"
            alt="Keamanan 24 Jam"
            class="object-cover w-full h-full"
          />
        </swiper-slide>
      </swiper-container>
    </div>

    <!-- Facility List -->
    <div class="px-6 mt-10">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-justify"
      >
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Kamar Nyaman dan Modern
          </h3>
          <p class="mt-2 text-gray-700">
            Kamar tidur yang luas dengan tempat tidur nyaman, lemari besar, meja
            belajar, dan kursi ergonomis. Setiap kamar juga dilengkapi dengan AC
            untuk kenyamanan maksimal.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Kamar Mandi Pribadi</h3>
          <p class="mt-2 text-gray-700">
            Nikmati privasi dengan kamar mandi dalam yang bersih dan modern,
            lengkap dengan shower air panas dan dingin.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Dapur Bersama yang Lengkap
          </h3>
          <p class="mt-2 text-gray-700">
            Dapur bersama yang dilengkapi dengan peralatan memasak lengkap,
            termasuk kompor, microwave, kulkas, dan peralatan makan. Cocok untuk
            kamu yang suka memasak!
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Layanan Laundry</h3>
          <p class="mt-2 text-gray-700">
            Fasilitas laundry dengan mesin cuci dan pengering yang bisa
            digunakan kapan saja, atau layanan laundry yang siap membantu jika
            kamu sibuk.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">
            Internet Cepat dan Stabil
          </h3>
          <p class="mt-2 text-gray-700">
            Akses Wi-Fi super cepat di seluruh area kost, ideal untuk bekerja,
            belajar, atau streaming film favoritmu.
          </p>
        </div>
        <div class="bg-[#C9E9D2] bg-opacity-30 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-[#51829B]">Keamanan 24 Jam</h3>
          <p class="mt-2 text-gray-700">
            Sistem keamanan 24 jam dengan CCTV dan penjaga kost, memastikan kamu
            merasa aman dan nyaman setiap saat.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "swiper/element/bundle";

export default {
  name: "Facility",
  mounted() {
    register();
  },
};
</script>

<style>
@import "swiper/swiper-bundle.css";
</style>
