---
sidebar_position: 5
title: Security and telemetry
description: What hanad stores on the server, what Hana Cloud can see, and what anonymous usage statistics contain.
---

# Security and telemetry

## What Hana Cloud sees

Hana Cloud relays the connection between Hana Desktop and hanad, but SSH runs end-to-end between Hana Desktop and your server's `sshd`. Hana Cloud only ever handles SSH's own encrypted bytes. It cannot see:

- your SSH keys, passwords or the server's host key secrets,
- what you type or what the server prints,
- files you transfer over SFTP or traffic through port forwards.

Your server still checks every login the way it always does, and Hana Desktop still checks the server's host key. A compromised relay could drop or delay a connection, but could not read it or log in.

Hana Cloud does know which hosts you have, their names, hostnames, OS, CPU architecture and hanad version, when they were last online, and when sessions to them are opened.

## What the server stores

`hanad login` uses the [OAuth 2.0 device flow](https://datatracker.ietf.org/doc/html/rfc8628): you approve the login in your own browser, and the server never sees your Hana password. The login token is used once, to register the host, and is then revoked.

What stays on the machine is a **host credential** in `credentials.json` in the [state directory](./configuration.md#file-locations), readable only by root (or the user, for a per-user install). It lets hanad connect to Hana Cloud **as this host only**. It cannot read your vaults, see your other hosts or change your account. Hana Cloud stores only a hash of it.

The credential stops working when you:

- run `hanad logout` or `hanad uninstall`,
- **Remove** the host in Hana Desktop, or
- log in again with `hanad login --force`.

When the host is removed from Hana, hanad deletes the credential and stops reconnecting.

## Who can connect

Through Hana Cloud, a hanad host can be reached by:

- you, the account that logged it in, and
- active members of the cloud vaults you [linked it to](./connect.md#share-a-host-with-your-team),

provided they have Hana Pro. Nobody else can see the host or open a connection to it. Reaching the host only gets someone to your `sshd`: they still need a user account and credentials on the server to log in.

## Release integrity

The installer and `hanad update` download releases from [GitLab](https://gitlab.com/hanassh/hanad/-/releases) over HTTPS and check each binary against the release's `SHA256SUMS` before installing it. hanad is open source (GPL-3.0); the release binaries are built by GitLab CI from the tagged source.

## Telemetry

hanad can send anonymous usage statistics that help us find bugs and see how hanad is used. The installer asks whether to send them (default: yes). Change your answer at any time:

```sh
sudo hanad telemetry off
```

When telemetry is on, hanad sends:

- a random installation id, created on this machine and **not linked to your account or host**,
- the hanad version, OS and CPU architecture,
- per-day counts of installs, daemon starts, a daily heartbeat, logins and logouts, updates and crashes,
- per-day counts and total duration of relayed sessions, and of relay errors (the error class only, such as `target_unreachable`).

It never sends hostnames, IP addresses, usernames, host ids, or anything typed in or printed by a session. Statistics wait on disk until they are sent and are dropped after 15 days if they can't be. Turning telemetry off deletes any that are waiting.
