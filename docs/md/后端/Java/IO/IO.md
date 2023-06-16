# 文件下载

### 注意返回值只能是ResponseEntity<byte[]>

**1.依赖**

```
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-compress</artifactId>
            <version>1.21</version>
        </dependency>
```

**2.Utiles**

```
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 文件压缩工具类
 * @author lixiaotao
 */
public class ZipUtils {
    /**
     * 文件批量压缩,不保存实际位置
     *
     * @param byteList         文件字节码Map，k:fileName，v：byte[]
     * @param byteOutPutStream 字节输出流
     */
    public static void batchFileToZIP(Map<String, byte[]> byteList, ByteArrayOutputStream byteOutPutStream) {

        //设置输出流
        ZipOutputStream zipOutputStream = new ZipOutputStream(byteOutPutStream);
        try {
            for (Map.Entry<String, byte[]> entry : byteList.entrySet()) {
                //写入一个条目，我们需要给这个条目起个名字，相当于起一个文件名称
                zipOutputStream.putNextEntry(new ZipEntry(entry.getKey()));
                // 写入输出流
                zipOutputStream.write(entry.getValue());
            }
            zipOutputStream.closeEntry();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                zipOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

```
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

/**
 * ResponseEntity封装类
 * @author lixiaotao
 */
@Slf4j
public class ResponseEntityUtils {
    /**
     * ResponseEntity下载zip文件
     *
     * @param fileName 文件名
     * @param byteFile 字节码
     * @param response response
     * @return
     */
    public static ResponseEntity<byte[]> buildByteFileResponse(String fileName, byte[] byteFile, HttpServletResponse response) {
        try {
            fileName = URLEncoder.encode(fileName, "UTF-8");
            response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
            response.setHeader("Content-disposition", "attachment;filename=" + fileName);
            response.flushBuffer();
            return ResponseEntity.ok().body(byteFile);
        } catch (Exception e) {
            log.warn("Warning", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("下载失败.".getBytes());
        }
    }
}
```

**3.Controller层**

```
@GetMapping("getFile")
    @ApiOperation(value = "导出配置文件")
    public ResponseEntity<byte[]> getFile(@RequestParam String paramIds, HttpServletResponse response) {
        if (StringUtils.isEmpty(paramIds)) {
            throw  new BusinessException(ErrorCodeEnums.ERROR_401.getCode(), "配置文件ids参数不能为空");
        }

        List<DpsIterationParam> params = paramService.findConfigByParamIds(paramIds);

        Map<String, byte[]> byteFileMap = new HashMap<>(params.size());
        for (DpsIterationParam param : params) {
            //文件名  文件内容-字节
            byteFileMap.put(param.getFileName() + "." + param.getFileType(), param.getParamValue().getBytes());
        }

        String zipFileName = "application.zip";

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ZipUtils.batchFileToZIP(byteFileMap, byteArrayOutputStream);

        return ResponseEntityUtils.buildByteFileResponse(zipFileName, byteArrayOutputStream.toByteArray(), response);
    }
```

**示例1.0**

```
 public static void main(String[] args) throws IOException {
        //File.separator代表了当前系统的文件分割符
        //linux使用/分割符会报错找不到文件,window系统下/和\都可以作为文件路径
        System.out.println("File.separator="+ File.separator);

        File file = new File("F:" + File.separator + "upgrade46.txt");
        File zipFile = new File("f:" + File.separator + "hello.zip");
        //读取相关的文件
        InputStream input = new FileInputStream(file);
        //设置输出流
        ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));

        zipOut.putNextEntry(new ZipEntry(file.getName()));
        // 设置注释
        zipOut.setComment("hello");
        int temp = 0;
        //读取相关的文件
        while((temp = input.read()) != -1){
            //写入输出流中
            zipOut.write(temp);
        }
        //关闭流
        input.close();
        zipOut.close();
    }
```