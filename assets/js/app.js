// ============================================
// PAGE GENERATOR - DO NOT MODIFY
// ============================================
class DomainPage {
    constructor() {
        this.config = window.DOMAIN_CONFIG || DOMAIN_CONFIG;
        this.config.template = parseInt(this.config.template);
        this.template = TEMPLATES[this.config.template] || TEMPLATES[1];
        this.init();
    }

    init() {
        this.setPageTitle();
        this.setMetaTags();
        this.applyTheme();
        this.generateHTML();
        this.addEventListeners();
        this.generateFavicon();
        this.updateSEOFiles();

    }

    setPageTitle() {
        const price = this.formatPrice();
        const firstFeature = this.config.features && this.config.features.length > 0 
            ? this.config.features[0] 
            : '';
        
            if (firstFeature) {
                document.title = `${this.config.domain} is for sale - ${firstFeature} - ${price}`;
            } else {
                document.title = `${this.config.domain} is for sale - ${price}`;
            }
    }

    setMetaTags() {
        const price = this.formatPrice();
        const firstFeature = this.config.features && this.config.features.length > 0 
            ? this.config.features[0] 
            : '';
        
        const keywords = [
            this.config.domain,
            'domain for sale',
            'buy domain',
            'premium domain'
        ];
        
        let description;
        if (firstFeature) {
            description = `${this.config.domain} - ${firstFeature}. Available for purchase at ${price}. ${this.config.priceNegotiable ? 'Price negotiable.' : 'Fixed price.'}`;
        } else {
            description = `${this.config.domain} is available for purchase at ${price}. Premium domain name for sale. ${this.config.priceNegotiable ? 'Price negotiable.' : 'Fixed price.'}`;
        }
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.content = description;
        }
        
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (!keywordsMeta) {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.name = 'keywords';
            document.head.appendChild(keywordsMeta);
        }
        if (this.config.features && this.config.features.length > 0) {
            keywords.push(...this.config.features);
        }
        
