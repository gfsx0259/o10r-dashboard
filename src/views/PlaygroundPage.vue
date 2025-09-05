<template>
  <div class="space-y-6">
    <div class="rounded bg-white p-5 shadow">
      <SearchSelect
          :options="options"
          v-model="selected"
      />
    </div>

    <!-- Section: Payment Details Group -->
    <div class="rounded bg-white p-5 shadow">
      <h2 class="mb-4 text-lg font-semibold">Payment — Basic Details</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Amount -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Amount</label>
          <input
              :disabled="locked.includes('amount')"
              v-model="form.amount"
              @input="onAmountInput"
              inputmode="numeric"
              placeholder="e.g. 4999"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          />
          <p class="mt-1 text-xs text-gray-500">Digits only, no separators (e.g., “4999” for 49.99 if cents-based).</p>
        </div>

        <!-- Currency -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Currency</label>
          <select
              :disabled="locked.includes('currency')"
              v-model="form.currency"
              class="w-full rounded border border-gray-300 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          >
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <!-- Payment ID -->
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-gray-700">Payment ID</label>
          <input
              :disabled="locked.includes('paymentId')"
              v-model.trim="form.paymentId"
              placeholder="Any string identifier"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          />
          <p class="mt-1 text-xs text-gray-500">Used to correlate in your system.</p>
        </div>

        <!-- Description -->
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea
              :disabled="locked.includes('description')"
              v-model.trim="form.description"
              rows="3"
              placeholder="Payment for Order #123, 2×Widgets"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>

    <!-- Section: Customer Details Group -->
    <div class="rounded bg-white p-5 shadow">
      <h2 class="mb-4 text-lg font-semibold">Customer — Customer Details</h2>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Customer ID -->
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-gray-700">Customer ID</label>
          <input
              :disabled="locked.includes('customerId')"
              v-model="form.customerId"
              @input="onCustomerIdInput"
              inputmode="numeric"
              placeholder="e.g. 4999"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
          />
          <p class="mt-1 text-xs text-gray-500">Digits only, no separators (e.g., “4999” for 49.99 if cents-based).</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="rounded bg-white p-5 shadow">
      <h2 class="mb-4 text-lg font-semibold">Actions</h2>

      <div class="flex flex-wrap items-center gap-3">
        <button
            type="button"
            class="rounded bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:opacity-50"
            :disabled="!isValid || buttonsDisabled"
            @click="onBuildLink"
        >
          Build payment link
        </button>

        <!-- Built link preview -->
        <div v-if="builtUrl" class="mt-2 w-full">
          <div class="rounded border bg-gray-50 p-3 text-sm">
            <div class="mb-2 font-medium text-gray-700">Generated link</div>
            <div class="break-all text-gray-800">{{ builtUrl }}</div>
            <div class="mt-2">
              <a
                  class="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 me-2"
                  :href="builtUrl"
                  target="_blank"
                  rel="noreferrer"
              >
                Open in new tab
              </a>

              <button
                  type="button"
                  class="rounded bg-gray-800 px-4 py-2 text-white shadow hover:bg-gray-900 disabled:opacity-50 me-2"
                  :disabled="!builtUrl"
                  @click="showIframe = true"
              >
                Open in iframe
              </button>

              <button
                  type="button"
                  class="rounded bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 disabled:opacity-50"
                  :disabled="!builtUrl"
                  @click="showWidget = true"
              >
                Open in widget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Iframe Runner -->
    <div v-if="showIframe" class="rounded bg-white p-5 shadow">
      <h3 class="mb-3 text-base font-semibold">Iframe Runner</h3>
      <div class="mb-3 grid max-w-xl grid-cols-2 gap-3">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Width (px)</label>
          <input
              type="number"
              min="200"
              v-model.number="iframeSize.width"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Height (px)</label>
          <input
              type="number"
              min="200"
              v-model.number="iframeSize.height"
              class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div class="overflow-auto rounded border flex justify-center">
        <iframe
            v-if="builtUrl"
            :src="builtUrl"
            :style="{ width: iframeSize.width + 'px', height: iframeSize.height + 'px' }"
            class="block"
        />
        <div v-else class="p-4 text-sm text-gray-500">Build a link first.</div>
      </div>
    </div>

    <!-- Widget Modal -->
    <Modal :open="showWidget" title="Payment Widget" @close="showWidget = false">
      <div class="overflow-hidden flex justify-center">
        <iframe
            v-if="builtUrl"
            :src="builtUrl"
            class="block h-[700px] w-full"
        />
        <div v-else class="p-4 text-sm text-gray-500">Build a link first.</div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, nextTick } from 'vue';
