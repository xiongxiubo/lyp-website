<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

type CooperationType = "city" | "scenic";

const props = defineProps<{
  modelValue: boolean;
  type: CooperationType;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const cityOptions = [
  "洛阳",
  "郑州",
  "开封",
  "西安",
  "成都",
  "杭州",
  "南京",
  "北京",
  "上海",
  "广州",
  "深圳",
  "重庆",
  "长沙",
  "武汉",
  "苏州",
  "厦门",
  "三亚",
  "大理",
  "丽江",
];

const formRef = ref<FormInstance>();
const submitting = ref(false);
const submitted = ref(false);
const submitError = ref("");
const form = reactive({
  city: "",
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
  city: [{ required: true, message: "请选择或输入城市", trigger: "change" }],
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
  formRef.value?.resetFields();
  Object.assign(form, {
    city: "",
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
  submitError.value = "";
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  submitting.value = true;
  try {
    await $fetch("/api/cooperation", {
      method: "POST",
      body: {
        type: props.type,
        city: form.city,
        scenicName: isScenic.value ? form.scenicName : undefined,
        contact: form.contact,
        contactMethod: form.contactMethod,
        introduction: form.introduction,
        website: form.website,
      },
    });
    submitted.value = true;
  } catch (error: unknown) {
    const fetchError = error as { data?: { statusMessage?: string } };
    submitError.value =
      fetchError.data?.statusMessage || "暂时无法提交，请稍后再试。";
  } finally {
    submitting.value = false;
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
          <ElFormItem label="选择城市" prop="city">
            <ElSelect
              v-model="form.city"
              filterable
              allow-create
              default-first-option
              placeholder="选择或输入城市"
            >
              <ElOption
                v-for="city in cityOptions"
                :key="city"
                :label="city"
                :value="city"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem v-if="isScenic" label="景区名" prop="scenicName">
            <ElInput
              v-model="form.scenicName"
              maxlength="80"
              placeholder="请输入景区名称"
            />
          </ElFormItem>
          <ElFormItem label="联系人" prop="contact">
            <ElInput
              v-model="form.contact"
              maxlength="40"
              placeholder="请输入您的称呼"
              autocomplete="name"
            />
          </ElFormItem>
          <ElFormItem label="联系电话 / 微信" prop="contactMethod">
            <ElInput
              v-model="form.contactMethod"
              maxlength="80"
              placeholder="请输入电话或微信号"
              autocomplete="tel"
            />
          </ElFormItem>
        </div>
        <ElFormItem label="聊聊自己" prop="introduction">
          <ElInput
            v-model="form.introduction"
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
          >
            提交合作意向
          </ElButton>
        </div>
      </ElForm>
    </template>
  </ElDialog>
</template>
