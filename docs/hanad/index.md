---
title: hanad
description: The Hana daemon. Reach your servers over SSH without opening any inbound port.
---

# hanad

hanad is the Hana daemon. Install it on a server, log in once, and the server shows up in Hana Desktop. You can then SSH into it **without opening any inbound port**: no port forwarding on the router, no public IP, no bastion host.

```sh
curl -fsSL https://hanassh.com/i/hanad | sh
sudo hanad login
```

## How it works

hanad runs in the background and keeps one outbound connection to Hana Cloud. When you connect from Hana Desktop, Hana Cloud asks hanad to open a stream for that session, and hanad forwards it to the server's own SSH server (`sshd` on `127.0.0.1:22` by default).

```text
Hana Desktop ──wss──▶ Hana Cloud ◀──wss── hanad ──tcp──▶ sshd (127.0.0.1:22)
```

- **SSH stays end-to-end.** Hana Desktop talks SSH directly to your `sshd`. Hana Cloud only moves encrypted SSH bytes between the two connections. It never sees your keys, passwords or anything you type.
- **Nothing changes on the SSH side.** Host key checks, users, keys, `authorized_keys`, SFTP and port forwarding work exactly as they do over a direct connection.
- **Only outbound HTTPS.** hanad connects out to `api.hanassh.com` on port 443. The server needs no inbound rules at all.
- **Small.** hanad is a single static binary written in Rust and uses a few megabytes of memory.

## Requirements

| | |
| --- | --- |
| Server | Linux (x86_64, aarch64, any distribution), macOS (Intel, Apple silicon) or Windows (x86_64) |
| SSH server | A running `sshd`, by default on `127.0.0.1:22`. hanad does not include an SSH server. |
| Network | Outbound HTTPS to `api.hanassh.com` |
| Account | A Hana account to log in with. Connecting through Hana Cloud is part of **Hana Pro**. |

:::info[Who needs Pro]

The plan is checked for the person **connecting**, not for the server. Anyone with Hana can install hanad and log in. To connect to a hanad host from Hana Desktop you need Hana Pro, and so does every teammate you share the host with. See [pricing](https://hanassh.com/#pricing).

:::

## Get started

1. [Install hanad](./install.mdx) on the server.
2. [Log in](./connect.md#log-in) with `sudo hanad login` and approve the code in your browser.
3. [Connect from Hana Desktop](./connect.md#connect-from-hana-desktop): the server is listed under **Hanad hosts**.
4. Optionally [share it with your team](./connect.md#share-a-host-with-your-team) through a shared vault.

## Learn more

- [Commands](./commands.md): every `hanad` command and flag.
- [Configuration](./configuration.md): the config file, file locations and the background service.
- [Security and telemetry](./security.md): what the server stores, what Hana Cloud sees and what usage statistics contain.
- [Troubleshooting](./troubleshooting.md): `hanad status`, logs and common errors.

hanad is open source (GPL-3.0) at [gitlab.com/hanassh/hanad](https://gitlab.com/hanassh/hanad).
