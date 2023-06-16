<template>
    <div style="display: flex; align-items: center;">
        <el-input type="text" v-model="uuid" style="font-size: 24px;" />
        <el-button
            type="success"
            plain
            @click="generateUUID"
            style="width: auto; margin-left: 10px;"
        >
            生成UUID
        </el-button>
        <el-button
            type="success"
            plain
            @click="copyUUID"
            style="width: auto; margin-left: 10px;"
        >
            复制UUID
        </el-button>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    data() {
        return {
            uuid: "",
        };
    },
    methods: {
        generateUUID() {
            this.uuid = uuidv4();
        },
        copyUUID() {
            if (this.uuid) {
                const textarea = document.createElement("textarea");
                textarea.value = this.uuid;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                this.$message.success("复制成功");
            }
        },
    },
};
</script>
