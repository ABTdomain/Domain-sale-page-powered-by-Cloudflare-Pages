# 🌐 Domain Sale Landing Page

A free and customizable **domain sale landing page** powered by [Cloudflare Pages](https://pages.cloudflare.com/).

- ⚡ Ultra-fast global access (Cloudflare CDN)
- 🔎 SEO optimized
- 🎨 Multiple themes (6 templates available)
- 🔒 Free SSL, zero-cost hosting
- 🛠️ Easy configuration with a single HTML file

---

## 🚀 Quick Start

### 1. Prepare Files
1.  Download the template.
2.  Create a folder (e.g. `my-domain-sale`).
3.  Create `index.html` and paste the template code.
4.  Edit the `DOMAIN_CONFIG` section:

    ```javascript
    const DOMAIN_CONFIG = {
      domain: "YourDomain.com",   // Your domain
      price: "10,000",            // Sale price
      currency: "USD",            // Currency
      template: 1,                // Template (1–6)
      // Other settings...
    };
    ```
5.  Open `index.html` in your browser to preview.

### 2. Deploy on GitHub + Cloudflare Pages
1.  Create a new GitHub repository and upload `index.html`.
2.  On Cloudflare Pages, create a new project.
3.  Connect your GitHub repo → select **None** for framework → leave build settings empty.
4.  Deploy → get a free URL like: `https://domain-sale-xxx.pages.dev`

### 3. (Optional) Add Custom Domain
1.  Add a subdomain (e.g. `forsale.yourdomain.com`).
2.  Configure DNS (`CNAME` → your Cloudflare Pages URL).

---

## 🎨 Template Guide

- **Template 1 (Tech):** Blue/purple gradient (.io, .ai, .tech, .app)
- **Template 2 (Finance):** Green/gold (finance/invest/trade)
- **Template 3 (Creative):** Pink/orange (design/art/studio)
- **Template 4 (Minimal):** Black & white (short/brand domains)
- **Template 5 (Crypto):** Dark neon (crypto/NFT/Web3)
- **Template 6 (Corporate):** Deep blue (corporate/consulting)

---

## ✅ Checklist

- [ ] Updated domain & price
- [ ] Selected a template
- [ ] Added contact info
- [ ] Uploaded to GitHub
- [ ] Deployed to Cloudflare Pages

---

## 🔧 Troubleshooting

- **Deployment failed?** → Make sure `index.html` is in the root folder.
- **Page not updating?** → Wait 1–2 minutes or clear your browser cache.
- **Change theme?** → Update the `template` value (1–6) in your config.

---

## 📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it, but you must keep the attribution in the footer.
