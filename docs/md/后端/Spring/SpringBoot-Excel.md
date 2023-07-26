# SprootBoot 整合阿里`EasyExcel`

## 警告

- **这里注意，要自定义合并的列如果是基本数据类型需要转换成`String`**，可能是BUG，没找到原因。
- 转化方法，`List<UserExcelString> excelStrings = JSONObject.*parseArray*(JSON.*toJSONString*(userVoList), UserExcelString.class)`;



[阿里`Excel`](https://easyexcel.opensource.alibaba.com/)


## POM

```XML
    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>easyexcel-core</artifactId>
            <version>3.3.2</version>
        </dependency>
    </dependencies>
```

## 样式

### 注解

[注解链接-1](https://blog.csdn.net/y449739776/article/details/123879540?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123879540-blog-124032490.235%5Ev38%5Epc_relevant_anti_t3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123879540-blog-124032490.235%5Ev38%5Epc_relevant_anti_t3&utm_relevant_index=1)

[注解链接-2](https://blog.csdn.net/qq_48922459/article/details/124032490)

以下是每个注解的说明和其在表格中的展示效果：



| 位置        | 注解                                                         | 说明                                                    |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| 类上        | `@ExcelIgnoreUnannotated`                                    | 用于忽略未注解的字段，只对注解了的字段进行处理          |
| 字段上      | `@ExcelProperty(value = "逻辑删除", converter = DeletedConverter.class)` | `value`=列名，`converter `=转化器（例：0转成女，1转男） |
| 类上/字段上 | `@ColumnWidth(16)`                                           | 设置列宽为 16 个字符宽度                                |
| 类上/字段上 | `@HeadRowHeight(14)`                                         | 设置表头行高为 14 个点高度                              |
|             | `@HeadFontStyle(fontHeightInPoints = 11)`                    | 设置表头字体样式，字号为 11 点                          |
| 类上/字段上 | `@ContentStyle(verticalAlignment = VerticalAlignmentEnum.CENTER, horizontalAlignment = HorizontalAlignmentEnum.CENTER)` | 设置内容样式，垂直居中对齐，水平居中对齐                |
| @DateTimeFormat("yyyy年MM月dd日HH时mm分ss秒")字段上 | `@DateTimeFormat("yyyy年MM月dd日HH时mm分ss秒")` | 配置时间格式                |

- `converter`转换器

```java
public class DeletedConverter implements Converter<Integer> {
    @Override
    public Class supportJavaTypeKey() {
        return Integer.class;
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey() {
        return CellDataTypeEnum.STRING;
    }

    @Override
    public Integer convertToJavaData(ReadConverterContext context) {
        Integer value = 0;
        String str = context.getReadCellData().getStringValue();
        if ("正常".equals(str)) {
            value = 0;
        } else {
            value = 1;
        }
        return value;
    }

    @Override
    public WriteCellData<T> convertToExcelData(WriteConverterContext<Integer> context) {
        String str = "其他";
        if (0 == context.getValue()) {
            str = "正常";
        } else {
            str = "删除";
        }
        return new WriteCellData<T>(str);
    }
}
```

### 案例

- **这里注意，要合并的列如果是基本数据类型需要转换成`String`**
- 转化方法，`List<UserExcelString> excelStrings = JSONObject.*parseArray*(JSON.*toJSONString*(userVoList), UserExcelString.class)`;

```java

/**
 * <p>
 * 这里需要合并的列字段数据类型改成了String
 * 原因是CellMergeWriterHandler.class  中的合并方法 mergeRows 在合并时，
 * String 类型相同内容的值不会限制最大合并数，int.. 会限制最大合并数是2
 * </p>
 * <p>
 * 转换方法
 * List<UserExcelString> excelStrings = JSONObject.parseArray(JSON.toJSONString(userList), UserExcelString.class);
 * </p>
 *
 * <p>
 * 需求Excel表，  @ExcelProperty value用于Excel每列title
 * </p>
 *
 * <p>
 *
 * @author lixiaotao
 * @ColumnWidth(16) 列宽  【在类上，所有列的宽度都是16，在子列可再标注列宽】
 * </p>
 * <p>
 * @HeadRowHeight(14) 行高  【在类上，所有高的宽度都是14】
 * </p>
 */

@Getter
@Setter
@EqualsAndHashCode
@ExcelIgnoreUnannotated
@ColumnWidth(16)
@HeadRowHeight(14)
@HeadFontStyle(fontHeightInPoints = 11)
@ContentStyle(verticalAlignment = VerticalAlignmentEnum.CENTER, horizontalAlignment = HorizontalAlignmentEnum.CENTER)
public class UserExcelString {

    @ColumnWidth(value = 5)
    @ExcelProperty(value = "编号")
    private String id;

    @ExcelProperty(value = "创建人id")
    private String createId;

    @ExcelProperty(value = "创建人姓名")
    private String createName;

    @ColumnWidth(20)
    @ExcelProperty(value = "创建时间")
    private Date createTime;

    @ExcelProperty(value = "修改用户")
    private String updateUser;

    @ColumnWidth(20)
    @ExcelProperty(value = "修改时间")
    private Date updateTime;

    @ColumnWidth(9)
    @ExcelProperty(value = "逻辑删除", converter = DeletedConverter.class)
    private Integer isDeleted;
}
```





## 下载`Excel`

- `DownloadData`导出的列，包含Excel样式
- `data()`导出的数据

```java
   @GetMapping("download")
    public void download(HttpServletResponse response) throws IOException {
        // 直接用浏览器或者用postman
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");

        EasyExcel.write(response.getOutputStream(), DownloadData.class)
        //.registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.ROW, Arrays.asList(5, 6)))
        .registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.COLUMN, Arrays.asList(4, 6)))
        //07的excel版本,节省内存
        .excelType(ExcelTypeEnum.XLSX)
        // 忽略自定义的列 (列名)
        //.excludeColumnFieldNames()
        // 包括列索(索引)
        .includeColumnIndexes(ClassUtils.getIncludeColumns("需要查询的字段名", DownloadData.class))
        //是否自动关闭输入流
        .autoCloseStream(Boolean.TRUE)
        .sheet("模板").doWrite(data());
    }

    /**
     * 文件下载并且失败的时候返回json（默认失败了会返回一个有部分数据的Excel）
     *
     * @since 2.1.1
     */
    @GetMapping("downloadFailedUsingJson")
    public void downloadFailedUsingJson(HttpServletResponse response) throws IOException {
        // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
        try {
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("utf-8");
            // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
            String fileName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            // 这里需要设置不关闭流
            EasyExcel.write(response.getOutputStream(), DownloadData.class).autoCloseStream(Boolean.FALSE).sheet("模板")
                    .doWrite(data());
        } catch (Exception e) {
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            Map<String, String> map = MapUtils.newHashMap();
            map.put("status", "failure");
            map.put("message", "下载文件失败" + e.getMessage());
            response.getWriter().println(JSON.toJSONString(map));
        }
    }
```

## 自定义合并单元格

- Arrays.asList(5, 6)  需要合并的哪一行或列，可多个
- 合并行元素 registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.ROW, Arrays.asList(5, 6)))
- 合并列元素 registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.COLUMN, Arrays.asList(4, 6)))