        keywordsMeta.content = keywords.join(', ');
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = firstFeature ? `${this.config.domain} - ${firstFeature}` : `${this.config.domain} is for sale`;
        }
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.content = description;
        }
    }

    formatPrice() {
        const symbols = { USD: '$', EUR: '€', GBP: '£' };
        return `${symbols[this.config.currency] || '$'}${this.config.price}`;
    }

    applyTheme() {
            const t = this.template;
            document.documentElement.style.setProperty('--primary', t.primaryColor);
            document.documentElement.style.setProperty('--secondary', t.secondaryColor);
            document.documentElement.style.setProperty('--text', t.textColor);
            document.documentElement.style.setProperty('--button', t.buttonColor);
            document.documentElement.style.setProperty('--button-text', t.buttonTextColor);
            
            document.body.style.background = t.background;
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.backgroundSize = '100vw 100vh';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.color = t.textColor;
            
            if (parseInt(this.config.template) === 4) {
                document.body.classList.add('minimal-theme');
            }
            
            if (parseInt(this.config.template) === 5) {
                document.body.classList.add('crypto-theme');
            }
    }



    generateFavicon() {
        const firstLetter = this.config.domain.charAt(0).toUpperCase();
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, this.template.primaryColor);
        gradient.addColorStop(1, this.template.secondaryColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
    
        ctx.fillStyle = this.template.textColor || '#ffffff';
        
        ctx.font = 'bold 36px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(firstLetter, 32, 32);
        
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        link.href = canvas.toDataURL('image/x-icon');
        const oldIcon = document.querySelector('link[rel="icon"]');
        if (oldIcon) {
            oldIcon.remove();
        }
        document.head.appendChild(link);
    }

    generateHTML() {
        const price = this.formatPrice();
        
        let html = `
            
            <main>
                <!-- Hero Section -->
                <section class="hero">
                    <div class="domain-badge">For Sale</div>
                    <h1 class="domain-name" id="domainText">${this.config.domain}</h1>
                    <div class="domain-price">${price}</div>
                    <div class="price-badge">${this.config.priceNegotiable ? 'Price Negotiable' : 'Fixed Price'}</div>
                    <div class="cta-buttons">
                        <a href="#contact" class="cta-button" style="background: ${this.template.buttonColor}; color: ${this.template.buttonTextColor}">Get This Domain</a>
                        <a href="https://domainbeat.com?domain=${this.config.domain}" target="_blank" rel="noopener" class="cta-button-secondary" style="color: ${this.template.textColor}; border-color: ${this.template.buttonColor}">Analyze Domain</a>
                    </div>
                </section>`;

        if (this.config.features && this.config.features.length > 0) {
            html += `
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Why This Domain</h2>
                        <div class="grid">`;
            
            this.config.features.forEach((feature) => {
                html += `
                            <div class="card">
                                ${feature}
                            </div>`;
            });
            
            html += `
                        </div>
                    </div>
                </section>`;
        }
        const socialPlatforms = {
            email: {
                name: 'Email',
                urlPrefix: 'mailto:',
                urlSuffix: ''
            },
            telegram: {
                name: 'Telegram',
                urlPrefix: 'https://t.me/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            whatsapp: {
                name: 'WhatsApp',
                urlPrefix: 'https://wa.me/',
                urlSuffix: '',
                cleanValue: (v) => v.replace(/[^0-9]/g, '')
            },
            x: {
                name: 'X (Twitter)',
                urlPrefix: 'https://x.com/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            wechat: {
                name: 'WeChat',
                urlPrefix: '#',
                urlSuffix: '',
                isDisplay: true 
            },
            facebook: {
                name: 'Facebook',
                urlPrefix: 'https://facebook.com/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            discord: {
                name: 'Discord',
                urlPrefix: 'https://discord.gg/',
                urlSuffix: ''
            },
            linkedin: {
                name: 'LinkedIn',
                urlPrefix: 'https://linkedin.com/in/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('https://linkedin.com/in/', '').replace('/', '')
            },
            instagram: {
                name: 'Instagram',
                urlPrefix: 'https://instagram.com/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            youtube: {
                name: 'YouTube',
                urlPrefix: 'https://youtube.com/@',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            github: {
                name: 'GitHub',
                urlPrefix: 'https://github.com/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('@', '')
            },
            reddit: {
                name: 'Reddit',
                urlPrefix: 'https://reddit.com/u/',
                urlSuffix: '',
                cleanValue: (v) => v.replace('/u/', '').replace('u/', '')
            }
        };

        if (this.config.contact && Object.keys(this.config.contact).some(key => this.config.contact[key])) {
            html += `
                <section class="section" id="contact">
                    <div class="container">
                        <h2 class="section-title">Get In Touch</h2>
                        <div class="grid">`;
            Object.keys(this.config.contact).forEach(key => {
                const value = this.config.contact[key];
                if (value && socialPlatforms[key]) {
                    const platform = socialPlatforms[key];
                    const cleanedValue = platform.cleanValue ? platform.cleanValue(value) : value;
                    if (platform.isDisplay) {
                        html += `
                            <div class="card">
                                <div class="label">${platform.name}</div>
                                <div class="value">${value}</div>
                            </div>`;
                    } else {
                        const url = `${platform.urlPrefix}${cleanedValue}${platform.urlSuffix}`;
                        html += `
                            <a href="${url}" target="_blank" rel="noopener" class="card">
                                <div class="label">${platform.name}</div>
                                <div class="value">${value}</div>
                            </a>`;
                    }
                }
            });

            html += `
                        </div>
                    </div>
                </section>`;
        }

        if (this.config.marketplaces && this.config.marketplaces.length > 0) {
            html += `
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Buy Through Trusted Marketplaces</h2>
                        <div class="grid">`;

            this.config.marketplaces.forEach(marketplace => {
                let url = '';
                if (marketplace === 'Sedo') {
                    url = `https://sedo.com/search/details/?domain=${this.config.domain}`;
                } else if (marketplace === 'Afternic') {
                    url = `https://www.afternic.com/domain/${this.config.domain}`;
                } else if (marketplace === 'Atom') {
                    url = `https://www.atom.com/domains/${this.config.domain}`;
                } else if (marketplace === 'NameClub') {
                    url = `https://www.nameclub.com/domain/${this.config.domain}`;
                } else if (marketplace === 'Saw') {
                    url = `https://www.sawsells.com/domain/${this.config.domain}`;
                }

                html += `
                    <a href="${url}" target="_blank" rel="noopener" class="card">
                        <div class="value">${marketplace}.com</div>
                    </a>`;
            });

            html += `
                        </div>
                    </div>
                </section>`;
        }

        if (this.config.payments && this.config.payments.length > 0) {
            html += `
                <section class="section">
                    <div class="container">
                        <h2 class="section-title">Secure Payment Methods</h2>
                        <div class="payment-methods">`;

            this.config.payments.forEach(payment => {
                html += `<div class="payment-badge">${payment}</div>`;
            });

            html += `
                        </div>
                    </div>
                </section>`;
        }
        // Attribution: Please consider keeping this footer to support our free tool
        // It's not required, but it helps us continue providing free resources
        // Thank you for your support! - ABTdomain.com
        html += `
            </main>

            <footer class="creator-badge">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span>Powered by</span>
                    <a href="https://abtdomain.com" target="_blank" rel="noopener">ABTDomain.com</a>
                    <span>|</span>
                    <a href="${CREATOR.github}" target="_blank" rel="noopener">GitHub</a>
                    <span style="opacity: 0.7;">v${CREATOR.version}</span>
                </div>
            </footer>`;

        document.getElementById('app').innerHTML = html;
        const schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": this.config.domain,
            "description": `Premium domain name ${this.config.domain} for sale`,
            "url": window.location.href,
            "offers": {
                "@type": "Offer",
                "price": this.config.price,
                "priceCurrency": this.config.currency,
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": this.config.domain + " Owner",
                    "email": this.config.contact.email || undefined,
                    "telephone": this.config.contact.whatsapp || undefined
                }
            }
        });
        document.head.appendChild(schema);
        if (this.config.googleAnalytics && this.config.googleAnalytics.trim() !== "") {
            const gaScript1 = document.createElement('script');
            gaScript1.async = true;
            gaScript1.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalytics}`;
            document.head.appendChild(gaScript1);
            
            const gaScript2 = document.createElement('script');
            gaScript2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${this.config.googleAnalytics}');
            `;
            document.head.appendChild(gaScript2);
        }


        }

    addEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    updateSEOFiles() {
        if (!document.querySelector('link[rel="canonical"]')) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = `https://${this.config.domain}/`;
            document.head.appendChild(link);
        }
        if (!document.querySelector('link[rel="sitemap"]')) {
            const sitemapLink = document.createElement('link');
            sitemapLink.rel = 'sitemap';
            sitemapLink.type = 'application/xml';
            sitemapLink.href = '/sitemap.xml';
            document.head.appendChild(sitemapLink);
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
   new DomainPage();
});
