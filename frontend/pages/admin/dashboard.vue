<template>
  <div class="p-6 bg-[#f8f9fa] min-h-screen">
    <h1 class="text-3xl font-extrabold text-[#3C5B75] mb-6">Dashboard Admin</h1>

    <!-- Grid Container for Dashboard Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Room Occupancy -->
      <div class="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
        <h2 class="text-2xl font-semibold text-[#789DBC] mb-4">Room Occupancy</h2>

        <!-- Pie chart for Room Occupancy -->
        <div class="w-full h-56 mb-6">
          <canvas id="roomOccupancyChart"></canvas>
        </div>

        <p class="text-lg"><strong>Empty Rooms:</strong> {{ roomOccupancy.empty }}</p>
        <p class="text-lg"><strong>Filled Rooms:</strong> {{ roomOccupancy.filled }}</p>
      </div>

      <!-- Reports Section -->
      <div class="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
        <h2 class="text-2xl font-semibold text-[#789DBC] mb-4">Reports</h2>
        <div class="grid grid-cols-1 gap-4">
          <!-- Facility Report -->
          <div>
            <p class="font-semibold text-[#3C5B75]">Latest Facility Report:</p>
            <p class="text-gray-600 mb-2">{{ latestFacilityReport.message }}</p>
            <button
              @click="goToReport('facility')"
              class="px-4 py-2 bg-[#789DBC] text-white rounded-md hover:bg-[#56738C] transition"
            >
              See Full Report
            </button>
          </div>
          <!-- Resident Report -->
          <div>
            <p class="font-semibold text-[#3C5B75]">Latest Resident Report:</p>
            <p class="text-gray-600 mb-2">{{ latestResidentReport.message }}</p>
            <button
              @click="goToReport('resident')"
              class="px-4 py-2 bg-[#789DBC] text-white rounded-md hover:bg-[#56738C] transition"
            >
              See Full Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Room List -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Room List</h2>
      <div v-if="errorMessageRooms" class="text-red-500 mb-4">{{ errorMessageRooms }}</div>
      <div v-if="rooms.length === 0" class="text-gray-500">No rooms available</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <!-- Individual Room Box -->
        <div
          v-for="room in rooms"
          :key="room._id"
          class="p-4 bg-white rounded-lg shadow hover:shadow-lg flex flex-col items-center"
        >
          <p class="text-lg font-semibold">Room {{ room.room_number }}</p>
          <p
            class="text-sm font-medium mt-2"
            :class="room.status === 'EMPTY' ? 'text-green-500' : 'text-red-500'"
          >
            {{ room.status }}
          </p>
        </div>
      </div>
    </div>

    <!-- Registered Users -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Registered Users</h2>
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div v-if="users.length === 0" class="text-gray-500">No registered users</div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Individual User Box -->
        <div
          v-for="user in users"
          :key="user._id"
          class="p-4 bg-white rounded-lg shadow hover:shadow-xl cursor-pointer flex flex-col items-center"
          @click="goToUserDetails(user._id)"
        >
          <img
            :src="`/images/${user.username}.jpg`"
            alt="User Photo"
            class="w-24 h-24 object-cover rounded-full mb-4"
          />
          <p class="font-semibold text-lg text-[#3C5B75]">{{ user.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

export default {
  name: "AdminDashboard",
  setup() {
    const roomOccupancy = ref({ empty: 0, filled: 0 });
    const users = ref([]);
    const rooms = ref([]);
    const errorMessage = ref(null);
    const errorMessageRooms = ref(null);
    const latestFacilityReport = ref({ message: "No new updates" });
    const latestResidentReport = ref({ message: "No new updates" });
    const router = useRouter();

    const fetchRoomOccupancy = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch room occupancy";
          return;
        }

        const data = await response.json();
        roomOccupancy.value = data[0];

        // Chart
        const ctx = document.getElementById("roomOccupancyChart").getContext("2d");
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Empty Rooms", "Filled Rooms"],
            datasets: [
              {
                data: [roomOccupancy.value.empty, roomOccupancy.value.filled],
                backgroundColor: ["#28a745", "#dc3545"],
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      } catch (error) {
        errorMessage.value = "An error occurred while fetching room occupancy.";
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch users";
          return;
        }

        users.value = await response.json();
      } catch (error) {
        errorMessage.value = "An error occurred while fetching users.";
      }
    };

    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessageRooms.value = errorData.message || "Failed to fetch rooms";
          return;
        }

        rooms.value = await response.json();
      } catch (error) {
        errorMessageRooms.value = "An error occurred while fetching rooms.";
      }
    };

    const goToReport = (type) => {
      const routes = {
        facility: "/admin/laporan/fasilitas",
        resident: "/admin/laporan/penghuni",
      };
      router.push(routes[type]);
    };

    const goToUserDetails = (id) => {
      router.push(`/admin/penghuni/${id}`);
    };

    onMounted(() => {
      fetchRoomOccupancy();
      fetchUsers();
      fetchRooms();
    });

    return {
      roomOccupancy,
      users,
      rooms,
      errorMessage,
      errorMessageRooms,
      latestFacilityReport,
      latestResidentReport,
      goToReport,
      goToUserDetails,
    };
  },
};
</script>
