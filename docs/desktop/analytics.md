---
sidebar_position: 3
---

# Analytics
During onboarding and in settings, you can opt in to automatically submit anonymous analytics. We want to stay transparent and we truly value your privacy, which is why this page exists.

## How does it work?
The moment you enable analytics for the first time on a device, a random UUID-v4 is negotiated with Hana Cloud and saved on your device. That ID is used to identify your device and tell it apart from others. It's not derived from your hardware ID nor associated with the account you use in Hana.

Analytics are gathered all the time in the background and stored in-memory. At the end of each day (or when Hana is closed) these are sent to us with the random UID generated initially.

## What data do we gather?
- **Your hardware details** (like models, manufacturers, RAM size, VRAM size, amount of CPU cores/threads, CPU architechture). This never includes serial numbers or other PII.
- **Your OS family and version** (e.g. Windows 11 25H2, macOS 26.4). Purpose is obvious, we use it to measure risk and understand priority of different platforms.
- **Time spent using Hana**, also categorised by state (window open + focused, window open + not focused, window closed — running in tray). We use this mostly to understand usage habits and see if users like keeping Hana running in the tray (even if they don't need it at the moment) or rather exit it.

## How do I opt out?
Simply flip the switch in settings. If you want, you can also go to the [data directory](../useful-definitions#data-directory) and remove the `analytics-uid` file. This will remove any remains of analytics being uploaded, but won't remove existing uploaded information from Cloud.