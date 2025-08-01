<template>
  <div>
    <ul class="flex flex-col space-y-2">
      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> Project </strong>

        <ul class="mt-2 space-y-1">
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
        </ul>
      </li>

      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> Catalog </strong>

        <ul class="mt-2 space-y-1">
          <li>
            <router-link to="/catalog/methods" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Methods
            </router-link>
          </li>

          <li>
            <li>
              <router-link to="/catalog/schemas" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                Schemas
              </router-link>
            </li>
          </li>
        </ul>
      </li>

      <li>
        <strong class="block text-xs font-medium text-gray-400 uppercase"> Profile </strong>

        <ul class="mt-2 space-y-1">
          <li>
            <router-link to="/profile" active-class="!bg-gray-100 !text-gray-700"  class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Profile
            </router-link>
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