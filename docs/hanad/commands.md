---
sidebar_position: 3
title: Commands
description: Reference for every hanad command.
---

# Commands

Run commands with `sudo` for a system-wide hanad (the usual setup on servers), or without it for a [per-user](./connect.md#system-wide-or-per-user) one. `hanad --help` and `hanad <command> --help` list the same information.

| Command | |
| --- | --- |
| [`hanad login`](#hanad-login) | Connect this machine to your Hana account and start the service |
| [`hanad logout`](#hanad-logout) | Remove this machine from Hana and stop the service |
| [`hanad status`](#hanad-status) | Account, service, connection and SSH target state |
| [`hanad start`, `stop`, `restart`](#service-control) | Control the background service |
| [`hanad service install`, `uninstall`](#service-control) | Register or unregister the service without starting it |
| [`hanad update`](#hanad-update) | Update to the latest release |
| [`hanad telemetry`](#hanad-telemetry) | Turn anonymous usage statistics on or off |
| [`hanad config`](#hanad-config) | Read and change settings |
| [`hanad logs`](#hanad-logs) | Print the daemon log |
| [`hanad uninstall`](#hanad-uninstall) | Log out and remove the service (and optionally all data) |
| [`hanad run`](#hanad-run) | Run the daemon in the foreground |

## `hanad login`

```text
hanad login [--name NAME] [--no-browser] [--no-service] [--force]
```

Starts the device login: prints a code to approve at [hanassh.com/device](https://hanassh.com/device), registers the machine with your account once you approve, then installs and starts the background service. See [Log in](./connect.md#log-in).

| Flag | |
| --- | --- |
| `--name NAME` | Name shown in Hana (defaults to the hostname, at most 64 characters) |
| `--no-browser` | Don't open a browser on this machine |
| `--no-service` | Don't install or start the service; start it later with `hanad start` or run `hanad run` |
| `--force` | Log in again even if the machine is already connected; the previous host is removed from Hana |

## `hanad logout`

Removes the host from your Hana account, deletes its credentials from the machine and stops the service. People you shared the host with lose access too. If Hana Cloud can't be reached, the credentials are still deleted; remove the host in Hana Desktop afterwards.

## `hanad status`

```text
$ sudo hanad status
hanad 0.1.0 (system scope)
Account:    you@example.com
Host id:    3f2c9a4e-8b1d-4c6e-9a7f-2d5e8c1b0a93
In Hana:    "web-1", online, shared through 1 vault
Service:    running
Connection: connected to Hana Cloud
Sessions:   1 active, 14 since start
SSH target: 127.0.0.1:22 (reachable)
Telemetry:  on
```

`--json` prints the same as JSON, for scripts and monitoring. See [Troubleshooting](./troubleshooting.md) for what each state means.

## Service control

| Command | |
| --- | --- |
| `hanad start` | Start the background service, installing it first if needed |
| `hanad stop` | Stop the service. The host shows as offline in Hana. |
| `hanad restart` | Restart the service, e.g. after editing the config |
| `hanad service install` | Register the service (starts at boot) without starting it |
| `hanad service uninstall` | Unregister the service |

The service is managed by systemd or OpenRC on Linux, launchd on macOS and the Service Control Manager on Windows. It restarts automatically if hanad exits.

## `hanad update`

```text
hanad update [--check]
```

Downloads the latest [release](https://gitlab.com/hanassh/hanad/-/releases), checks its SHA-256, replaces the running binary and restarts the service. `--check` only reports whether a newer version exists. See [Update](./install.mdx#update) for automatic updates.

## `hanad telemetry`

```text
hanad telemetry [on | off | status]
```

Turns [anonymous usage statistics](./security.md#telemetry) on or off. With no argument, or `status`, prints the current setting.

## `hanad config`

```text
hanad config                    # print the whole config
hanad config get KEY            # print one value
hanad config set KEY VALUE      # change one value
hanad config path               # print where hanad keeps its files
```

Run `hanad restart` after changing a setting. See [Configuration](./configuration.md) for the keys.

## `hanad logs`

```text
hanad logs [-n LINES]
```

Prints the last lines of the current daemon log (100 by default). Logs rotate daily and the last 7 days are kept.

## `hanad uninstall`

```text
hanad uninstall [--purge]
```

Logs out (removing the host from Hana), stops and unregisters the service. `--purge` also deletes the config, state and logs. The binary itself stays; the command prints its path so you can delete it.

## `hanad run`

Runs the daemon in the foreground and logs to the terminal. This is what the service runs. Useful for debugging, or in a container where a process supervisor or the container runtime keeps it running instead of a system service. Stop it with <kbd>Ctrl</kbd>+<kbd>C</kbd>.
