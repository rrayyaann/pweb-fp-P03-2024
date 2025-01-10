<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-r from-[#6A42C2] to-[#04a268]">
    <div class="w-full max-w-md bg-[#1f2937] shadow-lg rounded-3xl p-12 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <h1 class="text-4xl font-extrabold text-center mb-6 text-[#04a268] animate__animated animate__fadeInUp animate__delay-1s">
        Login
      </h1>
      <form @submit.prevent="handleSubmit" class="animate__animated animate__fadeIn animate__delay-2s">
        <div v-if="errorMessage" class="mb-4 text-red-400 text-sm">
          {{ errorMessage }}
        </div>
        <div class="mb-6">
          <label for="username" class="block text-sm font-bold text-[#04a268] transition-all duration-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 p-3 w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC] transition duration-300 ease-in-out hover:border-[#04a268]"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-bold text-[#04a268] transition-all duration-300">
            Password
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="mt-1 p-3 w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC] pr-10 transition duration-300 ease-in-out hover:border-[#04a268]"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              <img
                v-if="showPassword"
                src="../public/showpassword.svg"
                alt="Show Password"
                class="w-6 h-5 transition-all duration-200 hover:scale-110"
              />
              <img
                v-else
                src="../public/hidepassword.svg"
                alt="Hide Password"
                class="w-6 h-5 transition-all duration-200 hover:scale-110"
              />
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label for="role" class="block text-sm font-bold text-[#04a268] transition-all duration-300">
            Role
          </label>
          <input
            type="text"
            id="role"
            v-model="role"
            class="mt-1 p-3 w-full border-2 border-gray-400 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC] transition duration-300 ease-in-out hover:border-[#04a268]"
            placeholder="USER or ADMIN"
            required
          />
        </div>
        <div class="flex flex-col mb-6">
          <button
            type="submit"
            class="w-full font-semibold py-3 px-4 bg-[#04a268] text-[#FEF9F2] rounded-md transform transition-all duration-300 hover:bg-[#6A42C2] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#789DBC]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const role = ref("");
    const errorMessage = ref(null);
    const showPassword = ref(false);
    const userStore = useUserStore();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            role: role.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to login";
          return;
        }

        const data = await response.json();
        console.log(data);
        userStore.setUser(username.value, role.value);

        // Simpan token dan role ke localStorage
        localStorage.setItem("username", username.value);
        localStorage.setItem("role", role.value);
        localStorage.setItem("token", data.token);

        alert("Login successful!");

        // Redirect berdasarkan role
        if (role.value.toUpperCase() === "USER") {
          window.location.href = "/user";
        } else if (role.value.toUpperCase() === "ADMIN") {
          window.location.href = "/admin/dashboard";
        } else {
          errorMessage.value = "Invalid role provided.";
        }
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    return {
      username,
      password,
      role,
      errorMessage,
      showPassword,
      togglePasswordVisibility,
      handleSubmit,
    };
  },
};
</script>