```java
import com.alibaba.excel.metadata.Head;
import com.alibaba.excel.write.handler.CellWriteHandler;
import com.alibaba.excel.write.merge.AbstractMergeStrategy;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

import java.util.List;
import java.util.Objects;

/**
 * <p>自定要合并的的行或列</p>
 * <p>行.registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.ROW, Arrays.asList(5, 6)))</p>
 * <p>列.registerWriteHandler(CellMergeWriterHandler.getCellWriteHandler(CellMergeWriterHandler.CellMergeEnum.COLUMN, Arrays.asList(4, 6)))</p>
 *
 * @author lixiaotao
 */
public class CellMergeWriterHandler {

    /**
     * @param cellMergeEnum COLUMN 列 ROW 行
     * @param cols          需要合并的列或者行数 如：5，6 （从0开始的第5，6行进行合并）
     * @return
     */
    public static CellWriteHandler getCellWriteHandler(CellMergeEnum cellMergeEnum, List<Integer> cols) {
        return new MergeWriterHandler(cols, cellMergeEnum);
    }


    public enum CellMergeEnum {
        /**
         * COLUMN 列
         * ROW 行
         */
        COLUMN, ROW
    }

    /**
     * 对列或行进行合并
     */
    public static class MergeWriterHandler extends AbstractMergeStrategy {

        private final List<Integer> mergeCols;
        private final CellMergeEnum cellMergeEnum;

        public MergeWriterHandler(List<Integer> mergeCols, CellMergeEnum cellMergeEnum) {
            this.mergeCols = mergeCols;
            this.cellMergeEnum = cellMergeEnum;
        }

        /**
         * 合并单元格
         *
         * @param sheet         Excel工作表
         * @param cell          当前要合并的单元格
         * @param cellMergeEnum 要进行的合并类型，列或者行
         */
        private static void mergeCell(Sheet sheet, Cell cell, CellMergeEnum cellMergeEnum) {
            if (Objects.isNull(cell)) {
                return;
            }
            // 获取行索引
            int rowIndex = cell.getRowIndex();
            // 获取列索引
            int colIndex = cell.getColumnIndex();

            // Excel 行
            Row preRow = null;
            // Excel 单元格
            Cell preCell = null;

            // 列合并
            if (CellMergeEnum.COLUMN.equals(cellMergeEnum)) {
                // 表示从工作表（sheet）中获取指定索引为rowIndex - 1的行对象（preRow
                preRow = sheet.getRow(rowIndex - 1);
                // 示从前一行（preRow）中获取指定索引为colIndex的单元格对象（preCell）
                preCell = preRow.getCell(colIndex);
            }
            // 行合并
            if (CellMergeEnum.ROW.equals(cellMergeEnum)) {
                if (colIndex == 0) {
                    return;
                }
                preRow = cell.getRow();
                preCell = preRow.getCell(colIndex - 1);
            }

            if (Objects.isNull(preRow) || Objects.isNull(preCell)) {
                return;
            }
            mergeRows(sheet, preCell, cell);
        }

        /**
         * 行单元格合并
         *
         * @param sheet
         * @param preCell 前一个单元格
         * @param curCell 当前单元格
         */
        private static void mergeRows(Sheet sheet, Cell preCell, Cell curCell) {
            // 前一个 单元格
            Object preCellValue = getCellValue(preCell);
            // 当前 单元格
            Object curCellValue = getCellValue(curCell);
            // 如果当前单元格的值为空，则不进行合并
            if (Objects.isNull(curCellValue)) {
                return;
            }
            // 如果前一个单元格的值不为空且与当前单元格的值不相等，则不进行合并 、、Integer最大合并数为2 ，String 没问题
            if (!"".equals(preCellValue)) {
                // 如果两个单元格相同就合并
                if (!preCellValue.equals(curCellValue)) {
                    return;
                }
                // 设置单元格为空白
                curCell.setBlank();
                // 在工作表中添加合并区域，将前一个单元格和当前单元格合并
                sheet.addMergedRegion(new CellRangeAddress(preCell.getRowIndex(), curCell.getRowIndex(), preCell.getColumnIndex(), curCell.getColumnIndex()));
                return;
            }

            // 获取工作表中已经存在的合并区域列表
            List<CellRangeAddress> list = sheet.getMergedRegions();
            // 使用流过滤函数查找与前一个单元格相匹配的合并区域
            CellRangeAddress rangeAddress = list.stream().filter(e -> compareColAndRow(e, preCell)).findFirst().orElse(null);
            // 如果没有找到相匹配的合并区域，则根据当前单元格的值进行合并 ,这个会限制合并的最大单元格数为 2
//            if (!Objects.isNull(rangeAddress)) {
//                if ("".equals(curCellValue)) {
//                    curCell.setBlank();
//                    sheet.addMergedRegion(new CellRangeAddress(preCell.getRowIndex(), curCell.getRowIndex(), preCell.getColumnIndex(), curCell.getColumnIndex()));
//                    return;
//                }
//                return;
//            }
            // 获取相匹配合并区域的起始行、起始列以及起始单元格的值
            int firstRow = rangeAddress.getFirstRow();
            int firstColumn = rangeAddress.getFirstColumn();
            String value = String.valueOf(getCellValue(sheet.getRow(firstRow).getCell(firstColumn)));
            // 如果相匹配合并区域的起始单元格的值与当前单元格的值不相等，则不进行合并
            if (!value.equals(curCellValue)) {
                return;
            }

            // 获取当前单元格的行索引和列索引
            int lastRow = curCell.getRowIndex();
            int lastColumn = curCell.getColumnIndex();
            // 在合并区域列表中找到相匹配的合并区域，并将其移除
            for (int i = 0; i < list.size(); i++) {
                if (rangeAddress.equals(list.get(i))) {
                    sheet.removeMergedRegion(i);
                    curCell.setBlank();
                    // 在工作表中添加新的合并区域，将起始行到当前行、起始列到当前列的单元格合并
                    sheet.addMergedRegion(new CellRangeAddress(firstRow, lastRow, firstColumn, lastColumn));
                    return;
                }
            }
        }

        /**
         * 比较列和行
         *
         * @param cellRangeAddress
         * @param cell
         * @return
         */
        private static boolean compareColAndRow(CellRangeAddress cellRangeAddress, Cell cell) {
            return cellRangeAddress.getFirstColumn() <= cell.getColumnIndex() && cellRangeAddress.getLastColumn() >= cell.getColumnIndex()
                    && cellRangeAddress.getFirstRow() <= cell.getRowIndex() && cellRangeAddress.getLastRow() >= cell.getRowIndex();
        }

        /**
         * 获取单元格的值
         *
         * @param cell
         * @return
         */
        protected static Object getCellValue(Cell cell) {
            if (Objects.isNull(cell)) {
                return "";
            }

            CellType cellTypeEnum = cell.getCellType();
            switch (cellTypeEnum) {
                case STRING:
                    return cell.getStringCellValue();
                case BOOLEAN:
                    return cell.getBooleanCellValue();
                case NUMERIC:
                    return cell.getNumericCellValue();
                default:
                    return "";
            }
        }

        @Override
        protected void merge(Sheet sheet, Cell cell, Head head, Integer relativeRowIndex) {
            if (CollectionUtils.isNotEmpty(this.mergeCols) && !this.mergeCols.contains(cell.getColumnIndex())) {
                return;
            }
            mergeCell(sheet, cell, cellMergeEnum);
        }
    }
}

```

