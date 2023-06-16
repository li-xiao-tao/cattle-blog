<template>
    <div class="json-formatter">
        <div class="button-wrapper">
            <el-button type="primary" @click="formattedJson">格式化</el-button>
            <el-button type="primary" @click="jsonMinify">压缩JSON</el-button>
            <el-button type="primary" @click="toggleEscapeJson">{{ escapeJsonStatus ? '去转义' : '转义' }}</el-button>
            <el-button type="primary" @click="deleteJson">清除</el-button>
            <el-button type="primary" @click="downloadJson">下载</el-button>
        </div>
        <div class="input-wrapper">
            <el-input v-model="jsonData"
                      :autosize="{ minRows: 10, maxRows: 30 }"
                      placeholder="请输入JSON"
                      type="textarea"
            ></el-input>
        </div>
    </div>
</template>

<script>
import {ElMessageBox} from 'element-plus';
import JSON5 from 'json5';

export default {
    name: 'JsonFormatter',
    components: {
        JSON5
    },
    data() {
        return {
            // JSON 数据
            jsonData: '',
            // 转义状态
            escapeJsonStatus: false,
        };
    },
    methods: {
        // 格式化  JSON
        formattedJson() {
            if (!this.jsonData) {
                ElMessageBox.alert('请先输入JSON数据', '警告');
                return;
            }
            this.jsonData = JSON.stringify(JSON.parse(this.jsonData), null, 2);
        },
        // 压缩 JSON
        jsonMinify() {
            if (!this.jsonData) {
                ElMessageBox.alert('请先输入JSON数据', '警告');
                return;
            }
            this.jsonData = JSON.stringify(JSON.parse(this.jsonData));
        },
        // 切换转义状态
        toggleEscapeJson() {
            if (!this.jsonData) {
                ElMessageBox.alert('请先输入JSON数据', '警告');
                return;
            }
            if (this.jsonData.startsWith('"{\\"') && this.jsonData.endsWith('\\"}"') ) {
                this.escapeJsonStatus = true;
            }
            if (this.escapeJsonStatus) {
                this.jsonData = JSON.parse(this.jsonData);
            } else {
                this.jsonData = JSON.stringify(this.jsonData);
            }
            this.escapeJsonStatus = !this.escapeJsonStatus;
        },
        // 清除
        deleteJson() {
            this.jsonData = ''
        },
        // 下载JSON
        downloadJson() {
            if (!this.jsonData) {
                ElMessageBox.alert('请先输入JSON数据', '警告');
                return;
            }
            const blob = new Blob([this.jsonData], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    },

};
</script>

<style scoped>
.json-formatter {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180%;
}

.button-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 10px;
}

.el-input__inner {
    font-size: 14px;
    line-height: 1.5;
}

.input-wrapper {
    width: 100%;
    overflow-y: auto;
    line-height: 1.5;
}
</style>
