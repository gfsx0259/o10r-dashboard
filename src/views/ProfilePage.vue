<template>
  <div class="max-w-5xl mx-auto p-6 space-y-8">
    <h1 class="text-2xl font-bold text-gray-800">Profile</h1>

    <div v-if="session">
    <!-- User Info -->
    <section class="bg-white shadow rounded-2xl p-4 space-y-2 my-4">
      <h2 class="text-xl font-semibold text-gray-700">Basic Information</h2>
      <p><strong>Email:</strong> {{ session.identity.traits.email }}</p>
      <p><strong>Status:</strong> {{ session.identity.state }}</p>
      <p><strong>User ID:</strong> {{ session.identity.id }}</p>
      <p><strong>Created:</strong> {{ format(session.identity.created_at) }}</p>
    </section>

    <!-- Authentication Info -->
    <section class="bg-white shadow rounded-2xl p-4 space-y-2 my-4">
      <h2 class="text-xl font-semibold text-gray-700">Authentication</h2>
      <p><strong>AAL Level:</strong> {{ session.authenticator_assurance_level }}</p>
      <p><strong>Authenticated At:</strong> {{ format(session.authenticated_at) }}</p>
      <div v-for="(method, i) in session.authentication_methods" :key="i">
        <p><strong>Method:</strong> {{ method.method }}</p>
        <p><strong>Provider:</strong> {{ method.provider }}</p>
        <p><strong>Completed At:</strong> {{ format(method.completed_at) }}</p>
      </div>
    </section>

    <!-- Devices -->
    <section v-if="session.devices?.length" class="bg-white shadow rounded-2xl p-4 space-y-2 my-4">
      <h2 class="text-xl font-semibold text-gray-700">Recent Device</h2>
      <div v-for="device in session.devices" :key="device.id">
        <p><strong>IP:</strong> {{ device.ip_address }}</p>
        <p><strong>Agent:</strong> {{ device.user_agent }}</p>
      </div>
    </section>

    <!-- Recovery Info -->
    <section v-if="session.identity.recovery_addresses?.length" class="bg-white shadow rounded-2xl p-4 space-y-2 my-4">
      <h2 class="text-xl font-semibold text-gray-700">Recovery</h2>
      <ul class="list-disc list-inside text-gray-600">
        <li v-for="addr in session.identity.recovery_addresses" :key="addr.id">
          {{ addr.value }} (via {{ addr.via }})
        </li>
      </ul>
    </section>

    </div>
  </div>
</template>

<style scoped>
h2 {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 4px;
}
</style>

<script setup lang="ts">

import {useUserStore} from "@/stores/user.ts";

const session: any = useUserStore().data.session;

const format = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
</script>