## 需要的工具类

### 驼峰转换

```xml
        <!-- 字符串 转小驼峰-->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-text</artifactId>
            <version>1.9</version>
            <scope>compile</scope>
        </dependency>
```

```java
public class StrUtil {

    /**
     * @param str                   需要转换成驼峰的字段  ，号隔开
     * @param capitalizeFirstLetter 首字母是否大写
     * @param delimiters            连词符 如 test_test 中的 ‘_’
     * @return
     */
    public static List<String> getExcludedColumns(@NotNull String str, @NotNull boolean capitalizeFirstLetter, @NotNull char... delimiters) {
        List<String> excludedColumns = new ArrayList<>();
        if (StringUtils.isNotEmpty(str)) {
            String[] srt = str.split(",");
            for (String s : srt) {
                s = s.trim();
                if (s.contains("_")) {
                    // str为要转换的字符串；capitalizeFirstLetter表示是否首字母大写；delimiters指定连词符。
                    s = CaseUtils.toCamelCase(s, capitalizeFirstLetter, delimiters);
                    excludedColumns.add(s);
                }
                excludedColumns.add(s);
            }
        }
        return excludedColumns;
    }
}
```
### 查询字段索引


- getIncludeColumns  select【"id,name"】 获取 Class<?> userClass 的字段索引

