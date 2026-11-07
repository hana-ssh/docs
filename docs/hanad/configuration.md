---
sidebar_position: 4
title: Configuration
description: The hanad config file, its settings, environment variables and where hanad keeps its files.
---

# Configuration

hanad works without any configuration. To change a setting, use `hanad config set` or edit the config file, then restart the service:

```sh
sudo hanad config set ssh_target 127.0.0.1:2222
sudo hanad restart
```

## Settings

The config file is TOML:

```toml
# hanad configuration. Run `hanad restart` after editing.
api_url = "https://api.hanassh.com"
ssh_target = "127.0.0.1:22"
telemetry = true
auto_update = false
update_project = "hanassh/hanad"
log_level = "info"
```

| Key | Default | |
| --- | --- | --- |
| `ssh_target` | `127.0.0.1:22` | `host:port` that relayed sessions are forwarded to. Change it when `sshd` listens on another port or address. |
| `name` | the hostname | Name shown in Hana. Applies at the next `hanad login`; to rename a connected host, use **Rename** in Hana Desktop. |
| `telemetry` | asked at install | [Anonymous usage statistics](./security.md#telemetry), `true` or `false`. Same as `hanad telemetry on`/`off`. |
| `auto_update` | `false` | Check for a new release once a day and install it. Not available on Windows. |
| `log_level` | `info` | `error`, `warn`, `info`, `debug` or `trace` |
| `api_url` | `https://api.hanassh.com` | The Hana Cloud API. Only change it if you were told to. |
| `update_project` | `hanassh/hanad` | GitLab project that `hanad update` reads releases from |

`hanad config set` accepts `true`/`false`, `on`/`off`, `yes`/`no` and `1`/`0` for the boolean settings.

### Forward to a different SSH server

`ssh_target` can be any address the server can reach, not only `localhost`. Pointing it at another machine on the same private network makes that machine reachable through this server's hanad:

```sh
sudo hanad config set ssh_target 10.0.0.12:22
sudo hanad restart
```

SSH still runs end-to-end between Hana Desktop and the target's `sshd`; hanad only forwards the bytes.

## Environment variables

| Variable | |
| --- | --- |
| `HANAD_HOME` | Keep config, state and logs in this one directory instead of the locations below. Useful for testing and containers. |
| `HANAD_API_URL` | Overrides `api_url` |
| `HANAD_LOG` | Log filter that overrides `log_level`, e.g. `hanad=debug` |

## File locations

`hanad config path` prints the paths in use on this machine.

| | Config file | State | Logs |
| --- | --- | --- | --- |
| Linux, system | `/etc/hanad/config.toml` | `/var/lib/hanad/` | `/var/log/hanad/` |
| Linux, per-user | `~/.config/hanad/config.toml` | `~/.local/state/hanad/` | `~/.local/state/hanad/logs/` |
| macOS, system | `/Library/Application Support/hanad/config.toml` | `/Library/Application Support/hanad/state/` | `/Library/Logs/hanad/` |
| macOS, per-user | `~/Library/Application Support/hanad/config.toml` | `~/Library/Application Support/hanad/state/` | `~/Library/Logs/hanad/` |
| Windows | `%ProgramData%\hanad\config.toml` | `%ProgramData%\hanad\state\` | `%ProgramData%\hanad\logs\` |

On Linux, the per-user paths follow `XDG_CONFIG_HOME` and `XDG_STATE_HOME` when they are set.

The state directory holds:

| File | |
| --- | --- |
| `credentials.json` | The host credential (readable only by its owner). See [Security](./security.md#what-the-server-stores). |
| `status.json` | The daemon's current state, read by `hanad status` |
| `telemetry.json` | Usage statistics waiting to be sent (only when telemetry is on) |

## The background service

`hanad login` and `hanad start` register hanad with the system's service manager so it starts at boot and restarts if it exits:

| | Service manager | Service name |
| --- | --- | --- |
| Linux | systemd (system or `--user`), or OpenRC | `hanad` |
| macOS | launchd (LaunchDaemon or LaunchAgent) | `com.hanassh.hanad` |
| Windows | Service Control Manager | `hanad` |

Use `hanad start`, `stop` and `restart` rather than the service manager directly; they pick the right scope for you.
