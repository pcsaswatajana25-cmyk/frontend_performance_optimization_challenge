# ApexPulse: Frontend Performance Optimization Challenge

This repository contains the complete codebase, benchmark suite, and technical documentation for the **Frontend Performance Optimization Challenge**.

## Project Overview
- **Application:** ApexPulse Cloud Telemetry & Observability Marketing Platform
- **Baseline Version:** `apexpulse-baseline/` (Initial unoptimized web application exhibiting multi-megabyte payloads, render-blocking resources, layout shifts, and heavy CPU tasks)
- **Optimized Version:** `apexpulse-optimized/` (Production-ready web application with modern WebP media pipeline, inlined critical CSS, deferred scripts, explicit aspect ratios, and resource preloading)
- **Technical Documentation:** `PERFORMANCE_REPORT.pdf` and `PERFORMANCE_REPORT.md`
- **Audit Data:** `audit_results/audit_metrics.json` and `audit_results/benchmark_comparison.csv`

---

## Performance Benchmark Summary

| Metric | Baseline (Pre-Optimization) | Optimized (Post-Optimization) | Improvement (%) | Lighthouse Status |
| :--- | :---: | :---: | :---: | :---: |
| **Lighthouse Overall Score** | **44.6 / 100** | **99.9 / 100** | **+55.3 pts** | **PASS (Good / 90+)** |
| **First Contentful Paint (FCP)** | 3,150 ms | 780 ms | **-75.2%** | PASS (Target < 1.8s) |
| **Largest Contentful Paint (LCP)** | 6,840 ms | 1,420 ms | **-79.2%** | PASS (Target < 2.5s) |
| **Total Blocking Time (TBT)** | 380 ms | 0 ms | **-100.0%** | PASS (Target < 200ms) |
| **Cumulative Layout Shift (CLS)** | 0.285 | 0.000 | **-100.0%** | PASS (Target < 0.10) |
| **Speed Index (SI)** | 4,920 ms | 1,150 ms | **-76.6%** | PASS (Target < 3.4s) |
| **Total Transfer Payload** | 9.72 MB | 305 KB | **-96.9%** | Optimized |
| **Images Payload** | 9.42 MB | 216 KB | **-97.7%** | Optimized |
| **CSS Payload** | 188.0 KB | 4.5 KB | **-97.6%** | Optimized |
| **JavaScript Payload** | 98.5 KB | 1.0 KB | **-99.0%** | Optimized |

---

## How to Run & Audit Locally

### Prerequisites
- Python 3.8+ (for local server or automated audit execution)
- Modern web browser (Chrome, Chromium, Firefox, or Edge)

### Option 1: Previewing in Browser
1. Start an HTTP server in the project root:
   ```bash
   python3 -m http.server 8080
   ```
2. Navigate to:
   - Baseline (Unoptimized): `http://localhost:8080/apexpulse-baseline/index.html`
   - Optimized: `http://localhost:8080/apexpulse-optimized/index.html`
3. Open Chrome DevTools (`F12`), switch to the **Lighthouse** tab, select **Mobile** profile, and run an audit on both pages.

### Option 2: Running Automated CDP Benchmark Suite
Run the included audit runner to execute multi-run headless Chromium tests with 4x CPU slowdown:
```bash
python3 artifacts/file_generation/ttl=63d/intermediate/benchmark_audit.py
```
Audit metrics will be output to console and updated in `audit_results/`.

---

## Optimization Techniques Applied
1. **Modern Media Pipeline:** WebP conversion (80-82% quality), responsive dimensions, native `loading="lazy"` on below-the-fold assets, and aspect ratio reservation.
2. **Critical CSS Architecture:** Inlining above-the-fold CSS (<4 KB) into `<head>`, purging 180 KB of unused CSS bloat, and loading secondary stylesheets asynchronously via `<link rel="preload" as="style">`.
3. **Script Optimization & Thread Unblocking:** Eliminating monolithic vendor utilities, minifying application scripts, applying `defer`, and deferring non-essential analytics via `requestIdleCallback()`.
4. **Font Optimization:** Implementing `font-display: swap` and system UI font fallbacks to eliminate Flash of Invisible Text (FOIT).
5. **DOM Hierarchy Streamlining:** Flattening nested wrapper elements and adopting passive event listeners to eliminate layout thrashing.
6. **Resource Hinting:** Preloading the critical LCP hero image with `fetchpriority="high"`.

For full engineering analysis, technical trade-offs, and continuous monitoring guidelines, refer to **`PERFORMANCE_REPORT.pdf`** or **`PERFORMANCE_REPORT.md`**.
