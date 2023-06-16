## Date


```java
//评审时间大于需求评审时间,需求表评审时间保存最大值
compareTo()方法的返回值，date1小于date2返回-1，date1大于date2返回1，相等返回0

    if (ass.getAssessTime().compareTo(demandVo.getAssessTime()) > 0) {
        //逻辑
    }

```

```java
/**
 * 获取某日期的月初第一天
 * @return
 */
public static Date getEarlyMonth(Date extracted) {
        // 获取月的第一天
        Calendar cale = Calendar.getInstance();
        cale.setTime(extracted);
        cale.add(Calendar.MONTH, 0);
        cale.set(Calendar.DAY_OF_MONTH, 1);
        cale.set(cale.get(Calendar.YEAR), cale.get(Calendar.MONTH), cale.get(Calendar.DAY_OF_MONTH)
        ,0, 0, 0);
        return cale.getTime();
        }

/**
 * 获取前四天
 * @return
 */
public static Date getTopFourDate() {
        Calendar cale = Calendar.getInstance();
        cale.add(Calendar.DATE, -4);
        return cale.getTime();
        }
/**
 * 获取前五天
 * @return
 */
public static Date getTopFiveDate() {
        Calendar cale = Calendar.getInstance();
        cale.add(Calendar.DATE, -5);
        return cale.getTime();
        }

/**
 * 将date 转化为 LocalDateTime
 * @param date
 * @return
 */
public static LocalDateTime getLocalDateTime(Date date) {
        Instant instant = date.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        return instant.atZone(zoneId).toLocalDateTime();
        }

/**
 * 获取某天的凌晨0点0分0秒Date
 * @return
 */
public static Date getDayStartTime(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH),
        0, 0, 0);
        return calendar.getTime();
        }

/**
 * 获取某天的23点59分59秒Date
 * @param date
 * @return
 */
public static Date getDayEndTime(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH),
        23, 59, 59);
        return calendar.getTime();
        }

// 获得某天最大时间 2017-10-15 23:59:59
public static Date getEndOfDay(Date date) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(date.getTime()), ZoneId.systemDefault());
        LocalDateTime endOfDay = localDateTime.with(LocalTime.MAX);
        return Date.from(endOfDay.atZone(ZoneId.systemDefault()).toInstant());
        }

// 获得某天最小时间 2017-10-15 00:00:00
public static Date getStartOfDay(Date date) {
        LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(date.getTime()), ZoneId.systemDefault());
        LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
        return Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
        }

/**
 * 获取n下周三 23:59:59
 * @return Date
 */
public static Date getWednesday(Date date, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 7 * day);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 23, 59, 59);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.WEDNESDAY);
        return calendar.getTime();
        }

/**
 * 获取本周四 02:00:00
 * @return Date
 */
public static Date getThursday() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.THURSDAY);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 02, 00, 00);
        return calendar.getTime();
        }

/**
 * 获取下周四 02:00:00
 * @return Date
 */
public static Date getNextThursday() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, 7);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.THURSDAY);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 02, 00, 00);
        return calendar.getTime();
        }

/**
 * 获取某个日期的周四
 * @return Date
 */
public static Date getSomeTimeThursday(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 02, 00, 00);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.THURSDAY);
        return calendar.getTime();
        }
```






