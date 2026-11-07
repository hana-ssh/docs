---
sidebar_position: 2
title: Log in and connect
description: Link a server to your Hana account, connect to it from Hana Desktop and share it with your team.
---

# Log in and connect

## Log in

Run `hanad login` on the server. It works over SSH and needs no browser on the server: you approve the login in any browser, for example on your laptop.

```text
$ sudo hanad login
To connect this machine to Hana, open this page in any browser:

    https://hanassh.com/device

and enter the code:

    WDJB-MJHT

Waiting for approval…

✓ Connected as you@example.com — this machine is "web-1" in Hana.
✓ hanad is running in the background and starts with the system.

Open Hana Desktop to connect to this machine. `hanad status` shows the connection.
```

1. Open [hanassh.com/device](https://hanassh.com/device) and sign in to your Hana account.
2. Enter the code from the terminal. **Check that it matches** the code on the server before you approve. Never approve a code someone else sent you.
3. Approve. hanad finishes by itself within a few seconds, registers the server with your account, and installs and starts the background service.

The code is valid for 15 minutes. When the server has a desktop session of its own, hanad also opens the browser for you; `--no-browser` stops that.

| Flag | |
| --- | --- |
| `--name NAME` | The name shown in Hana. Defaults to the server's hostname. |
| `--no-browser` | Don't try to open a browser on this machine. |
| `--no-service` | Log in, but don't install or start the background service. |
| `--force` | Log in again even though the machine is already connected. The old host is removed from Hana first. |

### System-wide or per-user

Run `hanad login` as root (`sudo hanad login`, or an elevated PowerShell on Windows) to set hanad up system-wide. This is the normal case on servers: the service starts at boot and keeps running whoever is logged in.

As a regular user on Linux or macOS, hanad sets itself up for that user only: a systemd user service or a launchd LaunchAgent, with config and state in the user's home directory. Manage it with `hanad …` without `sudo`.

:::tip[Per-user service on Linux]

systemd stops user services when the user logs out. To keep a per-user hanad running, enable lingering for that user: `sudo loginctl enable-linger $USER`.

:::

## Connect from Hana Desktop

1. In Hana Desktop, sign in to Hana Cloud.
2. Open the **Hosts** panel. Servers that run hanad are listed under **Hanad hosts**, with an **Online** or **Offline** status.
3. Choose **Connect** next to a host, enter the user to log in as, and connect.

You log in to the server exactly as you would over a direct connection: with the server's users, your SSH keys or a password, and the usual host key check on the first connection. Terminal, SFTP and port forwarding all work.

Connecting through Hana Cloud is part of **Hana Pro**. On the Free plan the hosts are listed with an upgrade prompt instead of **Connect**.

### Save it in a vault

Choose **Add to vault** to save a hanad host as a regular host in one of your vaults, with the user to log in as. It then sits next to your other hosts, works with snippets, multi-exec and workspaces, and syncs to your other devices with the vault.

A hanad host is saved with the hostname `<host-id>.hanad` and port `22`. Hana Desktop recognises that hostname and connects through Hana Cloud instead of over the network. Don't change it.

### Rename or remove a host

If you own the host, choose **Rename** to change its name in Hana, or **Remove** to take it out of your account. Removing it disconnects the server immediately and nobody can connect to it through Hana Cloud anymore; hanad on the server stops reconnecting and forgets its credentials. Run `hanad login` on the server to add it again.

Running `hanad logout` on the server does the same from the other side.

## Share a host with your team

Hosts are shared through [shared vaults](../cloud/index.md#shared-vaults):

1. Choose **Add to vault** on a host you own and pick a cloud vault that your team is a member of.
2. Every member of that vault now sees the host under **Hanad hosts**, marked "shared by" you, and can connect to it.

To share a host you need to own it and be an owner or editor of the vault. Each member still needs:

- **Hana Pro** to connect through Hana Cloud.
- **An account on the server.** Sharing the host in Hana only lets people reach the server's `sshd`. Who can log in, and as which user, is still decided by the server.

Members who leave the vault, or are removed from it, lose access to the host. The host owner or the vault owner can unlink the host from the vault at any time.

## Limits

An account can have up to 100 hanad hosts.
