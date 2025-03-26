<template>
    <el-popover title="名句解析" :width="200" trigger="click" :content="props?.analysis">
        <template #reference>
            <el-text type="primary" size="large" class="cursor-pointer"><slot /></el-text>
        </template>
    </el-popover>
</template>
<script lang="ts" setup>
    const props = defineProps({
        analysis: {
            type: String,
            default: ''
        }
    })
</script>