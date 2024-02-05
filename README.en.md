<p align="center">
  <img src="https://github.com/Term-inator/Schedule/blob/cabb1452e50f7a304cd195b50f3daa32f2f71ba0/resources/icon.png" width="150px" height="150px">
</p>

<div align="center">
  <h1>Schedule</h1>
</div>
<p align="center">
  Manage your schedules in an easy and logical way!
</p>
<p align="center">
  <a href="https://github.com/term-inator/schedule/releases/latest" style="text-decoration:none">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/term-inator/schedule">
  </a>
  <img src="https://img.shields.io/github/license/term-inator/schedule?color=blue" alt="license" />
</p>

### Features
1. Supports Event and Todo
    - Event: Events that span a period of time
    - Todo: Events with only an end time (Deadline)
2. Follows iCalendar design for scheduling time, supports time zones, recurring events, reminders, and has the potential to export as iCalendar files (not yet developed).
3. Todo supports the use of Pomodoro technique.
4. Supports Google login, which allows users to sync data and settings after logging in.

### Why Schedule?
1. While mobile devices are portable and allow you to check your schedule anytime and anywhere, they have the following issues:
   - Events and Todos are often displayed on two separate pages, making it cumbersome to switch between them. Schedule combines Events and Todos on a single page for easy viewing and management.
   - It is difficult to conveniently view schedules for a specific period in the future and to plan schedules with a global perspective. Schedule provides MonthView and WeekView to help users plan their schedules more effectively.
2. PC keyboards offer quick shortcuts and convenient text input, so Schedule abandons the button-based operations of traditional mobile calendar management apps. Instead, it uses a simple code-based system for setting event times, based on iCalendar design, and provides syntactic sugar and keyboard shortcuts to make adding events mouse-independent and reduce the number of characters that need to be input. Thanks to this approach, Schedule can manage schedules more logically. Most calendar and schedule management software on the market can only have one time for an event. When faced with events like "8-9 am today, 9-10 am tomorrow" or "8 am every Monday, 1 pm every Wednesday," you would need to create two separate events. However, with Schedule, users can create just one event, making it easier for users with statistical and summary needs to understand the history and distribution of a particular schedule's times.
3. All data is stored on your device.

### Quick Start
#### Creating a New Schedule
1. Click the "Add" button bellow the navigation bar to open the New Schedule panel.
2. Enter the Name and rTime, then click "Confirm."

| Field | Description |
| ---- | ---- |
| Name | Name of the Schedule |
| rTime | Schedule's time |
| exTime | Time to be excluded |
| Comment | Comments for the Schedule |

