<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
    <h1 class="text-4xl font-extrabold mb-8 text-blue-700 text-center">
      Dashboard Penghuni
    </h1>

    <!-- History Tagihan -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-6 text-blue-600">
        History Tagihan
      </h2>
      <div v-if="billingHistory.length === 0" class="text-gray-500">
        Belum ada history tagihan.
      </div>
      <ul>
        <li
          v-for="(bill, index) in billingHistory"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg shadow mb-4 hover:bg-gray-100 transition"
        >
          <p><strong>Tanggal Pembayaran:</strong> {{ bill.date }}</p>
          <p><strong>Status:</strong> 
            <span :class="bill.status === 'Lunas' ? 'text-green-600' : 'text-red-600'">
              {{ bill.status }}
            </span>
          </p>
          <p><strong>Total:</strong> Rp {{ bill.total }}</p>
        </li>
      </ul>
    </div>

    <!-- Navigasi ke Halaman Lain -->
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 class="text-2xl font-semibold mb-6 text-blue-600">
        Layanan
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <router-link
          to="/user/sewa"
          class="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p>Sewa Kamar</p>
        </router-link>
        <button
          @click="makePayment"
          class="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          Pembayaran
        </button>
        <router-link
          to="/user/laporan/fasilitas"
          class="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p>Laporan Fasilitas</p>
        </router-link>
        <router-link
          to="/user/laporan/penghuni"
          class="p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg shadow hover:shadow-lg transition text-center"
        >
          <p>Laporan Penghuni</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "UserDashboard",
  setup() {
    const billingHistory = ref([]);

    const makePayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/user/sewa/bayar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            total_bill: 5000000, // Ganti dengan nilai aktual
            payment_method: "QRIS", // Ganti dengan metode pembayaran
            rent_periods: 3, // Ganti dengan periode sewa
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error processing payment.");
        }

        const data = await response.json();
        alert("Pembayaran berhasil! Invoice: " + data.invoice);
      } catch (error) {
        console.error("Error during payment:", error);
        alert("Terjadi kesalahan saat pembayaran. Silakan coba lagi.");
      }
    };

    const fetchBillingHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch billing history.");
        }

        const data = await response.json();
        billingHistory.value = data.map((bill) => ({
          date: new Date(bill.created_at).toLocaleDateString("id-ID"),
          status: bill.bill > 10000000 ? "Lunas" : "Belum Lunas",
          total: bill.bill.toLocaleString("id-ID"),
        }));
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchBillingHistory);

    return { billingHistory, makePayment };
  },
};
</script>
