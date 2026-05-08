# Deploy — `imwy.ai` (Hostinger VPS + Cloudflare)

Stack:
- **Source**: `https://github.com/fbereczki/portfolio` (public)
- **Image**: `ghcr.io/fbereczki/portfolio:latest` (auto-built by GitHub Actions on every push)
- **Host**: Hostinger VPS `1253369` · `srv1253369.hstgr.cloud` · `72.61.21.37`
- **DNS**: Cloudflare (managed at `dash.cloudflare.com`)
- **TLS**: Cloudflare proxy (Flexible or Full strict mode — recommended Flexible to start)

---

## 1. Wait for first GHCR build

Watch progress:
```
gh run watch --repo fbereczki/portfolio
```
First build ≈ 4–6 min (npm install + tsc + vite build + docker build + push).

When green, image is at:
```
ghcr.io/fbereczki/portfolio:latest
```
Make it public if not already:
```
gh api -X PATCH /user/packages/container/portfolio/visibility -f visibility=public
```

---

## 2. Hostinger Docker Manager — paste compose

Open: <https://hpanel.hostinger.com/vps/1253369/docker-manager>

Click **Create new project** (or **+ Add stack** depending on UI), name it `portfolio`, and paste the **full contents** of `docker-compose.yml` (root of repo):

```yaml
services:
  portfolio:
    image: ghcr.io/fbereczki/portfolio:latest
    container_name: portfolio
    restart: unless-stopped
    ports:
      - "80:80"
    healthcheck:
      test: ["CMD", "wget", "-q", "-O", "-", "http://127.0.0.1/healthz"]
      interval: 30s
      timeout: 5s
      start_period: 10s
      retries: 3
```

Click **Deploy**. Hostinger pulls the image and starts the container. After ~30 s, the VPS responds on port 80.

Test direct:
```
curl -I http://72.61.21.37/
# → HTTP/1.1 200 OK
curl http://72.61.21.37/healthz
# → ok
```

---

## 3. Cloudflare DNS — point `imwy.ai` at the VPS

Open <https://dash.cloudflare.com> → `imwy.ai` → **DNS / Records**.

Add (or edit) two A records:

| Type | Name      | IPv4 target    | Proxy status            | TTL  |
|------|-----------|----------------|-------------------------|------|
| A    | `imwy.ai` | `72.61.21.37`  | 🟠 Proxied               | Auto |
| A    | `www`     | `72.61.21.37`  | 🟠 Proxied               | Auto |

(Optional IPv6 — same names, type **AAAA**, target `2a02:4780:41:a4b8::1`.)

The proxied (orange-cloud) mode does TLS termination on Cloudflare's edge — no certbot needed on the VPS.

---

## 4. Cloudflare SSL/TLS mode

`SSL/TLS` → **Overview** → set encryption to:
- **Flexible** (simplest — HTTPS browser ↔ CF, HTTP CF ↔ origin) — works immediately
- **Full** (stricter — origin must serve HTTPS too — needs certbot on VPS)
- **Full (strict)** (best — origin must present a CF Origin Certificate)

Recommendation: start with **Flexible**, upgrade to **Full strict** after installing the CF Origin Certificate on the VPS (15-year cert, free, generated in CF panel).

In `SSL/TLS → Edge Certificates`:
- Enable **Always Use HTTPS** ✓
- Enable **Automatic HTTPS Rewrites** ✓
- Enable **HSTS** (set 6 months) — already covered by `nginx.conf`

---

## 5. Verify

```bash
# DNS resolution
dig +short imwy.ai
# → should return Cloudflare proxy IPs (104.21.x.x or 172.67.x.x)

# HTTPS via CF
curl -I https://imwy.ai/
# → HTTP/2 200, server: cloudflare

# Healthcheck
curl https://imwy.ai/healthz
# → ok

# Verify security headers
curl -I https://imwy.ai/ | grep -iE "strict-transport|content-security|x-frame|referrer"
```

External graders:
- <https://observatory.mozilla.org/analyze/imwy.ai>
- <https://securityheaders.com/?q=imwy.ai>

Goal: **A+** on both.

---

## 6. Updates — push to GitHub, auto-redeploys

After every `git push`:

1. GitHub Actions rebuilds + pushes `ghcr.io/fbereczki/portfolio:latest`
2. On the VPS, pull the new image and restart:
   ```
   docker pull ghcr.io/fbereczki/portfolio:latest
   docker compose -p portfolio up -d
   ```
   Or in Hostinger Docker Manager UI: **Project → Pull → Restart**.

For zero-touch updates: install [`watchtower`](https://containrrr.dev/watchtower/) as a sidecar that polls the registry every 5 min.

---

## 7. Backups

The portfolio's only state is on GitHub (source) and ghcr.io (image). The container itself is stateless.

Hostinger does weekly snapshots automatically (visible under VPS Actions). No additional backup needed.

---

## Troubleshooting

| Symptom                         | Fix                                                         |
|---------------------------------|-------------------------------------------------------------|
| `502 Bad Gateway` from CF       | Container down. Hostinger UI → restart. Check `docker logs`. |
| `522 Connection timed out`      | VPS firewall blocking 80. Open it in Hostinger panel.       |
| `525 SSL handshake failed`      | TLS mode is Full but origin serves HTTP. Switch to Flexible. |
| Mixed content warnings          | Set CF `Automatic HTTPS Rewrites` to ON.                    |
| Old version after push          | Manually pull image: `docker compose -p portfolio pull && docker compose -p portfolio up -d`. |