Syntax for rTime and exTime can be found below in the [Grammar](#grammar) section.

After creating a new Schedule, Todos will be displayed in the left Todo list, and Events will be displayed in the right calendar.
The right calendar is divided into [MonthView](#monthview) and [WeekView](#weekview), which can be switched by clicking the buttons at the top.

You can set the default view preference in the [Settings](#settings).

#### TodoList
1. The left panel on the homepage displays today and future Todos (starting from the start time of the day, see [Settings](#settings) for details).
   - Today's Todos are displayed in orange, tomorrow's in black, future Todos in gray, and overdue Todos in red.
2. Click the "Start" button on the right to open the [Pomodoros](#pomodoros) page.
3. Click the "Done" button on the right to mark a Todo as completed. Clicking the Name and Deadline opens the [Schedule](#schedule) page.
4. The "Not Expired" and "Not Done" options at the top are selected by default, hiding expired and completed Todos, respectively. Deselect them to modify the time of expired events and unmark completed events. To modify Todos that are due before today, you need to do so in the [Database](#database) page. Please complete today's tasks today.

#### MonthView
1. A calendar grid where each cell represents one day, and the cells display Events for that day.
2. Hovering the mouse over an Event displays detailed information, and clicking it opens the [Schedule](#schedule) page.

#### WeekView
1. Divided into n columns, each representing one day, with each column displaying the day's Events. The default value of n is 5 but can be modified in the [Settings](#settings).
2. The height of Event blocks represents the duration of the Event. The position is relative to the Event's start time and the start time of the day, which can be modified in the [Settings](#settings). time slots of the same Event have the same color.
3. Event blocks can be dragged up or down to avoid overlap and ensure Event data remains unchanged.

#### Pomodoros
1. By default, it follows the Pomodoro technique, working for 25 minutes and taking a 5-minute break, with a 20-minute break after 4 Pomodoros. You can modify these settings in the [Settings](#settings).
2. You will receive reminders when completing a Pomodoro session and when starting the next one.
3. Leaving the page marks the end of a focus session, and this time will be recorded as the focus time for the corresponding Todo. You can view this information in the [Schedule](#schedule) page.
4. In the top left corner, you can switch to the currently active Todo. The lightbulb button in the top right corner allows you to record sudden thoughts and problems that arise during your focus session, which you can review and address later.

#### Schedule
1. The Schedule page displays basic information about the Schedule and all associated times. If it is a Todo, it will also display previous focus records.
2. The "Edit" button in the top right allows you to edit the Schedule's basic information and times, the "Delete" button allows you to delete the Schedule and all associated times, and the star button allows you to bookmark the Schedule for easy filtering in the [Database](#database) page.
3. The "Delete" button in the top right of the time list allows you to delete all selected times, and the deleted times will be added as exTime to the Schedule.
4. Add a comment to a time by double-clicking on it.

#### Database
1. Displays all Schedules, and clicking on one opens the [Schedule](#schedule) page.
2. You can filter Schedules based on Name, Schedule Comment/Time Comment, Date Range, Type (Schedule type), and whether it's bookmarked. Date Range is a closed interval, meaning if a Schedule has at least one time slot falling within that range, it will be included in the result.

#### Settings
| Field | Description |
| ---- | ---- |
| RRule.Time Zone | Defaults to the current time zone. |
| RRule.WKST | The first day of the week, defaults to Monday. Changing it will not affect previously added Schedules. |
| Alarm.Todo | When enabled, it provides a default 5-minute reminder for Todos. |
| Alarm.Event | When enabled, it provides a default 5-minute reminder for Events. |
| Preference.Priority | Determines whether MonthView or WeekView is displayed by default. |
| Preference.Week View Days | Determines the number of columns in WeekView. |
| Preference.Week View Start Time | Determines the start time of each day in WeekView. |
| Preference.Open At Login | Determines whether Schedule opens automatically at startup. |
| Pomodoro.Focus | Sets the duration of the Pomodoro work session. |
| Pomodoro.Small Break | Sets the duration of the short break between Pomodoro sessions. |
| Pomodoro.Big Break | Sets the duration of the longer break after completing 4 Pomodoro sessions. |

### Shortcuts
| Key | Description |
| ---- | ---- |
| Ctrl + upArrow | Opens the Schedule panel. |
| Ctrl + downArrow | Closes the Schedule panel. |
| Ctrl + leftArrow/rightArrow | Switches the navigation tab. |
| Ctrl + 1/2/3/4/5/6/7 | Jumps to the next Monday/Tuesday/Wednesday/Thursday/Friday/Saturday/Sunday, based on the WKST setting in [Settings](#settings). |
| Ctrl + Enter | Submits data in the Schedule panel. Only works when the Schedule panel is open. |

### Grammar
```bash
DateRange TimeRange (TimeZone) (RRule)
```
TimeZone and RRule are optional.

#### DateRange
```bash
startDate(-endDate)
```
endDate is optional.

- startDate: (year/)month/day
When year is omitted, it defaults to the year in which the first month/day occurs in the future.
- endDate: (year/month/)day
When year and month are omitted, they default to the year and month of the startDate.

1. Omitting the year:
   ```bash
   # Assuming today is 2023/7/23
   7/25      # Represents 2023/7/25
   7/25-8/25 # Represents 2023/7/25-2023/8/25
   7/1       # Represents 2024/7/1
   ```
2. Omitting leading 0s in month and year:
   ```bash
   2023/07/10 == 2023/7/10
   ```
3. Omitting year and month in endDate:
   ```bash
   2023/7/10-8/10 # Represents 2023/7/10-2023/8/10
   2023/7/10-20   # Represents 2023/7/10-2023/7/20
   ```
4. Special syntax:
   - tdy represents today's date.
   - tmr represents tomorrow's date.
   ```bash
   # Assuming today is 2023/7/23
   tdy-8/30 # Represents 2023/7/23-8/30
   tmr-30   # Represents 2023/7/24-7/30 
   ```

#### TimeRange
```bash
startTime(-endTime)
```
In 24-hour format, includes both startTime and endTime.

- startTime: hour(:minute)
When minute is omitted, it defaults to 0.
- endTime: hour(:minute)
When minute is omitted, it defaults to 0.

1. Omitting the :00 for whole hours; leading 0s in hour and minute can be omitted (must keep at least one 0 for 00):
   ```bash
   2   # Represents 2:0 
   2:0 # Represents 02:00
   2-3 # Represents 2:0-3:0
   ```
2. endTime can be less than startTime, indicating that the event ends tomorrow:
   ```bash
   23-2  # Represents 23:00-02:00 of the next day
   ```
3. Using ? to indicate uncertain times:
   When minute is ?, hour must also be ?. ? can be omitted.
   ```bash
   2:?   # Represents a little after 2
   ?:?-3 # Represents an unknown start time until 3
   2-3:? # Represents from 2 to a little after 3

   2:    # Represents a little after 2
   :-3   # Represents an unknown start time until 3
   2-3:  # Represents from 2 to a little after 3
   ```
4. Special syntax:
   - s/start represents 00:00.
   - e/end represents 23:59.
   ```bash
   s-3 # Represents 00:00-03:00
   3-e # Represents 03:00-23:59
   ```

   You can use a period (.) instead of a colon (:):
   ```bash
   2.30-3.30 # Represents 2:30-3:30
   ```

#### TimeZone
Supports IANA time zones and abbreviations.

For example:
- Asia/Shanghai
- CDT (Central Daylight Time)

When omitted, it defaults to the current time zone.
You can select your current time zone in the [Settings](#settings).

#### RRule
```bash
(FreqCode) (ByCode)
```
This is only meaningful when the DateRange includes an endDate because creating an infinitely long schedule removes its urgency and tends to be postponed indefinitely.

```bash
FreqCode = Freq(,interval,count)
```
- Freq can be daily, weekly, monthly, or yearly. When omitted, it defaults to daily.
- The order of interval and count can be swapped.
- Interval is a positive integer, indicating how many days/weeks/months/years to skip. It corresponds to Freq and defaults to 1 when omitted.
- Count is a positive integer, indicating how many times the event should repeat. If omitted, the event will repeat daily til the end date of the [DateRange](#daterange).

*Note: secondly, minutely, and hourly do not make sense because inserting such schedules at this time is not as productive as starting immediately, so they are not supported.*

```bash
daily,i2,c10 # Represents every 2 days, repeating 10 times
monthly,i2   # Represents every 2 months
```

```bash
ByCode = by[byType[byValue],byType[byValue],...]
```
- The order of byType and byValue doesn't matter.
- byType can be month, weekno, yearday, monthday, day, or setpos.
- byValue is an integer. Validity checks are left to the rrule library, and invalid byValues will be ignored, possibly causing lag.

| byType   | Description |
| -------- | ---------- |
| month    | Month, 1-12 |
| weekno   | Week number in the year, 1-53 |
| yearday  | Day of the year, 1-366 |
| monthday | Day of the month, 1-31 |
| day      | Day of the week, 1-7, defaults to Monday-Sunday based on the WKST setting in [Settings](#settings) |
| setpos   | Must be used in combination with the above byTypes, indicating the nth event in the rule-specified event set |

*byhour and byminute are replaced by [TimeRange](#timerange).*
*bysecond doesn't make sense because inserting such schedules at this time is not as productive as starting immediately, so it's not supported.*

```bash
by[day[1,2],month[3,4]] # Represents Mondays and Tuesdays in March and April
```

#### Examples
1. Every day from 2023/7/10 to 2023/8/10, from 8 am to 10 am, repeating every 2 days, for a total of 10 times:
  

 ```bash
   rTime: 2023/7/10-8/10 8-10 daily,i2,c10
   ```
2. Every day from 2023/7/10 to 2023/8/10, from 8 am to 10 am, repeating every 2 days, for a total of 10 times, except for 2023/7/20-7/25:
   ```bash
   rTime: 2023/7/10-8/10 8-10 daily,i2,c10
   exTime: 2023/7/20-7/25 8-10
   ```
3. Every day from 2023/7/10 to 2023/8/10, from 8 am to 10 am, repeating every 2 days; Every day from 2023/7/20 to 2023/7/25, from 8 pm to 10 pm, repeating every 2 days:
   ```bash
   rTime: 2023/7/10-8/10 8-10 daily,i2;
          2023/7/20-7/25 20-22 daily,i2
   ```
4. On the last workday of every month from 2023/7/1 to 2023/8/31, from 5 pm to 6 pm:
   ```bash
   rTime: 2023/7/1-8/31 17-18 monthly by[day[1,2,3,4,5],setpos[-1]]
   ```