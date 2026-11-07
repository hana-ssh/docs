---
sidebar_position: 6
title: Troubleshooting
description: Diagnose hanad with hanad status and hanad logs, and fix common problems.
---

# Troubleshooting

Start with `hanad status` on the server. Use `sudo` for a system-wide install, or you'll be looking at an empty per-user setup.

```sh
sudo hanad status
sudo hanad logs -n 50
```

For more detail, raise the log level and restart:

```sh
sudo hanad config set log_level debug
sudo hanad restart
```

Or stop the service and run hanad in the foreground, where it logs to the terminal: `sudo hanad stop && sudo hanad run`.

## What `hanad status` means

| Line | Value | What to do |
| --- | --- | --- |
| Account | `not logged in` | Run `sudo hanad login`. |
| In Hana | `removed — run hanad login to add it again` | The host was removed from your account. Run `sudo hanad login` to add it again. |
| In Hana | `could not reach Hana Cloud` | Check the server's outbound HTTPS access to `api.hanassh.com`. |
| Service | `not installed` / `stopped` | Run `sudo hanad start`. |
| Connection | `connecting` / `disconnected (retrying)` | hanad can't reach Hana Cloud. It retries automatically, backing off up to a minute between attempts. Check DNS, firewalls and proxies for outbound HTTPS to `api.hanassh.com`. |
| SSH target | `NOT reachable — is sshd running?` | See [The server's SSH isn't reachable](#the-servers-ssh-isnt-reachable). |

## Problems logging in

### "this machine is already connected to Hana"

The machine is linked to an account already. Run `hanad logout` first, or `hanad login --force` to replace it.

### "the code expired before it was approved"

Codes are valid for 15 minutes. Run `hanad login` again.

### "cannot write to /etc/hanad (try sudo)"

Run `sudo hanad login` for a system-wide setup.

### "a system-wide hanad is set up on this machine"

You ran hanad without `sudo` on a machine that already has a system-wide setup. Use `sudo hanad …` to manage that one.

### The code page says the code is invalid or already used

Each code works once. Run `hanad login` again for a new one and enter the code exactly as the terminal shows it.

## Problems connecting from Hana Desktop

### The host isn't listed under Hanad hosts

Make sure you are signed in to Hana Cloud in Hana Desktop with the same account you approved the login with, and choose **Refresh**. Hosts shared with you appear once the owner adds them to a cloud vault you are a member of.

### The host shows as Offline

hanad on the server isn't connected. Run `sudo hanad status` on the server (through another way in, or the console of your cloud provider) and check the Service and Connection lines.

### An upgrade prompt instead of Connect

Connecting through Hana Cloud is part of Hana Pro. Every person who connects needs Pro, including teammates you share a host with.

### The connection closes straight away with "target unreachable"

hanad is connected, but it can't reach the server's SSH server. See below.

### The connection times out

hanad didn't answer within 15 seconds. Check `hanad status` and `hanad logs` on the server; restarting the service with `sudo hanad restart` usually helps.

### Authentication fails

That is the server's `sshd` refusing the login, exactly as it would over a direct connection. Check the user name, keys and `authorized_keys`, and the `sshd` logs (`journalctl -u ssh` or `-u sshd` on most Linux systems).

### Host key changed warning after re-adding a server

Hana Desktop keeps known hosts by hostname, and a hanad host's hostname is `<host-id>.hanad`. If you reinstalled the server but kept the same hanad host, its SSH host key really did change; verify it, then accept the new key.

## The server's SSH isn't reachable

hanad forwards sessions to `ssh_target`, `127.0.0.1:22` by default. If `hanad status` says it isn't reachable:

1. Check that the SSH server is installed and running, e.g. `systemctl status ssh` (Debian, Ubuntu) or `systemctl status sshd` (Fedora, RHEL, Arch). On macOS, turn on **Remote Login** in System Settings → General → Sharing. On Windows, install and start the OpenSSH Server feature.
2. If `sshd` listens on another port or only on a specific address, set `ssh_target` to match and restart:

   ```sh
   sudo hanad config set ssh_target 127.0.0.1:2222
   sudo hanad restart
   ```

## Still stuck?

Check [service status](https://status.seventy7.dev/), or open an issue at [gitlab.com/hanassh/hanad](https://gitlab.com/hanassh/hanad/-/issues) with the output of `hanad status` and the relevant lines of `hanad logs`. Remove anything you don't want to share first.
