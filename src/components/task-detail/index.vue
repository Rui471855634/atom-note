<template lang="pug">
.task-detail 
  ElDialog(v-model="dialogVisible"
    title="详情"
    :width="360"
    close-on-press-escape
    :close-on-click-modal="false"
    :before-close="handleClose")
    ElForm(
      ref="formRef"
      :model="task"
      :rules="rules"
      label-width="90px"
      class="demo-ruleForm"
      :disabled="props.disabled"
      size="small")
      ElFormItem(label="标题" prop="title")
        ElInput(v-model="task.title" autofocus)
      ElFormItem(label="内容" prop="content")
        ElInput(v-model="task.content" type="textarea")
      ElFormItem(label="状态" prop="completed")
        ElSwitch(v-model="task.completed" active-color="#13ce66")
      ElFormItem(label="重要" prop="important")
        ElSwitch(v-model="task.important" active-color="#13ce66")
      ElFormItem(label="修改时间")
        span {{task?.updateTime?.slice(0, 16) ?? task.createTime.slice(0, 16)}}
    template(#footer v-if="!props.disabled")
      ElButton(type="primary" @click="handleSubmit") 保存
      ElButton(@click="dialogVisible = false") 取消
</template>

<script lang="ts" setup>
import { ElDialog, ElForm, ElFormItem, ElInput, ElSwitch, ElButton } from "element-plus";
import { ref, defineExpose, reactive, defineEmits, defineProps } from "vue";
import { ITaskData } from "@/libs/types/task";
import { useStores } from "nf-web-storage";
import { getDateTime } from '@/utils';
const dialogVisible = ref(false);
const hasChange = ref(false);
const rules = {
  title: {
    required: true,
    message: "请输入标题",
  },
}
let task: ITaskData = reactive({});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  }
})

const handleShow = (_task: ITaskData) => {
  Object.assign(task, _task);
  dialogVisible.value = true;
  hasChange.value = false;
};

const emit = defineEmits(['refresh'])

const formRef = ref<InstanceType<typeof ElForm>>()
const { taskData } = useStores();
const handleSubmit = () => {
  formRef?.value?.validate?.(async (isValid: boolean) => {
    if (isValid) {
      let res = await taskData.set({
        ...task,
        date: getDateTime("MM-DD"),
        time: getDateTime("HH:mm"),
        updateTime: getDateTime()
      })
      if (res) {
        dialogVisible.value = false;
        emit('refresh')
      }
    }
  })
}

const handleClose = (done: Function) => {
  done();
};

defineExpose({
  handleShow,
});
</script>
