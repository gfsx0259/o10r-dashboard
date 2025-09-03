<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
      <div class="absolute inset-0 flex items-center justify-center p-4">
        <div class="w-full max-w-5xl rounded-2xl bg-white shadow-xl">
          <div class="flex items-center justify-between border-b p-4">
            <h3 class="text-lg font-semibold">{{ title }}</h3>
            <button
                type="button"
                class="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                @click="$emit('close')"
                aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div class="p-4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  title?: string;
}>();
defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
