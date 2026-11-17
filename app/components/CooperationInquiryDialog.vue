<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import type { CooperationRegion, CooperationType } from "~~/shared/types/cooperation";

const props = defineProps<{
  modelValue: boolean;
  type: CooperationType;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const regions = shallowRef<CooperationRegion[]>([]);
const regionsLoading = shallowRef(false);
const regionsError = shallowRef(false);
let submitController: AbortController | undefined;

async function loadRegions() {
  if (regionsLoading.value || regions.value.length) return;
  regionsLoading.value = true;
  regionsError.value = false;
  try {
    regions.value = await $fetch<CooperationRegion[]>("/api/cooperation/regions", { retry: 0 });
  } catch {
    regionsError.value = true;
  } finally {
    regionsLoading.value = false;
  }
}

watch(() => props.modelValue, (open) => {
  if (open) void loadRegions();
  else submitController?.abort();
}, { immediate: true });
watch(() => props.type, () => resetForm());
onBeforeUnmount(() => submitController?.abort());

const formRef = ref<FormInstance>();
const submitting = ref(false);
const submitted = ref(false);
const submitError = ref("");
const form = reactive({
  region: [] as string[],
  scenicName: "",
  contact: "",
  contactMethod: "",
  introduction: "",
  website: "",
});

const isScenic = computed(() => props.type === "scenic");
const dialogTitle = computed(() =>
  isScenic.value ? "景区运营合作" : "城市代理合作",
);
const dialogDescription = computed(() =>
  isScenic.value
    ? "告诉我们您的景区与合作想法，我们会尽快与您联系。"
    : "告诉我们您所在的城市与合作想法，我们会尽快与您联系。",
);

const rules = computed<FormRules>(() => ({
  region: [{ type: "array", required: true, len: 2, message: "请选择省份和城市", trigger: "change" }],
  scenicName: isScenic.value
    ? [{ required: true, message: "请输入景区名称", trigger: "blur" }]
    : [],
  contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
  contactMethod: [
    { required: true, message: "请输入联系电话或微信", trigger: "blur" },
  ],
  introduction: [{ required: true, message: "请简单介绍您的想法", trigger: "blur" }],
}));

function resetForm() {
  submitController?.abort();
  submitController = undefined;
  submitting.value = false;
  formRef.value?.resetFields();
  Object.assign(form, {
    region: [] as string[],
    scenicName: "",
    contact: "",
    contactMethod: "",
    introduction: "",
    website: "",
  });
  submitted.value = false;
  submitError.value = "";
}

async function submitForm() {
  if (submitting.value || submitted.value) return;
  submitting.value = true;
  submitError.value = "";
  const controller = new AbortController();
  submitController = controller;
  try {
    const valid = await formRef.value?.validate().catch(() => false);
    if (!valid || controller.signal.aborted) return;
    await $fetch("/api/cooperation", {
      method: "POST",
      signal: controller.signal,
      retry: 0,
      body: {
        type: props.type,
        province: form.region[0],
        city: form.region[1],
        scenicName: isScenic.value ? form.scenicName : undefined,
        contact: form.contact.trim(),
        contactMethod: form.contactMethod.trim(),
        introduction: form.introduction.trim(),
        website: form.website,
      },
    });
    if (!controller.signal.aborted) submitted.value = true;
  } catch (error: unknown) {
    if (controller.signal.aborted) return;
    const fetchError = error as { data?: { message?: string; statusMessage?: string } };
    submitError.value = fetchError.data?.message || fetchError.data?.statusMessage || "暂时无法提交，请稍后再试。";
  } finally {
    if (submitController === controller) {
      submitting.value = false;
      submitController = undefined;
    }
  }
}
</script>

<template>
  <ElDialog
    :model-value="modelValue"
    :title="dialogTitle"
    width="min(600px, 92vw)"
    align-center
    destroy-on-close
    class="cooperation-dialog"
    @update:model-value="emit('update:modelValue', $event)"
    @closed="resetForm"
  >
    <div v-if="submitted" class="cooperation-success" role="status">
      <span aria-hidden="true">✓</span>
      <h3>信息已提交</h3>
      <p>感谢您对旅艺拍的关注，我们会尽快与您联系。</p>
      <ElButton type="primary" round @click="emit('update:modelValue', false)">
        完成
      </ElButton>
    </div>
    <template v-else>
      <p class="cooperation-dialog-description">{{ dialogDescription }}</p>
      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="cooperation-form"
        @submit.prevent="submitForm"
      >
        <div class="cooperation-form-grid">
          <ElFormItem label="选择城市" prop="region">
            <ElCascader
              v-model="form.region"
              :options="regions"
              :disabled="regionsLoading || regionsError || submitting"
              filterable
              clearable
              :placeholder="regionsLoading ? '正在加载城市' : '请选择省份和城市'"
              style="width: 100%"
            />
            <span v-if="regionsError" role="alert">
              城市加载失败，<ElButton link type="primary" @click="loadRegions">重新加载</ElButton>
            </span>
          </ElFormItem>
          <ElFormItem v-if="isScenic" label="景区名" prop="scenicName">
            <ElInput
              v-model.trim="form.scenicName"
              maxlength="80"
              placeholder="请输入景区名称"
            />
          </ElFormItem>
          <ElFormItem label="联系人" prop="contact">
            <ElInput
              v-model.trim="form.contact"
              maxlength="40"
              placeholder="请输入您的称呼"
              autocomplete="name"
            />
          </ElFormItem>
          <ElFormItem label="联系电话 / 微信" prop="contactMethod">
            <ElInput
              v-model.trim="form.contactMethod"
              maxlength="80"
              placeholder="请输入电话或微信号"
              autocomplete="tel"
            />
          </ElFormItem>
        </div>
        <ElFormItem label="聊聊自己" prop="introduction">
          <ElInput
            v-model.trim="form.introduction"
            type="textarea"
            :rows="4"
            maxlength="500"
            show-word-limit
            placeholder="可以介绍您的资源、经验与合作想法"
          />
        </ElFormItem>
        <label class="cooperation-honeypot" aria-hidden="true">
          网站
          <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </label>
        <ElAlert
          v-if="submitError"
          :title="submitError"
          type="error"
          :closable="false"
          show-icon
        />
        <div class="cooperation-form-actions">
          <p>提交即表示您同意我们为本次合作沟通使用上述信息。</p>
          <ElButton
            type="primary"
            size="large"
            round
            native-type="submit"
            :loading="submitting"
            :disabled="regionsLoading || regionsError"
          >
            提交合作意向
          </ElButton>
        </div>
      </ElForm>
    </template>
  </ElDialog>
</template>