- updateIndexes  select【"id,name"】 跟新 Class<?> userClass 的字段注解 ExcelProperty 索引 index 的值

```java
public class ClassUtils {

    /**
     * 获取需要查寻字段的字段索引
     *
     * @param select    需要查询的字段名，对应数据库
     * @param userClass 对象
     * @return
     */
    public static Set<Integer> getIncludeColumns(@NotNull String select, @NotNull Class<?> userClass) {
        // 转成小驼峰
        List<String> excludedColumns = StrUtil.getExcludedColumns(select, false, '_');

        // 列名 List
        List<String> propertyNames = new ArrayList<>();

        // 反射获取列名
        Field[] fields = userClass.getDeclaredFields();

        for (Field field : fields) {
            propertyNames.add(field.getName());
        }

        // Map<列名索引, 列名>
        Map<Integer, String> demandExcelMap = IntStream.range(0, propertyNames.size())
                .boxed()
                .collect(Collectors.toMap(index -> index, propertyNames::get));

        // Map<列名索引, 列名> --> 过滤 不需要查询的字段
        Map<Integer, String> sa = demandExcelMap.entrySet()
                .stream()
                .filter(entry -> excludedColumns.contains(entry.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        // 需要查寻字段的字段索引
        return sa.keySet();
    }

       /**
     * 更新索引下标，并返回列索引下标
     *
     * @param indexes  属性列表
     * @param cla      对象
     * @param property 需要修改的注解属性
     */
    public static List<Integer> updateIndexes(List<String> indexes, Class<?> cla, String property){
        try {
            ArrayList<Integer> indexList = new ArrayList<>();
            HashMap<String, Integer> map = new HashMap<>(indexes.size());
            // 自定义列索引
            for (int i = 0; i < indexes.size(); i++) {

                Field field = cla.getDeclaredField(indexes.get(i));
                field.setAccessible(true);
                // 获取字段上的注解
                ExcelProperty excelPropertyAnnotation = field.getAnnotation(ExcelProperty.class);

                // 修改注解属性值
                if (excelPropertyAnnotation != null) {
                    // 获取注解的代理处理器
                    InvocationHandler invocationHandler = Proxy.getInvocationHandler(excelPropertyAnnotation);

                    // 获取注解属性成员变量  memberValues 不能改
                    Field memberValuesField = invocationHandler.getClass().getDeclaredField("memberValues");
                    memberValuesField.setAccessible(true);

                    // 更新注解属性值
                    Map<String, Object> memberValues = (Map<String, Object>) memberValuesField.get(invocationHandler);
                    memberValues.put(property, i);


                    map.put(field.getName(),i);
                    indexList.add(i);
                }
            }
            // 打印列
            printlnIndex(map);

            // 对其他列 索引赋值 -1  【其底层已经默认-1，但有些列不是-1 与自定义列索引冲突，这里再赋值一次】
            excludeAttributes(indexes, cla, property);
            return indexList;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void excludeAttributes(List<String> indexes, Class<?> cla, String property) throws NoSuchFieldException, IllegalAccessException {
        // 获取类的所有字段，包括私有字段
        Field[] fields = cla.getDeclaredFields();
        // 遍历字段
        for (Field field : fields) {
            if (!indexes.contains(field.getName())) {

                Field excludeField = cla.getDeclaredField(field.getName());
                excludeField.setAccessible(true);
                // 获取字段上的注解
                ExcelProperty excelPropertyAnnotation = field.getAnnotation(ExcelProperty.class);
                // 修改注解属性值
                if (excelPropertyAnnotation != null && excelPropertyAnnotation.index() != -1) {
                    // 获取注解的代理处理器
                    InvocationHandler invocationHandler = Proxy.getInvocationHandler(excelPropertyAnnotation);
                    // 获取注解属性成员变量  memberValues 不能改
                    Field memberValuesField = invocationHandler.getClass().getDeclaredField("memberValues");
                    memberValuesField.setAccessible(true);
                    // 更新注解属性值
                    Map<String, Object> memberValues = (Map<String, Object>) memberValuesField.get(invocationHandler);
                    memberValues.put(property, -1);
                }
            }
        }
    }

    /**
     * 打印修改的列
     * @param map
     */
    private static void printlnIndex(HashMap<String, Integer> map) {
        Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();
            String key = entry.getKey();
            Object value = entry.getValue();
            System.out.println("Demand导出 字段列-下标值  字段: " + key + ", 索引下标: " + value);
        }
    }
}
```