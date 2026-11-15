---
sidebar_position: 5
title: Host alerts
description: Get warned in Hana Desktop or by email when a server running hanad is low on disk, overloaded, or shows suspicious activity.
---

# Host alerts

hanad keeps an eye on the server it runs on and tells you when something needs attention. Alerts show up in Hana Desktop on every device where you are signed in, as a notification and as a badge on the host in the **Hanad hosts** list. When Hana is in the background, they also appear in your system's notification centre.

Only the owner of a host gets its alerts. People who reach the host through a shared vault don't.

## What hanad watches for

| Alert | Plan | Fires when |
| --- | --- | --- |
| Low disk space | Free | A disk is fuller than the threshold (90% by default). |
| High CPU usage | Free | Average CPU usage stays above the threshold (90% for 10 minutes by default). |
| High memory usage | Free | Memory usage stays above the threshold (90% for 10 minutes by default). |
| High system load | Free | The 5-minute load average per CPU stays above the threshold. Off by default; Linux and macOS. |
| Repeated failed SSH logins | Pro | One address fails to log in over SSH many times in a short time (20 times in 5 minutes by default), a typical sign of password guessing. Linux. |
| Unfamiliar process using a lot of resources | Pro | A program hanad first saw less than a day ago suddenly uses a lot of CPU or memory. Programs running from `/tmp`, `/var/tmp`, `/dev/shm` or a deleted file are flagged as critical. |

hanad spends its first day on a server learning which programs normally run there, so unfamiliar-process alerts start after 24 hours.

Each alert is sent once when it starts, again if it becomes critical, and once more when it clears.

## Email alerts

With Hana Pro, alerts are also emailed to the address of your Hana account. You can limit email to critical alerts and choose whether to get an email when an alert clears. Hana sends at most 20 alert emails per hour.

## Change what you get

In Hana Desktop, open **Settings → Notifications**:

- **System notifications** shows Hana's notifications in your system's notification centre while no Hana window is focused. This applies to this device only.
- **Host alerts** turns alerts in Hana Desktop and by email on or off, sets the threshold of each alert, and mutes hosts you don't want to hear about. These settings are stored in your Hana account and apply to all your hosts and devices. A change reaches connected hosts within seconds.

## Turn monitoring off on a server

To stop hanad from watching a particular server at all, set `alerts` to `false` in its [configuration](./configuration.md) and restart it:

```sh
sudo hanad config set alerts false
sudo hanad restart
```

## What leaves the server

An alert contains its kind, the measured value and threshold, and the details needed to act on it: the mount point and free space for disks, the source address and up to five tried user names for failed logins, and the process name, PID and executable path for unfamiliar processes. hanad does not send log lines, command lines or file contents. Resolved alerts are deleted from Hana Cloud after 90 days.