import SearchSelect, { type Option } from '@/components/controls/SearchSelect.vue';
import { useScenarioStore } from "@/stores/scenario.ts";
import { useMethodStore } from "@/stores/method.ts";
import { useProjectStore } from "@/stores/project.ts";
import { useRouteStore } from "@/stores/route.ts";
import { useProject } from "@/compositions/useApi.ts";
import Modal from '@/components/Modal.vue';
import { useRoute } from "vue-router";

type Currency = 'USD' | 'RUB' | 'EUR';

const route = useRoute();

const presetScenarioId = route.query.scenario;
const routes = useRouteStore().data.routes;
const scenarios = useScenarioStore().data.scenarios;
const methods = useMethodStore().data.methods;

const availableRoutes = computed(() => routes.filter(r => useProjectStore().current?.methods.includes(r.method_id)));
const availableScenarios = computed(() => scenarios.filter(s => availableRoutes.value.map(r => r.id).includes(s.route_id)));

const builtUrl = ref<string>('');
const showIframe = ref(false);
const showWidget = ref(false);
const iframeSize = reactive({ width: 420, height: 700 });

const selected = ref<Option | null>(null);
const options = computed<Option[]>(
    () => availableScenarios.value.map(
        s => {
          const route = routes.find(r => r.id === s.route_id);
          const method = methods.find(m => m.id === route?.method_id);

          return {
            title: `${method?.title || 'N/A'} - ${s.title}`,
            value: String(s.id),
          };
        }
      )
);

const buttonsDisabled = ref<boolean>(false);
const locked = ref<string[]>([]);
const form = reactive({
  amount: '',
  currency: 'USD' as Currency,
  paymentId: '',
  description: '',
  customerId: '',
});

const isValid = computed(() => {
  if (!/^\d+$/.test(form.amount)) return false;
  if (!form.currency) return false;

  return true;
});

watch(selected, (o) => applyScenario(o), { immediate: false });

function applyScenario(option: Option | null) {
  const scenario = scenarios.find(s => String(s.id) === option?.value);

  locked.value = [];

  if (scenario) {
    const conditions = JSON.parse(scenario.conditions || '{}');

    form.amount = '';
    form.currency = 'USD';
    form.paymentId = '';
    form.description = '';
    form.customerId = '';

    if (conditions['payment.amount']) {
      form.amount = sanitizeDigits(String(conditions['payment.amount']));

      locked.value.push('amount');
    }

    if (conditions['payment.currency']) {
      form.currency = String(conditions['payment.currency']) as Currency;

      locked.value.push('currency');
    }

    if (conditions['customer.id']) {
      form.customerId = sanitizeDigits(String(conditions['customer.id']));

      locked.value.push('customerId');
    }
  }
}

function sanitizeDigits(v: string) {
  return v.replace(/\D+/g, '');
}

function onAmountInput(e: Event) {
  const el = e.target as HTMLInputElement;
  const cleaned = sanitizeDigits(el.value);
  if (cleaned !== el.value) el.value = cleaned;
  form.amount = cleaned;
}

function onCustomerIdInput(e: Event) {
  const el = e.target as HTMLInputElement;
  const cleaned = sanitizeDigits(el.value);
  if (cleaned !== el.value) el.value = cleaned;
  form.customerId = cleaned;
}

async function buildUrl(): Promise<string> {
  const project = useProjectStore().current;

  if (project) {
    const response = await useProject.makeSession(
        project.id,
        form.paymentId || `TEST_${Math.random().toString(36).slice(2, 10)}`,
        parseInt(form.amount),
        form.currency,
        form.description || undefined,
        parseInt(form.customerId) || undefined,
    );

    return `https://pp.o10r.io/?sid=${response.data.sid}`;
  }

  return '';
}

async function onBuildLink() {
  buttonsDisabled.value = true;
  builtUrl.value = '';

  if (!isValid.value) {
    return;
  }

  builtUrl.value = await buildUrl();
  buttonsDisabled.value = false;
}

onMounted(
    () => {
      if (presetScenarioId) {
        const option = options.value.find(o => o.value === presetScenarioId);

        if (option) {
          selected.value = option;

          nextTick(onBuildLink);
        }
      }
    }
);
</script>

<style scoped>
*::placeholder {
  color: #999;
}
</style>
