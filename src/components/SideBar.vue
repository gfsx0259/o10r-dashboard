<template>
  <div>
    <ul class="flex flex-col space-y-2">
      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> General </strong>

        <ul class="mt-2 space-y-1">
          <li>
            <router-link to="/profile" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Profile
            </router-link>
          </li>

          <li>
            <router-link to="/methods" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Methods
            </router-link>
          </li>

          <li>
            <router-link to="/settings" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Settings
            </router-link>
          </li>

          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Meetings
            </a>
          </li>

          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Calendar
            </a>
          </li>
        </ul>
      </li>

      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> Support </strong>

        <ul class="mt-2 space-y-1">
          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Update
            </a>
          </li>

          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Help
            </a>
          </li>

          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Settings
            </a>
          </li>
        </ul>
      </li>

      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> Profile </strong>

        <ul class="mt-2 space-y-1">
          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Details
            </a>
          </li>

          <li>
            <a
                href="#"
                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Subscription
            </a>
          </li>

          <li>
            <button
                @click="logout"
                class="block w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style scoped>
div > ul {padding: 24px}
</style>

<script setup lang="ts">
const logout = async () => {
  try {
    const res = await fetch(
        'https://ory.o10r.io:4433/self-service/logout/browser?return_to=https://welcome.o10r.io',
        {
          credentials: 'include',
        }
    );

    if (!res.ok) {
      console.error('Logout request failed', await res.text());
      return;
    }

    const json = await res.json();
    window.location.href = json.logout_url;
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>