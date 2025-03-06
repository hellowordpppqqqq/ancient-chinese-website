<template>
    <el-popover :title="props?.text" trigger="click" width="300">
        <template #reference>
            <el-text type="primary" size="large" class="cursor-pointer">{{ props?.text }}</el-text>
        </template>
        <div class="pinyin-explain">
            <div class="pinyin">{{ props?.explain?.pinyin }}</div>
            <div class="explain" v-for="(item, index) in props?.explain?.explain" :key="`${item}-${index}`">
                <div>{{ index + 1 }}.{{ item?.explain }}</div>
                <el-text size="small">内容来源:《{{ item?.source }}》</el-text>
            </div>
            <el-link :href="props?.explain?.more" target=“__blank” style="margin-top:10px;">
                查看更多
            </el-link>
        </div>
    </el-popover>
</template>
<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    explain: {
        type: Object,
        default: () => ({
            pinyin: '',
            explain: [{
                explain: '',
                source: ''
            }],
            more: ''
        })
    }
})
</script>